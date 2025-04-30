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
import { MdOutlineFileDownloadOff } from "react-icons/md";
import {
  getFYList,
  getPaymentReceivedList,
  getPaymentRequisitionList,
  getRequisitionDownloadStatus,
} from "../../../services/api";
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
import ViewPaymentRequisition from "./ViewPaymentRequisition";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import toast from "react-hot-toast";

export default function PaymentRequisitionList() {
  const { modal, setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);
  const token = useSelector((state) => state.auth.token);
  const role_id = useSelector((state) => state.auth.user?.role_id);
  console.log("role", role_id);
  const [fincYear, setFincYear] = useState(null);

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  const { data: paymentList = [], isLoading } = useQuery({
    queryKey: ["payment-requisition-list", refetchList, modal, fincYear],
    queryFn: async () => {
      return await getPaymentRequisitionList(token, fincYear);
    },
  });

  // State to store selected rows
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedPaymentIds, setSelectedPaymentIds] = useState([]); // State to store selected payment requisition IDs
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // const handleCheckboxChange = (e, rowData) => {
  //   if (e.target.checked) {
  //     setSelectedRows([...selectedRows, rowData]);
  //   } else {
  //     setSelectedRows(selectedRows.filter((item) => item.id !== rowData.id));
  //   }
  // };

  const changeDownloadStatus = async (pr_id) => {
    const response = await getRequisitionDownloadStatus(token, pr_id);
    console.log(response);

    if (response.status === 200 || response.status === 201) {
      toast.success("Data Exported Succesfully !!");
      setRefetchList(!refetchList);
    } else {
      // toast.error("Something went wrong");
    }
  };

  const handleCheckboxChange = (e, rowData) => {
    if (e.target.checked) {
      // Add the selected row data to the selectedRows state
      setSelectedRows((prevRows) => [...prevRows, rowData]);

      // Add the selected payment ID to the selectedPaymentIds state
      setSelectedPaymentIds((prevIds) => [...prevIds, rowData.id]);
    } else {
      // Remove the deselected row data from the selectedRows state
      setSelectedRows((prevRows) =>
        prevRows.filter((item) => item.id !== rowData.id)
      );

      // Remove the deselected payment ID from the selectedPaymentIds state
      setSelectedPaymentIds((prevIds) =>
        prevIds.filter((id) => id !== rowData.id)
      );
    }
  };

  useEffect(() => {
    console.log(
      "Selected Payment Requisition IDs:",
      selectedPaymentIds.join(",")
    );
  }, [selectedPaymentIds]); // Triggered whenever selectedPaymentIds changes

  const [singlePaymentData, setSinglePaymentData] = useState({});
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
    const allPayments = paymentList?.response;
    const singlePayment = allPayments.find((payment) => payment.id === id);
    setSinglePaymentData(singlePayment);
    setModal(true);
  };

  const filteredPayments = paymentList?.response?.filter((payment) => {
    const keyword = debouncedSearchKeyword.toLowerCase();
    const matchesKeyword =
      payment.project_name?.toLowerCase()?.includes(keyword) ||
      payment.received_no?.toLowerCase()?.includes(keyword) ||
      payment.received_details?.toLowerCase()?.includes(keyword);

    const matchesDate = selectedDate
      ? payment.date_of_payments.slice(0, 10) === selectedDate
      : true;
    console.log("selctedDate ", selectedDate);
    console.log("payment Date ", payment.date_of_payments.slice(0, 10));

    return matchesKeyword && matchesDate;
  });



  // Export to Excel
  //   const exportToExcel = () => {
  //     const ws = XLSX.utils.json_to_sheet(paymentList?.response || []);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, "Payment Received List");
  //     XLSX.writeFile(wb, "payment_received_list.xlsx");
  //   };

  // Export to PDF
  //   const exportToPDF = () => {
  //     const doc = new jsPDF("l", "mm", "a4");
  //     doc.autoTable({
  //       head: [
  //         [
  //           "Project Name",
  //           "Received No",
  //           "Amount",
  //           "Received Date",
  //           "Details",
  //           "Status",
  //         ],
  //       ],
  //       body: paymentList?.response.map((payment) => [
  //         payment.project_name,
  //         payment.received_no,
  //         `₹${payment.received_amount}`,
  //         new Date(payment.received_date).toLocaleDateString(),
  //         payment.received_details,
  //         payment.status === "1" ? "Active" : "Inactive",
  //       ]),
  //     });
  //     doc.save("payment_received_list.pdf");
  //   };

  // Export to Excel
  const exportToExcel = () => {
    if (selectedRows.length === 0) {
      alert("Please select some rows to export.");
      return;
    }

    // Prepare the data for export with the updated fields
    const formattedRows = selectedRows.map((payment) => ({
      "Project No.": payment.project_number,
      "Project Name": payment.project_name,
      "Vendor Name": payment.vendor_name,
      "Vendor Bank Name": payment.bank_name,
      "Vendor A/C No": payment.bank_account,
      "Vendor IFSC code": payment.ifsc_code,
      "Vendor No": payment.vendor_name,
      "Vendor PAN no": payment.pancard_no,
      "Vendor GST no": payment.gst_no,
      "Requisition Amount": payment.requisition_amount,
      "Approved Amount": payment.approved_amount,
      "Received Date": new Date(payment.date_of_payments).toLocaleDateString(),
      "Status": payment.accountent_approve_status === "1" ? "Paid" : "Unpaid",
    }));

    const ws = XLSX.utils.json_to_sheet(formattedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payment Requisition List");
    XLSX.writeFile(wb, "payment_requisition_list.xlsx");

    setRefetchList(!refetchList);
    // setSelectedPaymentIds([]);
    setSelectedRows([]);
  };

  // Export to PDF
  const exportToPDF = () => {
    if (selectedRows.length === 0) {
      alert("Please select some rows to export.");
      return;
    }

    const doc = new jsPDF("l", "mm", "a4");
    doc.autoTable({
      head: [
        [
          "Project No",
          "Project Name",
          "Vendor Name",
          "Vendor Bank Name",
          "Vendor A/C No",
          "Vendor IFSC Code",
          "Vendor PAN No",
          "Vendor GST No",
          "Requisition Amount",
          "Approved Amount",
          "Payment Date",
          "Status",
        ],
      ],
      body: selectedRows.map((payment) => [
        payment.project_number,
        payment.vendor_name,
        payment.bank_name,
        payment.bank_account,
        payment.ifsc_code,
        payment.pancard_no,
        payment.gst_no,
        payment.requisition_amount,
        payment.approved_amount,
        new Date(payment.date_of_payments).toLocaleDateString(),
        payment.status === "1" ? "Paid" : "Unpaid",
      ]),
    });

    doc.save("payment_requisition_list.pdf");
  };

  const handleSelectAllChange = (checked) => {
    setSelectAllChecked(checked);

    if (checked) {
      const eligibleRows = filteredPayments.filter(
        (row) =>
          row.admin_approve_status === "0" ||
          row.finance_approve_status === "0" ||
          row.purchase_approve_status === "0" ||
          row.accountent_approve_status === "0" ||
          row.download_status === "1"
      );

      const eligibleIds = eligibleRows.map((row) => row.id);

      setSelectedPaymentIds(eligibleIds);
      setSelectedRows(eligibleRows); // 🔥 Sync selectedRows here
    } else {
      setSelectedPaymentIds([]);
      setSelectedRows([]); // 🔥 Clear selectedRows here too
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Payment Requisition" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
          <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
            {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              PAYMENT REQUISITION LIST
            </h2> */}
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                PAYMENT REQUISITION LIST
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
                <TableSkeleton columns="5" />
              ) : (
                <div>
                  {/* Export & Search Box */}
                  <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                    <div className="flex items-end gap-2">
                      <input
                        type="text"
                        placeholder="Search by keyword..."
                        className="p-2 w-full border rounded-md shadow lg:w-[300px]"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                      <div>
                        <label htmlFor="#" className="text-nowrap block m-0 text-end text-[12px]">Filter By Date: </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="p-2 border rounded-md shadow"
                        />
                      </div>
                    </div>


                    <div className="export-btns flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 hover:text-black shadow active:scale-95"
                              onClick={() => {
                                exportToExcel();
                                // changeDownloadStatus(
                                //   selectedPaymentIds.join(",")
                                // );
                              }}
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
                              onClick={() => {
                                exportToPDF();
                                changeDownloadStatus(
                                  selectedPaymentIds.join(",")
                                );
                              }}
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
                    value={filteredPayments}
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
                                <p>View Payment</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <CheckAccessEdit edit_access="Payment Requition">
                            {/* <TooltipProvider>
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
                                  <p>Edit Payment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider> */}
                          </CheckAccessEdit>
                        </>
                      )}
                    ></Column>
                    {
                      role_id === 4 &&
                      <Column
                        header={
                          <div className="flex gap-2">
                            <span>Select All</span>
                            <input
                              className="accent-black"
                              type="checkbox"
                              checked={selectAllChecked}
                              onChange={(e) => handleSelectAllChange(e.target.checked)}
                            />
                          </div>
                        }
                        body={(rowData) =>
                          (rowData.admin_approve_status === "0" ||
                            rowData.finance_approve_status === "0" ||
                            rowData.purchase_approve_status === "0" ||
                            rowData.accountent_approve_status === "0" ||
                            rowData.download_status === "1") ? (
                            <input
                              className="accent-black"
                              type="checkbox"
                              checked={selectedPaymentIds.includes(rowData.id)}
                              onChange={(e) => handleCheckboxChange(e, rowData)}
                            />
                          ) : null
                        }
                        style={{ width: "3rem", textAlign: "center" }}
                      />

                    }
                    {/* <Column
                      header="S.No"
                      body={(rowData, { rowIndex }) => (
                        <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                          {rowIndex + 1}
                        </span>
                      )}
                      style={{ width: "5rem", textAlign: "center" }}
                    /> */}
                    <Column
                      field="project_number"
                      sortable
                      header="Project Number"
                    ></Column>
                    <Column
                      field="project_name"
                      sortable
                      header="Project Name"
                    ></Column>
                    <Column
                      field="vendor_name"
                      sortable
                      header="Vendor Name"
                    ></Column>
                    <Column
                      field="date_of_payments"
                      sortable
                      header="Payment Date"
                      body={(rowData) =>
                        new Date(rowData.date_of_payments).toLocaleDateString()
                      }
                    ></Column>
                    <Column
                      field="requisition_amount"
                      sortable
                      header="Requisition Amount"
                      body={(rowData) => `₹${rowData.requisition_amount}`}
                    ></Column>
                    <Column
                      field="requisition_amount"
                      sortable
                      header="Approved Amount"
                      body={(rowData) =>
                        `₹${rowData.approved_amount === null
                          ? 0
                          : rowData.approved_amount
                        }`
                      }
                    ></Column>

                    <Column
                      field="requisition_remarks"
                      sortable
                      header="Remarks"
                    ></Column>
                    <Column
                      field="created_by_name"
                      sortable
                      header="Created By"
                    ></Column>
                    {/* <Column header="Payment Status" body={(rowData) => (
                                            <span className={`px-3 py-1 rounded-xl text-white shadow ${rowData.status === "1" ? "bg-green-500" : "bg-red-500"}`}>
                                                {rowData.status === "1" ? "Paid" : "Pending"}
                                            </span>
                                        )}></Column> */}
                    <Column
                      header="Admin Approval"
                      body={(rowData) => (
                        <span
                          className={`px-3 py-1 rounded-xl text-white shadow ${rowData.admin_approve_status === "1"
                            ? "bg-green-500"
                            : rowData.admin_approve_status === "0"
                              ? "bg-orange-400"
                              : "bg-red-500"
                            }`}
                        >
                          {rowData.admin_approve_status === "0"
                            ? "Pending"
                            : rowData.admin_approve_status === "1"
                              ? "Approved"
                              : "Rejected"}
                        </span>
                      )}
                    ></Column>
                    <Column
                      header="Finance Approval"
                      body={(rowData) => (
                        <span
                          className={`px-3 py-1 rounded-xl text-white shadow ${rowData.finance_approve_status === "1"
                            ? "bg-green-500"
                            : rowData.finance_approve_status === "0"
                              ? "bg-orange-400"
                              : "bg-red-500"
                            }`}
                        >
                          {rowData.finance_approve_status === "0"
                            ? "Pending"
                            : rowData.finance_approve_status === "1"
                              ? "Approved"
                              : "Rejected"}
                        </span>
                      )}
                    ></Column>
                    <Column
                      header="Purchase Approval"
                      body={(rowData) => (
                        <span
                          className={`px-3 py-1 rounded-xl text-white shadow ${rowData.purchase_approve_status === "1"
                            ? "bg-green-500"
                            : rowData.purchase_approve_status === "0"
                              ? "bg-orange-400"
                              : "bg-red-500"
                            }`}
                        >
                          {rowData.purchase_approve_status === "0"
                            ? "Pending"
                            : rowData.purchase_approve_status === "1"
                              ? "Approved"
                              : "Rejected"}
                        </span>
                      )}
                    ></Column>
                    <Column
                      header="Accountant Approval"
                      body={(rowData) => (
                        <span
                          className={`px-3 py-1 rounded-xl text-white shadow ${rowData.accountent_approve_status === "1"
                            ? "bg-green-500"
                            : rowData.accountent_approve_status === "0"
                              ? "bg-black"
                              : "bg-red-500"
                            }`}
                        >
                          {rowData.accountent_approve_status === "1"
                            ? "Paid"
                            : rowData.accountent_approve_status === "0"
                              ? "Unpaid"
                              : "Rejected"}
                        </span>
                      )}
                    ></Column>
                    {/* <Column
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
                                <p>View Payment</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <CheckAccessEdit edit_access="Payment Requition">
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
                                  <p>Edit Payment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </CheckAccessEdit>
                        </>
                      )}
                    ></Column> */}
                  </DataTable>
                </div>
              )}

              {/* View/Edit Payment Received Popup */}
              <ViewPaymentRequisition
                payment={singlePaymentData}
                add_or_edit={addOrEdit}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
