import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation } from "@tanstack/react-query";
import { addCompany, addDealership } from "../../../services/api"; // Reused for adding dealership name
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

export default function AddDealership() {
    const { setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addDealershipMutation = useMutation({
        mutationFn: async (data) => {
            // Assuming `addCompany` function is reused here, only passing name and dummy placeholders
            return await addDealership(
                token,
                data.dealershipName,
            );
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Dealership added successfully!");
                setModal(false);
                setRefetchList(!refetchList);
            } else {
                toast.error(response.message || "Failed to add dealership");
            }
        },
        onError: (error) => {
            toast.error("Failed to add dealership: " + error.message);
        },
    });

    const onSubmit = (data) => {
        addDealershipMutation.mutate(data);
    };

    return (


        <div className="flex flex-1 flex-col gap-2 bg-whitesmoke lg:justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white  mx-auto  w-full overflow-hidden"
            >


                <div className="card-body grid gap-3 grid-cols-1 p-5">
                    <div className="form-group">
                        <label htmlFor="dealershipName">
                            Dealership Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            id="dealershipName"
                            className="block w-full"
                            placeholder="Enter dealership name"
                            {...register("dealershipName", {
                                required: "Dealership Name is required",
                            })}
                        />
                        {errors.dealershipName && (
                            <span className="text-red-600 text-sm">
                                {errors.dealershipName.message}
                            </span>
                        )}
                    </div>
                </div>

                

                <div className="card-footer text-center bg-gray-100 py-5">
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                        disabled={addDealershipMutation.isPending}
                    >
                        {addDealershipMutation.isPending ? <ButtonLoader /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>

    );
}
