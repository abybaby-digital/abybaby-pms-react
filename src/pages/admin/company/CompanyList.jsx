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
import { getCompanyList } from "../../../services/api"; // Assuming there's a service function for getting the company list
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ViewCompany from "./ViewCompany"; // Assuming there's a modal component for viewing company details
import EditCompany from "./EditCompany"; // Assuming there's a modal component for editing company details
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { useSelector } from "react-redux";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";

export default function CompanyList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    // Fetch the list of companies
    const { data: companyList = [], isLoading } = useQuery({
        queryKey: ["company-list", refetchList],
        queryFn: async () => {
            return await getCompanyList(token);
        }
    });

    const [singleCompanyData, setSingleCompanyData] = useState({});
    const [addOrEdit, setAddOrEdit] = useState(null); // For determining "view" or "edit"

    // Function to handle opening modals for View or Edit
    const openModal = (id, type) => {
        const company = companyList?.response.find(company => company.id === id);
        setSingleCompanyData(company);
        setModal(true);
    };

    useEffect(() => {
        if (companyList) {
            console.log(companyList);
        }
    }, [companyList]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="company" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">

                    <div className="bg-white rounded-2xl shadow  mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">COMPANY LIST</h2>
                        <div className="card-body p-5 bg-white shadow  overflow-hidden">
                            {
                                isLoading ? (
                                    <TableSkeleton columns="10" />
                                ) : (
                                    <DataTable value={companyList?.response} stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
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
                                        <Column field="company_name" sortable header="Company Name" style={{ textTransform: "capitalize" }}></Column>
                                        <Column field="company_details" sortable header="Company Details" style={{ textTransform: "capitalize" }}></Column>
                                        <Column field="company_gst" sortable header="Company GST" style={{ textTransform: "capitalize" }}></Column>
                                        <Column field="company_address" sortable header="Company Address" style={{ textTransform: "capitalize", width: "35%" }}></Column>
                                        <Column field="contact_person" sortable header="Contact Person" style={{ textTransform: "capitalize", width: "35%" }}></Column>
                                        <Column field="contact_number" sortable header="Contact Number" style={{ textTransform: "capitalize", width: "35%" }}></Column>
                                        <Column field="contact_email" sortable header="Contact Email" style={{ textTransform: "capitalize", width: "35%" }}></Column>
                                        <Column
                                            header="Company Status"
                                            body={(rowData) => (
                                                rowData.status ? (
                                                    <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span>
                                                ) : (
                                                    <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">Closed</span>
                                                )
                                            )}
                                        />


                                        <Column header="Actions" body={(rowData) => (
                                            <>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                openModal(rowData.id);
                                                                setAddOrEdit("view");
                                                            }}>
                                                                <FaEye />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>View Company</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <CheckAccessEdit edit_access="Company">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => {
                                                                    openModal(rowData.id);
                                                                    setAddOrEdit("edit");
                                                                }}>
                                                                    <MdEditSquare />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Company</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </CheckAccessEdit>
                                            </>
                                        )}></Column>
                                    </DataTable>
                                )
                            }

                            {/* View Company Modal */}
                            <ViewCompany company={singleCompanyData} add_or_edit={addOrEdit} />

                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
