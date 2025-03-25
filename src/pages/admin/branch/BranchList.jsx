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
import { getBranchList } from "../../../services/api";
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ViewBranch from "./ViewBranch";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import EditBranch from "./EditBranch";
import { useSelector } from "react-redux";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

// Import libraries for Excel and PDF export
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function BranchList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    console.log(token);

    const { data: branchlist = [], isLoading } = useQuery({
        queryKey: ["branch-list", refetchList],
        queryFn: async () => {
            return await getBranchList(token);
        }
    });

    useEffect(() => {
        if (branchlist) {
            console.log(branchlist);
        }
    }, [branchlist]);

    const [singleBranchData, setsingleBranchData] = useState({});
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(""); // State for search input

    const singleBranch = (id) => {
        const allbranches = branchlist?.response;
        const singleBranch = allbranches.find(branch => branch.id === id);  // Use find to get a single match
        setsingleBranchData(singleBranch);
        setModal(true);
    };

    const filteredBranches = branchlist?.response?.filter(branch => {
        const keyword = searchKeyword.toLowerCase();
        return (
            branch.branch_code?.toLowerCase()?.includes(keyword) ||
            branch.branch_name?.toLowerCase()?.includes(keyword) ||
            branch.branch_address?.toLowerCase()?.includes(keyword)
        );
    });

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(branchlist?.response || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Branch List");
        XLSX.writeFile(wb, "branch_list.xlsx");
    };

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Branch Code", "Branch Name", "Branch Address", "Status"]],
            body: branchlist?.response.map(branch => [
                branch.branch_code,
                branch.branch_name,
                branch.branch_address,
                "Active", // Assuming Status is always Active, you can modify this as needed
            ]),
        });
        doc.save("branch_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="branch" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">BRANCH LIST</h2>
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

                                            {/* <div className="export-btns flex gap-2">
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
                                            </div> */}


                                        </div>

                                        {/* DataTable */}
                                        <DataTable value={filteredBranches} stripedRows rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
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
                                            <Column field="branch_code" sortable header="branch code" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="branch_name" sortable header="branch name" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="branch_address" sortable header="branch address" style={{ textTransform: "capitalize", width: "35%" }}></Column>
                                            <Column header="Branch Status" body={(rowData) => (
                                                rowData.status === "1" ? (
                                                    <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span>
                                                ) : (
                                                    <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">Not Active</span>
                                                )
                                            )}></Column>

                                            <Column header="Actions" body={(rowData) => (
                                                <>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger> <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                singleBranch(rowData.id);
                                                                setAddOrEdit("view");
                                                            }}><FaEye /></button></TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>View Branch</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    <CheckAccessEdit edit_access="Branch">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger> <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    singleBranch(rowData.id); setAddOrEdit("edit");
                                                                }}><MdEditSquare /></button></TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Edit Branch</p>
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

                            {/* VIEW BRANCH POPUP */}
                            <ViewBranch branch={singleBranchData} add_or_edit={addOrEdit} />
                            {/* <EditBranch branch={singleBranchData} /> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
