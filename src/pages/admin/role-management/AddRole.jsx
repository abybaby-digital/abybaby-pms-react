import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addRole, getMenuList } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { useEffect, useState } from "react";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

// const accessOptions = [
//     "Company", "Branch", "Role Management", "Vendor", "Client", "Users",
//     "Project", "Billing Supportings", "Payment Requisition", "Client PO",
//     "Invoice", "Payment Received", "Report"
// ];

export default function AddRole() {
    const token = useSelector((state) => state.auth.token);
    const [accessOptions, setAccessOptions] = useState([]);

    const { data: menuList } = useQuery({
        queryKey: ["menu-list"],
        queryFn: async () => {
            return await getMenuList(token);
        }
    });

    // Update access options when menuList data is fetched
    useEffect(() => {
        if (menuList?.response) {
            const updatedAccessOptions = menuList.response.map((item) => ({
                id: item.id,
                menuName: item.menu_name
            }));
            setAccessOptions(updatedAccessOptions);
        }
    }, [menuList]);  // Correctly listen to the `menuList` state change

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addRoleMutation = useMutation({
        mutationFn: async (data) => {
            // Prepare the access data as comma-separated strings for both add and edit
            const access_add = data.access_type_add.join(',');
            const access_edit = data.access_type_edit.join(',');
            return await addRole(token, data.role_name, access_add, access_edit, "1");
        },
        onSuccess: (value) => {
            if (value.status === 200 || value.status === 201) {
                toast.success("Role added successfully!");
                navigate("/role-list"); // Redirect to role list after successful submission
            } else {
                toast.error("Something went wrong!");
            }
        },
        onError: (error) => {
            toast.error("Failed to add role: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data);
        addRoleMutation.mutate(data); // Call the mutation with the form data
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="role" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto 2xl:w-[50%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD ROLE
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-1 grid-cols-1 p-5">

                            {/* Role Name Field */}
                            <div className="form-group mb-5">
                                <label htmlFor="role_name">
                                    Role Name: <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="role_name"
                                    placeholder="Role Name"
                                    {...register("role_name", { required: "Role Name is required" })}
                                />
                                {errors.role_name && (
                                    <span className="text-red-600 text-sm">
                                        {errors.role_name.message}
                                    </span>
                                )}
                            </div>

                            {/* Access Type Add (Checkboxes) */}
                            <div className="form-group mb-5">
                                <label className="block">Access Type Add:
                                    <span className="text-red-600">*</span>
                                </label>
                                <div className="flex gap-5 flex-wrap text-nowrap items-center">
                                    {accessOptions.map((option) => (
                                        <div key={option.id} className="flex items-center gap-1 px-5 py-1  rounded-3xl bg-whitesmoke shadow-lg">
                                            <input
                                                type="checkbox"
                                                className="accent-lightdark"
                                                id={`access_type_add_${option.id}`}
                                                value={option.id}
                                                {...register("access_type_add", {
                                                    required: "At least one access type is required",
                                                })}
                                            />
                                            <label htmlFor={`access_type_add_${option.id}`} className="m-0">
                                                {option.menuName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.access_type_add && (
                                    <span className="text-red-600 text-sm">
                                        {errors.access_type_add.message}
                                    </span>
                                )}
                            </div>

                            {/* Access Type Edit (Checkboxes) */}
                            <div className="form-group">
                                <label className="block">Access Type Edit:
                                    <span className="text-red-600">*</span>
                                </label>
                                <div className="flex gap-5 flex-wrap text-nowrap items-center">
                                    {accessOptions.map((option) => (
                                        <div key={option.id} className="flex items-center gap-1 px-5 py-1  rounded-3xl bg-whitesmoke shadow-lg">
                                            <input
                                                type="checkbox"
                                                className="accent-lightdark"
                                                id={`access_type_edit_${option.id}`}
                                                value={option.id}
                                                {...register("access_type_edit", {
                                                    required: "At least one access type is required",
                                                })}
                                            />
                                            <label htmlFor={`access_type_edit_${option.id}`} className="m-0">
                                                {option.menuName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.access_type_edit && (
                                    <span className="text-red-600 text-sm">
                                        {errors.access_type_edit.message}
                                    </span>
                                )}
                            </div>

                        </div>

                        {/* LOADER */}

                        {
                            addRoleMutation.isPending ?
                                <FormSubmitLoader loading_msg="Creating Role..." /> : null
                        }

                        {/* Submit Button */}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addRoleMutation.isLoading}
                            >
                                {addRoleMutation.isLoading ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
