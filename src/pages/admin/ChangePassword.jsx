import { useMutation } from "@tanstack/react-query"
import pmsLogInBg from "../../assets/images/loginbg.png"
import { changePassword } from "../../services/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"; // Import useForm

const ChangePassword = () => {

    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Mutation for changing the password
    const changePasswordMutation = useMutation({
        mutationFn: ({ email, oldPassword, newPassword, confirmPassword }) => changePassword(email, oldPassword, newPassword, confirmPassword),
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Password changed successfully!");
            } else {
                toast.error(response.message || "Password change failed. Please try again.");
            }
        },
        onError: (error) => {
            toast.error("Password change failed. Please try again.");
        }
    })

    // Submit handler
    const onSubmit = (data) => {
        // You might want to add validation here for the confirm password
        if (data.newPassword !== data.confirmPassword) {
            toast.error("New Password and Confirm Password do not match!");
            return;
        }
        changePasswordMutation.mutate({
            email: data.email,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        });
    };

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AdminHead breadcrumb_name="branch" />
                    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 " style={{ background: `linear-gradient(#141414e6, #ffffffb7),url(${pmsLogInBg}) no-repeat top/cover` }}>
                        <div className="w-full max-w-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded-3xl shadow-lg">
                                <h2 className="text-xl font-bold text-center mb-4">Change Password</h2>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", { required: "Email is required" })}
                                        className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        {...register("oldPassword", { required: "Old Password is required" })}
                                        className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.oldPassword && <span className="text-red-500 text-sm">{errors.oldPassword.message}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        {...register("newPassword", { required: "New Password is required" })}
                                        className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        {...register("confirmPassword", { required: "Confirm Password is required" })}
                                        className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                                </div>

                                <div className="mb-4 text-center">
                                    <button type="submit" className="px-5 py-2 bg-lightdark text-white rounded-lg">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default ChangePassword;
