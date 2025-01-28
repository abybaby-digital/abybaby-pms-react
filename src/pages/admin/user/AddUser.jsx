import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { BsFileEarmarkPost } from "react-icons/bs";
import { BsFillPostageFill } from "react-icons/bs";
import { BsFilePost } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import AdminHead from "../../../components/common/AdminHead";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdBallot } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

import { MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom";
import { PiArrowFatLinesRightFill } from "react-icons/pi";

export default function AddUser() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="user" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        className="bg-white rounded-2xl shadow  mx-auto xl:w-[80%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">ADD USER</h2>
                        <div className="card-body grid gap-3 lg:grid-cols-3 grid-cols-1 p-5">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">
                                    Role <span style={{ color: "red" }}>*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="client_service">CS</SelectItem>
                                        <SelectItem value="vericle_head">VH</SelectItem>
                                        <SelectItem value="branch_manager">BM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">
                                    Contact Number <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Contact Number"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">
                                    Company <span style={{ color: "red" }}>*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Abybaby Entertainment Network</SelectItem>
                                        <SelectItem value="2">Abybaby Events Private Limited</SelectItem>
                                        <SelectItem value="4">Riverbed Events Private Limited</SelectItem>
                                        <SelectItem value="20">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="branch">
                                    Branch <span style={{ color: "red" }}>*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="18">AGENCY</SelectItem>
                                        <SelectItem value="21">ANE</SelectItem>
                                        <SelectItem value="24">BHR&JHK</SelectItem>
                                        <SelectItem value="20">CG&MP</SelectItem>
                                        <SelectItem value="13">DIGITAL</SelectItem>
                                        <SelectItem value="19">HO-01</SelectItem>
                                        <SelectItem value="8">KTK</SelectItem>
                                        <SelectItem value="9">MUM</SelectItem>
                                        <SelectItem value="48">NI</SelectItem>
                                        <SelectItem value="11">NIL</SelectItem>
                                        <SelectItem value="25">ODI</SelectItem>
                                        <SelectItem value="7">TN</SelectItem>
                                        <SelectItem value="10">UP</SelectItem>
                                        <SelectItem value="23">WB</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            <div className="form-group file-upload">
                                <label htmlFor="image">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_details">User Details</label>
                                <input
                                    className="form-control"
                                    id="user_details"
                                    name="user_details"
                                    placeholder="User Details"
                                />
                            </div>

                            <div className="form-group lg:col-span-3 border p-4 rounded-xl">
                                <label>
                                    Access <span style={{ color: "red" }}>*</span>
                                </label>
                                <div className="flex flex-wrap gap-x-5 gap-y-2">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Client"
                                        />
                                        <label className="form-check-label">Client</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Users"
                                        />
                                        <label className="form-check-label">Users</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Vendor"
                                        />
                                        <label className="form-check-label">Vendor</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Project"
                                        />
                                        <label className="form-check-label">Project</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Supportings"
                                        />
                                        <label className="form-check-label">Supportings</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Payment_Requisition"
                                        />
                                        <label className="form-check-label">Payment Requisition</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Client_PO"
                                        />
                                        <label className="form-check-label">Client PO</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Invoice"
                                        />
                                        <label className="form-check-label">Invoice</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="access[]"
                                            defaultValue="Payment_Received"
                                        />
                                        <label className="form-check-label">Payment Received</label>
                                    </div>
                                    {/* Add more access checkboxes as needed */}
                                </div>

                            </div>




                        </div>

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
