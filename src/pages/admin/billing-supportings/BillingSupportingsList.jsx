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
import { getBillingSupportList, getClientPOList, getFYList } from "../../../services/api"; // Add API for fetching client POs
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { useSelector } from "react-redux";
import ViewBillingSupportings from "./ViewBillingSupportings";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import { MdEditSquare } from "react-icons/md";
// import ViewClientPO from "./ViewClientPO";

export default function BillingSupportingList() {
  const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);
  console.log(userId);

  const [fincYear, setFincYear] = useState(null);

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });


  // Fetch billing supporting data (replacing PO data)
  const { data: billingSupportingList = [], isLoading } = useQuery({
    queryKey: ["billing-supporting-list", refetchList, fincYear],
    queryFn: async () => {
      return await getBillingSupportList(token, fincYear); // Use the API for fetching the list (replace with your actual data API)
    },
  });

  const [addOrEdit, setAddOrEdit] = useState(null);
  const [singleBillingSupportingData, setSingleBillingSupportingData] =
    useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const openModal = (id) => {
    const allBillingSupportings = billingSupportingList?.response;
    const singleBillingSupporting = allBillingSupportings?.find(
      (billingSupporting) => billingSupporting.id === id
    );
    setSingleBillingSupportingData(singleBillingSupporting);
    setModal(true);
  };

  const filteredBillingSupportings = billingSupportingList?.response?.filter(
    (billingSupporting) => {
      const keyword = debouncedSearchKeyword?.toLowerCase();
      const projectName = billingSupporting.project_name?.toLowerCase() || ""; // Default to empty string if null/undefined
      return projectName.includes(keyword);
    }
  );



  function formatDate(createdAt) {
    // Split the createdAt string into date and time parts
    const [date, time] = createdAt.split(' ');

    // Split the time into hours, minutes, and seconds
    let [hours, minutes, seconds] = time.split(':').map(Number);

    // Determine AM or PM based on hours
    let ampm = 'AM';

    if (hours === 0) {
      hours = 12; // Treat 00:XX:XX as 12:XX:XX PM (Noon)
      ampm = 'PM';
    } else if (hours >= 12) {
      ampm = 'PM'; // Any hour >= 12 is PM
      if (hours > 12) hours -= 12; // Convert to 12-hour format for PM
    } else {
      ampm = 'AM'; // Any hour < 12 is AM
    }

    // Format the time to ensure two digits for minutes and seconds
    const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;

    // Return the formatted date with time and AM/PM
    return `${date} at ${formattedTime}`;
  }





  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Billing Supporting List" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
          <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
            {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              BILLING SUPPORTING LIST
            </h2> */}
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                BILLING SUPPORTING LIST
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
                <TableSkeleton columns="2" />
              ) : (
                <div>
                  {/* Search Box */}
                  <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                    <input
                      type="text"
                      placeholder="Search by project name..."
                      className="p-2 w-full border rounded-md shadow lg:w-[300px]"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>

                  {/* DataTable */}
                  <DataTable
                    value={filteredBillingSupportings}
                    showGridlines
                    stripedRows
                    rows={5}
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
                                <p>View Details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <CheckAccessEdit edit_access="Billing Supportings">
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
                                  <p>Edit User</p>
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
                      style={{ width: "1rem", textAlign: "center" }}
                    />
                    <Column
                      field="project_name"
                      sortable
                      header="Project Name"
                    ></Column>
                    <Column
                      header="Created By"
                      body={(rowData) =>
                        rowData.created_by_name
                          ? `${rowData.created_by_name
                          } (${formatDate(rowData.created_at)})`
                          : "..."
                      }
                    ></Column>
                    <Column
                      header="Updated By"
                      body={(rowData) =>
                        rowData.updated_by_name
                          ? `${rowData.updated_by_name
                          } (${formatDate(rowData.created_at)})`
                          : "..."
                      }
                    ></Column>

                  </DataTable>
                </div>
              )}

              {/* View Billing Supporting Popup */}
              <ViewBillingSupportings
                billingSupportings={singleBillingSupportingData}
                add_or_edit={addOrEdit}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
