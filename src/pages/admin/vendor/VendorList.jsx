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
import { getVendorList } from "../../../services/api";
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
import ViewVendor from "./ViewVendor";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function VendorList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: vendorList = [], isLoading } = useQuery({
        queryKey: ["vendor-list", refetchList],
        queryFn: async () => {
            return await getVendorList(token);
        }
    });

    useEffect(() => {
        if (vendorList) {
            console.log(vendorList);
        }
    }, [vendorList]);

    const [singleVendorData, setSingleVendorData] = useState({});
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

    const singleVendor = (id) => {
        const allVendors = vendorList?.response;
        const singleVendor = allVendors.find(vendor => vendor.id === id);
        setSingleVendorData(singleVendor);
        setModal(true);
    };

    const filteredVendors = vendorList?.response?.filter(vendor => {
        const keyword = debouncedSearchKeyword.toLowerCase();
        return (
            vendor.vendor_code.toLowerCase().includes(keyword) ||
            vendor.vendor_name.toLowerCase().includes(keyword) ||
            vendor.vendor_address.toLowerCase().includes(keyword)
        );
    });

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(vendorList?.response || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Vendor List");
        XLSX.writeFile(wb, "vendor_list.xlsx");
    };

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.autoTable({
            head: [["Vendor Code", "Vendor Name", "Vendor Service", "Vendor Address", "State", "Branch Name", "GST No", "Bank Name", "Bank A/C No", "Bank IFSC", "Status"]],
            body: vendorList?.response.map(vendor => [
                vendor.vendor_code,
                vendor.vendor_name,
                vendor.vendor_category_name,
                vendor.vendor_address,
                vendor.state_name,
                vendor.branch_name,
                vendor.gst_no,
                vendor.branch_name,
                vendor.bank_name,
                vendor.bank_account,
                vendor.ifsc_code,
                "Active", // Assuming Status is always Active, you can modify this as needed
            ]),
        });
        doc.save("vendor_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="vendor" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">VENDOR LIST</h2>
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
                                        <DataTable value={filteredVendors} stripedRows rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
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
                                            <Column field="vendor_code" sortable header="Vendor Code" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="vendor_name" sortable header="Vendor Name" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="vendor_category_name" sortable header="Vendor Service" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="vendor_mobile" sortable header="Mobile" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="vendor_address" sortable header="Address" style={{ textTransform: "capitalize", width: "20%" }}></Column>

                                            <Column header="Status" body={() => (
                                                <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span>
                                            )}></Column>

                                            <Column header="Actions" body={(rowData) => (
                                                <>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    singleVendor(rowData.id);
                                                                    setAddOrEdit("view");
                                                                }}><FaEye /></button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>View Vendor</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <CheckAccessEdit edit_access="Vendor">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                        singleVendor(rowData.id); setAddOrEdit("edit");
                                                                    }}><MdEditSquare /></button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Edit Vendor</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </CheckAccessEdit>
                                                </>
                                            )}></Column>
                                        </DataTable>
                                    </div>
                                )
                            }

                            {/* VIEW VENDOR POPUP */}
                            <ViewVendor vendor={singleVendorData} add_or_edit={addOrEdit} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
