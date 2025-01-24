import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const AdminHead = ({ breadcrumb_name }) => {
    return (
        <header className="sticky top-0 shadow z-20 bg-white overflow-hidden flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
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
        </header>
    )
}

export default AdminHead
