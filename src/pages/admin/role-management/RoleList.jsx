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
import { getRoleList } from "../../../services/api";  // Assuming you have a service for getting roles
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
import ViewRole from "./ViewRole";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function RoleList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    console.log(token);

    const { data: roleList = [], isLoading } = useQuery({
        queryKey: ["role-list", refetchList],
        queryFn: async () => {
            return await getRoleList(token);
        }
    });

    useEffect(() => {
        if (roleList) {
            console.log(roleList);
        }
    }, [roleList]);

    const [singleRoleData, setSingleRoleData] = useState({});
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(""); // State for search input

    const singleRole = (id) => {
        const allRoles = roleList?.response;
        const singleRole = allRoles.find(role => role.id === id);  // Use find to get a single match
        setSingleRoleData(singleRole);
        setModal(true);
    };

    const filteredRoles = roleList?.response?.filter(role => {
        const keyword = searchKeyword.toLowerCase();
        return (
            role.role_name.toLowerCase().includes(keyword) ||
            role.access_type_add.toLowerCase().includes(keyword) ||
            role.access_type_edit.toLowerCase().includes(keyword)
        );
    });

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(roleList?.response || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Role List");
        XLSX.writeFile(wb, "role_list.xlsx");
    };

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Role Name", "Access Type Add", "Access Type Edit", "Status"]],
            body: roleList?.response.map(role => [
                role.role_name,
                role.access_type_add.split(',').slice(0, 3).join(", ") + (role.access_type_add.split(',').length > 3 ? "..." : ""),
                role.access_type_edit.split(',').slice(0, 3).join(", ") + (role.access_type_edit.split(',').length > 3 ? "..." : ""),
                role.status === "1" ? "Active" : "Inactive",
            ]),
        });
        doc.save("role_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="role" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">ROLE LIST</h2>
                        <div className="card-body p-5 bg-white shadow overflow-hidden">
                            {
                                isLoading ? (
                                    <TableSkeleton columns="5" />
                                ) : (
                                    <div>
                                        {/* Export Buttons */}
                                        {/* <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                                            

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
                                        </div> */}

                                        {/* DataTable */}
                                        <DataTable value={filteredRoles} stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                            <Column field="role_name" sortable header="Role Name" style={{ textTransform: "capitalize" }}></Column>
                                            <Column header="Access Type Add" body={(rowData) => {
                                                return rowData.add_access_name.split(',').slice(0, 3).join(", ") + (rowData.access_type_add.split(',').length > 3 ? "..." : "");
                                            }}></Column>
                                            <Column header="Access Type Edit" body={(rowData) => {
                                                return rowData.edit_access_name.split(',').slice(0, 3).join(", ") + (rowData.access_type_edit.split(',').length > 3 ? "..." : "");
                                            }}></Column>
                                            <Column header="Status" body={(rowData) => (
                                                <span className={`px-3 py-1 rounded-xl ${rowData.status === "1" ? "bg-green-500" : "bg-red-500"} text-white shadow`}>
                                                    {rowData.status === "1" ? "Active" : "Inactive"}
                                                </span>
                                            )}></Column>

                                            <Column header="Actions" body={(rowData) => (
                                                <>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger> <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                singleRole(rowData.id);
                                                                setAddOrEdit("view");
                                                            }}><FaEye /></button></TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>View Role</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <CheckAccessEdit edit_access="Role Management">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger> <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    singleRole(rowData.id); setAddOrEdit("edit");
                                                                }}><MdEditSquare /></button></TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Edit Role</p>
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

                            {/* VIEW ROLE POPUP */}
                            <ViewRole role={singleRoleData} add_or_edit={addOrEdit} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
