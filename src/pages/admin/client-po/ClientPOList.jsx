import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
import { getClientPOList, getFYList } from "../../../services/api"; // Add API for fetching client POs
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { useSelector } from "react-redux";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ViewClientPO from "./ViewClientPO"; // Add ViewClientPO component
import EditClientPO from "./EditClientPO"; // Add EditClientPO component
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function ClientPOList() {
  const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);
  const [fincYear, setFincYear] = useState(null);

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  // Fetch client PO list data
  const { data: clientPOList = [], isLoading } = useQuery({
    queryKey: ["client-po-list", refetchList, modal, fincYear],
    queryFn: async () => {
      return await getClientPOList(token, fincYear); // Add the function for fetching client POs
    },
  });

  const [singleClientPOData, setSingleClientPOData] = useState({});
  const [addOrEdit, setAddOrEdit] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const openModal = (id) => {
    const allClientPOs = clientPOList?.response;
    const singleClientPO = allClientPOs.find((clientPO) => clientPO.id === id);
    setSingleClientPOData(singleClientPO);
    setModal(true);
  };

  const filteredClientPOs = clientPOList?.response?.filter((clientPO) => {
    const keyword = debouncedSearchKeyword.toLowerCase();
    return (
      clientPO.project_name?.toLowerCase().includes(keyword) ||
      clientPO.project_no?.toLowerCase().includes(keyword) ||
      clientPO.po_no?.toLowerCase().includes(keyword) ||
      clientPO.project_order_details?.toLowerCase().includes(keyword)
    );
  });

  // Export to Excel
  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(clientPOList?.response || []);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Client PO List");
  //   XLSX.writeFile(wb, "client_po_list.xlsx");
  // };

  const exportToExcel = () => {
    if (!clientPOList?.response || clientPOList.response.length === 0) {
      alert("No data available to export!");
      return;
    }
    // Define custom column headers
    const formattedData = clientPOList?.response?.map((item, index) => ({
      sl_no: index + 1,
      "Project Name": item.project_name,
      "Project Number": item.project_no,
      "PO Number": item.po_no,
      "PO amount pre GST": item.po_amount_pre_gst,
      "PO amount with GST": item.po_amount_with_gst,
      "PO date": new Date(item.po_date).toLocaleDateString(),
      "Payment Schedule days": item.payment_schedule_days,
      "Details": item.project_order_details,
    }));

    // Convert JSON to Excel sheet
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Client PO List");

    // Save file
    XLSX.writeFile(wb, "client_po_list.xlsx");
  };


  // Export to PDF
  const exportToPDF = () => {

    if (!clientPOList?.response || clientPOList.response.length === 0) {
      alert("No data available to export!");
      return;
    }

    const doc = new jsPDF("l", "mm", "a4");
    doc.autoTable({
      head: [
        ["Project Name", "Project Number", "PO Number", "PO amount pre GST", "PO amount with GST", "PO date", "Payment Schedule days", "Details"],
      ],
      body: clientPOList?.response.map((clientPO) => [
        clientPO.project_name,
        clientPO.project_no,
        clientPO.po_no || "N/A",
        clientPO.po_amount_pre_gst,
        clientPO.po_amount_with_gst,
        new Date(clientPO.po_date).toLocaleDateString(),
        clientPO.payment_schedule_days,
        clientPO.project_order_details,
      ]),
    });
    doc.save("client_po_list.pdf");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Client PO" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
          <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
            {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              CLIENT PO LIST
            </h2> */}
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
              CLIENT PO LIST
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
              {isLoading ? (
                <TableSkeleton columns="6" />
              ) : (
                <div>
                  {/* Export & Search Box */}
                  <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                    <input
                      type="text"
                      placeholder="Search by keyword..."
                      className="p-2 w-full border rounded-md shadow lg:w-[300px]"
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
                    value={filteredClientPOs}
                    showGridlines
                    stripedRows
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "20rem" }}
                    paginator
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  >
                    <Column
                      header="Actions"
                      body={(rowData) => (
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <button
                                  className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"
                                  onClick={() => {
                                    openModal(rowData.id);
                                    setAddOrEdit("view");
                                  }}
                                >
                                  <FaEye />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View PO</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <CheckAccessEdit edit_access="Client PO">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"
                                    onClick={() => {
                                      openModal(rowData.id);
                                      setAddOrEdit("edit");
                                    }}
                                  >
                                    <MdEditSquare />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit PO</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </CheckAccessEdit>
                        </>
                      )}
                    ></Column>
                    <Column
                      header="S.No"
                      body={(rowData, { rowIndex }) => (
                        <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                          {rowIndex + 1}
                        </span>
                      )}
                      style={{ width: "5rem", textAlign: "center" }}
                    />
                    <Column
                      field="project_name"
                      sortable
                      header="Project Name"
                    ></Column>
                    <Column
                      field="project_no"
                      sortable
                      header="Project No"
                    ></Column>
                    <Column field="client_po_no" sortable header="PO No"></Column>
                    {/* <Column field="po_amount_pre_gst" sortable header="PO Amount (pre GST)" body={(rowData) => `₹${rowData.po_amount_pre_gst}`}></Column> */}
                    <Column
                      header="PO Amount (pre GST)"
                      sortable
                      body={(rowData) =>
                        rowData.other_members_id
                          ?.split(",")
                          ?.map(Number)
                          ?.includes(userId) ? (
                          <span className="block text-center">-</span>
                        ) : (
                          <span className="block text-center">
                            {rowData.po_amount_pre_gst ? rowData.po_amount_pre_gst : "....."}
                          </span>
                        )
                      }
                      style={{ textTransform: "capitalize" }}
                    />
                    {/* <Column
                      field="po_amount_with_gst"
                      sortable
                      header="PO Amount (with GST)"
                      body={(rowData) => `₹${rowData.po_amount_with_gst}`}
                    ></Column> */}
                    <Column
                      header="PO Amount (with GST)"
                      sortable
                      body={(rowData) =>
                        rowData.other_members_id
                          ?.split(",")
                          ?.map(Number)
                          ?.includes(userId) ? (
                          <span className="block text-center">-</span>
                        ) : (
                          <span className="block text-center">
                            {rowData.po_amount_with_gst ? rowData.po_amount_with_gst : "....."}
                          </span>
                        )
                      }
                      style={{ textTransform: "capitalize" }}
                    />
                    <Column
                      field="po_date"
                      sortable
                      header="PO Date"
                      body={(rowData) =>
                        new Date(rowData.po_date).toLocaleDateString()
                      }
                    ></Column>
                    <Column
                      className="text-center"
                      field="created_by_name"
                      sortable
                      header="Created By"
                      body={(rowData) =>
                        rowData.created_by_name ? rowData.created_by_name : "....."
                      }
                    ></Column>
                    <Column
                      className="text-center"
                      field="updated_by_name"
                      sortable
                      header="Updated By"
                      body={(rowData) =>
                        rowData.updated_by_name ? rowData.updated_by_name : "....."
                      }
                    ></Column>
                    <Column
                      field="project_order_details"
                      sortable
                      header="Details"
                      body={(rowData) =>
                        rowData.project_order_details ? rowData.project_order_details : "....."
                      }
                    ></Column>
                    <Column
                      header="Client PO Status"
                      body={(rowData) => (
                        <span
                          className={`px-3 py-1 rounded-xl text-white shadow ${rowData.status === "1"
                            ? "bg-green-500"
                            : "bg-red-500"
                            }`}
                        >
                          {rowData.status === "1" ? "Active" : "Inactive"}
                        </span>
                      )}
                    ></Column>

                  </DataTable>
                </div>
              )}

              {/* View/Edit Client PO Popup */}
              <ViewClientPO
                clientPO={singleClientPOData}
                add_or_edit={addOrEdit}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
