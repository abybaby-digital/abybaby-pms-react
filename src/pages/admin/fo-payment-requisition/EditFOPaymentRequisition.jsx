import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { getProjectList, getVendorList, editPaymentRequisition, FOListByProjectId, editFoPaymentRequisition } from "../../../services/api";

const EditPaymentRequisition = ({ payment }) => {
    console.log(payment);

    const token = useSelector((state) => state.auth.token);
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

    const project_id = watch("project_id");

    const navigate = useNavigate();
    const { setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);

    // State for file preview (image or PDF)
    const [filePreview, setFilePreview] = useState(payment.requisition_img || null);

    // Fetch projects and vendors
    const { data: projectList = [], isLoading: projectLoading } = useQuery({
        queryKey: ["project-list"],
        queryFn: async () => await getProjectList(token),
    });

    const { data: vendorList = [] } = useQuery({
        queryKey: ["vendor-list"],
        queryFn: async () => await getVendorList(token),
    });

    const { data: foList = [], isLoading: isLoadingFo } = useQuery({
        queryKey: ["fo-list-by-project-id", +project_id],
        queryFn: async () => {
            return await FOListByProjectId(token, +project_id);
        },
        enabled: !!project_id
    });

    console.log("fo list", foList);




    console.log(payment);

    useEffect(() => {
        setValue("project_id", payment.project_id);
        setValue("assign_fo_id", payment.assign_fo_id);
        setValue("requisition_amount", payment.requisition_amount);
        setValue("requisition_remarks", payment.requisition_remarks);
        setValue("date_of_payments", payment.date_of_payments.split(" ")[0]);
    }, [payment, setValue, foList]);

    const editPaymentMutation = useMutation({
        mutationFn: async (data) => {
            return await editFoPaymentRequisition(
                token,
                payment.id,
                +data.project_id,
                data.requisition_amount,
                data.fo_requisition_img,
                data.requisition_remarks,
                +data.assign_fo_id,
            );
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Payment requisition updated successfully!");
                setModal(false);
                setRefetchList(!refetchList);
                navigate("/payment-requisition-list");
            } else {
                toast.error("Something went wrong");
            }
        },
        onError: (error) => {
            toast.error("Failed to update payment requisition: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        editPaymentMutation.mutate(data);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split("/")[0];
            if (fileType === "image") {
                const reader = new FileReader();
                reader.onloadend = () => setFilePreview(reader.result);
                reader.readAsDataURL(file);
            } else if (file.type === "application/pdf") {
                setFilePreview(URL.createObjectURL(file));
            }
        }
    };

    return (

        (isLoadingFo && projectLoading) ?
            <p className="text-center">Loading...</p>
            :
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full overflow-hidden">
                <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                    <div className="form-group">
                        <label>Project <span className="text-red-600">*</span></label>
                        <select {...register("project_id", { required: "Project is required" })} className="block w-full">
                            <option value="">Select Project</option>
                            {projectList?.response?.map(project => (
                                <option key={project.id} value={project.id}>{`${project.project_number} - ${project.project_name}`}</option>
                            ))}
                        </select>
                        {errors.project_id && <span className="text-red-600 text-sm">{errors.project_id.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>FO Name <span className="text-red-600">*</span></label>
                        <select {...register("assign_fo_id", { required: "Vendor is required" })} className="block w-full">
                            <option value="">Select FO</option>
                            {
                                Array.isArray(foList?.response)
                                    ? foList.response.map((fo) => (
                                        <option key={fo.id} value={fo.id}>
                                            {fo.name}
                                        </option>
                                    ))
                                    : <option value="">No FO available</option>
                            }
                        </select>
                        {errors.assign_fo_id && <span className="text-red-600 text-sm">{errors.assign_fo_id.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Requisition Amount <span className="text-red-600">*</span></label>
                        <input type="number" {...register("requisition_amount", { required: "Amount is required" })} className="block" placeholder="Enter Amount" />
                        {errors.requisition_amount && <span className="text-red-600 text-sm">{errors.requisition_amount.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Upload New Document (Optional)</label>
                        <input type="file" accept=".jpg, .jpeg, .png, .pdf" {...register("fo_requisition_img")} className="block" onChange={handleFileChange} />
                    </div>

                    {filePreview && (
                        <div className="form-group mt-3 lg:col-span-2 text-center">
                            {filePreview.includes("data:image") ? (
                                <img src={filePreview} alt="Preview" className="inline max-w-full h-[250px] object-contain" />
                            ) : filePreview.includes("pdf") ? (
                                <iframe src={filePreview} width="100%" height="500px" title="PDF Preview" />
                            ) : null}
                        </div>
                    )}

                    <div className="form-group">
                        <label>Remarks</label>
                        <input {...register("requisition_remarks")} className="block" placeholder="Enter Remarks" />
                    </div>

                    <div className="form-group">
                        <label>Date of Payment <span className="text-red-600">*</span></label>
                        <input type="date" {...register("date_of_payments", { required: "Date is required" })} className="block" />
                        {errors.date_of_payments && <span className="text-red-600 text-sm">{errors.date_of_payments.message}</span>}
                    </div>
                </div>

                <div className="card-footer text-center bg-gray-100 py-5">
                    <button type="submit" className="px-10 py-2 text-white bg-lightdark rounded-2xl" disabled={editPaymentMutation.isPending}>
                        {editPaymentMutation.isPending ? <ButtonLoader /> : "Submit"}
                    </button>
                </div>
            </form>
    );
};

export default EditPaymentRequisition;