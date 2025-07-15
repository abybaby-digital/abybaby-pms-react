import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { addBillingSupportings, getFYList, getProjectList } from "../../../services/api";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddBillingSupportings() {

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [imagePreviews, setImagePreviews] = useState({});
  const [fincYear, setFincYear] = useState(null);

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list", fincYear],
    queryFn: async () => await getProjectList(token, "", "", "", fincYear, "", "", "", 2, 0, 0),
  });

  const addBillingMutation = useMutation({
    mutationFn: async (data) => await addBillingSupportings(token,
      +data.project_id,
      data.center_vehicle_hire_bill,
      (data.center_vehicle_hire_img?.length === 0) ? null : data.center_vehicle_hire_img,  // Fixed the field name to correct one
      data.center_vehicle_hire_comment,
      data.manpower_bill,
      (data.manpower_bill_img?.length === 0) ? null : data.manpower_bill_img,
      data.manpower_bill_comment,
      data.gift_bill,
      (data.gift_bill_img?.length === 0) ? null : data.gift_bill_img,
      data.gift_bill_comment,
      data.billing_ppt,
      (data.billing_ppt_img?.length === 0) ? null : data.billing_ppt_img,
      data.billing_ppt_comment,
      data.report,
      (data.report_img?.length === 0) ? null : data.report_img,
      data.report_comment,
      data.day_wise_log_book,
      (data.day_wise_log_book_img?.length === 0) ? null : data.day_wise_log_book_img,
      data.day_wise_log_book_comment,
      data.day_wise_meter_console,
      (data.day_wise_meter_console_img?.length === 0) ? null : data.day_wise_meter_console_img,
      data.day_wise_meter_console_comment,
      data.no_objection_certificate,
      (data.no_objection_certificate_img?.length === 0) ? null : data.no_objection_certificate_img,
      data.no_objection_certificate_comment,
      data.snacks_bill,
      (data.snacks_bill_img?.length === 0) ? null : data.snacks_bill_img,
      data.snacks_bill_comment,
      data.element_wise_photo,
      (data.element_wise_photo_img?.length === 0) ? null : data.element_wise_photo_img,
      data.element_wise_photo_comment,
      data.nagar_nigan,
      (data.nagar_nigan_img?.length === 0) ? null : data.nagar_nigan_img,
      data.nagar_nigan_comment,
      data.fuel_bill,
      (data.fuel_bill_img?.length === 0) ? null : data.fuel_bill_img,
      data.fuel_bill_comment,
      data.customer_gift,
      (data.customer_gift_img?.length === 0) ? null : data.customer_gift_img,
      data.customer_gift_comment,
      data.customer_acknowledge,
      (data.customer_acknowledge_img?.length === 0) ? null : data.customer_acknowledge_img,
      data.customer_acknowledge_comment,
      data.route_plan,
      (data.route_plan_img?.length === 0) ? null : data.route_plan_img,
      data.route_plan_comment,
      data.approvel_copy,
      (data.approvel_copy_img?.length === 0) ? null : data.approvel_copy_img,
      data.approvel_copy_comment,
      data.po,
      (data.po_img?.length === 0) ? null : data.po_img,
      data.po_comment,
      data.wayforward_learning,
      (data.wayforward_learning_img?.length === 0) ? null : data.wayforward_learning_img,
      data.wayforward_learning_comment,
      data.courier_delivery_challan,
      (data.courier_delivery_challan_img?.length === 0) ? null : data.courier_delivery_challan_img,
      data.courier_delivery_challan_comment,
      data.transport_bill,
      (data.transport_bill_img?.length === 0) ? null : data.transport_bill_img,
      data.transport_bill_comment,
      data.anocher_bill,
      (data.anocher_bill_img?.length === 0) ? null : data.anocher_bill_img,
      data.anocher_bill_comment,
      data.any_other_supporting,
      (data.any_other_supporting_img?.length === 0) ? null : data.any_other_supporting_img,
      data.any_other_supporting_comment,
      // fincYear !== null ? +fincYear : fincYearList?.response[0]?.id,
      "1",
    ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Billing support added successfully!");
        navigate("/billing-supportings-info");
      }
      else {
        toast.error(response.message);
      }
    },
    onError: (error) => toast.error("Failed to add billing support: " + error.message),
  });

  const onSubmit = (data) => {
    console.log(data);
    addBillingMutation.mutate(data);
  };

  const checkFinancialYear = () => {
    if (fincYear === null || fincYear === "NA") {
      toast.error("Choose Financial Year First !!");
    }
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Billing Supportings" />

        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">


          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow mx-auto 2xl:w-[80%] w-full overflow-hidden">
            {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl">ADD BILLING SUPPORTINGS</h2> */}
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                ADD BILLING SUPPORTINGS
              </h2>
              <div className="finance-year-filter">
                <form action="#" className="flex items-center gap-3">
                  <label htmlFor="financeYear" className="text-nowrap m-0">Select Financial Year</label>
                  <select
                    name="financeYear"
                    id="financeYear"
                    className="block"
                    onChange={(e) => {
                      setFincYear(e.target.value);
                    }}
                  >
                    {/* <option value="NA">--Select--</option> */}
                    {fincYearList?.response?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.financial_year}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>

            {isLoadingProjects ?
              <FormSubmitLoader loading_msg="" />
              :
              <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

                {/* Project Selection */}
                <div className="form-group col-span-2">
                  <label htmlFor="project_id">Project ID <span className="text-red-600">*</span></label>
                  <select id="project_id" {...register("project_id", { required: "Project is required" })} className="block w-full"
                  // disabled={fincYear === null || fincYear === "NA"}
                  >
                    <option value="">Select Project</option>

                    {!isLoadingProjects ?
                      (projectList?.response?.map((project) => (
                        <option key={project.id} value={project.id}>{`${project.project_number} - ${project.project_name}`}</option>
                      ))) :
                      (<option value="#" disabled>Loading...</option>)
                    }
                  </select>
                  {errors.project_id && <span className="text-red-600 text-sm">{errors.project_id.message}</span>}
                </div>

                {/* Canter/Vehicle Hire Bill Selection */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="canter-vehicle-bill">Canter/Vehicle Hire Bill</label>
                  <select id="center_vehicle_hire_bill" {...register("center_vehicle_hire_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>

                  {/* Upload Section */}
                  {
                    watch("center_vehicle_hire_bill") === "0" || watch("center_vehicle_hire_bill") === "NA" ?
                      (
                        <div className="mt-2">
                          <label htmlFor="center_vehicle_hire_comment" className="text-sm">Remarks</label>
                          <textarea {...register("center_vehicle_hire_comment")} id="center_vehicle_hire_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                        </div>
                      ) :
                      watch("center_vehicle_hire_bill") === "1" ?
                        (
                          <div className="mt-2">
                            <label htmlFor="center_vehicle_hire_img" className="text-sm">Upload Canter/Vehicle Hire Bill</label>
                            <input
                              type="file"
                              id="center_vehicle_hire_img"
                              multiple
                              onChange={(e) => setValue("center_vehicle_hire_img", Array.from(e.target.files))}
                              className="block border w-full rounded-lg p-3 bg-white"
                            />
                          </div>
                        ) : null

                  }

                </div>
                {/* Manpower Bill Bill Selection */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="manpower_bill">Manpower Bill</label>
                  <select id="manpower_bill" {...register("manpower_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>

                  {/* Upload Section */}
                  {
                    watch("manpower_bill") === "0" || watch("manpower_bill") === "NA" ?
                      (
                        <div className="mt-2">
                          <label htmlFor="manpower_bill_comment" className="text-sm">Remarks</label>
                          <textarea {...register("manpower_bill_comment")} id="manpower_bill_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                        </div>
                      ) :
                      watch("manpower_bill") === "1" ?
                        (
                          <div className="mt-2">
                            <label htmlFor="manpower_bill_img" className="text-sm">Upload Canter/Vehicle Hire Bill</label>
                            <input
                              type="file"
                              id="center_vehicle_hire_img"
                              multiple
                              onChange={(e) => setValue("manpower_bill_img", Array.from(e.target.files))}
                              {...register("manpower_bill_img")}
                              className="block border w-full rounded-lg p-3 bg-white"
                            />
                          </div>
                        ) : null

                  }
                </div>
                {/* Gift Bill */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="gift_bill">Gift Bill</label>
                  <select id="gift_bill" {...register("gift_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("gift_bill") === "0" || watch("gift_bill") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="gift_bill_comment" className="text-sm">Remarks</label>
                      <textarea {...register("gift_bill_comment")} id="gift_bill_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("gift_bill") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="gift_bill_img" className="text-sm">Upload Gift Bill </label>
                      <input type="file" id="gift_bill_img"
                        multiple
                        onChange={(e) => setValue("gift_bill_img", Array.from(e.target.files))}
                        {...register("gift_bill_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Billing PPT */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="billing_ppt">Billing PPT With Geo Tag Picture</label>
                  <select id="billing_ppt" {...register("billing_ppt")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("billing_ppt") === "0" || watch("billing_ppt") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="billing_ppt_comment" className="text-sm">Remarks</label>
                      <textarea {...register("billing_ppt_comment")} id="billing_ppt_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("billing_ppt") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="billing_ppt_img" className="text-sm">Upload Billing PPT </label>
                      <input type="file" id="billing_ppt_img" multiple
                        onChange={(e) => setValue("billing_ppt_img", Array.from(e.target.files))} {...register("billing_ppt_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Report */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="report">Report ( Detailed & Dashboard )</label>
                  <select id="report" {...register("report")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("report") === "0" || watch("report") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="report_comment" className="text-sm">Remarks</label>
                      <textarea {...register("report_comment")} id="report_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("report") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="report_img" className="text-sm">Upload Report </label>
                      <input type="file" id="report_img" multiple
                        onChange={(e) => setValue("report_img", Array.from(e.target.files))} {...register("report_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Day Wise Log Book */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="day_wise_log_book">Day Wise Log Book</label>
                  <select id="day_wise_log_book" {...register("day_wise_log_book")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("day_wise_log_book") === "0" || watch("day_wise_log_book") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="day_wise_log_book_comment" className="text-sm">Remarks</label>
                      <textarea {...register("day_wise_log_book_comment")} id="day_wise_log_book_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("day_wise_log_book") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="day_wise_log_book_img" className="text-sm">Upload Day Wise Log Book </label>
                      <input type="file" id="day_wise_log_book_img" multiple
                        onChange={(e) => setValue("day_wise_log_book_img", Array.from(e.target.files))} {...register("day_wise_log_book_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Day Wise Meter Console */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="day_wise_meter_console">Day Wise Meter Console Photo</label>
                  <select id="day_wise_meter_console" {...register("day_wise_meter_console")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("day_wise_meter_console") === "0" || watch("day_wise_meter_console") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="day_wise_meter_console_comment" className="text-sm">Remarks</label>
                      <textarea {...register("day_wise_meter_console_comment")} id="day_wise_meter_console_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("day_wise_meter_console") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="day_wise_meter_console_img" className="text-sm">Upload Day Wise Meter Console </label>
                      <input type="file" id="day_wise_meter_console_img" multiple
                        onChange={(e) => setValue("day_wise_meter_console_img", Array.from(e.target.files))} {...register("day_wise_meter_console_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* No Objection Certificate */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="no_objection_certificate">No Objection Certificate</label>
                  <select id="no_objection_certificate" {...register("no_objection_certificate")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("no_objection_certificate") === "0" || watch("no_objection_certificate") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="no_objection_certificate_comment" className="text-sm">Remarks</label>
                      <textarea {...register("no_objection_certificate_comment")} id="no_objection_certificate_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("no_objection_certificate") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="no_objection_certificate_img" className="text-sm">Upload No Objection Certificate </label>
                      <input type="file" id="no_objection_certificate_img" multiple
                        onChange={(e) => setValue("no_objection_certificate_img", Array.from(e.target.files))} {...register("no_objection_certificate_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Snacks Bill */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="snacks_bill">Snacks Bill</label>
                  <select id="snacks_bill" {...register("snacks_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("snacks_bill") === "0" || watch("snacks_bill") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="snacks_bill_comment" className="text-sm">Remarks</label>
                      <textarea {...register("snacks_bill_comment")} id="snacks_bill_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("snacks_bill") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="snacks_bill_img" className="text-sm">Upload Snacks Bill </label>
                      <input type="file" id="snacks_bill_img" multiple
                        onChange={(e) => setValue("snacks_bill_img", Array.from(e.target.files))} {...register("snacks_bill_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Element Wise Photo */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="element_wise_photo">Element Wise Photo</label>
                  <select id="element_wise_photo" {...register("element_wise_photo")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("element_wise_photo") === "0" || watch("element_wise_photo") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="element_wise_photo_comment" className="text-sm">Remarks</label>
                      <textarea {...register("element_wise_photo_comment")} id="element_wise_photo_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("element_wise_photo") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="element_wise_photo_img" className="text-sm">Upload Element Wise Photo </label>
                      <input type="file" id="element_wise_photo_img" multiple
                        onChange={(e) => setValue("element_wise_photo_img", Array.from(e.target.files))} {...register("element_wise_photo_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Nagar Nigan */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="nagar_nigan">Nagar Nigam / Venue Charges / Any Other Charge</label>
                  <select id="nagar_nigan" {...register("nagar_nigan")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("nagar_nigan") === "0" || watch("nagar_nigan") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="nagar_nigan_comment" className="text-sm">Remarks</label>
                      <textarea {...register("nagar_nigan_comment")} id="nagar_nigan_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("nagar_nigan") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="nagar_nigan_img" className="text-sm">Upload Nagar Nigan </label>
                      <input type="file" id="nagar_nigan_img" multiple
                        onChange={(e) => setValue("nagar_nigan_img", Array.from(e.target.files))} {...register("nagar_nigan_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Fuel Bill */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="fuel_bill">Fuel Bill</label>
                  <select id="fuel_bill" {...register("fuel_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("fuel_bill") === "0" || watch("fuel_bill") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="fuel_bill_comment" className="text-sm">Remarks</label>
                      <textarea {...register("fuel_bill_comment")} id="fuel_bill_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("fuel_bill") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="fuel_bill_img" className="text-sm">Upload Fuel Bill </label>
                      <input type="file" id="fuel_bill_img" multiple
                        onChange={(e) => setValue("fuel_bill_img", Array.from(e.target.files))} {...register("fuel_bill_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Customer Gift */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="customer_gift">Customer Gifts Details ( Below 1000Rs)</label>
                  <select id="customer_gift" {...register("customer_gift")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("customer_gift") === "0" || watch("customer_gift") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="customer_gift_comment" className="text-sm">Remarks</label>
                      <textarea {...register("customer_gift_comment")} id="customer_gift_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("customer_gift") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="customer_gift_img" className="text-sm">Upload Customer Gift </label>
                      <input type="file" id="customer_gift_img" multiple
                        onChange={(e) => setValue("customer_gift_img", Array.from(e.target.files))} {...register("customer_gift_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Customer Acknowledge */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="customer_acknowledge">Customer Acknowledgement (Rs 1001 & Above)</label>
                  <select id="customer_acknowledge" {...register("customer_acknowledge")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("customer_acknowledge") === "0" || watch("customer_acknowledge") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="customer_acknowledge_comment" className="text-sm">Remarks</label>
                      <textarea {...register("customer_acknowledge_comment")} id="customer_acknowledge_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("customer_acknowledge") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="customer_acknowledge_img" className="text-sm">Upload Customer Acknowledge </label>
                      <input type="file" id="customer_acknowledge_img" multiple
                        onChange={(e) => setValue("customer_acknowledge_img", Array.from(e.target.files))} {...register("customer_acknowledge_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Route Plan */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="route_plan">Route Plan</label>
                  <select id="route_plan" {...register("route_plan")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("route_plan") === "0" || watch("route_plan") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="route_plan_comment" className="text-sm">Remarks</label>
                      <textarea {...register("route_plan_comment")} id="route_plan_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("route_plan") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="route_plan_img" className="text-sm">Upload Route Plan </label>
                      <input type="file" id="route_plan_img" multiple
                        onChange={(e) => setValue("route_plan_img", Array.from(e.target.files))} {...register("route_plan_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Approval Copy */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="approvel_copy">Approval Copy</label>
                  <select id="approvel_copy" {...register("approvel_copy")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("approvel_copy") === "0" || watch("approvel_copy") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="approvel_copy_comment" className="text-sm">Remarks</label>
                      <textarea {...register("approvel_copy_comment")} id="approvel_copy_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("approvel_copy") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="approvel_copy_img" className="text-sm">Upload Approval Copy </label>
                      <input type="file" id="approvel_copy_img" multiple
                        onChange={(e) => setValue("approvel_copy_img", Array.from(e.target.files))} {...register("approvel_copy_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Purchase Order */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="po">PO</label>
                  <select id="po" {...register("po")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("po") === "0" || watch("po") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="po_comment" className="text-sm">Remarks</label>
                      <textarea {...register("po_comment")} id="po_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("po") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="po_img" className="text-sm">Upload Purchase Order </label>
                      <input type="file" id="po_img" multiple
                        onChange={(e) => setValue("po_img", Array.from(e.target.files))} {...register("po_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Way Forward Learning */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="wayforward_learning">Wayforward & Learning</label>
                  <select id="wayforward_learning" {...register("wayforward_learning")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("wayforward_learning") === "0" || watch("wayforward_learning") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="wayforward_learning_comment" className="text-sm">Remarks</label>
                      <textarea {...register("wayforward_learning_comment")} id="wayforward_learning_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("wayforward_learning") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="wayforward_learning_img" className="text-sm">Upload Way Forward Learning </label>
                      <input type="file" id="wayforward_learning_img" multiple
                        onChange={(e) => setValue("wayforward_learning_img", Array.from(e.target.files))} {...register("wayforward_learning_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Courier Delivery Challan */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="courier_delivery_challan">Courier Slip/ Delivery Challan</label>
                  <select id="courier_delivery_challan" {...register("courier_delivery_challan")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("courier_delivery_challan") === "0" || watch("courier_delivery_challan") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="courier_delivery_challan_comment" className="text-sm">Remarks</label>
                      <textarea {...register("courier_delivery_challan_comment")} id="courier_delivery_challan_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("courier_delivery_challan") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="courier_delivery_challan_img" className="text-sm">Upload Courier Delivery Challan </label>
                      <input type="file" id="courier_delivery_challan_img" multiple
                        onChange={(e) => setValue("courier_delivery_challan_img", Array.from(e.target.files))} {...register("courier_delivery_challan_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Transport Bill */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="transport_bill">Transportation bill</label>
                  <select id="transport_bill" {...register("transport_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("transport_bill") === "0" || watch("transport_bill") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="transport_bill_comment" className="text-sm">Remarks</label>
                      <textarea {...register("transport_bill_comment")} id="transport_bill_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("transport_bill") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="transport_bill_img" className="text-sm">Upload Transport Bill </label>
                      <input type="file" id="transport_bill_img" multiple
                        onChange={(e) => setValue("transport_bill_img", Array.from(e.target.files))} {...register("transport_bill_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Another Bill */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="anocher_bill">Anchor Bill</label>
                  <select id="anocher_bill" {...register("anocher_bill")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("anocher_bill") === "0" || watch("anocher_bill") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="anocher_bill_comment" className="text-sm">Remarks</label>
                      <textarea {...register("anocher_bill_comment")} id="anocher_bill_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("anocher_bill") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="anocher_bill_img" className="text-sm">Upload Another Bill </label>
                      <input type="file" id="anocher_bill_img" multiple
                        onChange={(e) => setValue("anocher_bill_img", Array.from(e.target.files))} {...register("anocher_bill_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>

                {/* Other Supporting Documents */}
                <div className="form-group bg-whitesmoke p-5 rounded-2xl">
                  <label htmlFor="any_other_supporting">Any Other Supporting ( if any ) – Manually Fill Up</label>
                  <select id="any_other_supporting" {...register("any_other_supporting")} className="block w-full">
                    <option value="">--Select--</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>

                  </select>
                  {watch("any_other_supporting") === "0" || watch("any_other_supporting") === "NA" ? (
                    <div className="mt-2">
                      <label htmlFor="any_other_supporting_comment" className="text-sm">Remarks</label>
                      <textarea {...register("any_other_supporting_comment")} id="any_other_supporting_comment" cols="30" rows="3" className="border rounded-2xl w-full p-2 focus:outline-none"></textarea>
                    </div>
                  ) : watch("any_other_supporting") === "1" ? (
                    <div className="mt-2">
                      <label htmlFor="any_other_supporting_img" className="text-sm">Upload Other Supporting Document </label>
                      <input type="file" id="any_other_supporting_img" multiple
                        onChange={(e) => setValue("any_other_supporting_img", Array.from(e.target.files))} {...register("any_other_supporting_img")} className="block border w-full rounded-lg p-3 bg-white" />
                    </div>
                  ) : null}
                </div>



              </div>}

            {
              addBillingMutation.isPending ?
                <FormSubmitLoader loading_msg="Hold on, it will take some time..." /> : null
            }

            <div className="card-footer text-center bg-gray-100 py-5">
              <button type="submit" className="px-10 py-2 text-white bg-lightdark rounded-2xl" disabled={addBillingMutation.isPending}
              // onClick={() => { checkFinancialYear() }}
              >
                {addBillingMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
