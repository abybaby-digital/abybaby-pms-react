import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBranch, addVendor, addVendorCategory, getBranchList, getStateList, getVendorCategoryList } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";
import { RxCross2 } from "react-icons/rx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useContext, useState } from "react";
import VendorCategoryCreateForm from "./VendorCategoryCreateForm";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

export default function AddVendor() {
    const { refetchList  } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // BRANCH LIST

    const { data: branchList } = useQuery({
        queryKey: ["branch-list"],
        queryFn: async () => {
            return await getBranchList(token);
        }
    })
    // VENDOR CATEGORY LIST

    const { data: vendorCategoryList } = useQuery({
        queryKey: ["vendor-category-list", refetchList],
        queryFn: async () => {
            return await getVendorCategoryList(token);
        }
    })



    // BRANCH LIST

    const { data: stateList } = useQuery({
        queryKey: ["state-list"],
        queryFn: async () => {
            return await getStateList(token);
        }
    })

    // console.log(stateList);


    const addVendorMutation = useMutation({
        mutationFn: async (data) => {
            // Pass the form data and status to the addBranch API
            return await addVendor(token,
                +data.vendor_category_id,
                data.vendor_name,
                data.vendor_email,
                data.vendor_mobile,
                +data.branch_id,
                data.vendor_address,
                +data.vendor_state,
                data.pan_no,
                data.gst_no,
                data.bank_name,
                data.bank_account_number,
                data.ifsc_code,
                "1");
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Vendor added successfully!");
                navigate("/vendor-list"); // Redirect to branch list after successful submission
            }
            else {
                toast.error("Something went wrong !!")
            }
        },
        onError: (error) => {
            toast.error("Failed to add vendor: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", typeof (data.branch_id)); // Log the form data to verify
        addVendorMutation.mutate(data); // Call the mutation with the form data
    };

    const [addCatModal, setCatModal] = useState(null);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="vendor" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD VENDOR
                        </h2>
                        <div className="flex justify-between border mx-5 p-3 items-center bg-whitesmoke rounded-3xl mt-5">
                            <p>if vendor category doesn't exist in the list , create new vendor category</p>
                            <button className="bg-lightdark py-1 px-2 text-white rounded-3xl animate-pulse" onClick={() => { setCatModal(true) }}>Click here</button>
                        </div>
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
                                    <span className="text-red-600 text-sm">
                                        {errors.vendor_category_id.message}
                                    </span>
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
                                    <span className="text-red-600 text-sm">
                                        {errors.vendor_name.message}
                                    </span>
                                )}
                            </div>

                            {/* Vendor Email Field */}
                            <div className="form-group">
                                <label htmlFor="vendor_email">Email
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="block"
                                    id="vendor_email"
                                    placeholder="Enter Vendor Email"
                                    {...register("vendor_email", {
                                        required: "Vendor Email is required",
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                />
                                {errors.vendor_email && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vendor_email.message}
                                    </span>
                                )}
                            </div>

                            {/* Vendor Mobile Field */}
                            <div className="form-group">
                                <label htmlFor="vendor_mobile">Mobile
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="tel"
                                    className="block"
                                    id="vendor_mobile"
                                    placeholder="Enter Vendor Mobile"
                                    {...register("vendor_mobile", {
                                        required: "Vendor Mobile is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Mobile number must be 10 digits"
                                        }
                                    })}
                                />
                                {errors.vendor_mobile && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vendor_mobile.message}
                                    </span>
                                )}
                            </div>

                            {/* Vendor Address Field */}
                            <div className="form-group lg:col-span-2">
                                <label htmlFor="vendor_address">Address
                                    <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    className="block border w-full rounded-lg p-3"
                                    id="vendor_address"
                                    placeholder="Enter Vendor Address"
                                    {...register("vendor_address", { required: "Vendor Address is required" })}
                                />
                                {errors.vendor_address && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vendor_address.message}
                                    </span>
                                )}
                            </div>

                            {/* Branch Select Field */}
                            <div className="form-group">
                                <label htmlFor="branch_id">
                                    Branch <span className="text-red-600">*</span>
                                </label>
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
                                    <span className="text-red-600 text-sm">
                                        {errors.branch_id.message}
                                    </span>
                                )}
                            </div>

                            {/* State Select Field */}
                            <div className="form-group">
                                <label htmlFor="vendor_state">State
                                    <span className="text-red-600">*</span>
                                </label>
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
                                    <span className="text-red-600 text-sm">
                                        {errors.vendor_state.message}
                                    </span>
                                )}
                            </div>

                            {/* PAN Number Field */}
                            <div className="form-group">
                                <label htmlFor="pan_no">PAN No
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="pan_no"
                                    placeholder="Enter PAN Number"
                                    {...register("pan_no", {
                                        required: "PAN Number is required", pattern: {
                                            value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                            message: "Invalid PAN Number, All letter will be capital"
                                        }
                                    })}
                                />
                                {errors.pan_no && (
                                    <span className="text-red-600 text-sm">
                                        {errors.pan_no.message}
                                    </span>
                                )}
                            </div>

                            {/* GST Number Field */}
                            <div className="form-group">
                                <label htmlFor="gst_no">GST No</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="gst_no"
                                    placeholder="Enter GST Number"
                                    {...register("gst_no", {
                                        required: "GST Number is required",  // Makes it a required field
                                        pattern: {
                                            value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[0-9]{1}$/,  // GST number pattern
                                            message: "Invalid GST Number , All letters will be capital"  // Error message for invalid GST number
                                        }
                                    })}
                                />
                                {errors.gst_no && (
                                    <span className="text-red-600 text-sm">
                                        {errors.gst_no.message}
                                    </span>
                                )}
                            </div>


                            {/* Bank Name Field */}
                            <div className="form-group">
                                <label htmlFor="bank_name">Bank Name

                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="bank_name"
                                    placeholder="Enter Bank Name"
                                    {...register("bank_name")}
                                />
                                {errors.bank_name && (
                                    <span className="text-red-600 text-sm">
                                        {errors.bank_name.message}
                                    </span>
                                )}
                            </div>

                            {/* Bank Account Number Field */}
                            <div className="form-group">
                                <label htmlFor="bank_account_number">Bank Account No.
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="block"
                                    id="bank_account_number"
                                    placeholder="Enter Bank Account Number"
                                    {...register("bank_account_number", { required: "Bank Account Number is required" })}
                                />
                                {errors.bank_account_number && (
                                    <span className="text-red-600 text-sm">
                                        {errors.bank_account_number.message}
                                    </span>
                                )}
                            </div>

                            {/* IFSC Code Field */}
                            <div className="form-group">
                                <label htmlFor="ifsc_code">IFSC Code
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="ifsc_code"
                                    placeholder="Enter IFSC Code"
                                    {...register("ifsc_code", {
                                        required: "IFSC Code is required", pattern: {
                                            value: /^[A-Z]{4}[0-9]{7}$/,
                                            message: "Invalid IFSC Code , All letters will be capital"
                                        }
                                    })}
                                />
                                {errors.ifsc_code && (
                                    <span className="text-red-600 text-sm">
                                        {errors.ifsc_code.message}
                                    </span>
                                )}
                            </div>

                        </div>

                        {/* LOADER */}

                        {
                            addVendorMutation.isPending ?
                                <FormSubmitLoader loading_msg="Adding Vendor..." /> : null
                        }

                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addVendorMutation.isPending}
                            >
                                {addVendorMutation.isPending ? <ButtonLoader /> : "Submit"}

                            </button>
                        </div>
                    </form>

                    {/* ADD VENDOR CATEGORY FORM */}
                    <Dialog open={addCatModal}>

                        <DialogContent className="w-[350px]">
                            <DialogHeader>
                                <DialogTitle>Add Vendor Category</DialogTitle>
                                {/* <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription> */}
                            </DialogHeader>
                            <VendorCategoryCreateForm setCatModal={setCatModal} addCatModal={addCatModal} />

                            <button className="close absolute right-3 top-3 z-50 text-lightdark" onClick={()=> {setCatModal(false)}}><RxCross2 /></button>


                        </DialogContent>
                    </Dialog>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
