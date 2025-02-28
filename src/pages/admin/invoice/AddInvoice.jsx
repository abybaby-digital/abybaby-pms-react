import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { addInvoice, getProjectList } from "../../../services/api"; // Import the API function for projects
import { useState } from "react"; // Import useState
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddInvoice() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State to hold image preview URL
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch projects for the project dropdown
  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await getProjectList(token); // Assume this function fetches the list of projects
    },
  });

  const addInvoiceMutation = useMutation({
    mutationFn: async (data) => {
      return await addInvoice(
        token,
        data.project_id,
        data.invoice_no,
        data.invoice_amount_pre_gst,
        data.invoice_amount_with_gst,
        data.invoice_date,
        data.invoice_img, // File input
        data.invoice_details,
        "1" // Default status
      );
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Invoice added successfully!");
        navigate("/invoice-list"); // Navigate to invoice list after successful creation
      }
    },
    onError: (error) => {
      toast.error("Failed to add invoice: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    addInvoiceMutation.mutate(data);
  };

  // Handle image file input change and display preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Set the preview image URL
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Invoice" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
          {
            isLoadingProjects ?
            <FormSubmitLoader loading_msg="" />
            :
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto 2xl:w-[50%] w-full overflow-hidden"
          >
            <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              ADD INVOICE
            </h2>
            <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
              {/* Project ID Dropdown */}
              <div className="form-group">
                <label htmlFor="project_id">
                  Project ID <span className="text-red-600">*</span>
                </label>
                <select
                  id="project_id"
                  {...register("project_id", {
                    required: "Project ID is required",
                  })}
                  className="block w-full"
                >
                  <option value="">Select Project</option>
                  {
                    isLoadingProjects ? 
                    (
                      <option value="#">Loading Projects, Please wait...</option>
                    ):
                    (
                      projectList?.response?.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.project_name}
                        </option>
                      ))
                    )
                  }
                </select>
                {errors.project_id && (
                  <span className="text-red-600 text-sm">
                    {errors.project_id.message}
                  </span>
                )}
              </div>

              {/* Invoice No Input */}
              <div className="form-group">
                <label htmlFor="invoice_no">
                  Invoice No <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="invoice_no"
                  {...register("invoice_no", {
                    required: "Invoice No is required",
                  })}
                  className="block"
                  placeholder="Enter Invoice No"
                />
                {errors.invoice_no && (
                  <span className="text-red-600 text-sm">
                    {errors.invoice_no.message}
                  </span>
                )}
              </div>

              {/* Invoice Amount pre gst Input */}
              <div className="form-group">
                <label htmlFor="invoice_amount_pre_gst">
                  Invoice Amount ( pre GST ){" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  id="invoice_amount_pre_gst"
                  {...register("invoice_amount_pre_gst", {
                    required: "Invoice Amount is required",
                  })}
                  className="block"
                  placeholder="Enter Amount"
                />
                {errors.invoice_amount_pre_gst && (
                  <span className="text-red-600 text-sm">
                    {errors.invoice_amount_pre_gst.message}
                  </span>
                )}
              </div>
              {/* Invoice Amount Input with gst */}
              <div className="form-group">
                <label htmlFor="invoice_amount_with_gst">
                  Invoice Amount ( with GST )
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  id="invoice_amount_with_gst"
                  {...register("invoice_amount_with_gst", {
                    required: "Invoice Amount is required",
                  })}
                  className="block"
                  placeholder="Enter Amount"
                />
                {errors.invoice_amount_with_gst && (
                  <span className="text-red-600 text-sm">
                    {errors.invoice_amount_with_gst.message}
                  </span>
                )}
              </div>

              {/* Invoice Date Input */}
              <div className="form-group">
                <label htmlFor="invoice_date">
                  Invoice Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="invoice_date"
                  {...register("invoice_date", {
                    required: "Invoice Date is required",
                  })}
                  className="block"
                />
                {errors.invoice_date && (
                  <span className="text-red-600 text-sm">
                    {errors.invoice_date.message}
                  </span>
                )}
              </div>

              {/* Upload Invoice Image */}
              <div className="form-group lg:col-span-2">
                <label htmlFor="invoice_img">
                  Upload Invoice Image
                </label>
                <input
                  type="file"
                  id="invoice_img"
                  accept="image/*"
                  {...register("invoice_img")}
                  className="block border w-full rounded-lg p-3"
                  onChange={handleImageChange} // Add this line for image preview
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2 text-center lg:col-span-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-[350px] h-[350px] rounded-lg inline-block"
                  />
                </div>
              )}

              {/* Invoice Details */}
              <div className="form-group lg:col-span-2">
                <label htmlFor="invoice_details">Invoice Details</label>
                <textarea
                  id="invoice_details"
                  {...register("invoice_details")}
                  className="block border w-full rounded-lg p-3"
                  placeholder="Enter Invoice Details"
                />
              </div>
            </div>

            {/* LOADER */}

            {addInvoiceMutation.isPending ? (
              <FormSubmitLoader loading_msg="Creating Invoice..." />
            ) : null}

            <div className="card-footer text-center bg-gray-100 py-5">
              <button
                type="submit"
                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                disabled={addInvoiceMutation.isPending}
              >
                {addInvoiceMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
