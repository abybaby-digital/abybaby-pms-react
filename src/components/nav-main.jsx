"use client"

import { ChevronRight } from "lucide-react";
import { MdDashboard } from "react-icons/md";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function NavMain({
  items = []
}) {

  const accessAdd = useSelector((state) => state.auth.user?.add_access_name)?.split(",");

  // console.log(accessAdd);

  const setMenuActive = (title) => {
    console.log(title);
    sessionStorage.setItem("menuActive", title);
  }

  return (
    (<SidebarGroup className="list-none p-2">
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {
          items?.map((item, idx) =>
            item.hasSubMenu ?
              (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={sessionStorage.getItem("menuActive") === item.title}
                  className="group/collapsible">
                  <SidebarMenuItem className="shadow mb-2 rounded-xl">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} onClick={() => {
                        setMenuActive(item.title)
                      }} className="hover:bg-transparent active:bg-transparent text-[15px] py-6">
                        {item.icon && <item.icon className="w-96" />}
                        <span>{item.title}</span>
                        <ChevronRight
                          className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((submenu, idx) =>
                          idx === 0 ? (
                            accessAdd?.includes(submenu.access) && (
                              <SidebarMenuSubItem key={idx}>
                                <NavLink to={submenu.url} className="admin-navlink">
                                  <SidebarMenuSubButton asChild>
                                    <span>{submenu.title}</span>
                                  </SidebarMenuSubButton>
                                </NavLink>
                              </SidebarMenuSubItem>
                            )
                          ) : (
                            <SidebarMenuSubItem key={idx}>
                              <NavLink to={submenu.url} className="admin-navlink">
                                <SidebarMenuSubButton asChild>
                                  <span>{submenu.title}</span>
                                </SidebarMenuSubButton>
                              </NavLink>
                            </SidebarMenuSubItem>
                          )
                        )}
                      </SidebarMenuSub>

                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

              ) :
              (
                <NavLink to="/" className="admin-navlink" key={idx}>
                  <SidebarMenuItem className="shadow mb-2 rounded-xl">

                    <SidebarMenuButton tooltip="Dashboard" className="hover:bg-transparent active:bg-transparent text-[15px] py-6" onClick={() => {
                        setMenuActive(item.title)
                      }}>
                      {/* {item.icon && <item.icon />} */}
                      <MdDashboard />
                      <span>{item.title}</span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hidden" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </NavLink>
              )


          )
        }

        {/* <NavLink to="/" className="admin-navlink">
          <SidebarMenuItem className="shadow mb-2 rounded-xl">

            <SidebarMenuButton tooltip="Dashboard" className="hover:bg-transparent active:bg-transparent text-[15px] py-6">
              <MdDashboard />
              <span>Dashboard</span>
              <ChevronRight
                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </NavLink> */}



      </SidebarMenu>
    </SidebarGroup>)
  );
}
