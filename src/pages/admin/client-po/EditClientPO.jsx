import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { getProjectList, editClientPO } from "../../../services/api"; // Import necessary functions

const EditClientPO = ({ clientPO }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { setModal, refetchList, setRefetchList } = useContext(
    dialogOpenCloseContext
  );

  // Initialize image preview state and PDF preview state
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null); // Store file type (image or pdf)

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
      project_id: clientPO.project_id, // Ensure this is set as the default value
      po_no: clientPO.client_po_no,
      po_amount_pre_gst: clientPO.po_amount_pre_gst,
      po_amount_with_gst: clientPO.po_amount_with_gst,
      po_date: clientPO.po_date.split(" ")[0], // Extract date part
      payment_schedule_days: clientPO.payment_schedule_days,
      po_details: clientPO.project_order_details,
      po_img: null, // Image/PDF update is mandatory now
      status: clientPO.status,
    },
  });

  // Pre-fill the form with existing data
  useEffect(() => {
    // setValue("project_id", clientPO.project_id); // Ensure selected project is set
    setValue("po_no", clientPO.client_po_no);
    // setValue("po_amount_pre_GST", Math.floor(clientPO.po_amount_pre_gst));
    // setValue("po_amount_with_GST", Math.floor(clientPO.po_amount_with_gst));
    setValue("po_date", clientPO.po_date.split(" ")[0]);
    setValue("payment_schedule_days", clientPO.payment_schedule_days);
    setValue("po_details", clientPO.project_order_details);
    setValue("status", clientPO.status);

    // Set initial file preview if there is an existing file
    if (clientPO.po_img) {
      setImagePreview(clientPO.po_img); // Assuming invoice has invoice_img URL for preview
    }
  }, [clientPO, setValue]);

  const [actualPOenter, setPoEnter] = useState(null);

  const getsubstractedValue = (id) => {
    const singleProject = projectList?.response?.find((item) => item.id === id);
    setPoEnter(singleProject?.project_amount - singleProject?.client_po_amount);
  };

  console.log(actualPOenter);

  // Mutation for updating the client PO
  const editClientPOMutation = useMutation({
    mutationFn: async (data) => {
      return await editClientPO(
        token,
        clientPO.id, // PO ID
        clientPO.project_id,
        clientPO.project_no,
        data.po_amount_pre_gst,
        data.po_amount_with_gst,
        data.po_date,
        data.po_img, // File input
        data.payment_schedule_days,
        data.po_details,
        data.status
      );
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Client PO details updated successfully!");
        setModal(false);
        setRefetchList(!refetchList);
        navigate("/client-po-list");
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error("Failed to update Client PO: " + error.message);
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    // Call the mutation with updated data
    editClientPOMutation.mutate(data);
  };

  // Handle file change for preview (image or PDF)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Set the preview image URL
    }
  };

  useEffect(() => {
    getsubstractedValue(clientPO.project_id);
  }, [clientPO.project_id]); // Include clientPO.project_id in dependency array

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
            onChange={(e) => {
              getsubstractedValue(+e.target.value);
            }}
          >
            <option value="">Select Project</option>
            {isLoadingProjects ? (
              <option>Loading projects...</option>
            ) : (
              projectList?.response?.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                  selected={project?.id === clientPO?.project_id}
                >
                  {project.project_name}
                </option>
              ))
            )}
          </select>
          {errors.project_id && (
            <span className="text-red-600 text-sm">
              {errors.project_id.message}
            </span>
          )}
        </div>

        {/* PO No Input */}
        <div className="form-group">
          <label htmlFor="po_no">
            PO No <span className="text-red-600">*</span>
          </label>
          <input
            disabled
            type="text"
            id="po_no"
            {...register("po_no", { required: "PO No is required" })}
            className="block"
            placeholder="Enter PO No"
          />
          {errors.po_no && (
            <span className="text-red-600 text-sm">{errors.po_no.message}</span>
          )}
        </div>

        {/* PO Amount Input */}
        {/* <div className="form-group">
                    <label htmlFor="po_amount">PO Amount <span className="text-red-600">*</span></label>
                    <input
                        type="number"
                        id="po_amount"
                        {...register("po_amount", {
                            required: "PO Amount is required",
                            max: {
                                value: (actualPOenter + Math.floor(clientPO.po_amount)),
                                message: `Amount cannot exceed ${actualPOenter + Math.floor(clientPO.po_amount)}`,
                            },
                        })}
                        className="block"
                        placeholder="Enter Amount"
                    />
                    {errors.po_amount && <span className="text-red-600 text-sm">{errors.po_amount.message}</span>}
                </div> */}

        {/* PO Amount Input with gst */}
        <div className="form-group">
          <label htmlFor="po_amount_with_gst">
            PO Amount ( with GST ) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="po_amount_with_gst"
            {...register("po_amount_with_gst", {
              required: "PO Amount is required",
            })}
            className="block"
            placeholder="Enter Amount"
          />
          {errors.po_amount_with_gst && (
            <span className="text-red-600 text-sm">
              {errors.po_amount_with_gst.message}
            </span>
          )}
        </div>

        {/* PO Amount Input without gst */}
        <div className="form-group">
          <label htmlFor="po_amount_pre_gst">
            PO Amount ( pre GST ) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="po_amount_pre_gst"
            {...register("po_amount_pre_gst", {
              required: "PO Amount is required",
            })}
            className="block"
            placeholder="Enter Amount"
          />
          {errors.po_amount_pre_gst && (
            <span className="text-red-600 text-sm">
              {errors.po_amount_pre_gst.message}
            </span>
          )}
        </div>

        {/* PO Date Input */}
        <div className="form-group">
          <label htmlFor="po_date">
            PO Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            id="po_date"
            {...register("po_date", { required: "PO Date is required" })}
            className="block"
          />
          {errors.po_date && (
            <span className="text-red-600 text-sm">
              {errors.po_date.message}
            </span>
          )}
        </div>

        {/* Payment Schedule (Days) */}
        <div className="form-group">
          <label htmlFor="payment_schedule_days">
            Payment Schedule (Days) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="payment_schedule_days"
            {...register("payment_schedule_days", {
              required: "Payment Schedule is required",
            })}
            className="block"
            placeholder="Enter Payment Schedule in Days"
          />
          {errors.payment_schedule_days && (
            <span className="text-red-600 text-sm">
              {errors.payment_schedule_days.message}
            </span>
          )}
        </div>

        {/* File Preview */}
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-[150px] object-contain rounded-lg"
            />
          </div>
        )}

        {/* Upload New PO Image/PDF (Mandatory) */}
        <div className="form-group lg:col-span-2">
          <label htmlFor="po_img">Upload New PO <span className="text-red-600">*</span></label>
          <input
            type="file"
            id="po_img"
            accept="image/*"
            {...register("po_img")}
            className="block border w-full rounded-lg p-3"
            onChange={handleFileChange} // Add this line
          />
          {errors.po_img && (
            <span className="text-red-600 text-sm">
              {errors.po_img.message}
            </span>
          )}
        </div>

        {/* PO Details */}
        <div className="form-group lg:col-span-2">
          <label htmlFor="po_details">PO Details</label>
          <textarea
            id="po_details"
            {...register("po_details")}
            className="block border w-full rounded-lg p-3"
            placeholder="Enter PO Details"
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
          disabled={editClientPOMutation.isPending}
        >
          {editClientPOMutation.isPending ? <ButtonLoader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default EditClientPO;
