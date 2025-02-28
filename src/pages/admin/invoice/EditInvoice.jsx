import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { getProjectList, editInvoice } from "../../../services/api"; // Import necessary functions

const EditInvoice = ({ invoice }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);

    // Initialize image preview state
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch projects for the project dropdown
    const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
        queryKey: ["project-list"],
        queryFn: async () => {
            return await getProjectList(token); // Assuming this function fetches the list of projects
        }
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            project_id: invoice.project_id, // Ensure this is set as the default value
            invoice_no: invoice.invoice_no,
            invoice_amount_pre_gst: invoice.invoice_amount_pre_gst,
            invoice_amount_with_gst: invoice.invoice_amount_with_gst,
            invoice_date: invoice.invoice_date.split(" ")[0], // Extract date part
            invoice_details: invoice.invoice_details,
            invoice_img: null, // Image update is mandatory now
            status: invoice.status,
        }
    });

    // Pre-fill the form with existing data
    useEffect(() => {
        setValue("project_id", invoice.project_id);  // Ensure selected project is set
        setValue("invoice_no", invoice.invoice_no);
        setValue("invoice_amountpre_gst", invoice.invoice_amount_pre_gst);
        setValue("invoice_amount_with_gst", invoice.invoice_amount_with_gst);
        setValue("invoice_date", invoice.invoice_date.split(" ")[0]);
        setValue("invoice_details", invoice.invoice_details);
        setValue("status", invoice.status);

        // Set initial image preview if there is an existing image
        if (invoice.invoice_img) {
            setImagePreview(invoice.invoice_img); // Assuming invoice has invoice_img URL for preview
        }
    }, [invoice, setValue]);

    // Mutation for updating the invoice
    const editInvoiceMutation = useMutation({
        mutationFn: async (data) => {
            return await editInvoice(
                token,
                invoice.id, // Invoice ID
                invoice.project_id,
                data.invoice_no,
                data.invoice_amount_pre_gst,
                data.invoice_amount_with_gst,
                data.invoice_date,
                data.invoice_img, // File input
                data.invoice_details,
                data.status
            );
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Invoice details updated successfully!");
                setModal(false);
                setRefetchList(!refetchList);
                navigate("/invoice-list");
            } else {
                toast.error("Something went wrong");
            }
        },
        onError: (error) => {
            toast.error("Failed to update invoice: " + error.message);
        },
    });

    // Handle form submission
    const onSubmit = (data) => {
        editInvoiceMutation.mutate(data);
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
        isLoadingProjects ?
            <div className="h-[350px] flex justify-center items-center">
                <p className="text-green-500 font-bold text-xl animate-pulse">Prepairing for edit , Please Wait ...</p>
            </div>
            :
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full overflow-hidden">
                <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

                    {/* Project ID Dropdown */}
                    <div className="form-group">
                        <label htmlFor="project_id">Project <span className="text-red-600">*</span></label>
                        <select
                            id="project_id"
                            {...register("project_id", { required: "Project is required" })}
                            className="block w-full"
                        >
                            <option value="">Select Project</option>
                            {isLoadingProjects ? (
                                <option>Loading Projects, Please wait....</option>
                            ) : (
                                projectList?.response?.map((project) => (
                                    <option key={project.id} value={project.id} selected={project?.id === invoice?.project_id}>
                                        {project.project_name}
                                    </option>
                                ))
                            )}
                        </select>
                        {errors.project_id && <span className="text-red-600 text-sm">{errors.project_id.message}</span>}
                    </div>

                    {/* Invoice No Input */}
                    <div className="form-group">
                        <label htmlFor="invoice_no">Invoice No <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            id="invoice_no"
                            {...register("invoice_no", { required: "Invoice No is required" })}
                            className="block"
                            placeholder="Enter Invoice No"
                        />
                        {errors.invoice_no && <span className="text-red-600 text-sm">{errors.invoice_no.message}</span>}
                    </div>

                    {/* Invoice Amount pre gst Input */}
                    <div className="form-group">
                        <label htmlFor="invoice_amount_pre_gst">Invoice Amount <span className="text-red-600">*</span></label>
                        <input
                            type="number"
                            id="invoice_amount_pre_gst"
                            {...register("invoice_amount_pre_gst", { required: "Invoice Amount is required" })}
                            className="block"
                            placeholder="Enter Amount"
                        />
                        {errors.invoice_amount_pre_gst && <span className="text-red-600 text-sm">{errors.invoice_amount_pre_gst.message}</span>}
                    </div>
                    {/* Invoice Amount with gst Input */}
                    <div className="form-group">
                        <label htmlFor="invoice_amount_with_gst">Invoice Amount <span className="text-red-600">*</span></label>
                        <input
                            type="number"
                            id="invoice_amount_with_gst"
                            {...register("invoice_amount_with_gst", { required: "Invoice Amount is required" })}
                            className="block"
                            placeholder="Enter Amount"
                        />
                        {errors.invoice_amount_with_gst && <span className="text-red-600 text-sm">{errors.invoice_amount_with_gst.message}</span>}
                    </div>

                    {/* Invoice Date Input */}
                    <div className="form-group">
                        <label htmlFor="invoice_date">Invoice Date <span className="text-red-600">*</span></label>
                        <input
                            type="date"
                            id="invoice_date"
                            {...register("invoice_date", { required: "Invoice Date is required" })}
                            className="block"
                        />
                        {errors.invoice_date && <span className="text-red-600 text-sm">{errors.invoice_date.message}</span>}
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Preview" className="w-full h-[150px] object-contain rounded-lg" />
                        </div>
                    )}

                    {/* Upload New Invoice Image (Mandatory) */}
                    <div className="form-group lg:col-span-2">
                        <label htmlFor="invoice_img">Upload Invoice Image</label>
                        <input
                            type="file"
                            id="invoice_img"
                            accept="image/*"
                            {...register("invoice_img")}
                            className="block border w-full rounded-lg p-3"
                            onChange={handleImageChange} // Add this line
                        />
                        {errors.invoice_img && <span className="text-red-600 text-sm">{errors.invoice_img.message}</span>}
                    </div>

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
                        disabled={editInvoiceMutation.isPending}
                    >
                        {editInvoiceMutation.isPending ? <ButtonLoader /> : "Submit"}
                    </button>
                </div>
            </form>
    );
};

export default EditInvoice;
