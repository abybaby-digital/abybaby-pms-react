import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch"; // Assuming Switch is imported from your UI kit
import { useMutation } from "@tanstack/react-query";
import { editClient } from "../../../services/api";  // Updated to use editClient API function
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";

const EditClient = ({ client }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const client_id = client.id;
    const { refetchList, setRefetchList, setModal } = useContext(dialogOpenCloseContext);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            company_name: client.company_name,
            contact_person: client.contact_person,
            office_address: client.office_address,
            contact_number: client.contact_number,
            client_email: client.client_email,
            client_gst: client.client_gst,
            company_status: client.status === "1" ? true : false, // Ensure status is part of the default values
        }
    });

    console.log(client_id);
    console.log(token);

    // UseMutation hook for editing client
    const editClientMutation = useMutation({
        mutationFn: async (data) => {
            // Make sure that the data passed is correctly formatted
            return await editClient(
                token,
                client_id,  // Make sure the client.id is passed correctly to identify which client to update
                data.company_name,
                data.contact_person,
                data.office_address,
                data.contact_number,
                data.client_email,
                data.client_gst,
                data.company_status ? "1" : "0" // Convert boolean status to "1" or "0"
            );
        },
        onSuccess: () => {
            // Handle success, showing toast message
            toast.success("Client updated successfully!");
            setModal(false);
            setRefetchList(!refetchList);
        },
        onError: (error) => {
            // Handle error, showing error message
            toast.error(error?.message || "Error updating client");
        }
    });

    const onSubmit = (data) => {
        // Trigger the mutation to edit the client
        editClientMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto w-full overflow-hidden"
        >
            <div className="card-body grid lg:grid-cols-2 gap-3 grid-cols-1 p-5">
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
                        {...register("company_name", { required: "Company name is required" })}
                    />
                    {errors.company_name && (
                        <p className="text-red-600 mt-2">{errors.company_name.message}</p>
                    )}
                </div>

                {/* Contact Person Field */}
                <div className="form-group">
                    <label htmlFor="contact_person">
                        Client Contact Person <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="contact_person"
                        placeholder="Contact Person"
                        {...register("contact_person", { required: "Contact person is required" })}
                    />
                    {errors.contact_person && (
                        <p className="text-red-600 mt-2">{errors.contact_person.message}</p>
                    )}
                </div>

                {/* Office Address Field */}
                <div className="form-group">
                    <label htmlFor="office_address">
                        Client Office Address <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="block"
                        id="office_address"
                        placeholder="Office Address"
                        {...register("office_address", { required: "Office address is required" })}
                    />
                    {errors.office_address && (
                        <p className="text-red-600 mt-2">{errors.office_address.message}</p>
                    )}
                </div>

                {/* Contact Number Field */}
                <div className="form-group">
                    <label htmlFor="contact_number">
                        Client Contact Number <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="contact_number"
                        placeholder="Contact Number"
                        {...register("contact_number", {
                            required: "Contact number is required",
                            pattern: {
                                value: /^[0-9]{10}$/, // 10-digit phone number pattern
                                message: "Please enter a valid 10-digit phone number",
                            },
                        })}
                    />
                    {errors.contact_number && (
                        <p className="text-red-600 mt-2">{errors.contact_number.message}</p>
                    )}
                </div>

                {/* Client Email Field */}
                <div className="form-group">
                    <label htmlFor="client_email">
                        Client Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        className="block"
                        id="client_email"
                        placeholder="Client Email"
                        {...register("client_email", { required: "Client email is required" })}
                    />
                    {errors.client_email && (
                        <p className="text-red-600 mt-2">{errors.client_email.message}</p>
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
                            required: "Client GST is required",
                            pattern: {
                                value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, // Indian GST regex
                                message: "Please enter a valid GST number",
                            },
                        })}
                    />
                    {errors.client_gst && (
                        <p className="text-red-600 mt-2">{errors.client_gst.message}</p>
                    )}
                </div>

                {/* Company Status Switch */}
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
                    className="px-10 py-3 text-white leading-none bg-lightdark rounded-2xl relative"
                    disabled={editClientMutation.isPending}
                >
                    {editClientMutation.isPending ? <ButtonLoader /> : "Update"}
                </button>
            </div>
        </form>
    );
};

export default EditClient;
