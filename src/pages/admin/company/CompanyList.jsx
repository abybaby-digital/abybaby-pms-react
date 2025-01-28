import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"


import AdminHead from "../../../components/common/AdminHead";

export default function CompanyList() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="company" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke">

                    <form method="post" action="#" className="bg-white rounded-2xl shadow  mx-auto xl:w-[80%] w-full overflow-hidden">
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">COMPANY LIST</h2>
                        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Company Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_name"
                                    name="company_name"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Company Details</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_details"
                                    name="company_details"
                                    placeholder="Company Details"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Company GST</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_gst"
                                    name="company_gst"
                                    placeholder="Company GST"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Company Address</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_address"
                                    name="company_address"
                                    placeholder="Company Address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Contact Person</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contact_person"
                                    name="contact_person"
                                    placeholder="Contact Person"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Contact Number</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contact_no"
                                    name="contact_no"
                                    placeholder="Contact Number"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Contact Email</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contact_email"
                                    name="contact_email"
                                    placeholder="Contact Email"
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
