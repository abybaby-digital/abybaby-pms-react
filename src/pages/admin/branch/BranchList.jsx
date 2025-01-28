import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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



export default function BranchList() {


    const { data: branchlist = [] } = useQuery({
        queryKey: ["branch-list"],
        queryFn: async () => {
            return await getBranchList();
        }
    })

    useEffect(() => {
        if (branchlist) {
            console.log(branchlist);
        }
    }, [branchlist])

    const [singleBranchData, setsingleBranchData] = useState({});
    const {setModal} = useContext(dialogOpenCloseContext);
    

    const viewSingleBranch = (id) => {
        const singleBranch = branchlist.find(branch => branch.id === id);  // Use find to get a single match
        setsingleBranchData(singleBranch);
        setModal(true);
    }

    // console.log(singleBranchData);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="company" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">

                    <div className="bg-white rounded-2xl shadow  mx-auto xl:w-[90%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">BRANCH LIST</h2>
                        <div className="card-body p-5 bg-white shadow  overflow-hidden">
                            <DataTable value={branchlist} stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }} paginator paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                <Column field="branch_code" sortable header="branch code" style={{ textTransform: "capitalize" }}></Column>
                                <Column field="branch_name" sortable header="branch name" style={{ textTransform: "capitalize" }}></Column>
                                <Column field="branch_address" sortable header="branch address" style={{ textTransform: "capitalize", width: "35%" }}></Column>
                                <Column header="Status" body={() => (
                                    <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span>
                                )}></Column>

                                <Column header="Actions" body={(rowData) => (
                                    <>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger> <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95" onClick={() => viewSingleBranch(rowData.id)}><FaEye /></button></TooltipTrigger>
                                                <TooltipContent>
                                                    <p>View Branch</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger> <button className="bg-white shadow p-2 rounded me-2 hover:scale-110 active:scale-95"><MdEditSquare /></button></TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Edit Branch</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </>
                                )}></Column>
                            </DataTable>

                            {/* VIEW BRANCH POPUP */}
                            <ViewBranch branch={singleBranchData} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
