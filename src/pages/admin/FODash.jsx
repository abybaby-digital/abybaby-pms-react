import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import CommonTable from "../../components/admin/dashboard/CommonTable";
import AdminHead from "../../components/common/AdminHead";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { foReportData, getFYList, getProjectList, getReport } from "../../services/api";
import { useState } from "react";
import TableSkeleton from "../../components/common/TableSkeleton";
import ViewTeam from "./teams/ViewTeam";
import { Link } from "react-router-dom";

const FODash = () => {
    const token = useSelector(state => state.auth.token);
    const { data: FoReport, isLoading } = useQuery({
        queryKey: ["fo-report-data", token],
        queryFn: async () => {
            return await foReportData(token);
        }
    })
    const [searchKeyword, setSearchKeyword] = useState("");

    console.log("FoReportData", FoReport);

    const PreviousProject = FoReport?.response?.previous_project.filter(project => {
        const keyword = searchKeyword.toLowerCase();
        return (
            project.project_number?.toString().toLowerCase().includes(keyword) ||
            project.project_name?.toLowerCase().includes(keyword)
        );
    });

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="dashboard" />
                <div className="">
                    <div className="dash-card m-5 bg-lightdark shadow rounded-2xl p-5 col-span-2">
                        <h2 className="text-4xl text-white border-b pb-3 font-bold">Current Project</h2>
                        <div className="flex justify-between items-center gap-10 py-3">
                            <h3 className="text-white text-xl py-3 font-light">
                                {FoReport?.response?.current_project?.project_name}
                            </h3>
                            <Link to="/team-list" className=" bg-white rounded-xl px-5 text-black py-3">View My Activity</Link>
                        </div>
                    </div>
                    <div className="project-list m-5">
                        <h2 className="text-4xl text-black border-b pb-3 font-bold">Previous Project</h2>
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
                                        </div>

                                        {/* DataTable */}
                                        <DataTable
                                            value={PreviousProject}
                                            stripedRows
                                            rows={10}
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
                                            <Column field="project_number" sortable header="Project No" style={{ textTransform: "capitalize" }}></Column>
                                            <Column field="project_name" sortable header="Project Name"></Column>
                                            {/* <Column field="team_name" sortable header="Action"></Column> */}

                                            {/* <Column
                                                header="S.No"
                                                body={(rowData, { rowIndex }) => (
                                                    <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                                                        {rowIndex + 1}
                                                    </span>
                                                )}
                                                style={{ width: '5rem', textAlign: 'center' }}
                                            /> */}

                                            {/* <Column header="Main FO" field="fo_main_name"></Column> */}
                                            {/* <Column header="Other FO" field="fo_junior_name"></Column> */}

                                        </DataTable>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default FODash
