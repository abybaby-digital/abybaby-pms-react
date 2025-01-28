import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"


import AdminHead from "../../../components/common/AdminHead";

export default function AddBranch() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="branch" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">

                    <form method="post" action="#" className="bg-white rounded-2xl shadow  mx-auto xl:w-[50%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">ADD BRANCH</h2>
                        <div className="card-body grid gap-3 lg:grid-cols-1 grid-cols-1 p-5">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Branch Code <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_name"
                                    name="company_name"
                                    placeholder="Branch Code"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Branch Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_name"
                                    name="company_name"
                                    placeholder="Branch Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Branch Address 
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_name"
                                    name="company_name"
                                    placeholder="Branch Address"
                                />
                            </div>
                           
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button type="submit" className="px-10 py-2 text-white bg-lightdark rounded-2xl">
                                Submit
                            </button>
                        </div>
                    </form>


                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
