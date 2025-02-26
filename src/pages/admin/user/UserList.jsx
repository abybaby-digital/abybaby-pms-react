import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AdminHead from "../../../components/common/AdminHead";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../../services/api";  // Updated to fetch user list
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
import ViewUser from "./ViewUser";  // Updated from ViewRole to ViewUser
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import { CiImageOff } from "react-icons/ci";

export default function UserList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: userList = [], isLoading } = useQuery({
        queryKey: ["user-list", refetchList],
        queryFn: async () => {
            return await getUserList(token);
        }
    });

    const [singleUserData, setSingleUserData] = useState({});
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    const singleUser = (id) => {
        const user = userList?.response?.find(user => user.id === id);
        setSingleUserData(user);
        setModal(true);
    };

    const filteredUsers = userList?.response?.filter(user => {
        const keyword = searchKeyword.toLowerCase();
        return (
            user.name?.toLowerCase().includes(keyword) ||
            user.email?.toLowerCase().includes(keyword) ||
            user.role_name?.toLowerCase().includes(keyword)
        );
    });


    const exportToExcel = () => {
        // Map the user data to include only the required fields
        const filteredData = userList?.response?.map((user, index) => ({
            sl_no: index + 1,
            name: user.name,
            email: user.email,
            contact_number: user.contact_number,
            company_name: user.company_name,
            branch_name: user.branch_name,
            role_name: user.role_name,
            // vertical_head_name: user.vertical_head_name,
            // business_manager_name: user.business_manager_name,
            // client_service_name: user.client_service_name,
            // other_service_name: user.other_service_name
        })) || [];

        // Create a worksheet from the filtered data
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "User List");

        // Write the file
        XLSX.writeFile(wb, "user_list.xlsx");
    };


    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Name", "Email", "Role", "Company", "Status"]],
            body: userList?.response.map(user => [
                user.name,
                user.email,
                user.role_name,
                user.company_name,
                user.status === "1" ? "Active" : "Inactive",
            ]),
        });
        doc.save("user_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="user" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">USER LIST</h2>
                        <div className="card-body p-5 bg-white shadow overflow-hidden">
                            {
                                isLoading ? (
                                    <TableSkeleton columns="5" />
                                ) : (
                                    <div>
                                        {/* Search and Export Buttons */}
                                        <div className="flex justify-between space-x-2 items-center mb-4 bg-whitesmoke p-2 rounded-xl shadow">
                                            <input
                                                type="text"
                                                placeholder="Search by name, email, or role..."
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
                                            value={filteredUsers}
                                            stripedRows
                                            rows={5}
                                            rowsPerPageOptions={[5, 10, 25, 50]}
                                            paginator
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                        >
                                            <Column
                                                header="S.No"
                                                body={(rowData, { rowIndex }) => (
                                                    <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                                                        {rowIndex + 1}
                                                    </span>
                                                )}
                                                style={{ width: '5rem', textAlign: 'center' }}
                                            />
                                            <Column field="name" sortable header="Name" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="email" sortable header="Email"></Column>
                                            <Column field="role_name" sortable header="Role"></Column>

                                            {/* Profile Image Column */}
                                            <Column
                                                header="Profile"
                                                body={(rowData) => (

                                                    rowData.profile_img !== "https://test.abybabyoffice.com/storage/user/profile/" ?
                                                        <img
                                                            src={rowData.profile_img}
                                                            alt="User Profile"
                                                            className="w-10 h-10 rounded-full border shadow"
                                                        />
                                                        :
                                                        <div className="text-center flex flex-col items-center">
                                                            <CiImageOff className="text-2xl me-1" /> No Image
                                                        </div>
                                                )}
                                            />

                                            <Column header="Company" field="company_name"></Column>

                                            <Column
                                                header="Status"
                                                body={(rowData) => (
                                                    <span className={`px-3 py-1 rounded-xl ${rowData.status === "1" ? "bg-green-500" : "bg-red-500"} text-white shadow`}>
                                                        {rowData.status === "1" ? "Active" : "Inactive"}
                                                    </span>
                                                )}
                                            />

                                            {/* Actions Column */}
                                            <Column
                                                header="Actions"
                                                body={(rowData) => (
                                                    <>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                        singleUser(rowData.id);
                                                                        setAddOrEdit("view");
                                                                    }}>
                                                                        <FaEye />
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>View User</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>

                                                        <CheckAccessEdit edit_access="Users">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                            singleUser(rowData.id);
                                                                            setAddOrEdit("edit");
                                                                        }}>
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
                                            />
                                        </DataTable>
                                    </div>
                                )
                            }

                            {/* View User Popup */}
                            <ViewUser user={singleUserData} add_or_edit={addOrEdit} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
