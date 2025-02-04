import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editRole, getMenuList } from "../../../services/api"; // Assuming you have the editRole API
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

export default function EditRole({ role }) {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { refetchList, setRefetchList, setModal } = useContext(dialogOpenCloseContext);

    const [accessOptions, setAccessOptions] = useState([]);

    // Fetch menu list (access options)
    const { data: menuList } = useQuery({
        queryKey: ["menu-list"],
        queryFn: async () => {
            return await getMenuList(token);
        },
        onSuccess: (data) => {
            const updatedAccessOptions = data?.response?.map((item) => ({
                id: item.id,
                menuName: item.menu_name,
            }));
            setAccessOptions(updatedAccessOptions);
        },
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            role_name: role.role_name,
            access_type_add: role.access_type_add ? role.access_type_add.split(',') : [],
            access_type_edit: role.access_type_edit ? role.access_type_edit.split(',') : [],
            status: role.status === "1" ? "active" : "inactive", // Set the default status based on the role's current status
        },
    });

    const editRoleMutation = useMutation({
        mutationFn: async (data) => {
            // Prepare the access data as comma-separated strings for both add and edit
            const access_add = data.access_type_add.join(',');
            const access_edit = data.access_type_edit.join(',');
            return await editRole(token, role.id, data.role_name, access_add, access_edit, data.status === "active" ? "1" : "0");
        },
        onSuccess: (value) => {
            if (value.status === 200 || value.status === 201) {
                toast.success("Role updated successfully!");
                setModal(false);
                setRefetchList(!refetchList);
                navigate("/role-list"); // Redirect to role list after successful submission
            } else {
                toast.error("Something Went Wrong !!!");
            }
        },
        onError: (error) => {
            toast.error("Failed to update role: " + error.message);
        },
    });

    const onSubmit = (data) => {
        editRoleMutation.mutate(data); // Call the mutation with the form data
    };

    useEffect(() => {
        // Set access options dynamically when menu list data is available
        if (menuList) {
            const updatedAccessOptions = menuList?.response?.map((item) => ({
                id: item.id,
                menuName: item.menu_name,
            }));
            setAccessOptions(updatedAccessOptions);
        }
    }, [menuList]);

    return (
        <>

            <div className="flex flex-1 flex-col gap-2  lg:justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white mx-auto xl:w-[50%] w-full overflow-hidden"
                >
                    <div className="card-body grid gap-3 lg:grid-cols-1 grid-cols-1 p-5">

                        {/* Role Name Field */}
                        <div className="form-group">
                            <label htmlFor="role_name">
                                Role Name <span className="text-red-600">*</span>
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
                        <div className="form-group">
                            <label className="block">Access Type Add</label>
                            <div className="flex gap-5 flex-wrap text-nowrap items-center">
                                {accessOptions.map((option) => (
                                    <div key={option.id} className="flex items-center gap-1 px-5 py-1 rounded-3xl bg-whitesmoke shadow-lg">
                                        <input
                                            type="checkbox"
                                            id={`access_type_add_${option.id}`}
                                            className="accent-lightdark"
                                            value={option.id}
                                            {...register("access_type_add")}
                                            defaultChecked={role.access_type_add?.includes(option.id.toString())}
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
                            <label className="block">Access Type Edit</label>
                            <div className="flex gap-5 flex-wrap text-nowrap items-center">
                                {accessOptions.map((option) => (
                                    <div key={option.id} className="flex items-center gap-1 px-5 py-1 rounded-3xl bg-whitesmoke shadow-lg">
                                        <input
                                            type="checkbox"
                                            className="accent-lightdark"
                                            id={`access_type_edit_${option.id}`}
                                            value={option.id}
                                            {...register("access_type_edit")}
                                            defaultChecked={role.access_type_edit?.includes(option.id.toString())}
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

                        {/* Status (Radio Buttons for Active/Inactive) */}
                        <div className="form-group">
                            <label className="block">Status</label>
                            <div className="flex gap-5">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        className="accent-lightdark"
                                        id="status_active"
                                        value="active"
                                        {...register("status", { required: "Status is required" })}
                                        defaultChecked={role.status === "1"}
                                    />
                                    <label htmlFor="status_active" className="m-0">Active</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        className="accent-lightdark"
                                        id="status_inactive"
                                        value="inactive"
                                        {...register("status")}
                                        defaultChecked={role.status !== "1"}
                                    />
                                    <label htmlFor="status_inactive" className="m-0">Inactive</label>
                                </div>
                            </div>
                            {errors.status && (
                                <span className="text-red-600 text-sm">
                                    {errors.status.message}
                                </span>
                            )}
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="card-footer text-center bg-gray-100 py-5">
                        <button
                            type="submit"
                            className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                            disabled={editRoleMutation.isPending}
                        >
                            {editRoleMutation.isPending ? <ButtonLoader /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
}
