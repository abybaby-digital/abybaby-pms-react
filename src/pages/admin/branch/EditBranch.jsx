import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch"; // Assuming Switch is imported from your UI kit
import { useMutation } from "@tanstack/react-query";
import { editBranch } from "../../../services/api";  // Assuming your `editBranch` API function is correct
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

const EditBranch = ({ branch }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const branch_id = branch.id;
    const {refetchList, setRefetchList, setModal} = useContext(dialogOpenCloseContext);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            branch_code: branch.branch_code,
            branch_name: branch.branch_name,
            branch_address: branch.branch_address,
            branch_status: branch.status === "1" ? true : false, // Ensure branch_status is part of the default values
        }
    });

    console.log(branch_id);


    // UseMutation hook for editing branch
    const editBranchMutation = useMutation({
        mutationFn: async (data) => {
            // Make sure that the data passed is correctly formatted
            return await editBranch(
                token,
                branch_id,  // Make sure the branch.id is passed correctly to identify which branch to update
                data.branch_code,
                data.branch_name,
                data.branch_address,
                data.branch_status ? "1" : "0" // Convert boolean status to "1" or "0"
            );
        },
        onSuccess: () => {
            // Handle success, showing toast message
            toast.success("Branch updated successfully!");
            setModal(false);
            setRefetchList(!refetchList);
                
        },
        onError: (error) => {
            // Handle error, showing error message
            toast.error(error?.message || "Error updating branch");
        }
    });

    const onSubmit = (data) => {
        // Trigger the mutation to edit the branch
        editBranchMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto w-full overflow-hidden"
        >
            <div className="card-body grid gap-3 lg:grid-cols-1 grid-cols-1 p-5">
                {/* Branch Code Field */}
                <div className="form-group">
                    <label htmlFor="branch_code">
                        Branch Code <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="branch_code"
                        placeholder="Branch Code"
                        {...register("branch_code", { required: "Branch code is required" })}
                    />
                    {errors.branch_code && (
                        <p className="text-red-600 mt-2">{errors.branch_code.message}</p>
                    )}
                </div>

                {/* Branch Name Field */}
                <div className="form-group">
                    <label htmlFor="branch_name">
                        Branch Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="branch_name"
                        placeholder="Branch Name"
                        {...register("branch_name", { required: "Branch name is required" })}
                    />
                    {errors.branch_name && (
                        <p className="text-red-600 mt-2">{errors.branch_name.message}</p>
                    )}
                </div>

                {/* Branch Address Field */}
                <div className="form-group">
                    <label htmlFor="branch_address">Branch Address</label>
                    <textarea
                        className="block w-full border p-3 rounded-md focus:outline-none text-[16px]"
                        id="branch_address"
                        placeholder="Branch Address"
                        {...register("branch_address")}
                    ></textarea>
                </div>

                {/* Active Branch Switch */}
                <div className="form-group">
                    <label htmlFor="branch_status">Branch Status</label>
                    <Controller
                        name="branch_status"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                id="branch_status"
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
                    disabled={editBranchMutation.isPending}
                >
                    {editBranchMutation.isPending ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};

export default EditBranch;
