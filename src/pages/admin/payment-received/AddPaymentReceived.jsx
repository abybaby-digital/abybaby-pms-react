import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { addPaymentReceived } from "../../../services/api"; // Import the API function

export default function AddPaymentReceived() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addPaymentMutation = useMutation({
        mutationFn: async (data) => {
            return await addPaymentReceived(
                token,
                data.project_id,
                data.received_no,
                data.received_amount,
                data.received_date,
                data.received_img, // File input
                data.received_details,
                "1" // Default status
            );
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Payment received added successfully!");
                navigate("/payment-list");
            }
        },
        onError: (error) => {
            toast.error("Failed to add payment: " + error.message);
        },
    });

    const onSubmit = (data) => {
        addPaymentMutation.mutate(data);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="Add Payment Received" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD PAYMENT RECEIVED
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

                            <div className="form-group">
                                <label htmlFor="project_id">Project ID <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    id="project_id"
                                    {...register("project_id", { required: "Project ID is required" })}
                                    className="block"
                                    placeholder="Enter Project ID"
                                />
                                {errors.project_id && <span className="text-red-600 text-sm">{errors.project_id.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="received_no">Received No <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    id="received_no"
                                    {...register("received_no", { required: "Received No is required" })}
                                    className="block"
                                    placeholder="Enter Received No"
                                />
                                {errors.received_no && <span className="text-red-600 text-sm">{errors.received_no.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="received_amount">Received Amount <span className="text-red-600">*</span></label>
                                <input
                                    type="number"
                                    id="received_amount"
                                    {...register("received_amount", { required: "Received Amount is required" })}
                                    className="block"
                                    placeholder="Enter Amount"
                                />
                                {errors.received_amount && <span className="text-red-600 text-sm">{errors.received_amount.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="received_date">Received Date <span className="text-red-600">*</span></label>
                                <input
                                    type="date"
                                    id="received_date"
                                    {...register("received_date", { required: "Received Date is required" })}
                                    className="block"
                                />
                                {errors.received_date && <span className="text-red-600 text-sm">{errors.received_date.message}</span>}
                            </div>

                            <div className="form-group lg:col-span-2">
                                <label htmlFor="received_img">Upload Receipt (Optional)</label>
                                <input
                                    type="file"
                                    id="received_img"
                                    accept="image/*"
                                    {...register("received_img")}
                                    className="block border w-full rounded-lg p-3"
                                />
                            </div>

                            <div className="form-group lg:col-span-2">
                                <label htmlFor="received_details">Received Details</label>
                                <textarea
                                    id="received_details"
                                    {...register("received_details")}
                                    className="block border w-full rounded-lg p-3"
                                    placeholder="Enter Payment Details"
                                />
                            </div>

                        </div>

                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addPaymentMutation.isPending}
                            >
                                {addPaymentMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
