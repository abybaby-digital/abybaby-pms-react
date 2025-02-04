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
import { addBillingSupportings, getProjectList } from "../../../services/api";

export default function AddBillingSupportings() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [imagePreviews, setImagePreviews] = useState({});

  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => await getProjectList(token),
  });

  const addBillingMutation = useMutation({
    mutationFn: async (data) => await addBillingSupportings(token, data),
    onSuccess: () => {
      toast.success("Billing support added successfully!");
      navigate("/billing-support-list");
    },
    onError: (error) => toast.error("Failed to add billing support: " + error.message),
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [field]: objectUrl }));
    }
  };

  const onSubmit = (data) => {
    addBillingMutation.mutate(data);
  };

  const billingFields = [
    "center_vehicle_hire_bill", "manpower_bill", "gift_bill", "billing_ppt", "report",
    "day_wise_log_book", "day_wise_meter_console", "no_objection_certificate",
    "snacks_bill", "element_wise_photo", "nagar_nigan", "fuel_bill", "customer_gift",
    "customer_acknowledge", "route_plan", "approvel_copy", "po", "wayforward_learning",
    "courier_delivery_challan", "transport_bill", "anocher_bill", "any_other_supporting"
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Add Billing Supportings" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden">
            <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">ADD BILLING SUPPORTINGS</h2>
            <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

              {/* Project Selection */}
              <div className="form-group">
                <label htmlFor="project_id">Project ID <span className="text-red-600">*</span></label>
                <select id="project_id" {...register("project_id", { required: "Project is required" })} className="block w-full">
                  <option value="">Select Project</option>
                  {projectList?.response?.map((project) => (
                    <option key={project.id} value={project.id}>{project.project_name}</option>
                  ))}
                </select>
                {errors.project_id && <span className="text-red-600 text-sm">{errors.project_id.message}</span>}
              </div>

              {/* Dynamic Billing Fields */}
              {billingFields.map((field) => (
                <div key={field} className="form-group lg:col-span-2">
                  <label htmlFor={field}>{field.replace(/_/g, ' ').toUpperCase()} <span className="text-red-600">*</span></label>
                  <select {...register(field)} className="block w-full">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                  {watch(field) === "1" ? (
                    <input
                      type="file"
                      id={`${field}_img`}
                      accept="image/*, application/pdf"
                      {...register(`${field}_img`)}
                      className="block border w-full rounded-lg p-3"
                      onChange={(e) => handleFileChange(e, field)}
                    />
                  ) : (
                    <input
                      type="text"
                      id={`${field}_comment`}
                      {...register(`${field}_comment`)}
                      className="block border w-full rounded-lg p-3"
                      placeholder="Enter remark"
                    />
                  )}
                </div>
              ))}

              {/* Image Previews */}
              {Object.keys(imagePreviews).length > 0 && (
                <div className="mt-2 text-center lg:col-span-2">
                  {Object.entries(imagePreviews).map(([key, preview]) => (
                    <div key={key} className="mt-2">
                      {preview.includes("pdf") ? (
                        <iframe src={preview} width="350px" height="350px" className="rounded-lg"></iframe>
                      ) : (
                        <img src={preview} alt={key} className="w-[350px] h-[350px] rounded-lg inline-block" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card-footer text-center bg-gray-100 py-5">
              <button type="submit" className="px-10 py-2 text-white bg-lightdark rounded-2xl" disabled={addBillingMutation.isPending}>
                {addBillingMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
