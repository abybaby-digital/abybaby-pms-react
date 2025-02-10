import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"

import { NavUser } from "@/components/nav-user"
import { FaUserLarge } from "react-icons/fa6";

import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/features/Auth/AuthSlice"

const AdminHead = ({ breadcrumb_name }) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.auth.user);
    console.log(user);
    
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
                    <summary className="list-none">
                        <span className="inline-block p-2 px-5"><FaUserLarge className="inline me-1 bg-whitesmoke text-2xl p-1 rounded-full " />{user.role}</span>
                    </summary>
                    <ul className="absolute border z-50 bg-white top-[110%] rounded-2xl text-nowrap right-0 shadow-lg overflow-hidden p-2">
                        <li  className="cursor-pointer hover:text-white hover:bg-black px-3 rounded border" onClick={()=>dispatch(logout())}>Logout</li>
                    </ul>
                </details>

            </div>
        </header>
    )
}

export default AdminHead
