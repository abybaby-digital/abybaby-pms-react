import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AdminHead from "../../../components/common/AdminHead";
import { useQuery } from "@tanstack/react-query";
import { getPaymentReceivedList } from "../../../services/api";
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
import ViewPaymentReceived from "./ViewPaymentReceived";
import EditPaymentReceived from "./EditPaymentReceived"; // Import EditPaymentReceived component
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function PaymentReceivedList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: paymentList = [], isLoading } = useQuery({
        queryKey: ["payment-received-list", refetchList],
        queryFn: async () => {
            return await getPaymentReceivedList(token);
        }
    });

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
        const singlePayment = allPayments.find(payment => payment.id === id);
        setSinglePaymentData(singlePayment);
        setModal(true);
    };

    const filteredPayments = paymentList?.response?.filter(payment => {
        const keyword = debouncedSearchKeyword.toLowerCase();
        return (
            payment.project_name?.toLowerCase()?.includes(keyword) ||
            payment.received_no?.toLowerCase()?.includes(keyword) ||
            payment.received_details?.toLowerCase()?.includes(keyword)
        );
    });

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(paymentList?.response || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Payment Received List");
        XLSX.writeFile(wb, "payment_received_list.xlsx");
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.autoTable({
            head: [["Project Name", "Received No", "Amount", "Received Date", "Details", "Status"]],
            body: paymentList?.response.map(payment => [
                payment.project_name,
                payment.received_no,
                `₹${payment.received_amount}`,
                new Date(payment.received_date).toLocaleDateString(),
                payment.received_details,
                payment.status === "1" ? "Active" : "Inactive",
            ]),
        });
        doc.save("payment_received_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="Payment Received" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">PAYMENT RECEIVED LIST</h2>
                        <div className="card-body p-5 bg-white shadow overflow-hidden">
                            {isLoading ? (
                                <TableSkeleton columns="5" />
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
                                    <DataTable value={filteredPayments} showGridlines stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                        <Column
                                            header="S.No"
                                            body={(rowData, { rowIndex }) => (
                                                <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                                                    {rowIndex + 1}
                                                </span>
                                            )}
                                            style={{ width: '5rem', textAlign: 'center' }}
                                        />
                                        <Column field="project_name" sortable header="Project Name"></Column>
                                        <Column field="received_no" sortable header="Received No"></Column>
                                        <Column field="received_amount" sortable header="Amount" body={(rowData) => `₹${rowData.received_amount}`}></Column>
                                        <Column field="received_date" sortable header="Received Date" body={(rowData) => new Date(rowData.received_date).toLocaleDateString()}></Column>
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
                                        <Column field="received_details" sortable header="Details"></Column>
                                        <Column header="Status" body={(rowData) => (
                                            <span className={`px-3 py-1 rounded-xl text-white shadow ${rowData.status === "1" ? "bg-green-500" : "bg-red-500"}`}>
                                                {rowData.status === "1" ? "Active" : "Inactive"}
                                            </span>
                                        )}></Column>
                                        <Column header="Actions" body={(rowData) => (
                                            <>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                openModal(rowData.id);
                                                                setAddOrEdit("view");
                                                            }}>
                                                                <FaEye />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>View Payment</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <CheckAccessEdit edit_access="Payment Received">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    openModal(rowData.id);
                                                                    setAddOrEdit("edit");
                                                                }}>
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
                                        )}></Column>
                                    </DataTable>
                                </div>
                            )}

                            {/* View/Edit Payment Received Popup */}
                            <ViewPaymentReceived payment={singlePaymentData} add_or_edit={addOrEdit} />

                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
