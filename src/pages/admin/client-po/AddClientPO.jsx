import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { addClientPO, getProjectList } from "../../../services/api"; // Import the API function for PO
import { useState } from "react"; // Import useState
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddClientPO() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // State to hold image preview URL
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch projects for the project dropdown
  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await getProjectList(token); // Assume this function fetches the list of projects
    }
  });

  // console.log(projectList);
  const [actualPOenter, setPoEnter] = useState(null);

  const getsubstractedValue = (id) => {
    const singleProject = projectList?.response?.find((item) => item.id === id);
    setPoEnter(singleProject?.project_amount - singleProject?.client_po_amount);
  }

  console.log(actualPOenter);

  const addPOMutation = useMutation({
    mutationFn: async (data) => {
      return await addClientPO(
        token,
        data.project_id,
        data.po_no,
        data.po_amount,
        data.po_date,
        data.po_img, // File input
        data.payment_schedule_days,
        data.project_order_details,
        "1" // Default status
      );
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Purchase Order added successfully!");
        navigate("/client-po-list");
      } else {
        toast.error("Unexpected response status: " + response.status);
      }
    },

    onError: (error) => {
      toast.error("Failed to add Purchase Order: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    addPOMutation.mutate(data);
  };

  // Handle image or PDF file input change and display preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Set the preview URL
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Purchase Order" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
          >
            <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              ADD CLIENT PURCHASE ORDER
            </h2>
            <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

              {/* Project ID Dropdown */}
              <div className="form-group">
                <label htmlFor="project_id">Project ID <span className="text-red-600">*</span></label>
                <select
                  id="project_id"
                  {...register("project_id", { required: "Project ID is required" })}
                  className="block w-full"
                  onChange={(e) => { getsubstractedValue(+e.target.value) }}
                >
                  <option value="">Select Project</option>
                  {projectList?.response?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
                {errors.project_id && <span className="text-red-600 text-sm">{errors.project_id.message}</span>}
              </div>

              {/* PO No Input */}
              <div className="form-group">
                <label htmlFor="po_no">PO No <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  id="po_no"
                  {...register("po_no", { required: "PO No is required" })}
                  className="block"
                  placeholder="Enter PO No"
                />
                {errors.po_no && <span className="text-red-600 text-sm">{errors.po_no.message}</span>}
              </div>

              {/* PO Amount Input */}
              <div className="form-group">
                <label htmlFor="po_amount">PO Amount <span className="text-red-600">*</span></label>
                <input
                  type="number"
                  id="po_amount"
                  {...register("po_amount", {
                    required: "PO Amount is required",
                  })}
                  className="block"
                  placeholder="Enter Amount"
                />
                {errors.po_amount && <span className="text-red-600 text-sm">{errors.po_amount.message}</span>}
              </div>


              {/* PO Date Input */}
              <div className="form-group">
                <label htmlFor="po_date">PO Date <span className="text-red-600">*</span></label>
                <input
                  type="date"
                  id="po_date"
                  {...register("po_date", { required: "PO Date is required" })}
                  className="block"
                />
                {errors.po_date && <span className="text-red-600 text-sm">{errors.po_date.message}</span>}
              </div>

              {/* Upload PO Image/PDF */}
              <div className="form-group lg:col-span-2">
                <label htmlFor="po_img">Upload PO Image or PDF (Optional)</label>
                <input
                  type="file"
                  id="po_img"
                  accept="image/*, application/pdf"
                  {...register("po_img")}
                  className="block border w-full rounded-lg p-3"
                  onChange={handleFileChange} // Add this line for preview or file handling
                />
              </div>

              {/* Image/PDF Preview */}
              {imagePreview && (
                <div className="mt-2 text-center lg:col-span-2">
                  {imagePreview.includes("pdf") ? (
                    <iframe src={imagePreview} width="350px" height="350px" className="rounded-lg"></iframe>
                  ) : (
                    <img src={imagePreview} alt="Preview" className="w-[350px] h-[350px] rounded-lg inline-block" />
                  )}
                </div>
              )}

              {/* Payment Schedule Days Input */}
              <div className="form-group">
                <label htmlFor="payment_schedule_days">Payment Schedule Days <span className="text-red-600">*</span></label>
                <input
                  type="number"
                  id="payment_schedule_days"
                  {...register("payment_schedule_days", { required: "Payment Schedule Days is required" })}
                  className="block"
                  placeholder="Enter Payment Schedule Days"
                />
                {errors.payment_schedule_days && <span className="text-red-600 text-sm">{errors.payment_schedule_days.message}</span>}
              </div>

              {/* PO Details */}
              <div className="form-group lg:col-span-2">
                <label htmlFor="project_order_details">PO Details</label>
                <textarea
                  id="project_order_details"
                  {...register("project_order_details")}
                  className="block border w-full rounded-lg p-3"
                  placeholder="Enter PO Details"
                />
              </div>

            </div>

            {/* LOADER */}

            {
              addPOMutation.isPending ?
                <FormSubmitLoader loading_msg="Creating Client PO..." /> : null
            }

            <div className="card-footer text-center bg-gray-100 py-5">
              <button
                type="submit"
                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                disabled={addPOMutation.isPending}
              >
                {addPOMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
