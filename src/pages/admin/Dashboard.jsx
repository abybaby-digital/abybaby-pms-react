import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import CommonTable from "../../components/admin/dashboard/CommonTable";
import AdminHead from "../../components/common/AdminHead";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdBallot } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";

import { MdOutlinePendingActions } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getFYList, getProjectList, getReport } from "../../services/api";
import { useState } from "react";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  // const auth = useSelector((state) => state.auth);
  // console.log(auth);
  // console.log(token);

  const navigate = useNavigate();

  const runningProjectTableHead = [
    "Project No.",
    "Project Name",
    "Company",
    "Client",
    "Start Date",
    "End Date",
  ];
  const unbilledClosedProjects = [
    "Project No.",
    "Project Name",
    "Company",
    "Client",
    "Start Date",
    "End Date",
  ];
  const billedClosedProjects = [
    "Project No.",
    "Project Name",
    "Company",
    "Client",
    "Start Date",
    "End Date",
  ];
  const paymentOutstandingProjects = [
    "Project No.",
    "Project Name",
    "Company",
    "Client",
    "Start Date",
    "End Date",
  ];

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  const [fincYear, setFincYear] = useState(fincYearList?.response[0].id);
  // REPORT API CALL
  const { data: projectReport, isLoading: reportDataLoading } = useQuery({
    queryKey: ["project-report", token, fincYear],
    queryFn: async () => {
      return await getReport(token, fincYear);
    },
  });
  //   console.log(projectList);

  const projectListByCategory = (title, navigate_url, status, billed, paid, partial) => {
    sessionStorage.setItem("project_list_title", title);
    sessionStorage.setItem("status", status);
    sessionStorage.setItem("billed", billed);
    sessionStorage.setItem("paid", paid);
    sessionStorage.setItem("partial", partial);
    navigate(navigate_url);
  };

  // RUNNING PROJECT
  const { data: runningProjectList = [] } = useQuery({
    queryKey: ["running-project", fincYear],
    queryFn: async () => {
      return await getProjectList(
        token,
        "",
        "",
        "",
        +fincYear,
        0,
        10,
        "1",
        "",
        ""
      );
    },
  });
  // UNBILLED CLOSED PROJECT
  const { data: unbilledClosedProjectList = [] } = useQuery({
    queryKey: ["unbilled-closed-project", fincYear],
    queryFn: async () => {
      return await getProjectList(
        token,
        "",
        "",
        "",
        +fincYear,
        0,
        10,
        2,
        0,
        ""
      );
    },
  });
  // BILLED CLOSED PROJECT
  const { data: billedClosedProjectList = [] } = useQuery({
    queryKey: ["billed-closed-project", fincYear],
    queryFn: async () => {
      return await getProjectList(
        token,
        "",
        "",
        "",
        +fincYear,
        0,
        10,
        2,
        1,
        ""
      );
    },
  });
  // PAYMENT OUTSTANDING PROJECT
  const { data: paymentOutstandingProjectList = [] } = useQuery({
    queryKey: ["payment-outstanding-project", fincYear],
    queryFn: async () => {
      return await getProjectList(
        token,
        "",
        "",
        "",
        +fincYear,
        0,
        10,
        2,
        1,
        0
      );
    },
  });

