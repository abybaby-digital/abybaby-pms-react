import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addGift } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";

export default function AddGift() {
    const { setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addGiftMutation = useMutation({
        mutationFn: async (data) => {
            return await addGift(token, data.giftName);
        },
        onSuccess: (response) => {
            toast.success("Gift added successfully!");
            setModal(false);
            setRefetchList(!refetchList);
        },
        onError: (error) => {
            toast.error("Failed to add gift: " + error.message);
        },
    });

    const onSubmit = (data) => {
        addGiftMutation.mutate(data);
    };

    return (
        <div className="flex flex-1 flex-col gap-2 bg-whitesmoke lg:justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white mx-auto w-full overflow-hidden"
            >
                <div className="card-body grid gap-3 grid-cols-1 p-5">
                    <div className="form-group">
                        <label htmlFor="giftName">
                            Gift Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            id="giftName"
                            className="block w-full"
                            placeholder="Enter gift name"
                            {...register("giftName", {
                                required: "Gift name is required",
                            })}
                        />
                        {errors.giftName && (
                            <span className="text-red-600 text-sm">
                                {errors.giftName.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="card-footer text-center bg-gray-100 py-5">
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                        disabled={addGiftMutation.isPending}
                    >
                        {addGiftMutation.isPending ? <ButtonLoader /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
