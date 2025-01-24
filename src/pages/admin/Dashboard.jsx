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
import CommonTable from "../../components/admin/dashboard/CommonTable";
import AdminHead from "../../components/common/AdminHead";
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

export default function Dashboard() {

    const runningProjectTableHead = ["Project No.", "Project Name", "Company", "Client", "Start Date", "End Date"];
    const unbilledClosedProjects = ["Project No.", "Project Name", "Company", "Client", "Amount"];
    const billedClosedProjects = ["Project No.", "Project Name", "Company", "Client", "Amount"];
    const paymentOutstandingProjects
        = ["Project No.", "Project Name", "Company", "Client", "Amount"];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="dashboard" />
                <div className="flex flex-1 flex-col gap-2 p-3  bg-whitesmoke">

                    <div className="financial-year-filter rounded-2xl shadow bg-white flex lg:flex-row flex-col items-center justify-center p-3 gap-3">
                        Search Data for financial year :

                        <form action="#" className="flex items-center gap-3">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="2025-2026" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2025-2026">2024-2025</SelectItem>
                                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                                </SelectContent>
                            </Select>
                            <button type="button" className="bg-lightdark rounded-xl text-white px-5 py-1 shadow active:scale-105" >
                                <IoMdSearch className="inline" />Search
                            </button>
                        </form>

                    </div>

                    <div className="grid mt-10 auto-rows-min gap-x-5 gap-y-10 lg:grid-cols-3 grid-cols-1">
                        <div className="dash-card bg-white rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-[#fec107] shadow-lg shadow-[#fec107] -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                                <MdOutlinePendingActions className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end mb-8">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Running Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>
                        <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-[#27a844] shadow-lg shadow-[#27a844]  -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                                <GiCardboardBoxClosed className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end mb-8">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Closed Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>
                        <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-lightdark shadow-lg shadow-lightdark -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                                <MdBallot className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end mb-8">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Total Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow-lg px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>


                    </div>
                    <div className="grid mt-10 auto-rows-min gap-x-5 gap-y-10 xl:grid-cols-4 lg:grid-cols-2">
                        <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-[#17a2b7] shadow-lg shadow-[#17a2b7]  -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                                <FaMoneyBillTransfer className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Unbilled Closed Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>
                        <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-lightdark shadow-lg shadow-lightdark -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                                <FaMoneyBillTrendUp className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Billed Closed Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>

                        <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-[#fec107] shadow-lg shadow-[#fec107]  p-3 w-[60px] -mt-[40px] text-center rounded-2xl">
                                <FaMoneyBillWave className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end mb-8">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Payment Outstanding Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>

                        <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5" >
                            <div className="bg-[#27a844] shadow-lg shadow-[#27a844] p-3 w-[60px] -mt-[40px] text-center rounded-2xl">
                                <FaMoneyBills className="text-3xl text-white inline" />
                            </div>
                            <div className="dash-card-content text-end mb-8">
                                <p className="text-2xl font-bold">6144</p>
                                <p className="text-lg text-lightdark"><MdOutlineCurrencyRupee  className="inline mb-1" />12345</p>
                                <p className="text-sm text-lightdark font-merri italic font-bold ">Payment Received Projects</p>
                            </div>
                            <Link to="#" className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"><PiArrowFatLinesRightFill className="inline me-1" />More Info</Link>
                        </div>
                    </div>
                    <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">
                        <CommonTable
                            table_title="running projects"
                            table_head_items={runningProjectTableHead}
                            table_data_items={[1, 2, 3, 4, 5, 6]}
                        />
                        <CommonTable
                            table_title="Unbilled Closed Projects"
                            table_head_items={unbilledClosedProjects}
                            table_data_items={[1, 2, 3, 4, 5]}
                        />
                        <CommonTable
                            table_title="Billed Closed Projects"
                            table_head_items={billedClosedProjects}
                            table_data_items={[1, 2, 3, 4, 5]}
                        />
                        <CommonTable
                            table_title="Payment Outstanding Projects"
                            table_head_items={paymentOutstandingProjects
                            }
                            table_data_items={[1, 2, 3, 4, 5]}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
