import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch"; // Assuming Switch is imported from your UI kit
import { useMutation } from "@tanstack/react-query";
import { editCompany } from "../../../services/api";  // Assuming your `editCompany` API function is correct
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

const EditCompany = ({ company }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const company_id = company.id;
    const {refetchList, setRefetchList, setModal} = useContext(dialogOpenCloseContext);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            company_name: company.company_name,
            company_details: company.company_details,
            company_gst: company.company_gst,
            company_address: company.company_address,
            contact_person: company.contact_person,
            contact_number: company.contact_number,
            contact_email: company.contact_email,
            company_status: company.status === "1" ? true : false, // Ensure company_status is part of the default values
        }
    });

    console.log(company_id);

    // UseMutation hook for editing company
    const editCompanyMutation = useMutation({
        mutationFn: async (data) => {
            // Make sure that the data passed is correctly formatted
            return await editCompany(
                token,
                company_id,  // Make sure the company.id is passed correctly to identify which company to update
                data.company_name,
                data.company_details,
                data.company_gst,
                data.company_address,
                data.contact_person,
                data.contact_number,
                data.contact_email,
                data.company_status ? "1" : "0" // Convert boolean status to "1" or "0"
            );
        },
        onSuccess: () => {
            // Handle success, showing toast message
            toast.success("Company updated successfully!");
            setModal(false);
            setRefetchList(!refetchList);
        },
        onError: (error) => {
            // Handle error, showing error message
            toast.error(error?.message || "Error updating company");
        }
    });

    const onSubmit = (data) => {
        // Trigger the mutation to edit the company
        editCompanyMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto w-full overflow-hidden"
        >
            <div className="card-body grid gap-3 lg:grid-cols-1 grid-cols-1 p-5">
                {/* Company Name Field */}
                <div className="form-group">
                    <label htmlFor="company_name">
                        Company Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="company_name"
                        placeholder="Company Name"
                        {...register("company_name", { required: "Company name is required" })}
                    />
                    {errors.company_name && (
                        <p className="text-red-600 mt-2">{errors.company_name.message}</p>
                    )}
                </div>

                {/* Company Details Field */}
                <div className="form-group">
                    <label htmlFor="company_details">Company Details</label>
                    <input
                        type="text"
                        className="block"
                        id="company_details"
                        placeholder="Company Details"
                        {...register("company_details")}
                    />
                </div>

                {/* Company GST Field */}
                <div className="form-group">
                    <label htmlFor="company_gst">Company GST</label>
                    <input
                        type="text"
                        className="block"
                        id="company_gst"
                        placeholder="Company GST"
                        {...register("company_gst")}
                    />
                </div>

                {/* Company Address Field */}
                <div className="form-group">
                    <label htmlFor="company_address">Company Address</label>
                    <textarea
                        className="block w-full border p-3 rounded-md focus:outline-none text-[16px]"
                        id="company_address"
                        placeholder="Company Address"
                        {...register("company_address")}
                    ></textarea>
                </div>

                {/* Contact Person Field */}
                <div className="form-group">
                    <label htmlFor="contact_person">Contact Person</label>
                    <input
                        type="text"
                        className="block"
                        id="contact_person"
                        placeholder="Contact Person"
                        {...register("contact_person")}
                    />
                </div>

                {/* Contact Number Field */}
                <div className="form-group">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                        type="text"
                        className="block"
                        id="contact_number"
                        placeholder="Contact Number"
                        {...register("contact_number")}
                    />
                </div>

                {/* Contact Email Field */}
                <div className="form-group">
                    <label htmlFor="contact_email">Contact Email</label>
                    <input
                        type="email"
                        className="block"
                        id="contact_email"
                        placeholder="Contact Email"
                        {...register("contact_email")}
                    />
                </div>

                {/* Active Company Switch */}
                <div className="form-group">
                    <label htmlFor="company_status">Company Status</label>
                    <Controller
                        name="company_status"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                id="company_status"
                                className="block mx-2"
                                {...field}
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer text-center bg-gray-100 py-5">
                <button
                    type="submit"
                    className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                    disabled={editCompanyMutation.isPending}
                >
                    {editCompanyMutation.isPending ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};

export default EditCompany;
