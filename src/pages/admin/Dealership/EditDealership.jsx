import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editDealership } from "../../../services/api"; // Updated API function
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";

const EditDealership = ({ dealership }) => {
    console.log(dealership);
    
    const token = useSelector((state) => state.auth.token);
    const { refetchList, setRefetchList, setModal } = useContext(dialogOpenCloseContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dealer_name: dealership?.dealer_name, // Assuming dealer_name maps to company_name
        }
    });

    const editDealershipMutation = useMutation({
        mutationFn: async (data) => {
            return await editDealership(token, dealership?.id, data.dealer_name);
        },
        onSuccess: () => {
            toast.success("Dealership updated successfully!");
            setModal(false);
            setRefetchList(!refetchList);
        },
        onError: (error) => {
            toast.error(error?.message || "Error updating dealership");
        }
    });

    const onSubmit = (data) => {
        editDealershipMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full overflow-hidden"
        >
            <div className="card-body grid lg:grid-cols-1 gap-3 grid-cols-1">
                {/* Dealer Name Field */}
                <div className="form-group p-5">
                    <label htmlFor="dealer_name">
                        Dealership Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="dealer_name"
                        placeholder="Dealership Name"
                        {...register("dealer_name", { required: "Dealership name is required" })}
                    />
                    {errors.dealer_name && (
                        <p className="text-red-600 mt-2">{errors.dealer_name.message}</p>
                    )}
                </div>
                {/* Submit Button */}
                <div className="card-footer text-center bg-gray-100 py-5">
                    <button
                        type="submit"
                        className="px-10 py-3 text-white leading-none bg-lightdark rounded-2xl relative"
                        disabled={editDealershipMutation.isPending}
                    >
                        {editDealershipMutation.isPending ? <ButtonLoader /> : "Update"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditDealership;
