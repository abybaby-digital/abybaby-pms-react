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
import { getBranchList, getClientList, getCompanyList, getFYList, getProjectList } from "../../../services/api";  // Updated API function to fetch project list
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ViewProject from "./ViewProject";  // Assuming ViewProject component exists
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";

import { useSelector } from "react-redux";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";

// Import libraries for Excel and PDF export
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function ProjectList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    // FILTERING STATE VARIABLES FOR PROJECT FILTER
    const [fincYear, setFincYear] = useState(null);
    const [companyFilter, setCompanyFilter] = useState(null);
    const [branchFilter, setBranchFilter] = useState(null);
    const [clientFilter, setClientFilter] = useState(null);
    const [skip, setSkip] = useState(null);
    const [take, setTake] = useState(null);
    const [status, setStatus] = useState(null);
    const [billing, setBilled] = useState(null);
    const [payment, setPayment] = useState(null);

    const { data: projectList = [], isLoading } = useQuery({
        queryKey: ["project-list", refetchList, +fincYear, companyFilter, branchFilter, clientFilter, skip, take, status, billing, payment],
        queryFn: async () => {
            return await getProjectList(token, clientFilter, branchFilter, companyFilter, fincYear, skip, take, status, billing, payment);
        }
    });

    const { data: FYList = [] } = useQuery({
        queryKey: ["finance-year-list"],
        queryFn: async () => {
            return await getFYList(token);
        }
    });

    const { data: companyList = [] } = useQuery({
        queryKey: ["company-filter-list"],
        queryFn: async () => {
            return await getCompanyList(token);
        }
    });

    const { data: branchList = [] } = useQuery({
        queryKey: ["branch-filter-list"],
        queryFn: async () => {
            return await getBranchList(token);
        }
    });

    const { data: clientList = [] } = useQuery({
        queryKey: ["client-filter-list"],
        queryFn: async () => {
            return await getClientList(token);
        }
    });

    // console.log(FYList);

    // useEffect(() => {
    //     if (projectList) {
    //         console.log(projectList);
    //     }
    // }, [projectList]);

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

    const exportToExcel = () => {
        if (!projectList?.response || projectList.response.length === 0) {
            alert("No data available to export!");
            return;
        }

        // Define custom column headers
        const formattedData = projectList.response.map(item => ({
            "Project Name": item.project_name,
            "Project Number": item.project_number,
            "Client": item.client_name,
            "Branch": item.branch_name,
            "Company": item.company_name,
            "Vertical Head": item.vertical_head_name,
            "Branch Manager": item.business_manager_name,
            "Client Service": item.client_service_name,
            "Other Members": item.other_service_names,
            "Quotation No": item.quotation_no,
            "Project Amount": item.project_amount,
            "Start Date": item.project_start_date,
            "End Date": item.project_end_date,
            "Status": item.status
        }));

        // Convert JSON to Excel sheet
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Project List");

        // Save file
        XLSX.writeFile(wb, "project_list.xlsx");
    };


    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4');  // 'l' stands for landscape, 'mm' for millimeters, 'a4' is the page size
        doc.autoTable({
            head: [["Project Number", "Project Name", "Client", "Branch", "Company", "Vertical Head", "Branch Manager", "Client Service", "Other Members", "Quotation No", "Start Date", "End Date", "Project Amount", "Status"]],
            body: projectList?.response.map(project => [
                project.project_number,
                project.project_name,
                project.client_name,
                project.branch_name,
                project.company_name,
                project.vertical_head_name,
                project.business_manager_name,
                project.client_service_name,
                project.other_service_names,
                project.quotation_no,
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
                            {/* filtering Projects */}

                            <div className="filter-projects bg-whitesmoke rounded-2xl shadow p-5 mb-5">
                                <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-5">
                                    <div className="finance-year">
                                        <label htmlFor="fy" className="text-sm">Financial Year</label>
                                        <select name="fyear" className="text-sm" onChange={(e) => {
                                            setFincYear(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            {
                                                FYList?.response?.map((item) => (
                                                    <option value={item.id} key={item.id}>{item.financial_year}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="company">
                                        <label htmlFor="fy" className="text-sm">Company</label>
                                        <select name="fyear" className="text-sm" onChange={(e) => {
                                            setCompanyFilter(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            {
                                                companyList?.response?.map((item) => (
                                                    <option value={item.id} key={item.id}>{item.company_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="branch">
                                        <label htmlFor="branch" className="text-sm">Branch</label>
                                        <select name="branch" className="text-sm" onChange={(e) => {
                                            setBranchFilter(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            {
                                                branchList?.response?.map((item) => (
                                                    <option value={item.id} key={item.id}>{item.branch_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="client">
                                        <label htmlFor="client" className="text-sm">Client</label>
                                        <select name="client" className="text-sm" onChange={(e) => {
                                            setClientFilter(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            {
                                                clientList?.response?.map((item) => (
                                                    <option value={item.id} key={item.id}>{item.company_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="status">
                                        <label htmlFor="status" className="text-sm">Project Status</label>
                                        <select name="status" className="text-sm" onChange={(e) => {
                                            setStatus(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            <option value="1">Running</option>
                                            <option value="2">Closed</option>
                                            {/* <option value="3">Cancelled</option> */}
                                        </select>
                                    </div>
                                    <div className="billing_status">
                                        <label htmlFor="billing_status" className="text-sm">Bill Status</label>
                                        <select name="billing_status" className="text-sm" onChange={(e) => {
                                            setBilled(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            <option value="1">Billed</option>
                                            <option value="0">Unbilled</option>
                                        </select>
                                    </div>
                                    <div className="payment_status">
                                        <label htmlFor="payment_status" className="text-sm">Payment Status</label>
                                        <select name="payment_status" className="text-sm" onChange={(e) => {
                                            setPayment(e.target.value);
                                        }}>
                                            <option value="">--SELECT--</option>
                                            <option value="1">Paid</option>
                                            <option value="0">Unpaid</option>
                                        </select>
                                    </div>
                                </div>
                                {/* {
                                    fincYear === null && companyFilter === null && branchFilter === null && clientFilter === null ?
                                        (<div className="text-center">
                                            <button type="button" className="bg-black px-3 py-1 rounded-2xl shadow active:scale-95 text-white">RESET FILTER</button>
                                        </div>) : null
                                } */}
                            </div>
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
                                                <span className={`bg-dark text-sm ${rowData.status === "1" ? "bg-green-500" : rowData.status === "2" ? "bg-red-500" : "bg-gray-500"} px-3 py-1 rounded-xl text-white shadow`}>
                                                    {rowData.status === "1" ? "Running" : rowData.status === "2" ? "Closed" : "Cancelled"}
                                                </span>
                                            )}></Column>
                                            <Column header="Billing Status" body={(rowData) => (
                                                <span className={`bg-dark text-sm ${rowData.billing_status === "1" ? "bg-green-500" : "bg-red-500"} px-3 py-1 rounded-xl text-white shadow`}>
                                                    {rowData.billed_status === "1" ? "Billed" : "Unbilled"}
                                                </span>
                                            )}></Column>
                                            <Column header="Payment Status" body={(rowData) => (
                                                <span className={`bg-dark text-sm ${rowData.payment_status === "1" ? "bg-green-500" : "bg-red-500"} px-3 py-1 rounded-xl text-white shadow`}>
                                                    {rowData.received_status === "1" ? "Paid" : "Unpaid"}
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
                                                    <CheckAccessEdit edit_access="Project">
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
                                                    </CheckAccessEdit>

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
