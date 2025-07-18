import * as React from "react"



import { PiTractorFill } from "react-icons/pi";


import { NavMain } from "@/components/nav-main"

import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import pmsLogo from "../assets/images/PMS.png"

import { BsBuildingsFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaMoneyCheck } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { FaFileInvoice } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPersonSharp } from "react-icons/io5";
import { GiPieChart } from "react-icons/gi";
import { PiNetworkBold } from "react-icons/pi";
import { use } from "react";
import { useRef } from "react";
import { useEffect } from "react";



// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: PiTractorFill,
      hasSubMenu: false,
      isActive: false,
      access: "Dashboard",
    },
    {
      title: "Role Management",
      url: "#",
      icon: PiNetworkBold,
      hasSubMenu: true,
      isActive: false,
      access: "Role Management",
      items: [
        {
          title: "Add Role",
          url: "/role-add",
          access: "Role Management",
        },
        {
          title: " Role List",
          url: "/role-list",
          access: "Role Management",
        },
      ],
    },
    {
      title: "Company",
      url: "#",
      icon: BsBuildingsFill,
      hasSubMenu: true,
      isActive: false,
      access: "Company",
      items: [
        {
          title: "Add Company",
          url: "/company-add",
          access: "Company",
        },
        {
          title: " Company List",
          url: "/company-list",
          access: "Company",
        },
      ],
    },
    {
      title: "Branch",
      url: "#",
      icon: FaBuilding,
      hasSubMenu: true,
      isActive: false,
      access: "Branch",
      items: [
        {
          title: "Add Branch",
          url: "/branch-add",
          access: "Branch",
        },
        {
          title: " Branch List",
          url: "/branch-list",
          access: "Branch",
        },
      ],
    },
    // {
    //   title: "Department",
    //   url: "#",
    //   icon: FaBuildingColumns,
    //   hasSubMenu: true,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Add Department",
    //       url: "/department-add",
    //       role: []
    //     },
    //     {
    //       title: "Department List",
    //       url: "/department-list",
    //       role: []
    //     },
    //   ],
    // },
    {
      title: "Vendor",
      url: "#",
      icon: FaBuildingUser,
      hasSubMenu: true,
      isActive: false,
      access: "Vendor",
      items: [
        {
          title: "Add Vendor",
          url: "/vendor-add",
          access: "Vendor",
        },
        {
          title: "Vendor List",
          url: "/vendor-list",
          access: "Vendor",
        },
      ],
    },
    {
      title: "Client",
      url: "#",
      icon: FaUserTie,
      hasSubMenu: true,
      isActive: false,
      access: "Client",
      items: [
        {
          title: "Add Client",
          url: "/client-add",
          access: "Client",
        },
        {
          title: "Client List",
          url: "/client-list",
          access: "Client",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: FaUsers,
      hasSubMenu: true,
      isActive: false,
      access: "Users",
      items: [
        {
          title: "Add User",
          url: "/user-add",
          access: "Users",
        },
        {
          title: "Users List",
          url: "/user-list",
          access: "Users",
        },
      ],
    },
    {
      title: "Teams",
      url: "#",
      icon: FaUsers,
      hasSubMenu: true,
      isActive: false,
      access: "Team",
      items: [
        {
          title: "Add Team",
          url: "/team-add",
          access: "Team",
        },
        {
          title: "Team List",
          url: "/team-list",
          access: "Team",
        },
        // {
        //   title: "Enquiry Report",
        //   url: "/fo-enquiry-list",
        //   access: "Team",
        // },
      ],
    },
    {
      title: "Dealership",
      url: "#",
      icon: IoPersonSharp,
      hasSubMenu: true,
      isActive: false,
      access: "Dealership",
      items: [
        {
          title: "Dealership List",
          url: "/dealership-list",
          access: "Dealership",
        },

      ],
    },
    {
      title: "Gift",
      url: "#",
      icon: FaGift,
      hasSubMenu: true,
      isActive: false,
      access: "Gift",
      items: [
        {
          title: "Gift Details",
          url: "/gift-list",
          access: "Gift",
        },
        // {
        //   title: "Enquiry Report",
        //   url: "/fo-enquiry-list",
        //   access: "Team",
        // },
      ],
    },

    // {
    //   title: "Fo Enquiry Report",
    //   url: "#",
    //   icon: FaUsers,
    //   hasSubMenu: true,
    //   isActive: false,
    //   access: "Enquiry Report",
    //   items: [
    //     {
    //       title: "Report",
    //       url: "/",
    //       access: "Enquiry Report",
    //     },
    //   ],
    // },
    // {
    //   title: "Activity Coordinator",
    //   url: "#",
    //   icon: FaUsers,
    //   hasSubMenu: true,
    //   isActive: false,
    //   access: "Team",
    //   items: [
    //     {
    //       title: "Add Activity Coordinator",
    //       url: "/activity-co-ordinator-add",
    //       access: "Team",
    //     },
    //     {
    //       title: "Activity Coordinators List",
    //       url: "/activity-co-ordinator-info",
    //       access: "Team",
    //     },
    //   ],
    // },
    {
      title: "Project",
      url: "#",
      icon: FaClipboardList,
      hasSubMenu: true,
      isActive: false,
      access: "Project",
      items: [
        {
          title: "Add Project",
          url: "/project-add",
          access: "Project",
        },
        {
          title: "Project List",
          url: "/project-list",
          access: "Project",
        },
      ],
    },
    {
      title: "Billing Supportings",
      url: "#",
      icon: BsClipboard2DataFill,
      hasSubMenu: true,
      isActive: false,
      access: "Billing Supportings",
      items: [
        {
          title: "Add Billing Supportings",
          url: "/billing-supportings-add",
          access: "Billing Supportings",
        },
        {
          title: "Billing Supportings Info",
          url: "/billing-supportings-info",
          access: "Billing Supportings",
        },
      ],
    },
    {
      title: " Payment Requisition",
      url: "#",
      icon: FaMoneyCheck,
      hasSubMenu: true,
      isActive: false,
      access: "Payment Requisition",
      items: [
        {
          title: "Add Payment Requisition",
          url: "/payment-requisition-add",
          access: "Payment Requisition",
        },
        {
          title: "Payment Requisition Info",
          url: "/payment-requisition-list",
          access: "Payment Requisition",
        },
      ],
    },
    {
      title: "Fo Payment Requisition",
      url: "#",
      icon: FaMoneyCheck,
      hasSubMenu: true,
      isActive: false,
      access: "Fo Payment Requisition",
      items: [
        {
          title: "Add FO Payment Requisition",
          url: "/fo-payment-requisition-add",
          access: "Fo Payment Requisition",
        },
        {
          title: "FO Payment Requisition Info",
          url: "/fo-payment-requisition-list",
          access: "Fo Payment Requisition",
        },
      ],
    },
    {
      title: "Client Purchase Order",
      url: "#",
      icon: PiUserListFill,
      hasSubMenu: true,
      isActive: false,
      access: "Client PO",
      items: [
        {
          title: "Add Client Purchase Order",
          url: "/client-po-add",
          access: "Client PO",
        },
        {
          title: "Client Purchase Order",
          url: "/client-po-list",
          access: "Client PO",
        },
      ],
    },
    {
      title: "Invoice",
      url: "#",
      icon: FaFileInvoice,
      hasSubMenu: true,
      isActive: false,
      access: "Invoice",
      items: [
        {
          title: "Add Invoice",
          url: "/invoice-add",
          access: "Invoice",
        },
        {
          title: "Invoice List",
          url: "/invoice-list",
          access: "Invoice",
        },
      ],
    },
    {
      title: "Payment Receipt",
      url: "#",
      icon: GiTakeMyMoney,
      hasSubMenu: true,
      isActive: false,
      access: "Payment Received",
      items: [
        {
          title: "Add Payment Receipt",
          url: "/payment-receipt-add",
          access: "Payment Received",
        },
        {
          title: "Payment Receipt List",
          url: "/payment-receipt-list",
          access: "Payment Received",
        },
      ],
    },
    // {
    //   title: "Report",
    //   url: "#",
    //   icon: GiPieChart,
    //   hasSubMenu: true,
    //   isActive: false,
    //   access: "Role Management",
    //   items: [
    //     {
    //       title: "Running Project",
    //       url: "/running-project",
    //       role: []
    //     },
    //     {
    //       title: "Closed Project",
    //       url: "/closed-project",
    //       role: []
    //     },
    //     {
    //       title: "Unbilled Closed",
    //       url: "/unbilled-closed-project",
    //       role: []
    //     },
    //     {
    //       title: "Billed Closed",
    //       url: "/billed-closed-project",
    //       role: []
    //     },
    //     {
    //       title: "Outstanding Report",
    //       url: "/outstanding-report",
    //       role: []
    //     },
    //   ],
    // },

  ],

}

export function AppSidebar({
  ...props
}) {

  const targetRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", targetRef.current.scrollTop);
    };

    targetRef.current.addEventListener("scroll", handleScroll);
    targetRef.current.scrollTop = (sessionStorage.getItem("scrollPosition"));
  }, []);



  return (
    (<Sidebar collapsible="icon" {...props} >
      <SidebarHeader className="p-3 bg-white">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <img src={pmsLogo} alt="logo" className=" mx-auto" />
      </SidebarHeader>
      <SidebarContent ref={targetRef}>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
