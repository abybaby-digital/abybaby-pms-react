import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { getProjectList, editClientPO, editBillingSupportings } from "../../../services/api"; // Import necessary functions

const EditBillingSupportings = ({ billingSupportings }) => {
  const token = useSelector((state) => state.auth.token);
  console.log(billingSupportings.id);

  const navigate = useNavigate();
  const { refetchList, setRefetchList, setModal } = useContext(
    dialogOpenCloseContext
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      project_id: billingSupportings?.project_id,
      center_vehicle_hire_bill: billingSupportings.center_vehicle_hire_bill,
      center_vehicle_hire_bill_comment: billingSupportings.center_vehicle_hire_bill_comment,
      manpower_bill: billingSupportings.manpower_bill,
      gift_bill: billingSupportings.gift_bill,
      billing_ppt: billingSupportings.billing_ppt,
      report: billingSupportings.report,
      day_wise_log_book: billingSupportings.day_wise_log_book,
      day_wise_meter_console: billingSupportings.day_wise_meter_console,
      no_objection_certificate: billingSupportings.no_objection_certificate,
      snacks_bill: billingSupportings.snacks_bill,
      element_wise_photo: billingSupportings.element_wise_photo,
      nagar_nigan: billingSupportings.nagar_nigan,
      fuel_bill: billingSupportings.fuel_bill,
      customer_gift: billingSupportings.customer_gift,
      customer_acknowledge: billingSupportings.customer_acknowledge,
      route_plan: billingSupportings.route_plan,
      approvel_copy: billingSupportings.approvel_copy,
      po: billingSupportings.po,
      wayforward_learning: billingSupportings.wayforward_learning,
      transport_bill: billingSupportings.transport_bill,
      anocher_bill: billingSupportings.anocher_bill,
      any_other_supporting: billingSupportings.any_other_supporting,
    }
  });

  useEffect(() => {

    Object.keys(billingSupportings).forEach(key => {
      if (key.includes("comment")) {
        setValue(key, billingSupportings[key]);
      }
    });

  }, [billingSupportings])
  const [imagePreviews, setImagePreviews] = useState({});

  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => await getProjectList(token, "", "", "", "", "", "", 2, 0, 0),
  });

  const editBillingMutation = useMutation({
    mutationFn: async (data) =>
      await editBillingSupportings(
        token,
        billingSupportings.id,
        billingSupportings.project_id,
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
        "1",
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Billing support updated successfully!");
        navigate("/billing-supportings-info");
        setModal(false);
        setRefetchList(!refetchList);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) =>
      toast.error("Failed to add billing support: " + error.message),
  });

  const onSubmit = (data) => {
    console.log(data);
    editBillingMutation.mutate(data);
  };

  return (
    isLoadingProjects ?
      <p className="text-center text-green-500 my-5 text-lg">Preparing For edit. Please wait ...</p>
      :
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  mx-auto w-full overflow-hidden"
      >

        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
          {/* Project Selection */}
          <div className="form-group col-span-2">
            <label htmlFor="project_id">
              Project ID <span className="text-red-600">*</span>
            </label>
            <select
              id="project_id"
              {...register("project_id", { required: "Project is required" })}
              className="block w-full"
            >
              <option value="" >Select Project</option>
              {projectList?.response?.map((project) => (
                <option key={project.id} value={project.id} selected={project?.id === billingSupportings?.project_id}>
                  {project.project_name}
                </option>
              ))}
            </select>
            {errors.project_id && (
              <span className="text-red-600 text-sm">
                {errors.project_id.message}
              </span>
            )}
          </div>

          {/* Canter/Vehicle Hire Bill Selection */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="canter-vehicle-bill">Canter/Vehicle Hire Bill</label>
            <select
              id="center_vehicle_hire_bill"
              {...register("center_vehicle_hire_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.center_vehicle_hire_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.center_vehicle_hire_bill === "0"}>No</option>

            </select>

            {/* Upload Section */}
            {watch("center_vehicle_hire_bill") === "0" ? (
              <div className="mt-2">
                <label htmlFor="center_vehicle_hire_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("center_vehicle_hire_comment")}
                  id="center_vehicle_hire_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("center_vehicle_hire_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="center_vehicle_hire_img" className="text-sm">
                  Upload Canter/Vehicle Hire Bill(Image/PDF)
                </label>
                <input
                  type="file"
                  id="center_vehicle_hire_img"
                  accept="image/*, application/pdf"
                  {...register("center_vehicle_hire_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.center_vehicle_hire_img && <a href={billingSupportings.center_vehicle_hire_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}



          </div>
          {/* Manpower Bill Bill Selection */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="manpower_bill">Manpower Bill</label>
            <select
              id="manpower_bill"
              {...register("manpower_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.manpower_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.manpower_bill === "0"}>No</option>

            </select>

            {/* Upload Section */}
            {watch("manpower_bill") === "0" || watch("manpower_bill") === "NA" ? (
              <div className="mt-2">
                <label htmlFor="manpower_bill_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("manpower_bill_comment")}
                  id="manpower_bill_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("manpower_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="manpower_bill_img" className="text-sm">
                  Upload Canter/Vehicle Hire Bill(Image/PDF)
                </label>
                <input
                  type="file"
                  id="center_vehicle_hire_img"
                  accept="image/*, application/pdf"
                  {...register("manpower_bill_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.manpower_bill_img && <a href={billingSupportings.manpower_bill_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>
          {/* Gift Bill */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="gift_bill">Gift Bill</label>
            <select
              id="gift_bill"
              {...register("gift_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.gift_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.gift_bill === "0"}>No</option>

            </select>
            {watch("gift_bill") === "0" || watch("gift_bill") === "NA" ? (
              <div className="mt-2">
                <label htmlFor="gift_bill_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("gift_bill_comment")}
                  id="gift_bill_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("gift_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="gift_bill_img" className="text-sm">
                  Upload Gift Bill (Image/PDF)
                </label>
                <input
                  type="file"
                  id="gift_bill_img"
                  accept="image/*, application/pdf"
                  {...register("gift_bill_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.gift_bill_img && <a href={billingSupportings.gift_bill_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Billing PPT */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="billing_ppt">Billing PPT With Geo Tag Picture</label>
            <select
              id="billing_ppt"
              {...register("billing_ppt")}
              className="block w-full"
            >
              <option value="" >--Select--</option>
              <option value="1" selected={billingSupportings?.billing_ppt === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.billing_ppt === "0"}>No</option>

            </select>
            {watch("billing_ppt") === "0" || watch("billing_ppt") === "NA" ? (
              <div className="mt-2">
                <label htmlFor="billing_ppt_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("billing_ppt_comment")}
                  id="billing_ppt_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("billing_ppt") === "1" ? (
              <div className="mt-2">
                <label htmlFor="billing_ppt_img" className="text-sm">
                  Upload Billing PPT (Image/PDF)
                </label>
                <input
                  type="file"
                  id="billing_ppt_img"
                  accept="image/*, application/pdf"
                  {...register("billing_ppt_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.billing_ppt_img && <a href={billingSupportings.billing_ppt_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Report */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="report">Report ( Detailed & Dashboard )</label>
            <select id="report" {...register("report")} className="block w-full">
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.report === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.report === "0"}>No</option>

            </select>
            {watch("report") === "0" ? (
              <div className="mt-2">
                <label htmlFor="report_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("report_comment")}
                  id="report_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("report") === "1" ? (
              <div className="mt-2">
                <label htmlFor="report_img" className="text-sm">
                  Upload Report (Image/PDF)
                </label>
                <input
                  type="file"
                  id="report_img"
                  accept="image/*, application/pdf"
                  {...register("report_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.report_img && <a href={billingSupportings.report_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Day Wise Log Book */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="day_wise_log_book">Day Wise Log Book</label>
            <select
              id="day_wise_log_book"
              {...register("day_wise_log_book")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.day_wise_log_book === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.day_wise_log_book === "0"}>No</option>

            </select>
            {watch("day_wise_log_book") === "0" ? (
              <div className="mt-2">
                <label htmlFor="day_wise_log_book_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("day_wise_log_book_comment")}
                  id="day_wise_log_book_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("day_wise_log_book") === "1" ? (
              <div className="mt-2">
                <label htmlFor="day_wise_log_book_img" className="text-sm">
                  Upload Day Wise Log Book (Image/PDF)
                </label>
                <input
                  type="file"
                  id="day_wise_log_book_img"
                  accept="image/*, application/pdf"
                  {...register("day_wise_log_book_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.day_wise_log_book_img && <a href={billingSupportings.day_wise_log_book_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Day Wise Meter Console */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="day_wise_meter_console">
              Day Wise Meter Console Photo
            </label>
            <select
              id="day_wise_meter_console"
              {...register("day_wise_meter_console")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.day_wise_meter_console === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.day_wise_meter_console === "0"}>No</option>

            </select>
            {watch("day_wise_meter_console") === "0" ? (
              <div className="mt-2">
                <label
                  htmlFor="day_wise_meter_console_comment"
                  className="text-sm"
                >
                  Remarks
                </label>
                <textarea
                  {...register("day_wise_meter_console_comment")}
                  id="day_wise_meter_console_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("day_wise_meter_console") === "1" ? (
              <div className="mt-2">
                <label htmlFor="day_wise_meter_console_img" className="text-sm">
                  Upload Day Wise Meter Console (Image/PDF)
                </label>
                <input
                  type="file"
                  id="day_wise_meter_console_img"
                  accept="image/*, application/pdf"
                  {...register("day_wise_meter_console_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.day_wise_meter_console_img && <a href={billingSupportings.day_wise_meter_console_img}  target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* No Objection Certificate */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="no_objection_certificate">
              No Objection Certificate
            </label>
            <select
              id="no_objection_certificate"
              {...register("no_objection_certificate")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.no_objection_certificate === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.no_objection_certificate === "0"}>No</option>

            </select>
            {watch("no_objection_certificate") === "0" ||
              watch("no_objection_certificate") === "NA" ? (
              <div className="mt-2">
                <label
                  htmlFor="no_objection_certificate_comment"
                  className="text-sm"
                >
                  Remarks
                </label>
                <textarea
                  {...register("no_objection_certificate_comment")}
                  id="no_objection_certificate_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("no_objection_certificate") === "1" ? (
              <div className="mt-2">
                <label htmlFor="no_objection_certificate_img" className="text-sm">
                  Upload No Objection Certificate (Image/PDF)
                </label>
                <input
                  type="file"
                  id="no_objection_certificate_img"
                  accept="image/*, application/pdf"
                  {...register("no_objection_certificate_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.no_objection_certificate_img && <a href={billingSupportings.no_objection_certificate_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Snacks Bill */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="snacks_bill">Snacks Bill</label>
            <select
              id="snacks_bill"
              {...register("snacks_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.snacks_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.snacks_bill === "0"}>No</option>

            </select>
            {watch("snacks_bill") === "0" ? (
              <div className="mt-2">
                <label htmlFor="snacks_bill_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("snacks_bill_comment")}
                  id="snacks_bill_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("snacks_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="snacks_bill_img" className="text-sm">
                  Upload Snacks Bill (Image/PDF)
                </label>
                <input
                  type="file"
                  id="snacks_bill_img"
                  accept="image/*, application/pdf"
                  {...register("snacks_bill_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.snacks_bill_img && <a href={billingSupportings.snacks_bill_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Element Wise Photo */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="element_wise_photo">Element Wise Photo</label>
            <select
              id="element_wise_photo"
              {...register("element_wise_photo")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.element_wise_photo === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.element_wise_photo === "0"}>No</option>

            </select>
            {watch("element_wise_photo") === "0" ? (
              <div className="mt-2">
                <label htmlFor="element_wise_photo_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("element_wise_photo_comment")}
                  id="element_wise_photo_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("element_wise_photo") === "1" ? (
              <div className="mt-2">
                <label htmlFor="element_wise_photo_img" className="text-sm">
                  Upload Element Wise Photo (Image/PDF)
                </label>
                <input
                  type="file"
                  id="element_wise_photo_img"
                  accept="image/*, application/pdf"
                  {...register("element_wise_photo_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.element_wise_photo_img && <a href={billingSupportings.element_wise_photo_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Nagar Nigan */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="nagar_nigan">
              Nagar Nigam / Venue Charges / Any Other Charge
            </label>
            <select
              id="nagar_nigan"
              {...register("nagar_nigan")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.nagar_nigan === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.nagar_nigan === "0"}>No</option>

            </select>
            {watch("nagar_nigan") === "0" ? (
              <div className="mt-2">
                <label htmlFor="nagar_nigan_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("nagar_nigan_comment")}
                  id="nagar_nigan_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("nagar_nigan") === "1" ? (
              <div className="mt-2">
                <label htmlFor="nagar_nigan_img" className="text-sm">
                  Upload Nagar Nigan (Image/PDF)
                </label>
                <input
                  type="file"
                  id="nagar_nigan_img"
                  accept="image/*, application/pdf"
                  {...register("nagar_nigan_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.nagar_nigan_img && <a href={billingSupportings.nagar_nigan_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Fuel Bill */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="fuel_bill">Fuel Bill</label>
            <select
              id="fuel_bill"
              {...register("fuel_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.fuel_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.fuel_bill === "0"}>No</option>

            </select>
            {watch("fuel_bill") === "0" || watch("fuel_bill") === "NA" ? (
              <div className="mt-2">
                <label htmlFor="fuel_bill_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("fuel_bill_comment")}
                  id="fuel_bill_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("fuel_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="fuel_bill_img" className="text-sm">
                  Upload Fuel Bill (Image/PDF)
                </label>
                <input
                  type="file"
                  id="fuel_bill_img"
                  accept="image/*, application/pdf"
                  {...register("fuel_bill_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.fuel_bill_img && <a href={billingSupportings.fuel_bill_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Customer Gift */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="customer_gift">
              Customer Gifts Details ( Below 1000Rs)
            </label>
            <select
              id="customer_gift"
              {...register("customer_gift")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.customer_gift === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.customer_gift === "0"}>No</option>

            </select>
            {watch("customer_gift") === "0" ? (
              <div className="mt-2">
                <label htmlFor="customer_gift_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("customer_gift_comment")}
                  id="customer_gift_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("customer_gift") === "1" ? (
              <div className="mt-2">
                <label htmlFor="customer_gift_img" className="text-sm">
                  Upload Customer Gift (Image/PDF)
                </label>
                <input
                  type="file"
                  id="customer_gift_img"
                  accept="image/*, application/pdf"
                  {...register("customer_gift_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.customer_gift_img && <a href={billingSupportings.customer_gift_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Customer Acknowledge */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="customer_acknowledge">
              Customer Acknowledgement (Rs 1001 & Above)
            </label>
            <select
              id="customer_acknowledge"
              {...register("customer_acknowledge")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.customer_acknowledge === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.customer_acknowledge === "0"}>No</option>

            </select>
            {watch("customer_acknowledge") === "0" ? (
              <div className="mt-2">
                <label htmlFor="customer_acknowledge_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("customer_acknowledge_comment")}
                  id="customer_acknowledge_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("customer_acknowledge") === "1" ? (
              <div className="mt-2">
                <label htmlFor="customer_acknowledge_img" className="text-sm">
                  Upload Customer Acknowledge (Image/PDF)
                </label>
                <input
                  type="file"
                  id="customer_acknowledge_img"
                  accept="image/*, application/pdf"
                  {...register("customer_acknowledge_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.customer_acknowledge_img && <a href={billingSupportings.customer_acknowledge_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Route Plan */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="route_plan">Route Plan</label>
            <select
              id="route_plan"
              {...register("route_plan")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.route_plan === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.route_plan === "0"}>No</option>

            </select>
            {watch("route_plan") === "0" ? (
              <div className="mt-2">
                <label htmlFor="route_plan_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("route_plan_comment")}
                  id="route_plan_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("route_plan") === "1" ? (
              <div className="mt-2">
                <label htmlFor="route_plan_img" className="text-sm">
                  Upload Route Plan (Image/PDF)
                </label>
                <input
                  type="file"
                  id="route_plan_img"
                  accept="image/*, application/pdf"
                  {...register("route_plan_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.route_plan_img && <a href={billingSupportings.route_plan_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Approval Copy */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="approvel_copy">Approval Copy</label>
            <select
              id="approvel_copy"
              {...register("approvel_copy")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.approvel_copy === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.approvel_copy === "0"}>No</option>

            </select>
            {watch("approvel_copy") === "0" ? (
              <div className="mt-2">
                <label htmlFor="approvel_copy_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("approvel_copy_comment")}
                  id="approvel_copy_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("approvel_copy") === "1" ? (
              <div className="mt-2">
                <label htmlFor="approvel_copy_img" className="text-sm">
                  Upload Approval Copy (Image/PDF)
                </label>
                <input
                  type="file"
                  id="approvel_copy_img"
                  accept="image/*, application/pdf"
                  {...register("approvel_copy_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.approvel_copy_img && <a href={billingSupportings.approvel_copy_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Purchase Order */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="po">PO</label>
            <select id="po" {...register("po")} className="block w-full">
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.po === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.po === "0"}>No</option>

            </select>
            {watch("po") === "0" ? (
              <div className="mt-2">
                <label htmlFor="po_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("po_comment")}
                  id="po_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("po") === "1" ? (
              <div className="mt-2">
                <label htmlFor="po_img" className="text-sm">
                  Upload Purchase Order (Image/PDF)
                </label>
                <input
                  type="file"
                  id="po_img"
                  accept="image/*, application/pdf"
                  {...register("po_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.po_img && <a href={billingSupportings.po_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Way Forward Learning */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="wayforward_learning">Wayforward & Learning</label>
            <select
              id="wayforward_learning"
              {...register("wayforward_learning")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.wayforward_learning === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.wayforward_learning === "0"}>No</option>

            </select>
            {watch("wayforward_learning") === "0" ? (
              <div className="mt-2">
                <label htmlFor="wayforward_learning_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("wayforward_learning_comment")}
                  id="wayforward_learning_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("wayforward_learning") === "1" ? (
              <div className="mt-2">
                <label htmlFor="wayforward_learning_img" className="text-sm">
                  Upload Way Forward Learning (Image/PDF)
                </label>
                <input
                  type="file"
                  id="wayforward_learning_img"
                  accept="image/*, application/pdf"
                  {...register("wayforward_learning_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.wayforward_learning_img && <a href={billingSupportings.wayforward_learning_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Courier Delivery Challan */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="courier_delivery_challan">
              Courier Slip/ Delivery Challan
            </label>
            <select
              id="courier_delivery_challan"
              {...register("courier_delivery_challan")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.courier_delivery_challan === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.courier_delivery_challan === "0"}>No</option>

            </select>
            {watch("courier_delivery_challan") === "0" ? (
              <div className="mt-2">
                <label
                  htmlFor="courier_delivery_challan_comment"
                  className="text-sm"
                >
                  Remarks
                </label>
                <textarea
                  {...register("courier_delivery_challan_comment")}
                  id="courier_delivery_challan_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("courier_delivery_challan") === "1" ? (
              <div className="mt-2">
                <label htmlFor="courier_delivery_challan_img" className="text-sm">
                  Upload Courier Delivery Challan (Image/PDF)
                </label>
                <input
                  type="file"
                  id="courier_delivery_challan_img"
                  accept="image/*, application/pdf"
                  {...register("courier_delivery_challan_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.courier_delivery_challan_img && <a href={billingSupportings.courier_delivery_challan_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Transport Bill */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="transport_bill">Transportation bill</label>
            <select
              id="transport_bill"
              {...register("transport_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.transport_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.transport_bill === "0"}>No</option>

            </select>
            {watch("transport_bill") === "0" ? (
              <div className="mt-2">
                <label htmlFor="transport_bill_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("transport_bill_comment")}
                  id="transport_bill_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("transport_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="transport_bill_img" className="text-sm">
                  Upload Transport Bill (Image/PDF)
                </label>
                <input
                  type="file"
                  id="transport_bill_img"
                  accept="image/*, application/pdf"
                  {...register("transport_bill_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
               {billingSupportings.transport_bill_img &&  <a href={billingSupportings.transport_bill_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Another Bill */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="anocher_bill">Anchor Bill</label>
            <select
              id="anocher_bill"
              {...register("anocher_bill")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.anocher_bill === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.anocher_bill === "0"}>No</option>

            </select>
            {watch("anocher_bill") === "0" ? (
              <div className="mt-2">
                <label htmlFor="anocher_bill_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("anocher_bill_comment")}
                  id="anocher_bill_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("anocher_bill") === "1" ? (
              <div className="mt-2">
                <label htmlFor="anocher_bill_img" className="text-sm">
                  Upload Another Bill (Image/PDF)
                </label>
                <input
                  type="file"
                  id="anocher_bill_img"
                  accept="image/*, application/pdf"
                  {...register("anocher_bill_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.anocher_bill_img && <a href={billingSupportings.anocher_bill_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>

          {/* Other Supporting Documents */}
          <div className="form-group bg-whitesmoke p-5 rounded-2xl">
            <label htmlFor="any_other_supporting">
              Any Other Supporting ( if any ) – Manually Fill Up
            </label>
            <select
              id="any_other_supporting"
              {...register("any_other_supporting")}
              className="block w-full"
            >
              <option value="">--Select--</option>
              <option value="1" selected={billingSupportings?.any_other_supporting === "1"}>Yes</option>
              <option value="0" selected={billingSupportings?.any_other_supporting === "0"}>No</option>

            </select>
            {watch("any_other_supporting") === "0" ? (
              <div className="mt-2">
                <label htmlFor="any_other_supporting_comment" className="text-sm">
                  Remarks
                </label>
                <textarea
                  {...register("any_other_supporting_comment")}
                  id="any_other_supporting_comment"
                  cols="30"
                  rows="3"

                  className="border rounded-2xl w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            ) : watch("any_other_supporting") === "1" ? (
              <div className="mt-2">
                <label htmlFor="any_other_supporting_img" className="text-sm">
                  Upload Other Supporting Document (Image/PDF)
                </label>
                <input
                  type="file"
                  id="any_other_supporting_img"
                  accept="image/*, application/pdf"
                  {...register("any_other_supporting_img")}
                  className="block border w-full rounded-lg p-3 bg-white"
                />
                {billingSupportings.any_other_supporting_img && <a href={billingSupportings.any_other_supporting_img} target="_blank" className="text-blue-500 border border-blue-500 p-2 rounded-lg inline-block mt-5">View Pre-uploaded Supporting</a>}
              </div>
            ) : null}
          </div>
        </div>



        <div className="card-footer text-center bg-gray-100 py-5">
          <button
            type="submit"
            className="px-10 py-2 text-white bg-lightdark rounded-2xl"
            disabled={editBillingMutation.isPending}
          >
            {editBillingMutation.isPending ? <ButtonLoader /> : "Submit"}
          </button>
        </div>
      </form>
  );
};

export default EditBillingSupportings;