//   console.log(runningProjectList.response);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="dashboard" />
        <div className="flex flex-1 flex-col gap-2 p-3  bg-whitesmoke">
          <div className="financial-year-filter rounded-2xl shadow bg-white flex lg:flex-row flex-col items-center justify-center p-3 gap-3">
            Search Data for financial year :
            <form action="#" className="flex items-center gap-3">
              <select
                name=""
                id=""
                className="block"
                onChange={(e) => {
                  setFincYear(e.target.value);
                }}
              >
                {fincYearList?.response?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.financial_year}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="grid mt-10 auto-rows-min gap-x-5 gap-y-10 lg:grid-cols-4 grid-cols-1">
          <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-lightdark shadow-lg shadow-lightdark -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                <MdBallot className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end mb-8">
                <p className="text-2xl font-bold">
                  {projectReport?.response[7]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[7]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[7]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Total Projects
                </p>
              </div>
              <Link
                to="/project-list"
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow-lg px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </Link>
            </div>
            <div className="dash-card bg-white rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-[#fec107] shadow-lg shadow-[#fec107] -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                <MdOutlinePendingActions className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end mb-8">
                <p className="text-2xl font-bold">
                  {projectReport?.response[0]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[0]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[0]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Running Projects
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "running project",
                    "/project-list/running",
                    "1",
                    null,
                    null
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>
            <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-[#27a844] shadow-lg shadow-[#27a844]  -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                <GiCardboardBoxClosed className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end mb-8">
                <p className="text-2xl font-bold">
                  {projectReport?.response[1]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[1]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[1]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Closed Projects
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "closed project",
                    "/project-list/closed",
                    "2",
                    null,
                    null
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>
            <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-[#17a2b7] shadow-lg shadow-[#17a2b7]  -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                <FaMoneyBillTransfer className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end">
                <p className="text-2xl font-bold">
                  {projectReport?.response[2]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[2]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[2]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Unbilled Closed Projects
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "Unbilled Closed Projects",
                    "/project-list/unbilled-closed",
                    "2",
                    "0",
                    null
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>
            
          </div>
          <div className="grid mt-10 auto-rows-min gap-x-5 gap-y-10 xl:grid-cols-4 lg:grid-cols-2">
            
            <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-lightdark shadow-lg shadow-lightdark -mt-[40px] p-3 w-[60px] text-center rounded-2xl">
                <FaMoneyBillTrendUp className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end">
                <p className="text-2xl font-bold">
                  {projectReport?.response[3]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[3]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[3]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Billed Closed Project
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "billed Closed Projects",
                    "/project-list/billed-closed",
                    "2",
                    "1",
                    null
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>

            <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-[#fec107] shadow-lg shadow-[#fec107]  p-3 w-[60px] -mt-[40px] text-center rounded-2xl">
                <FaMoneyBillWave className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end mb-8">
                <p className="text-2xl font-bold">
                  {projectReport?.response[4]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[4]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[4]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Payment Outstanding Projects ( Billed )
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "Payment Outstanding Projects",
                    "/project-list/billed-closed",
                    "2",
                    "1",
                    "0"
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>

            <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-[#27a844] shadow-lg shadow-[#27a844] p-3 w-[60px] -mt-[40px] text-center rounded-2xl">
                <FaMoneyBills className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end mb-8">
                <p className="text-2xl font-bold">
                  {projectReport?.response[5]?.project_count}
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[5]?.project_amount_pre_gst} (pre GST)
                </p>
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[5]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                  Payment Received Projects
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "Payment Received Projects",
                    "/project-list/billed-closed",
                    "2",
                    "1",
                    "1"
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>
            <div className="dash-card bg-white  rounded-3xl shadow border flex items-start justify-between p-5">
              <div className="bg-[#27a844] shadow-lg shadow-[#27a844] p-3 w-[60px] -mt-[40px] text-center rounded-2xl">
                <FaMoneyBills className="text-3xl text-white inline" />
              </div>
              <div className="dash-card-content text-end mb-8">
                <p className="text-2xl font-bold">
                  {projectReport?.response[6]?.project_count}
                </p>
                {/* <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[6]?.project_amount_pre_gst} (pre GST)
                </p> */}
                <p className="text-lg text-lightdark">
                  <MdOutlineCurrencyRupee className="inline mb-1" />
                  {projectReport?.response[6]?.project_amount_with_gst} (with GST)
                </p>
                <p className="text-lg text-lightdark font-merri italic font-bold ">
                Partial Payment Received
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  projectListByCategory(
                    "Partial Payment Received",
                    "/project-list/partial-payment",
                    "2",
                    "1",
                    "",
                    "2"
                  );
                }}
                className="absolute more-info text-black bg-gray-200 border left-0 bottom-0 py-2 shadow px-3 rounded-xl"
              >
                <PiArrowFatLinesRightFill className="inline me-1" />
                More Info
              </button>
            </div>
          </div>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">
            <CommonTable
              table_title="running projects"
              table_head_items={runningProjectTableHead}
              table_data_items={runningProjectList?.response}
            />
            <CommonTable
              table_title="Unbilled Closed Projects"
              table_head_items={unbilledClosedProjects}
              table_data_items={unbilledClosedProjectList?.response}
            />
            <CommonTable
              table_title="Billed Closed Projects"
              table_head_items={billedClosedProjects}
              table_data_items={billedClosedProjectList?.response}
            />
            <CommonTable
              table_title="Payment Outstanding Projects"
              table_head_items={paymentOutstandingProjects}
              table_data_items={paymentOutstandingProjectList?.response}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
