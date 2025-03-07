import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { TbPasswordFingerprint } from "react-icons/tb";
import { CgLogOut } from "react-icons/cg";
import { MdMarkEmailRead } from "react-icons/md";

import { NavUser } from "@/components/nav-user"
import { FaUserLarge } from "react-icons/fa6";

import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/features/Auth/AuthSlice"
import { useNavigate } from "react-router-dom";

const AdminHead = ({ breadcrumb_name }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    // console.log(user);

    return (
        <header className="sticky w-full top-0 shadow z-20 bg-white  flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex justify-between">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="font-merri  capitalize text-sm lg:text-xl font-bold text-lightdark">
                                <BreadcrumbLink>
                                    {breadcrumb_name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                            {/* <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem> */}

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="user-btn px-5">
                <details className="relative shadow-lg rounded-xl">
                    <summary className="list-none cursor-pointer">
                        <span className="inline-block p-2 px-5"><FaUserLarge className="inline me-1 bg-whitesmoke text-2xl p-1 rounded-full " />{user.name}{" "}({user.role})</span>
                    </summary>
                    <ul className="absolute  border z-50 bg-white top-[110%] rounded-2xl text-nowrap right-0 shadow-lg overflow-hidden  flex flex-col items-center p-5">
                        {
                            user.profile_img !== "https://test.abybabyoffice.com/storage/user/profile/" ?
                            <li><img src={user.profile_img} alt="profile_image" className="w-[50px] aspect-square object-cover rounded-full" /></li>
                            
                        : <FaUserLarge className="inline me-1 bg-whitesmoke text-5xl  rounded-full shadow border p-2" />}
                        <li className="px-5 py-2"><MdMarkEmailRead className="inline me-2"/>{user.email}</li>
                        <li className="cursor-pointer w-full text-center hover:text-white hover:bg-black px-3 py-2 rounded-xl border mb-1" onClick={() => navigate("/change-password")} >< TbPasswordFingerprint className="inline me-1" />Change Password</li>
                        <li className="cursor-pointer w-full text-center hover:text-white hover:bg-black px-3 py-2 rounded-xl border" onClick={() => dispatch(logout())}><CgLogOut className="inline me-1" />Logout</li>
                    </ul>
                </details>

            </div>
        </header>
    )
}

export default AdminHead
