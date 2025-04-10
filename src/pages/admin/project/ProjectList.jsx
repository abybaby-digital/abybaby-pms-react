import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GoAlertFill } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AdminHead from "../../../components/common/AdminHead";
import { useQuery } from "@tanstack/react-query";
import {
  getBranchList,
  getClientList,
  getCompanyList,
  getFYList,
  getProjectList,
} from "../../../services/api"; // Updated API function to fetch project list
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ViewProject from "./ViewProject"; // Assuming ViewProject component exists
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";

import { useSelector } from "react-redux";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

// Import libraries for Excel and PDF export
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function ProjectList() {
  const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);
  const roleId = useSelector((state) => state.auth.user?.role_id);
  console.log("userId", roleId);

  // FILTERING STATE VARIABLES FOR PROJECT FILTER
  const [fincYear, setFincYear] = useState(null);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [branchFilter, setBranchFilter] = useState(null);
  const [clientFilter, setClientFilter] = useState(null);
  const [skip, setSkip] = useState(null);
  const [take, setTake] = useState(null);
  const [status, setStatus] = useState(null);
  const [billing, setBilled] = useState(null);
  const [payment, setPayment] = useState(null);


  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  // const [fincYear, setFincYear] = useState(fincYearList?.response[0].id);

  const { data: projectList = [], isLoading } = useQuery({
    queryKey: [
      "project-list",
      refetchList,
      +fincYear,
      companyFilter,
      branchFilter,
      clientFilter,
      skip,
      take,
      status,
      billing,
      payment,
    ],
    queryFn: async () => {
      return await getProjectList(
        token,
        clientFilter,
        branchFilter,
        companyFilter,
        fincYear,
        skip,
        take,
        status,
        billing,
        payment
      );
    },
  });

  // const { data: FYList = [] } = useQuery({
  //   queryKey: ["finance-year-list"],
  //   queryFn: async () => {
  //     return await getFYList(token);
  //   },
  // });

  // const { data: companyList = [] } = useQuery({
  //   queryKey: ["company-filter-list"],
  //   queryFn: async () => {
  //     return await getCompanyList(token);
  //   },
  // });

  // const { data: branchList = [] } = useQuery({
  //   queryKey: ["branch-filter-list"],
  //   queryFn: async () => {
  //     return await getBranchList(token);
  //   },
  // });

  // const { data: clientList = [] } = useQuery({
  //   queryKey: ["client-filter-list"],
  //   queryFn: async () => {
  //     return await getClientList(token);
  //   },
  // });

  // console.log(FYList);

  // useEffect(() => {
  //     if (projectList) {
  //         console.log(projectList);
  //     }
  // }, [projectList]);

  const [singleProjectData, setSingleProjectData] = useState({});
  const [addOrEdit, setAddOrEdit] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search input

  const singleProject = (id) => {
    const allProjects = projectList?.response;
    const singleProject = allProjects.find((project) => project.id === id); // Use find to get a single match
    setSingleProjectData(singleProject);
    setModal(true);
  };

  const filteredProjects = projectList?.response?.filter((project) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      project.project_number?.toLowerCase().includes(keyword) ||
      project.project_name?.toLowerCase().includes(keyword) ||
      project.client_name?.toLowerCase().includes(keyword) ||
      project.branch_name?.toLowerCase().includes(keyword)
    );
  });



  const exportToExcel = () => {
    if (!projectList?.response || projectList.response.length === 0) {
      alert("No data available to export!");
      return;
    }

    // Define custom column headers
    const formattedData = projectList?.response?.map((item, index) => ({
      sl_no: index + 1,
      "Project Name": item.project_name,
      "Project Number": item.project_number,
      Client: item.client_name,
      Branch: item.branch_name,
      Company: item.company_name,
      "Vertical Head": item.vertical_head_name,
      "Branch Manager": item.business_manager_name,
      "Client Service": item.client_service_name,
      "Other Members": item.other_service_names,
      "Quotation No": item.quotation_no,
      "Project Amount pre GST": item.project_amount_pre_gst,
      "Project Amount with GST": item.project_amount_with_gst,
      "Branch Expense (Cash)": item.branch_expenses_cash,
      "Branch Expense (Bill / Check)": item.branch_expenses_check,
      "Start Date": item.project_start_date,
      "End Date": item.project_end_date,
      Status: item.status,
    }));

    // Convert JSON to Excel sheet
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Project List");

    // Save file
    XLSX.writeFile(wb, "project_list.xlsx");
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF("l", "mm", "a4"); // 'l' stands for landscape, 'mm' for millimeters, 'a4' is the page size
    doc.autoTable({
      head: [
        [
          "Project Number",
          "Project Name",
          "Client",
          "Branch",
          "Company",
          "Vertical Head",
          "Branch Manager",
          "Client Service",
          "Other Members",
          "Quotation No",
          "Start Date",
          "End Date",
          "Project Amount pre GST",
          "Project Amount with GST",
          "Branch Expense (Cash)",
          "Branch Expense (Bill / Check)",
          "Status",
        ],
      ],
      body: projectList?.response.map((project) => [
        project.project_number,
        project.project_name,
        project.client_name,
        project.branch_name,
        project.company_name,
        project.vertical_head_name,
        project.business_manager_name,
        project.client_service_name,
        project.other_service_names,
        project.quotation_no,
        project.project_start_date,
        project.project_end_date,
        project.project_amount_pre_gst,
        project.project_amount_with_gst,
        project.branch_expenses_cash,
        project.branch_expenses_check,
        project.status === "1" ? "Active" : "Inactive", // Status check
      ]),
    });
    doc.save("project_list.pdf");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="project" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
          <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                PROJECT LIST
              </h2>
              <div className="finance-year-filter">
                <form action="#" className="flex items-center gap-3">
                  <label htmlFor="financeYear" className="text-nowrap m-0">Select Financial Year</label>
                  <select
                    name="financeYear"
                    id="financeYear"
                    className="block"
                    onChange={(e) => {
                      setFincYear(e.target.value);
                    }}
                  >
                    {fincYearList?.response?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.financial_year}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
            <div className="card-body p-5 bg-white shadow overflow-hidden">
              {/* filtering Projects */}
              {isLoading ? (
                <TableSkeleton columns="5" />
              ) : (
                <div>
                  {/* Export Buttons */}
                  <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                    {/* Search Box */}
                    <input
                      type="text"
                      placeholder="Search by keyword..."
                      className="p-2 w-full border rounded-md shadow lg:w-[300px] "
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />



                    <div className="export-btns flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 hover:text-black shadow active:scale-95"
                              onClick={exportToExcel}
                            >
                              <BsFiletypeXlsx />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Export to XLSX</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 hover:text-black shadow active:scale-95"
                              onClick={exportToPDF}
                            >
                              <FaFilePdf />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Export to PDF</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>



                  {/* DataTable */}
                  <DataTable
                    value={filteredProjects}
                    stripedRows
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "20rem" }}
                    paginator
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  >

                    {
                      roleId === 8 ?
                        null :
                        <Column
                          header="Actions"
                          body={(rowData) => (
                            <>
                              <div className="flex justify-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <button
                                        className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"
                                        onClick={() => {
                                          singleProject(rowData.id);
                                          setAddOrEdit("view");
                                        }}
                                      >
                                        <FaEye />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View Project</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <CheckAccessEdit edit_access="Project">
                                  {
                                    // +rowData.client_po_amount_with_gst === 0 &&
                                    //   +rowData.requition_amount === 0 &&
                                    //   +rowData.total_project_invoice_amount_with_gst === 0 &&
                                    //   +status === 1 ?

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <button
                                            className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"
                                            onClick={() => {
                                              singleProject(rowData.id);
                                              setAddOrEdit("edit");
                                            }}
                                          >
                                            <MdEditSquare />
                                          </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Edit Project</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    // : null
                                  }

                                </CheckAccessEdit>
                              </div>
                            </>
                          )}
                        ></Column>
                    }
                    {/* <Column
                      header="S.No"
                      body={(rowData, { rowIndex }) => (
                        <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                          {rowIndex + 1}
                        </span>
                      )}
                      style={{ width: "1rem", textAlign: "center" }}
                    /> */}
                    {/* <Column field="project_number" sortable header="Project Number" style={{ textTransform: "capitalize" }}></Column> */}
                    <Column
                      field="project_number"
                      sortable
                      header="Project No"
                      style={{ whiteSpace: "nowrap" }}
                    ></Column>
                    <Column
                      field="project_name"
                      sortable
                      header="Project Name"
                      style={{ whiteSpace: "nowrap", width: "50px" }}

                    ></Column>
                    {
                      [1, 4].includes(roleId) ?
                        <Column
                          header="Total Invoice Amount (with GST)"
                          sortable
                          body={(rowData) =>
                            rowData.other_members_id
                              ?.split(",")
                              ?.map(Number)
                              ?.includes(userId) ? (
                              <span className="block text-center">-</span>
                            ) : (

                              <span className="block text-center">
                                {

                                  +rowData.total_project_invoice_amount_with_gst > +rowData.project_amount_with_gst ||
                                    +rowData.total_project_invoice_amount_with_gst < +rowData.project_amount_with_gst ?
                                    <span className="text-red-500 ">{rowData.total_project_invoice_amount_with_gst}<GoAlertFill className="text-red-500 animate-pulse inline text-lg ms-3 mb-2" /></span>
                                    : <span className="text-green-500 ">{rowData.total_project_invoice_amount_with_gst}</span>


                                }
                              </span>

                            )
                          }
                          style={{ textTransform: "capitalize" }}
                        /> : null

                    }

                    {
                      roleId === 8 ?
                        null
                        :
                        <Column
                          header="Project Amount (with GST)"
                          sortable
                          body={(rowData) =>
                            rowData.other_members_id
                              ?.split(",")
                              ?.map(Number)
                              ?.includes(userId) ? (
                              <span className="block text-center">-</span>
                            ) : (
                              <span className="block text-center">
                                {rowData.project_amount_with_gst}
                              </span>
                            )
                          }
                          style={{ textTransform: "capitalize" }}
                        />
                    }

                    {
                      roleId === 8 ? null :
                        <Column
                          header="Project Amount (pre GST)"
                          sortable
                          body={(rowData) =>
                            rowData.other_members_id
                              ?.split(",")
                              ?.map(Number)
                              ?.includes(userId) ? (
                              <span className="block text-center">-</span>
                            ) : (
                              <span className="block text-center">
                                {rowData.project_amount_pre_gst}
                              </span>
                            )
                          }
                          style={{ textTransform: "capitalize" }}
                        />
                    }


                    <Column
                      field="client_name"
                      sortable
                      header="Client"
                      style={{ textTransform: "capitalize" }}
                    ></Column>
                    <Column
                      field="branch_name"
                      sortable
                      header="Branch"
                      style={{ textTransform: "capitalize" }}
                    ></Column>
                    <Column
                      field="project_start_date"
                      sortable
                      header="Start Date"
                      style={{
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                      }}
                    ></Column>
                    <Column
                      field="project_end_date"
                      sortable
                      header="End Date"
                      style={{
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                      }}
                    ></Column>
                    {/* <Column
                      field="project_amount"
                      sortable
                      header="Project Amount"
                      style={{ textTransform: "capitalize" }}
                    ></Column> */}


                    {
                      [1, 4].includes(roleId) ?
                        <Column
                          header="Branch Expense (Cash)"
                          sortable
                          body={(rowData) =>
                            rowData.other_members_id
                              ?.split(",")
                              ?.map(Number)
                              ?.includes(userId) ? (
                              <span className="block text-center">-</span>
                            ) : (
                              <span className="block text-center">
                                {rowData.branch_expenses_cash}
                              </span>
                            )
                          }
                          style={{ textTransform: "capitalize" }}
                        /> : null
                    }


                    {
                      [1, 4].includes(roleId) ?

                        <Column
                          header="Branch Expense (Bill / Check)"
                          sortable
                          body={(rowData) =>
                            rowData.other_members_id
                              ?.split(",")
                              ?.map(Number)
                              ?.includes(userId) ? (
                              <span className="block text-center">-</span>
                            ) : (
                              <span className="block text-center">
                                {rowData.branch_expenses_check}
                              </span>
                            )
                          }
                          style={{ textTransform: "capitalize" }}
                        /> : null
                    }


                    {
                      [1, 4].includes(roleId) ? (
                        <Column
                          header="Total Branch Expense"
                          sortable
                          body={(rowData) =>
                            rowData.other_members_id?.split(",")?.map(Number)?.includes(userId) ? (
                              <span className="block text-center">-</span>
                            ) : (
                              <span className="block text-center">
                                {rowData.total_branch_expenses}
                              </span>
                            )
                          }
                          style={{ textTransform: "capitalize" }}
                        />
                      ) : null
                    }


                    <Column
                      header="Project Status"
                      body={(rowData) => (
                        <span
                          className={`bg-dark text-sm ${rowData.status === "1"
                            ? "bg-green-500"
                            : rowData.status === "2"
                              ? "bg-red-500"
                              : "bg-gray-500"
                            } px-3 py-1 rounded-xl text-white shadow`}
                        >
                          {rowData.status === "1"
                            ? "Running"
                            : rowData.status === "2"
                              ? "Closed"
                              : "Cancelled"}
                        </span>
                      )}
                    ></Column>
                    <Column
                      header="Billing Status"
                      body={(rowData) => (
                        <span
                          className={`bg-dark text-sm ${rowData.billing_status === "1"
                            ? "bg-green-500"
                            : "bg-red-500"
                            } px-3 py-1 rounded-xl text-white shadow`}
                        >
                          {rowData.billing_status === "1"
                            ? "Billed"
                            : "Unbilled"}
                        </span>
                      )}
                    ></Column>
                    <Column
                      header="Payment Status"
                      body={(rowData) => (
                        <span
                          className={`bg-dark text-sm ${rowData.payment_status === "1"
                            ? "bg-green-500"
                            : "bg-red-500"
                            } px-3 py-1 rounded-xl text-white shadow`}
                        >
                          {rowData.payment_status === "1" ? "Paid" : "Unpaid"}
                        </span>
                      )}
                    ></Column>


                  </DataTable>
                </div>
              )}

              {/* VIEW PROJECT POPUP */}
              <ViewProject
                project={singleProjectData}
                add_or_edit={addOrEdit}
              />
              {/* <EditProject project={singleProjectData} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
