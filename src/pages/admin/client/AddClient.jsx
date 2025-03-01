import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation } from "@tanstack/react-query";
import { addClient } from "../../../services/api"; // Use the addClient API function
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddClient() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addClientMutation = useMutation({
        mutationFn: async (data) => {
            // Pass form data to the addClient API
            return await addClient(
                token,
                data.company_name,     // matches the API payload key
                data.contact_person,   // matches the API payload key
                data.office_address,   // matches the API payload key
                data.contact_number,   // matches the API payload key
                data.client_email,     // matches the API payload key
                data.client_gst,       // matches the API payload key
                "1"                    // Assuming status is always "1" (active)
            );
        },
        onSuccess: () => {
            toast.success("Client added successfully!");
            navigate("/client-list"); // Redirect to client list after successful submission
        },
        onError: (error) => {
            toast.error("Failed to add client: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data); // Log the form data to verify
        addClientMutation.mutate(data); // Call the mutation with form data
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="client" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto 2xl:w-[80%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD CLIENT
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                            {/* Company Name Field */}
                            <div className="form-group">
                                <label htmlFor="company_name">
                                    Client Company Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="company_name"
                                    placeholder="Company Name"
                                    {...register("company_name", { required: "Company Name is required" })}
                                />
                                {errors.company_name && (
                                    <span className="text-red-600 text-sm">
                                        {errors.company_name?.message}
                                    </span>
                                )}
                            </div>

                            {/* Contact Person Field */}
                            <div className="form-group">
                                <label htmlFor="contact_person">
                                    Contact Person <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="contact_person"
                                    placeholder="Contact Person"
                                    {...register("contact_person")}
                                />
                                {errors.contact_person && (
                                    <span className="text-red-600 text-sm">
                                        {errors.contact_person?.message}
                                    </span>
                                )}
                            </div>

                            {/* Office Address Field */}
                            <div className="form-group">
                                <label htmlFor="office_address">
                                    Client Office Address <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="office_address"
                                    placeholder="Office Address"
                                    {...register("office_address")}
                                />
                                {errors.office_address && (
                                    <span className="text-red-600 text-sm">
                                        {errors.office_address?.message}
                                    </span>
                                )}
                            </div>

                            {/* Contact Number Field */}
                            <div className="form-group">
                                <label htmlFor="contact_number">
                                    Client Contact Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="block"
                                    id="contact_number"
                                    placeholder="Contact Number"
                                    {...register("contact_number", {
                                        pattern: {
                                            value: /^[0-9]{10}$/, // Ensures the input is exactly 10 digits
                                            message: "Please enter a valid 10-digit phone number",
                                        },
                                    })}
                                />
                                {errors.contact_number && (
                                    <span className="text-red-600 text-sm">
                                        {errors.contact_number?.message}
                                    </span>
                                )}
                            </div>

                            {/* Client Email Field */}
                            <div className="form-group">
                                <label htmlFor="client_email">Client Email</label>
                                <input
                                    type="email"
                                    className="block"
                                    id="client_email"
                                    placeholder="Client Email"
                                    {...register("client_email", {
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Please enter a valid email address",
                                        },
                                    })}
                                />
                                {errors.client_email && (
                                    <span className="text-red-600 text-sm">
                                        {errors.client_email?.message}
                                    </span>
                                )}
                            </div>

                            {/* Client GST Field */}
                            <div className="form-group">
                                <label htmlFor="client_gst">
                                    Client GST <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="client_gst"
                                    placeholder="Client GST"
                                    {...register("client_gst", {
                                        
                                        pattern: {
                                            value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, // Indian GST regex
                                            message: "Please enter a valid GST number",
                                        },
                                    })}
                                />
                                {errors.client_gst && (
                                    <span className="text-red-600 text-sm">
                                        {errors.client_gst?.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* LOADER */}
                        
                        {
                            addClientMutation.isPending ?
                                <FormSubmitLoader loading_msg="Creating Client..." /> : null
                        }

                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addClientMutation.isPending}
                            >
                                {addClientMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
