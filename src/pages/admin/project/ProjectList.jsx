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
import { getProjectList } from "../../../services/api";  // Updated API function to fetch project list
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ViewProject from "./ViewProject";  // Assuming ViewProject component exists
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import EditProject from "./EditProject";  // Assuming EditProject component exists
import { useSelector } from "react-redux";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

// Import libraries for Excel and PDF export
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ProjectList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: projectList = [], isLoading } = useQuery({
        queryKey: ["project-list", refetchList],
        queryFn: async () => {
            return await getProjectList(token);
        }
    });

    useEffect(() => {
        if (projectList) {
            console.log(projectList);
        }
    }, [projectList]);

    const [singleProjectData, setSingleProjectData] = useState({});
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");  // State for search input

    const singleProject = (id) => {
        const allProjects = projectList?.response;
        const singleProject = allProjects.find(project => project.id === id);  // Use find to get a single match
        setSingleProjectData(singleProject);
        setModal(true);
    };

    const filteredProjects = projectList?.response?.filter(project => {
        const keyword = searchKeyword.toLowerCase();
        return (
            project.project_number.toLowerCase().includes(keyword) ||
            project.project_name.toLowerCase().includes(keyword) ||
            project.client_name.toLowerCase().includes(keyword) ||
            project.branch_name.toLowerCase().includes(keyword)
        );
    });

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(projectList?.response || []);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Project List");
        XLSX.writeFile(wb, "project_list.xlsx");
    };

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Project Number", "Project Name", "Client", "Branch", "Start Date", "End Date", "Project Amount", "Status"]],
            body: projectList?.response.map(project => [
                project.project_number,
                project.project_name,
                project.client_name,
                project.branch_name,
                project.project_start_date,
                project.project_end_date,
                project.project_amount,
                project.status === "1" ? "Active" : "Inactive",  // Status check
            ]),
        });
        doc.save("project_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="project" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">PROJECT LIST</h2>
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
                                        <DataTable value={filteredProjects} stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                            <Column field="project_number" sortable header="Project Number" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="project_name" sortable header="Project Name" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="client_name" sortable header="Client" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="branch_name" sortable header="Branch" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="project_start_date" sortable header="Start Date" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="project_end_date" sortable header="End Date" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="project_amount" sortable header="Project Amount" style={{ textTransform: "capitalize" }}></Column>

                                            <Column header="Status" body={(rowData) => (
                                                <span className={`bg-dark text-sm ${rowData.status === "1" ? "bg-green-500" : "bg-red-500"} px-3 py-1 rounded-xl text-white shadow`}>
                                                    {rowData.status === "1" ? "Active" : "Inactive"}
                                                </span>
                                            )}></Column>

                                            <Column header="Actions" body={(rowData) => (
                                                <>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    singleProject(rowData.id);
                                                                    setAddOrEdit("view");
                                                                }}><FaEye /></button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>View Project</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    singleProject(rowData.id);
                                                                    setAddOrEdit("edit");
                                                                }}><MdEditSquare /></button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Project</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </>
                                            )}></Column>
                                        </DataTable>
                                    </div>
                                )
                            }

                            {/* VIEW PROJECT POPUP */}
                            <ViewProject project={singleProjectData} add_or_edit={addOrEdit} />
                            {/* <EditProject project={singleProjectData} /> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
