import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation } from "@tanstack/react-query";
import { addCompany } from "../../../services/api"; // Assuming addCompany API function is defined
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
                                        {errors.companyName.message}
                                    </span>
                                )}
                            </div>

                            {/* Company Details Field */}
                            <div className="form-group">
                                <label htmlFor="companyDetails">Company Details</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyDetails"
                                    placeholder="Company Details"
                                    {...register("companyDetails")}
                                />
                            </div>

                            {/* Company GST Field */}
                            <div className="form-group">
                                <label htmlFor="companyGst">Company GST</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyGst"
                                    placeholder="Company GST"
                                    {...register("companyGst")}
                                />
                            </div>

                            {/* Company Address Field */}
                            <div className="form-group">
                                <label htmlFor="companyAddress">Company Address</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="companyAddress"
                                    placeholder="Company Address"
                                    {...register("companyAddress")}
                                />
                            </div>

                            {/* Contact Person Field */}
                            <div className="form-group">
                                <label htmlFor="contactPerson">Contact Person</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contactPerson"
                                    placeholder="Contact Person"
                                    {...register("contactPerson")}
                                />
                            </div>

                            {/* Contact Number Field */}
                            <div className="form-group">
                                <label htmlFor="contactNo">Contact Number</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contactNo"
                                    placeholder="Contact Number"
                                    {...register("contactNo")}
                                />
                            </div>

                            {/* Contact Email Field */}
                            <div className="form-group">
                                <label htmlFor="contactEmail">Contact Email</label>
                                <input
                                    type="text"
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
                                {addCompanyMutation.isPending ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
