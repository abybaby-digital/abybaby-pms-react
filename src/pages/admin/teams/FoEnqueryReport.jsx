import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFoEnquiryList, getFYList, getTeamList, getUserList, removeFO } from "../../../services/api";  // Updated to fetch user list
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
import { RiDeleteBack2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function FoEnqueryReport() {
    const { modal, setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);
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


    const { data: foenquirylist = [], isLoading } = useQuery({
        queryKey: ["fo-enquiry-list", refetchList, fincYear],
        queryFn: async () => {
            return await getFoEnquiryList(token, "today", 1268);
        }
    });

    // console.log("teamlist", teamList);

    const [addOrEdit, setAddOrEdit] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    // const singleFoEnquiry = (id) => {
    //     const foEnquiry = foenquirylist?.response?.find(user => user.id === id);
    //     setModal(true);
    // };

    // console.log(singleTeamData);


    const filteredFoEnquiry = foenquirylist?.response?.filter(foEnquiry => {
        const keyword = searchKeyword.toLowerCase();
        return (
            foEnquiry.project_number?.toString().toLowerCase().includes(keyword) ||
            foEnquiry.project_name?.toLowerCase().includes(keyword) ||
            foEnquiry.fo_name?.toLowerCase().includes(keyword)
        );
    });


    const exportToExcel = () => {
        // Map the user data to include only the required fields
        const filteredData = foenquirylist?.response?.map((foEnquiry, index) => ({
            sl_no: index + 1,
            project_name: foEnquiry.project_name,
            dealership_name: foEnquiry.dealership_name,
            customer_name: foEnquiry.customer_name,
            customer_number: foEnquiry.customer_number,
            test_drive: foEnquiry.test_drive === "1" ? "Yes" : "No",
            current_vehicle: foEnquiry.current_vehicle,
            current_vehicle_number: foEnquiry.current_vehicle_number,
            model_year_of_manufacture: foEnquiry.model_year_of_mfg,
            interested_vehicle: foEnquiry.interested_vehicle,
            spot_booking: foEnquiry.spot_booking,
            retail: foEnquiry.retail,
            gift: foEnquiry.gift,
            remarks: foEnquiry.remarks,
            enquiryTime: foEnquiry.diff_time,
            created_by: foEnquiry.fo_name,
        })) || [];

        // Create a worksheet from the filtered data
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "User List");

        // Write the file
        XLSX.writeFile(wb, "fo-enquiry-list.xlsx");
    };


    const exportToPDF = () => {
        const doc = new jsPDF({ orientation: "landscape" });
        doc.autoTable({
            head: [[
                "Project Name", "Dealership Name", "Customer Name", "Customer Number", "Test Drive",
                "Current Vehicle", "Current Vehicle Number", "Year of Manufacture", "Interested Vehicle",
                "Spot Booking", "Retail", "Gift", "Remarks", "Enquiry Time", "Created By"
            ]],
            body: foenquirylist?.response.map(foEnquiry => [
                foEnquiry.project_name,
                foEnquiry.dealership_name,
                foEnquiry.customer_name,
                foEnquiry.customer_number,
                foEnquiry.test_drive === "1" ? "Yes" : "No",
                foEnquiry.current_vehicle,
                foEnquiry.current_vehicle_number,
                foEnquiry.model_year_of_mfg,
                foEnquiry.interested_vehicle,
                foEnquiry.spot_booking,
                foEnquiry.retail,
                foEnquiry.gift,
                foEnquiry.remarks,
                foEnquiry.diff_time,
                foEnquiry.fo_name,
            ]),
        });
        doc.save("fo-enquiry-list.pdf");
    };



    const EditBtn = ({ id }) => {
        return (
            <CheckAccessEdit edit_access="Team">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
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
        )
    }

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
                                ENQUIRY REPORT
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

                                                        {/* <TooltipProvider>
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
                                                        </TooltipProvider> */}
                                                    </div>
                                            }
                                        </div>

                                        {/* DataTable */}

                                        <DataTable
                                            value={filteredFoEnquiry}
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
                                            <Column
                                                field="created_at"
                                                header="Created At"
                                                sortable
                                                body={(rowData) => rowData.created_at?.slice(0, 10)}
                                            />
                                            <Column field="project_name" sortable header="Project Name"></Column>
                                            <Column field="dealership_name" sortable header="Dealership name"></Column>

                                            <Column field="activity_location" sortable header="Activity location"></Column>
                                            <Column field="customer_name" sortable header="Customer name"></Column>
                                            <Column field="customer_number" sortable header="Customer number"></Column>
                                            <Column
                                                header="Test drive"
                                                body={(rowData) => (
                                                    <span className="text-sm px-3 py-1 rounded-xl text-gray-700">
                                                        {rowData.test_drive === "1" ? "Yes" : "No"}
                                                    </span>
                                                )}

                                            />
                                            <Column field="current_vehicle" sortable header="Current vehicle"></Column>
                                            <Column field="current_vehicle_number" sortable header="Current vehicle number"></Column>
                                            <Column field="model_year_of_mfg" sortable header="Year of manufacture"></Column>
                                            <Column field="interested_vehicle" sortable header="Interested vehicle"></Column>
                                            <Column field="spot_booking" sortable header="Spot booking"></Column>
                                            <Column field="retail" sortable header="Retail"></Column>
                                            <Column field="gift" sortable header="gift"></Column>
                                            <Column field="remarks" sortable header="remarks"></Column>


                                            <Column field="fo_name" sortable header="Created By"></Column>
                                            <Column field="diff_time" sortable header="Timing"></Column>




                                        </DataTable>
                                    </div>
                                )
                            }



                            {/* View User Popup */}
                            <ViewTeam add_or_edit={addOrEdit} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
