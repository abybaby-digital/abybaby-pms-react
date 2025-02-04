import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { addPaymentRequisition, getProjectList, getBranchList, getVendorList } from "../../../services/api";
import { useState, useEffect } from "react";

export default function AddPaymentRequisition() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // State to hold vendor details
  const [selectedVendor, setSelectedVendor] = useState(null);
   // State for file preview (image or PDF)
   const [filePreview, setFilePreview] = useState(null);

  // Fetch projects, branches, and vendors from APIs
  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await getProjectList(token);
    }
  });

  const { data: vendorList = [], isLoading: isLoadingVendors } = useQuery({
    queryKey: ["vendor-list"],
    queryFn: async () => {
      return await getVendorList(token);
    }
  });

  // Add Payment Requisition Mutation
  const addPaymentMutation = useMutation({
    mutationFn: async (data) => {
      return await addPaymentRequisition(
        token,
        +data.project_id,
        +data.vendor_id,
        data.requisition_amount,
        data.requisition_img,
        data.requisition_remarks,
        data.date_of_payments,
        "1"
      );
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Payment Requisition added successfully!");
        navigate("/payment-requisition-list");
      }
    },
    onError: (error) => {
      toast.error("Failed to add payment requisition: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(+data.vendor_id);
    addPaymentMutation.mutate(data);
  };

  // Handle vendor selection
  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    const selectedVendor = vendorList?.response?.find(vendor => vendor.id === parseInt(vendorId));
    setSelectedVendor(selectedVendor);

    // If vendor is selected, update the bank details in the form
    if (selectedVendor) {
      setValue("bank_name", selectedVendor.bank_name);
      setValue("bank_account", selectedVendor.bank_account);
      setValue("ifsc_code", selectedVendor.ifsc_code);
    }
  };

  // Handle file input for preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check file type (image or pdf) and set preview accordingly
    if (file) {
      const fileType = file.type.split("/")[0]; // Get the type (image/pdf)
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        setFilePreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Payment Requisition" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
          >
            <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              ADD PAYMENT REQUISITION
            </h2>
            <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

              {/* Project ID Dropdown */}
              <div className="form-group">
                <label htmlFor="project_id">Project ID <span className="text-red-600">*</span></label>
                <select
                  id="project_id"
                  {...register("project_id", { required: "Project ID is required" })}
                  className="block w-full"
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

              {/* Vendor ID Dropdown */}
              <div className="form-group">
                <label htmlFor="vendor_id">Vendor ID <span className="text-red-600">*</span></label>
                <select
                  id="vendor_id"
                  {...register("vendor_id", { required: "Vendor ID is required" })}
                  className="block w-full"
                  onChange={handleVendorChange} // Handle vendor change
                >
                  <option value="">Select Vendor</option>
                  {vendorList?.response?.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.vendor_name}
                    </option>
                  ))}
                </select>
                {errors.vendor_id && <span className="text-red-600 text-sm">{errors.vendor_id.message}</span>}
              </div>

              {/* Bank Name Input */}
              <div className="form-group">
                <label htmlFor="bank_name">Bank Name <span className="text-red-600">*</span></label>
                <input
                readOnly
                  type="text"
                  id="bank_name"
                  {...register("bank_name", { required: "Bank Name is required" })}
                  className="block"
                  placeholder="Enter Bank Name"
                />
                {errors.bank_name && <span className="text-red-600 text-sm">{errors.bank_name.message}</span>}
              </div>

              {/* Bank Account Input */}
              <div className="form-group">
                <label htmlFor="bank_account">Bank Account No <span className="text-red-600">*</span></label>
                <input
                readOnly
                  type="text"
                  id="bank_account"
                  {...register("bank_account", { required: "Bank Account No is required" })}
                  className="block"
                  placeholder="Enter Bank Account No"
                />
                {errors.bank_account && <span className="text-red-600 text-sm">{errors.bank_account.message}</span>}
              </div>

              {/* IFSC Code Input */}
              <div className="form-group">
                <label htmlFor="ifsc_code">IFSC Code <span className="text-red-600">*</span></label>
                <input
                  readOnly
                  type="text"
                  id="ifsc_code"
                  {...register("ifsc_code", { required: "IFSC Code is required" })}
                  className="block"
                  placeholder="Enter IFSC Code"
                />
                {errors.ifsc_code && <span className="text-red-600 text-sm">{errors.ifsc_code.message}</span>}
              </div>

              {/* Requisition Amount Input */}
              <div className="form-group">
                <label htmlFor="requisition_amount">Requisition Amount <span className="text-red-600">*</span></label>
                <input
                
                  type="number"
                  id="requisition_amount"
                  {...register("requisition_amount", { required: "Requisition Amount is required" })}
                  className="block"
                  placeholder="Enter Amount"
                />
                {errors.requisition_amount && <span className="text-red-600 text-sm">{errors.requisition_amount.message}</span>}
              </div>

              {/* Requisition Image Input */}
              <div className="form-group">
                <label htmlFor="requisition_img">Requisition Image (Image/PDF) <span className="text-red-600">*</span></label>
                <input
                  type="file"
                  id="requisition_img"
                  {...register("requisition_img", { required: "Requisition Image is required" })}
                  accept=".jpg, .jpeg, .png, .pdf"
                  className="block"
                  onChange={handleFileChange}
                />
                {errors.requisition_img && <span className="text-red-600 text-sm">{errors.requisition_img.message}</span>}
              </div>
              {/* Display Preview */}
              <div className="form-group mt-3 lg:col-span-2 text-center">
                {filePreview && (
                  <>
                    {filePreview.includes("data:image") ? (
                      <img src={filePreview} alt="Image Preview" className="inline max-w-full h-[250px] object-contain" />
                    ) : filePreview.includes("pdf") ? (
                      <iframe
                        src={filePreview}
                        width="100%"
                        height="500px"
                        title="PDF Preview"
                      />
                    ) : null}
                  </>
                )}
              </div>

              {/* Requisition Remarks Input */}
              <div className="form-group">
                <label htmlFor="requisition_remarks">Requisition Remarks</label>
                <input
                  id="requisition_remarks"
                  {...register("requisition_remarks")}
                  className="block"
                  placeholder="Enter remarks"
                />
              </div>

              {/* Date of Payment Input */}
              <div className="form-group">
                <label htmlFor="date_of_payments">Date of Payment <span className="text-red-600">*</span></label>
                <input
                  type="date"
                  id="date_of_payments"
                  {...register("date_of_payments", { required: "Date of Payment is required" })}
                  className="block"
                />
                {errors.date_of_payments && <span className="text-red-600 text-sm">{errors.date_of_payments.message}</span>}
              </div>

              

              {/* Submit Button */}

            </div>
            <div className="card-footer text-center bg-gray-100 py-5">
              <button
                type="submit"
                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                disabled={addPaymentMutation.isPending}
              >
                {addPaymentMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
