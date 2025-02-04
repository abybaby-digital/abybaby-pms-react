import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { FaTruck } from "react-icons/fa";
import { PiTractorFill } from "react-icons/pi";
import { GiFarmTractor } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";
import { GiTyre } from "react-icons/gi";
import { GiPlantSeed } from "react-icons/gi";
import { MdPestControl } from "react-icons/md";
import { GiFertilizerBag } from "react-icons/gi";
import { CgCreditCard } from "react-icons/cg";


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import pmsLogo from "../assets/images/PMS.png"

import { BsBuildingsFill } from "react-icons/bs";
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
import { GiPieChart } from "react-icons/gi";
import { PiNetworkBold } from "react-icons/pi";



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
      role: []
    },
    {
      title: "Role Management",
      url: "#",
      icon: PiNetworkBold,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Role",
          url: "/role-add",
          role: []
        },
        {
          title: " Role List",
          url: "/role-list",
          role: []
        },
      ],
    },
    {
      title: "Company",
      url: "#",
      icon: BsBuildingsFill,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Company",
          url: "/company-add",
          role: []
        },
        {
          title: " Company List",
          url: "/company-list",
          role: []
        },
      ],
    },
    {
      title: "Branch",
      url: "#",
      icon: FaBuilding,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Branch",
          url: "/branch-add",
          role: []
        },
        {
          title: " Branch List",
          url: "/branch-list",
          role: []
        },
      ],
    },
    {
      title: "Department",
      url: "#",
      icon: FaBuildingColumns,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Department",
          url: "/department-add",
          role: []
        },
        {
          title: "Department List",
          url: "/department-list",
          role: []
        },
      ],
    },
    {
      title: "Vendor",
      url: "#",
      icon: FaBuildingUser,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Vendor",
          url: "/vendor-add",
          role: []
        },
        {
          title: "Vendor List",
          url: "/vendor-list",
          role: []
        },
      ],
    },
    {
      title: "Client",
      url: "#",
      icon: FaUserTie,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Client",
          url: "/client-add",
          role: []
        },
        {
          title: "Client List",
          url: "/client-list",
          role: []
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: FaUsers,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add User",
          url: "/user-add",
          role: []
        },
        {
          title: "Users List",
          url: "/user-list",
          role: []
        },
        {
          title: "Change User Password",
          url: "/change-user-password",
          role: []
        },
      ],
    },
    {
      title: "Project",
      url: "#",
      icon: FaClipboardList,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Project",
          url: "/project-add",
          role: []
        },
        {
          title: "Project List",
          url: "/project-list",
          role: []
        },
      ],
    },
    {
      title: "Billing Supportings",
      url: "#",
      icon: BsClipboard2DataFill,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Billing Supportings",
          url: "/billing-supprotings-add",
          role: []
        },
        {
          title: "Billing Supportings Info",
          url: "/billing-supprotings-info",
          role: []
        },
      ],
    },
    {
      title: " Payment Requisition",
      url: "#",
      icon: FaMoneyCheck,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Payment Requisition",
          url: "/payment-requisition-add",
          role: []
        },
        {
          title: "Payment Requisition Info",
          url: "/payment-requisition-info",
          role: []
        },
      ],
    },
    {
      title: "Client Purchase Order",
      url: "#",
      icon: PiUserListFill,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Client Purchase Order",
          url: "/client-po-add",
          role: []
        },
        {
          title: "Client Purchase Order",
          url: "/client-po-list",
          role: []
        },
      ],
    },
    {
      title: "Invoice",
      url: "#",
      icon: FaFileInvoice,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Invoice",
          url: "/invoice-add",
          role: []
        },
        {
          title: "Invoice List",
          url: "/invoice-list",
          role: []
        },
      ],
    },
    {
      title: "Payment Receipt",
      url: "#",
      icon: GiTakeMyMoney,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Add Payment Receipt",
          url: "/payment-receipt-add",
          role: []
        },
        {
          title: "Payment Receipt List",
          url: "/payment-receipt-list",
          role: []
        },
      ],
    },
    {
      title: "Report",
      url: "#",
      icon: GiPieChart,
      hasSubMenu: true,
      isActive: false,
      items: [
        {
          title: "Running Project",
          url: "/running-project",
          role: []
        },
        {
          title: "Closed Project",
          url: "/closed-project",
          role: []
        },
        {
          title: "Unbilled Closed",
          url: "/unbilled-closed-project",
          role: []
        },
        {
          title: "Billed Closed",
          url: "/billed-closed-project",
          role: []
        },
        {
          title: "Outstanding Report",
          url: "/outstanding-report",
          role: []
        },
      ],
    },

  ],

}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-3 bg-white">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <img src={pmsLogo} alt="logo" className=" mx-auto" />
      </SidebarHeader>
      <SidebarContent>
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
