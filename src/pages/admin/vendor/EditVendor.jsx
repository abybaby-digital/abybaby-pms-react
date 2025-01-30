import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  getVendorCategoryList, getBranchList, getStateList } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";

const EditVendor = ({ vendor }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { refetchList, setRefetchList, setModal } = useContext(dialogOpenCloseContext);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            vendor_category_id: vendor.vendor_category_id,
            vendor_name: vendor.vendor_name,
            vendor_email: vendor.vendor_email,
            vendor_mobile: vendor.vendor_mobile,
            vendor_address: vendor.vendor_address,
            branch_id: vendor.branch_id,
            vendor_state: vendor.vendor_state,
            pan_no: vendor.pan_no,
            gst_no: vendor.gst_no,
            bank_name: vendor.bank_name,
            bank_account_number: vendor.bank_account_number,
            ifsc_code: vendor.ifsc_code,
            vendor_status: vendor.status === "1" ? true : false,  // Assuming vendor's status is boolean (active/inactive)
        }
    });

    // Fetch required lists for the form
    const { data: branchList } = useQuery({
        queryKey: ["branch-list"],
        queryFn: () => getBranchList(token),
    });

    const { data: vendorCategoryList } = useQuery({
        queryKey: ["vendor-category-list"],
        queryFn: () => getVendorCategoryList(token),
    });

    const { data: stateList } = useQuery({
        queryKey: ["state-list"],
        queryFn: () => getStateList(token),
    });

    // Mutation to edit the vendor
    const editVendorMutation = useMutation({
        mutationFn: async (data) => {
            return await editVendor(
                token,
                vendor.id,  // Vendor ID to edit the correct one
                data.vendor_category_id,
                data.vendor_name,
                data.vendor_email,
                data.vendor_mobile,
                data.branch_id,
                data.vendor_address,
                data.vendor_state,
                data.pan_no,
                data.gst_no,
                data.bank_name,
                data.bank_account_number,
                data.ifsc_code,
                data.vendor_status ? "1" : "0" // Convert boolean status to "1" or "0"
            );
        },
        onSuccess: () => {
            toast.success("Vendor updated successfully!");
            setModal(false);  // Close the modal (if used)
            setRefetchList(!refetchList);  // Trigger refetch for the vendor list
            navigate("/vendor-list"); // Optionally, navigate after success
        },
        onError: (error) => {
            toast.error(error?.message || "Error updating vendor");
        },
    });

    const onSubmit = (data) => {
        editVendorMutation.mutate(data);  // Trigger mutation to edit the vendor
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
        >
            <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                EDIT VENDOR
            </h2>
            <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                {/* Vendor Category Select Field */}
                <div className="form-group">
                    <label htmlFor="vendor_category_id">
                        Category <span className="text-red-600">*</span>
                    </label>
                    <select
                        {...register("vendor_category_id", { required: "Select Vendor Category" })}
                        id="vendor_category_id"
                    >
                        <option value="">-- Select Category --</option>
                        {vendorCategoryList?.response.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.vendor_category_id && (
                        <span className="text-red-600 text-sm">{errors.vendor_category_id.message}</span>
                    )}
                </div>

                {/* Vendor Name Field */}
                <div className="form-group">
                    <label htmlFor="vendor_name">
                        Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="vendor_name"
                        placeholder="Enter Vendor Name"
                        {...register("vendor_name", { required: "Vendor Name is required" })}
                    />
                    {errors.vendor_name && (
                        <span className="text-red-600 text-sm">{errors.vendor_name.message}</span>
                    )}
                </div>

                {/* Vendor Email Field */}
                <div className="form-group">
                    <label htmlFor="vendor_email">Email <span className="text-red-600">*</span></label>
                    <input
                        type="email"
                        className="block"
                        id="vendor_email"
                        placeholder="Enter Vendor Email"
                        {...register("vendor_email", {
                            required: "Vendor Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.vendor_email && (
                        <span className="text-red-600 text-sm">{errors.vendor_email.message}</span>
                    )}
                </div>

                {/* Vendor Mobile Field */}
                <div className="form-group">
                    <label htmlFor="vendor_mobile">Mobile <span className="text-red-600">*</span></label>
                    <input
                        type="tel"
                        className="block"
                        id="vendor_mobile"
                        placeholder="Enter Vendor Mobile"
                        {...register("vendor_mobile", {
                            required: "Vendor Mobile is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Mobile number must be 10 digits",
                            },
                        })}
                    />
                    {errors.vendor_mobile && (
                        <span className="text-red-600 text-sm">{errors.vendor_mobile.message}</span>
                    )}
                </div>

                {/* Vendor Address Field */}
                <div className="form-group lg:col-span-2">
                    <label htmlFor="vendor_address">Address <span className="text-red-600">*</span></label>
                    <textarea
                        className="block border w-full rounded-lg p-3"
                        id="vendor_address"
                        placeholder="Enter Vendor Address"
                        {...register("vendor_address", { required: "Vendor Address is required" })}
                    />
                    {errors.vendor_address && (
                        <span className="text-red-600 text-sm">{errors.vendor_address.message}</span>
                    )}
                </div>

                {/* Branch Select Field */}
                <div className="form-group">
                    <label htmlFor="branch_id">Branch <span className="text-red-600">*</span></label>
                    <select
                        {...register("branch_id", { required: "Select Branch" })}
                        id="branch_id"
                    >
                        <option value="">-- Select Branch --</option>
                        {branchList?.response.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.branch_name}
                            </option>
                        ))}
                    </select>
                    {errors.branch_id && (
                        <span className="text-red-600 text-sm">{errors.branch_id.message}</span>
                    )}
                </div>

                {/* State Select Field */}
                <div className="form-group">
                    <label htmlFor="vendor_state">State <span className="text-red-600">*</span></label>
                    <select
                        {...register("vendor_state", { required: "State is required" })}
                        id="vendor_state"
                    >
                        <option value="">-- Select State --</option>
                        {stateList?.response.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.state_name}
                            </option>
                        ))}
                    </select>
                    {errors.vendor_state && (
                        <span className="text-red-600 text-sm">{errors.vendor_state.message}</span>
                    )}
                </div>

                {/* PAN Number Field */}
                <div className="form-group">
                    <label htmlFor="pan_no">PAN No <span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        className="block"
                        id="pan_no"
                        placeholder="Enter PAN Number"
                        {...register("pan_no", {
                            required: "PAN Number is required",
                            pattern: {
                                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                message: "Invalid PAN Number",
                            },
                        })}
                    />
                    {errors.pan_no && (
                        <span className="text-red-600 text-sm">{errors.pan_no.message}</span>
                    )}
                </div>

                {/* Bank Name Field */}
                <div className="form-group">
                    <label htmlFor="bank_name">Bank Name <span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        className="block"
                        id="bank_name"
                        placeholder="Enter Bank Name"
                        {...register("bank_name", { required: "Bank Name is required" })}
                    />
                    {errors.bank_name && (
                        <span className="text-red-600 text-sm">{errors.bank_name.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="card-footer text-center bg-gray-100 py-5">
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                        disabled={editVendorMutation.isLoading}
                    >
                        {editVendorMutation.isLoading ? <ButtonLoader /> : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditVendor;
