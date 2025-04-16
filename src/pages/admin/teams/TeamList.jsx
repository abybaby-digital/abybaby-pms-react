import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AdminHead from "../../../components/common/AdminHead";
import { useQuery } from "@tanstack/react-query";
import { getFYList, getTeamList, getUserList } from "../../../services/api";  // Updated to fetch user list
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
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import { CiImageOff } from "react-icons/ci";
import ViewTeam from "./ViewTeam";

export default function TeamList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector(state => state.auth.user.role_id);
    // console.log(userId);

    const [fincYear, setFincYear] = useState(null);

    // FY LIST CALL
    const { data: fincYearList } = useQuery({
        queryKey: ["finc-year-list", token],
        queryFn: async () => {
            return await getFYList(token);
        },
    });


    const { data: teamList = [], isLoading } = useQuery({
        queryKey: ["team-list", refetchList, fincYear],
        queryFn: async () => {
            return await getTeamList(token, fincYear);
        }
    });

    // console.log("teamlist", teamList);

    const [singleTeamData, setSingleTeamData] = useState(null);
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    const singleTeam = (id) => {
        const team = teamList?.response?.find(user => user.id === id);

        setSingleTeamData(team);
        setModal(true);
    };

    // console.log(singleTeamData);


    const filteredTeams = teamList?.response?.filter(team => {
        const keyword = searchKeyword.toLowerCase();
        return (
            team.project_number?.toString().toLowerCase().includes(keyword) ||
            team.team_name?.toLowerCase().includes(keyword) ||
            team.project_name?.toLowerCase().includes(keyword)
        );
    });


    const exportToExcel = () => {
        // Map the user data to include only the required fields
        const filteredData = teamList?.response?.map((team, index) => ({
            sl_no: index + 1,
            project_name: team.project_name,
            team_name: team.team_name,
            financial_year: team.financial_year,
            main_fo: team.fo_main_name,
            other_fo: team.fo_junior_name,
            created_by: team.team_created_by,
            updated_by: team.team_updated_by,
        })) || [];

        // Create a worksheet from the filtered data
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "User List");

        // Write the file
        XLSX.writeFile(wb, "team_list.xlsx");
    };


    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Project Name", "Team Name", "FY", "Main FO", "Other FO", "Created By"]],
            body: teamList?.response.map(team => [
                team.project_name,
                team.team_name,
                team.financial_year,
                team.fo_main_name,
                team.fo_junior_name,
                team.team_created_by,
                team.team_updated_by,
            ]),
        });
        doc.save("team_list.pdf");
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="team" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">TEAM LIST</h2> */}
                        <div className="flex bg-gray-200 items-center justify-between px-10">
                            <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                                TEAM ACTIVITY LIST
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

                                            {
                                                userId === 9 ?
                                                    null :
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
                                            }
                                        </div>

                                        {/* DataTable */}
                                        
                                        <DataTable
                                            value={filteredTeams}
                                            stripedRows
                                            rows={10}
                                            rowsPerPageOptions={[5, 10, 25, 50]}
                                            paginator
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                            rowClassName={(rowData, rowIndex) => {
                                                return rowIndex === 0 ? 'highlight-first-row' : '';
                                            }}
                                        >
                                            <Column
                                                header="Actions"
                                                body={(rowData) => (
                                                    <>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                        singleTeam(rowData.id);
                                                                        setAddOrEdit("view");
                                                                    }}>
                                                                        {userId === 9 ? <span className="bg-black rounded-2xl text-white p-2">View Activity Photos</span> : <FaEye />}
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>View Team Activity</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>

                                                        <CheckAccessEdit edit_access="Team">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                            singleTeam(rowData.id);
                                                                            setAddOrEdit("edit");
                                                                        }}>
                                                                            <MdEditSquare />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Edit Team</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </CheckAccessEdit>
                                                    </>
                                                )}
                                            />
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
                                            <Column field="team_name" sortable header="Team Name"></Column>

                                            <Column header="Main FO" field="fo_main_name"></Column>
                                            <Column header="Other FO" field="fo_junior_name"></Column>

                                        </DataTable>
                                    </div>
                                )
                            }

                            {/* View User Popup */}
                            <ViewTeam team={singleTeamData} add_or_edit={addOrEdit} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
