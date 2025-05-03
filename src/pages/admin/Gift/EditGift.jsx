import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editGift } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";

const EditGift = ({ gift }) => {
    const token = useSelector((state) => state.auth.token);
    const { refetchList, setRefetchList, setModal } = useContext(dialogOpenCloseContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            gift_name: gift?.gift_name,
        }
    });

    const editGiftMutation = useMutation({
        mutationFn: async (data) => {
            return await editGift(token, gift?.id, data.gift_name);
        },
        onSuccess: () => {
            toast.success("Gift updated successfully!");
            setModal(false);
            setRefetchList(!refetchList);
        },
        onError: (error) => {
            toast.error(error?.message || "Error updating gift");
        }
    });

    const onSubmit = (data) => {
        editGiftMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full overflow-hidden"
        >
            <div className="card-body grid lg:grid-cols-1 gap-3 grid-cols-1">
                {/* Gift Name Field */}
                <div className="form-group p-5">
                    <label htmlFor="gift_name">
                        Gift Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block w-full"
                        id="gift_name"
                        placeholder="Gift Name"
                        {...register("gift_name", { required: "Gift name is required" })}
                    />
                    {errors.gift_name && (
                        <p className="text-red-600 mt-2">{errors.gift_name.message}</p>
                    )}
                </div>
                {/* Submit Button */}
                <div className="card-footer text-center bg-gray-100 py-5">
                    <button
                        type="submit"
                        className="px-10 py-3 text-white leading-none bg-lightdark rounded-2xl relative"
                        disabled={editGiftMutation.isPending}
                    >
                        {editGiftMutation.isPending ? <ButtonLoader /> : "Update"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditGift;
