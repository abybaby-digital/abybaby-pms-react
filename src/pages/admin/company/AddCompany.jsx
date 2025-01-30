import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation } from "@tanstack/react-query";
import { addCompany } from "../../../services/api"; // Assuming addCompany API function is defined
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";

export default function AddCompany() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addCompanyMutation = useMutation({
        mutationFn: async (data) => {
            // Pass form data and status to the addCompany API
            return await addCompany(
                token,
                data.companyName,
                data.companyDetails,
                data.companyGst,
                data.companyAddress,
                data.contactPerson,
                data.contactNo,
                data.contactEmail,
                "1"
            );
        },
        onSuccess: () => {
            toast.success("Company added successfully!");
            navigate("/company-list"); // Redirect to company list after successful submission
        },
        onError: (error) => {
            toast.error("Failed to add company: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data); // Log the form data to verify
        addCompanyMutation.mutate(data); // Call the mutation with form data
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="company" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto xl:w-[80%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD COMPANY
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                            {/* Company Name Field */}
                            <div className="form-group">
                                <label htmlFor="companyName">
                                    Company Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyName"
                                    placeholder="Company Name"
                                    {...register("companyName", { required: "Company Name is required" })}
                                />
                                {errors.companyName && (
                                    <span className="text-red-600 text-sm">
                                        {errors.companyName?.message}
                                    </span>
                                )}
                            </div>

                            {/* Company Details Field */}
                            <div className="form-group">
                                <label htmlFor="companyDetails">Company Details
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyDetails"
                                    placeholder="Company Details"
                                    {...register("companyDetails", { required: "Company Details is required" })}
                                />
                                {errors.companyName && (
                                    <span className="text-red-600 text-sm">
                                        {errors.companyDetails?.message}
                                    </span>
                                )}
                            </div>

                            {/* Company GST Field */}
                            <div className="form-group">
                                <label htmlFor="companyGst">Company GST
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyGst"
                                    placeholder="Company GST"
                                    {...register("companyGst", {
                                        required: "Company GST is required",
                                        pattern: {
                                            value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, // Indian GST regex
                                            message: "Please enter a valid GST number"
                                        }
                                    })}
                                />
                                <span className="text-red-600 text-sm">
                                    {errors.companyGst?.message}
                                </span>
                            </div>


                            {/* Company Address Field */}
                            <div className="form-group">
                                <label htmlFor="companyAddress">Company Address
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyAddress"
                                    placeholder="Company Address"
                                    {...register("companyAddress", { required: "Company Address is required" })}
                                />
                                <span className="text-red-600 text-sm">
                                    {errors.companyAddress?.message}
                                </span>
                            </div>

                            {/* Contact Person Field */}
                            <div className="form-group">
                                <label htmlFor="contactPerson">Contact Person
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contactPerson"
                                    placeholder="Contact Person"
                                    {...register("contactPerson", { required: "Company Person is required" })}
                                />
                                <span className="text-red-600 text-sm">
                                    {errors.contactPerson?.message}
                                </span>
                            </div>

                            {/* Contact Number Field */}
                            <div className="form-group">
                                <label htmlFor="contactNo">Contact Number
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="block"
                                    id="contactNo"
                                    placeholder="Contact Number"
                                    {...register("contactNo", {
                                        required: "Contact Number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/, // Ensures the input is exactly 10 digits
                                            message: "Please enter a valid 10-digit phone number"
                                        }
                                    })}
                                />
                                <span className="text-red-600 text-sm">
                                    {errors.contactNo?.message}
                                </span>
                            </div>


                            {/* Contact Email Field */}
                            <div className="form-group">
                                <label htmlFor="contactEmail">Contact Email</label>
                                <input
                                    type="email"
                                    className="block"
                                    id="contactEmail"
                                    placeholder="Contact Email"
                                    {...register("contactEmail")}
                                />
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addCompanyMutation.isPending}
                            >
                                {addCompanyMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
