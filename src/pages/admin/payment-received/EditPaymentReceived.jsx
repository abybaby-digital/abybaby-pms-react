import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { getProjectList, editPaymentReceived } from "../../../services/api"; // Import necessary functions

const EditPaymentReceived = ({ payment }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { setModal, refetchList, setRefetchList } = useContext(
    dialogOpenCloseContext
  );

  // Initialize image preview state
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch projects for the project dropdown
  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await getProjectList(token); // Assuming this function fetches the list of projects
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      project_id: payment.project_id, // Ensure this is set as the default value
      received_no: payment.received_no,
      received_amount: payment.received_amount,
      received_date: payment.received_date.split(" ")[0], // Extract date part
      received_details: payment.received_details,
      received_img: null, // Image update is optional
      status: payment.status,
    },
  });

  // Pre-fill the form with existing data
  useEffect(() => {
    setValue("project_id", payment.project_id); // Ensure selected project is set
    setValue("received_no", payment.received_no);
    setValue("received_amount", payment.received_amount);
    setValue("received_date", payment.received_date.split(" ")[0]);
    setValue("received_details", payment.received_details);
    setValue("status", payment.status);

    // Set initial image preview if there is an existing image
    if (payment.received_img) {
      setImagePreview(payment.received_img); // Assuming payment has received_img URL for preview
    }
  }, [payment, setValue]);

  // Mutation for updating the payment
  const editPaymentMutation = useMutation({
    mutationFn: async (data) => {
      return await editPaymentReceived(
        token,
        payment.id, // Payment ID
        data.project_id,
        data.received_no,
        data.received_amount,
        data.received_date,
        data.received_img, // File input
        data.received_details,
        data.status
      );
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Payment details updated successfully!");
        setModal(false);
        setRefetchList(!refetchList);
        navigate("/payment-receipt-list");
      } else {
        toast.error("Something Went Wrong");
      }
    },
    onError: (error) => {
      toast.error("Failed to update payment: " + error.message);
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    editPaymentMutation.mutate(data);
  };

  // Handle image file change for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Set the preview image URL
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full overflow-hidden"
    >
      <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
        {/* Project ID Dropdown */}
        <div className="form-group">
          <label htmlFor="project_id">
            Project <span className="text-red-600">*</span>
          </label>
          <select
            id="project_id"
            {...register("project_id", { required: "Project is required" })}
            className="block w-full"
          >
            <option value="">Select Project</option>
            {projectList?.response?.map((project) => (
            <option key={project.id} value={project.id}>
              {`${project.project_number} - ${project.project_name}`}
            </option>
            ))}
          </select>
          {errors.project_id && (
            <span className="text-red-600 text-sm">
              {errors.project_id.message}
            </span>
          )}
        </div>

        {/* Received No Input */}
        <div className="form-group">
          <label htmlFor="received_no">
            Received No <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="received_no"
            {...register("received_no", {
              required: "Received No is required",
            })}
            className="block"
            placeholder="Enter Received No"
          />
          {errors.received_no && (
            <span className="text-red-600 text-sm">
              {errors.received_no.message}
            </span>
          )}
        </div>

        {/* Received Amount Input */}
        <div className="form-group">
          <label htmlFor="received_amount">
            Received Amount <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="received_amount"
            {...register("received_amount", {
              required: "Received Amount is required",
            })}
            className="block"
            placeholder="Enter Amount"
          />
          {errors.received_amount && (
            <span className="text-red-600 text-sm">
              {errors.received_amount.message}
            </span>
          )}
        </div>

        {/* Received Date Input */}
        <div className="form-group">
          <label htmlFor="received_date">
            Received Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            id="received_date"
            {...register("received_date", {
              required: "Received Date is required",
            })}
            className="block"
          />
          {errors.received_date && (
            <span className="text-red-600 text-sm">
              {errors.received_date.message}
            </span>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Upload New Receipt */}
        <div className="form-group lg:col-span-2">
          <label htmlFor="received_img">Upload New Receipt (Optional)</label>
          <input
            type="file"
            id="received_img"
            accept="image/*"
            {...register("received_img")}
            className="block border w-full rounded-lg p-3"
            onChange={handleImageChange} // Add this line
          />
        </div>

        {/* Payment Details */}
        <div className="form-group lg:col-span-2">
          <label htmlFor="received_details">Received Details</label>
          <textarea
            id="received_details"
            {...register("received_details")}
            className="block border w-full rounded-lg p-3"
            placeholder="Enter Payment Details"
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select {...register("status")} id="status">
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
      </div>

      <div className="card-footer text-center bg-gray-100 py-5">
        <button
          type="submit"
          className="px-10 py-2 text-white bg-lightdark rounded-2xl"
          disabled={editPaymentMutation.isPending}
        >
          {editPaymentMutation.isPending ? <ButtonLoader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default EditPaymentReceived;
