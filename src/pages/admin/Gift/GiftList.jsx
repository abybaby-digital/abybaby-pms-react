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
import { getGiftList } from "../../../services/api";
import { useContext, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { useSelector } from "react-redux";
import CheckAccessEdit from "../../../components/common/CheckAccessEdit";
import ViewGift from "./ViewGift";

export default function GiftList() {
    const { modal, setModal, refetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    const { data: giftList = [], isLoading } = useQuery({
        queryKey: ["gift-list", refetchList],
        queryFn: async () => {
            return await getGiftList(token);
        }
    });

    const [selectedGift, setSelectedGift] = useState({});
    const [modalType, setModalType] = useState(null); // 'view' or 'edit'

    const openModal = (id, type) => {
        const gift = giftList?.response.find(item => item.id === id);
        setSelectedGift(gift);
        setModal(true);
        setModalType(type);
    };

    useEffect(() => {
        if (giftList) {
            console.log(giftList);
        }
    }, [giftList]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="gift" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">
                    <div className="bg-white rounded-2xl shadow mx-auto xl:w-[90%] w-full overflow-hidden">
                        <div className="flex justify-between w-full bg-gray-200 items-center px-5">
                            <h2 className="font-merri font-semibold p-5 text-2xl">
                                GIFT LIST
                            </h2>
                            <button className="bg-lightdark rounded-xl text-white px-5 py-1" onClick={() => {
                                openModal(null, "view");
                            }}> + Add Gift</button>
                        </div>
                        <div className="card-body p-5 bg-white shadow overflow-hidden">
                            {isLoading ? (
                                <TableSkeleton columns="10" />
                            ) : (
                                <DataTable
                                    value={giftList?.response}
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
                                            <CheckAccessEdit edit_access="Gift">
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
                                                            <p>Edit Gift</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </CheckAccessEdit>
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
                                    <Column field="gift_name" sortable header="Gift Name" style={{ textTransform: "capitalize" }} />
                                    <Column field="created_by_name" sortable header="Created By" style={{ textTransform: "capitalize" }} />

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

                            {/* View/Edit Gift Modal */}
                            <ViewGift gift={selectedGift} add_or_edit={modalType} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
