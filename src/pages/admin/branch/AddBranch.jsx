import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation } from "@tanstack/react-query";
import { addBranch } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";

export default function AddBranch() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addBranchMutation = useMutation({
        mutationFn: async (data) => {
            // Pass the form data and status to the addBranch API
            return await addBranch(token, data.branchCode, data.branchName, data.branchAddress, "1");
        },
        onSuccess: () => {
            toast.success("Branch added successfully!");
            navigate("/branch-list"); // Redirect to branch list after successful submission
        },
        onError: (error) => {
            toast.error("Failed to add branch: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data); // Log the form data to verify
        addBranchMutation.mutate(data); // Call the mutation with the form data
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="branch" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD BRANCH
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-1 grid-cols-1 p-5">
                            {/* Branch Code Field */}
                            <div className="form-group">
                                <label htmlFor="branchCode">
                                    Branch Code <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="branchCode"
                                    placeholder="Branch Code"
                                    {...register("branchCode", { required: "Branch Code is required" })}
                                />
                                {errors.branchCode && (
                                    <span className="text-red-600 text-sm">
                                        {errors.branchCode.message}
                                    </span>
                                )}
                            </div>

                            {/* Branch Name Field */}
                            <div className="form-group">
                                <label htmlFor="branchName">
                                    Branch Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="branchName"
                                    placeholder="Branch Name"
                                    {...register("branchName", { required: "Branch Name is required" })}
                                />
                                {errors.branchName && (
                                    <span className="text-red-600 text-sm">
                                        {errors.branchName.message}
                                    </span>
                                )}
                            </div>

                            {/* Branch Address Field */}
                            <div className="form-group">
                                <label htmlFor="branchAddress">Branch Address</label>
                                <input
                                    type="text"
                                    className="block"
                                    id="branchAddress"
                                    placeholder="Branch Address"
                                    {...register("branchAddress")}
                                />
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addBranchMutation.isPending}
                            >
                                {addBranchMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
