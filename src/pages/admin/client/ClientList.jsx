import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AdminHead from "../../../components/common/AdminHead";
import { useQuery } from "@tanstack/react-query";
import { getClientList } from "../../../services/api"; // Updated to getClientList API
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { useSelector } from "react-redux";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

// Import libraries for Excel and PDF export
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ViewClient from "./ViewClient";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function ClientList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: clientList = [], isLoading } = useQuery({
        queryKey: ["client-list", refetchList],
        queryFn: async () => {
            return await getClientList(token); // Fetch the list using the client list API
        }
    });

    useEffect(() => {
        if (clientList) {
            console.log(clientList);
        }
    }, [clientList]);

    const [singleClientData, setSingleClientData] = useState({});
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(""); // State for search input
    const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState(""); // State for debounced search input

    // Debounce logic using setTimeout
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchKeyword(searchKeyword); // Update the debounced keyword after 500ms
        }, 500); // Set the delay time in milliseconds (500ms in this case)

        // Cleanup function to clear previous timer if the user types again
        return () => clearTimeout(timer);
    }, [searchKeyword]);

    const singleClient = (id) => {
        const allClients = clientList?.response;
        const singleClient = allClients.find(client => client.id === id);
        setSingleClientData(singleClient);
        setModal(true);
    };

    const filteredClients = clientList?.response?.filter(client => {
        const keyword = debouncedSearchKeyword.toLowerCase();
        return (
            client.company_name?.toLowerCase().includes(keyword) ||
            client.contact_person?.toLowerCase().includes(keyword) ||
            client.client_gst?.toLowerCase().includes(keyword) ||
            client.client_email?.toLowerCase().includes(keyword)
        );
    });

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(clientList?.response || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Client List");
        XLSX.writeFile(wb, "client_list.xlsx");
    };

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.autoTable({
            head: [["Company Name", "Contact Person", "Client GST", "Contact Email", "Address", "Status"]],
            body: clientList?.response.map(client => [
                client.company_name,
                client.contact_person,
                client.client_gst,
                client.client_email,
                client.office_address,
                client.status ? "Active" : "Closed", // Assuming status is boolean
            ]),
        });
        doc.save("client_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="client" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">CLIENT LIST</h2>
                        <div className="card-body p-5 bg-white shadow overflow-hidden">
                            {
                                isLoading ? (
                                    <TableSkeleton columns="5" />
                                ) : (
                                    <div>
                                        {/* Export Buttons */}
                                        <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                                            {/* Search Box */}
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
                                        <DataTable value={filteredClients} stripedRows rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                                <Column header="Actions" body={(rowData) => (
                                                <>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    singleClient(rowData.id);
                                                                    setAddOrEdit("view");
                                                                }}><FaEye /></button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>View Client</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <CheckAccessEdit edit_access="Client">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                        singleClient(rowData.id); setAddOrEdit("edit");
                                                                    }}><MdEditSquare /></button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Edit Client</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </CheckAccessEdit>
                                                </>
                                            )}></Column>
                                                
                                                <Column
                                                header="S.No"
                                                body={(rowData, { rowIndex }) => (
                                                    <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                                                        {rowIndex + 1}
                                                    </span>
                                                )}
                                                style={{ width: '5rem', textAlign: 'center' }}
                                            />
                                            <Column field="company_name" sortable header="Company Name" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="contact_person" sortable header="Contact Person" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="client_gst" sortable header="Client GST" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="client_email" sortable header="Contact Email" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="office_address" sortable header="Address" style={{ textTransform: "capitalize", width: "20%" }}></Column>

                                            <Column header="Client Status" body={(rowData) => (
                                                rowData.status === "1" ? (
                                                    <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span>
                                                ) : (
                                                    <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">Closed</span>
                                                )
                                            )}></Column>

                                            
                                        </DataTable>
                                    </div>
                                )
                            }

                            {/* VIEW CLIENT POPUP */}
                            <ViewClient client={singleClientData} add_or_edit={addOrEdit} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
