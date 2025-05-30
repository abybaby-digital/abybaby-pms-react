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
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteInvoice, getFYList, getInvoiceList } from "../../../services/api"; // Add API for fetching invoices
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
import ViewInvoice from "./ViewInvoice"; // Add ViewInvoice component
import EditInvoice from "./EditInvoice"; // Add EditInvoice component
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function InvoiceList() {
  const { modal, setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.role_id);
  const [fincYear, setFincYear] = useState(null);

  // console.log(typeof(userId));
  

  const navigate = useNavigate();

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  // Fetch invoice list data
  const { data: invoiceList = [], isLoading } = useQuery({
    queryKey: ["invoice-list", refetchList, modal, fincYear],
    queryFn: async () => {
      return await getInvoiceList(token, fincYear); // Add the function for fetching invoices
    },
  });

  // console.log(invoicelist);

  const [singleInvoiceData, setSingleInvoiceData] = useState({});
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
    const allInvoices = invoiceList?.response;
    const singleInvoice = allInvoices.find((invoice) => invoice.id === id);
    setSingleInvoiceData(singleInvoice);
    setModal(true);
  };

  const filteredInvoices = invoiceList?.response?.filter((invoice) => {
    const keyword = debouncedSearchKeyword.toLowerCase();
    return (
      invoice.project_name?.toLowerCase()?.includes(keyword) ||
      invoice.project_no?.toLowerCase()?.includes(keyword) ||
      invoice.invoice_no?.toLowerCase()?.includes(keyword) ||
      invoice.invoice_details?.toLowerCase()?.includes(keyword)
    );
  });

  // Export to Excel
  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(invoiceList?.response || []);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Invoice List");
  //   XLSX.writeFile(wb, "invoice_list.xlsx");
  // };

  const exportToExcel = () => {
    if (!invoiceList?.response || invoiceList.response.length === 0) {
      alert("No data available to export!");
      return;
    }
    // Define custom column headers
    const formattedData = invoiceList?.response?.map((item, index) => ({
      sl_no: index + 1,
      "Project Name": item.project_name,
      "Project Number": item.project_no,
      "Invoice No": item.invoice_no,
      "Invoice amount pre gst": item.invoice_amount_pre_gst,
      "Invoice amount with gst": item.invoice_amount_with_gst,
      "Received Amount": item.received_amount,
      "Invoice date": new Date(item.invoice_date).toLocaleDateString(),
    }));

    // Convert JSON to Excel sheet
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Project List");

    // Save file
    XLSX.writeFile(wb, "invoice_list.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!invoiceList?.response || invoiceList.response.length === 0) {
      alert("No data available to export!");
      return;
    }
    const doc = new jsPDF("l", "mm", "a4");
    doc.autoTable({
      head: [
        [
          "Project Name",
          "Project No",
          "Invoice No",
          "Invoice Amount Pre GST",
          "Invoice Amount With GST",
          "Received Amount",
          "Invoice Date",
          "Details",
        ],
      ],
      body: invoiceList?.response.map((invoice) => [
        invoice.project_name,
        invoice.project_no,
        invoice.invoice_no,
        invoice.invoice_amount_pre_gst,
        invoice.invoice_amount_with_gst,
        invoice.received_amount,
        new Date(invoice.invoice_date).toLocaleDateString(),
        invoice.invoice_details,
      ]),
    });
    doc.save("invoice_list.pdf");
  };

  // DELETE INVOICE

  // Mutation for updating the invoice
  const deleteInvoiceMutation = useMutation({
    mutationFn: async (data) => {
      return await deleteInvoice(
        token,
        data, // Invoice ID
      );
    },
    onSuccess: (response) => {
      if (response.success === 1) {
        toast.success("Invoice details deleted successfully!");
        setRefetchList((prev) => !prev); // Triggers data refetch
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to update invoice: " + error.message);
    },
  });


  const deleteInvoiceById = (id) => {
    deleteInvoiceMutation.mutate(id);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="invoice" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
          <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                INVOICE LIST
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
                    value={filteredInvoices}
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

                          {
                            rowData.status === "0" ?
                              <span className="bg-red-500 text-white p-2 rounded-3xl">Deleted</span>
                              :
                              <div className="flex justify-center">
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
                                      <p>View Invoice</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <CheckAccessEdit edit_access="Invoice">
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
                                        <p>Edit Invoice</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </CheckAccessEdit>
                                {
                                  userId === 4 || userId === 1 ?
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <button
                                            className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"
                                            onClick={() => {
                                              if (window.confirm("Are you sure you want to delete this invoice?")) {
                                                deleteInvoiceById(rowData.id);
                                              }
                                            }}
                                          >
                                            <FaTrash />
                                          </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Delete Invoice</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider> : null
                                }
                              </div>
                          }
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
                      header="Project No."
                    ></Column>
                    <Column
                      field="invoice_no"
                      sortable
                      header="Invoice No"
                    ></Column>
                    {/* <Column field="invoice_amount_pre_gst" sortable header="Amount (pre GST)" body={(rowData) => `₹${rowData.invoice_amount_pre_gst}`}></Column> */}
                    <Column
                      field="invoice_amount_pre_gst"
                      sortable
                      header="Invoice Amount (pre GST)"
                    ></Column>
                    <Column
                      field="invoice_amount_with_gst"
                      sortable
                      header="Invoice Amount (with GST)"
                    ></Column>
                    <Column
                      field="invoice_date"
                      sortable
                      header="Invoice Date"
                      body={(rowData) =>
                        new Date(rowData.invoice_date).toLocaleDateString()
                      }
                    ></Column>
                    <Column
                      className="text-center"
                      field="created_by_name"
                      sortable
                      header="Created By"
                      body={(rowData) =>
                        rowData.created_by_name ? rowData.created_by_name : "..."
                      }
                    ></Column>
                    <Column
                      className="text-center"
                      field="updated_by_name"
                      sortable
                      header="Updated By"
                      body={(rowData) =>
                        rowData.updated_by_name ? rowData.updated_by_name : "..."
                      }
                    ></Column>
                    <Column
                      field="invoice_details"
                      sortable
                      header="Details"
                    ></Column>
                    {/* <Column
                      header="Invoice Status"
                      body={(rowData) => (
                        <span
                          className={`px-3 py-1 rounded-xl text-white shadow ${
                            rowData.status === "1"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {rowData.status === "1" ? "Active" : "Inactive"}
                        </span>
                      )}
                    ></Column> */}

                  </DataTable>
                </div>
              )}

              {deleteInvoiceMutation.isPending ? (
                <FormSubmitLoader loading_msg="Deleting Invoice..." />
              ) : null}

              {/* View/Edit Invoice Popup */}
              <ViewInvoice
                invoice={singleInvoiceData}
                add_or_edit={addOrEdit}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
