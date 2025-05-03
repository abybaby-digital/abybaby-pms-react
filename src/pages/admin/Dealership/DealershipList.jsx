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
import { getCompanyList, getDealershipList } from "../../../services/api"; // Assuming this is reused for dealerships
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { useSelector } from "react-redux";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import ViewDealership from "./ViewDealership";

export default function DealershipList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: dealershipList = [], isLoading } = useQuery({
        queryKey: ["dealership-list", refetchList],
        queryFn: async () => {
            return await getDealershipList(token); // You may rename this API to be dealership-specific
        }
    });

    const [selectedDealership, setSelectedDealership] = useState({});
    const [modalType, setModalType] = useState(null); // 'view' or 'edit'

    const openModal = (id, type) => {
        const dealership = dealershipList?.response.find(item => item.id === id);
        setSelectedDealership(dealership);
        setModal(true);
        setModalType(type);
    };

    console.log("dealer", selectedDealership);
    

    useEffect(() => {
        if (dealershipList) {
            console.log(dealershipList);
        }
    }, [dealershipList]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="dealership" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <div className="flex justify-between w-full  bg-gray-200 items-center px-5">
                            <h2 className="font-merri font-semibold p-5 text-2xl">
                                DEALERSHIP LIST
                            </h2>
                            <button className="bg-lightdark rounded-xl text-white px-5 py-1" onClick={() => {
                                openModal(null, "view");
                            }}> + Add Dealership</button>
                        </div>
                        <div className="card-body p-5 bg-white shadow overflow-hidden">
                            {isLoading ? (
                                <TableSkeleton columns="10" />
                            ) : (
                                <DataTable
                                    value={dealershipList?.response}
                                    stripedRows
                                    rows={10}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    tableStyle={{ minWidth: '20rem' }}
                                    paginator
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                >
                                    <Column
                                    className="text-center"
                                        header="Actions"
                                        body={(rowData) => (
                                            <>
                                                

                                                <CheckAccessEdit edit_access="Dealership" >
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <button
                                                                    className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"
                                                                    onClick={() => openModal(rowData.id, "edit")}
                                                                >
                                                                    <MdEditSquare />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Dealership</p>
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
                                    <Column field="dealer_name" sortable header="Dealership Name" style={{ textTransform: "capitalize" }} />
                                    <Column field="created_by_name" sortable header="Created by" style={{ textTransform: "capitalize" }} />
                                    
                                    <Column
                                        header="Status"
                                        body={(rowData) => (
                                            rowData.status ? (
                                                <span className="bg-green-500 text-sm px-3 py-1 rounded-xl text-white shadow">Active</span>
                                            ) : (
                                                <span className="bg-red-500 text-sm px-3 py-1 rounded-xl text-white shadow">Closed</span>
                                            )
                                        )}
                                    />
                                </DataTable>
                            )}

                            {/* View/Edit Dealership Modal */}

                            <ViewDealership dealership={selectedDealership} add_or_edit={modalType} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
