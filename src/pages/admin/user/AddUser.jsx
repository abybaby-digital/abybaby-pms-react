import { useForm, Controller } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUser, getBranchList, getCompanyList, getVerticalHeadList, getClientServiceList, getBranchManagerList, getOtherList, getStateList, getRoleList } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from "react";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

const animatedComponents = makeAnimated();

export default function AddUser() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm();

    // PROFILE IMAGE PREVIEW
    const [profilePreview, setProfilePreview] = useState(null);
    const profileImgFile = watch("profile_img");

    useEffect(() => {
        if (profileImgFile && profileImgFile.length > 0) {
            const file = profileImgFile[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePreview(null);
        }
    }, [profileImgFile]);

    // Role Select
    const selectedRole = watch("role_id");
    // console.log(selectedRole?.label);



    // Watch selected values
    const selectedVerticalHead = watch("vertical_head_id")?.value;
    const selectedBranchManager = watch("branch_manager_id")?.map((item) => (item.value.toString())).join(",");
    const selectedClientService = watch("client_service_id")?.map((item) => (item.value.toString())).join(",");

    console.log("bm", selectedVerticalHead);





    // Fetch Branch List
    const { data: roleList } = useQuery({
        queryKey: ["role-list"],
        queryFn: async () => await getRoleList(token),
    });

    // Fetch Branch List
    const { data: branchList } = useQuery({
        queryKey: ["branch-list"],
        queryFn: async () => await getBranchList(token),
    });

    // Fetch Company List
    const { data: companyList } = useQuery({
        queryKey: ["company-list"],
        queryFn: async () => await getCompanyList(token),
    });

    const { data: stateList } = useQuery({
        queryKey: ["state-list"],
        queryFn: async () => await getStateList(token), // Fetch state list from API
    });

    const stateOptions = stateList?.response?.map(state => ({
        value: state.id, // Assuming `state.id` is the state's unique identifier
        label: state.state_name, // Assuming `state.name` is the state's name
    }));

    // Fetch Vertical Head List
    const { data: verticalHeadList } = useQuery({
        queryKey: ["vertical-head-list"],
        queryFn: async () => await getVerticalHeadList(token),
    });


    const selected_vertical_id = verticalHeadList?.response?.find((item) => item.id === selectedVerticalHead)?.vertical_head_id;
    console.log(selected_vertical_id);
    // Fetch Branch Manager List
    const { data: branchManagerList } = useQuery({
        queryKey: ["branch-manager-list", selected_vertical_id],
        queryFn: async () => await getBranchManagerList(token, selected_vertical_id),
    });

    // Fetch Client Service List
    const { data: clientServiceList } = useQuery({
        queryKey: ["client-service-list", selectedBranchManager],
        queryFn: async () => await getClientServiceList(token, selectedBranchManager),
    });

    // Fetch Other Service List
    const { data: otherServiceList } = useQuery({
        queryKey: ["other-service-list", selectedClientService],
        queryFn: async () => await getOtherList(token, selectedClientService),

    });




    // Mutation for adding the user
    const addUserMutation = useMutation({
        mutationFn: async (data) => {
            const vertical_head_id = verticalHeadList?.response?.find((item) => item?.id === data.vertical_head_id?.value);
            // console.log("selected vh", vertical_head_id);           

            return await addUser(
                token,
                data.role_id.value === 5 ? data.vertical_head_id.value : "",
                data.name,
                data.email,
                data.role_id.value,
                data.state_id !== undefined ?
                    data.state_id?.map((item) => (item.value.toString())).join(",") : null,
                data.company_id.value,
                data.branch_id.value,
                vertical_head_id.vertical_head_id,
                // data?.vertical_head_id !== undefined ? data.vertical_head_id.value?.toString() : null,
                data?.branch_manager_id !== undefined ? data?.branch_manager_id?.map((item) => (item.value.toString())).join(",") : "",
                data?.client_service_id !== undefined ? data.client_service_id?.map((item) => (item.value.toString())).join(",") : "",
                data?.other_service_id !== undefined ? data.other_service_id?.map((item) => (item.value.toString())).join(",") : "",
                data.contact_number,
                data.password,
                data.profile_img, // This will be passed as a file (if uploaded)
                data.user_details,
                "1"
            );
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("User added successfully!");
                navigate("/user-list");
            }
            else {
                toast.error(response?.message);
                toast.error(response?.response?.email[0]);
            }
        },
        onError: (error) => {
            toast.error("Failed to add user: " + error.message);
        },
    });


    const onSubmit = (data) => {
        console.log(data);
        // const vertical_head_id = verticalHeadList?.response?.find((item)=> item.id === data.vertical_head_id.value);
        // console.log("selected vh", vertical_head_id);

        // console.log(data.state_id?.map((item)=>(item.value.toString())).join(","));
        addUserMutation.mutate(data);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="user" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto 2xl:w-[50%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD USER
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name">Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="User Name"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Email <span className="text-red-600">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="User Email"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                            </div>

                            {/* Role Select Field */}
                            <div className="form-group">
                                <label htmlFor="role_id">Role <span className="text-red-600">*</span></label>
                                <Controller
                                    name="role_id"
                                    control={control}
                                    rules={{ required: "Role is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={
                                                roleList?.response?.map((item) => (
                                                    {
                                                        value: item.id,
                                                        label: item.role_name
                                                    }
                                                )).slice(0, 4)
                                            }
                                            components={animatedComponents}
                                            placeholder="Select Role"
                                        />
                                    )}
                                />
                                {errors.role_id && <span className="text-red-600 text-sm">{errors.role_id.message}</span>}
                            </div>

                            {/* VERTICAL HEAD LIST */}

                            {
                                selectedRole?.label === "VH" ||
                                    selectedRole?.label === "BM" ||
                                    selectedRole?.label === "CS" ||
                                    selectedRole?.label === "Others" ?
                                    (

                                        < div className="form-group">
                                            <label htmlFor="vertical_head_id">Vertical Head <span className="text-red-600">*</span></label>
                                            <Controller
                                                name="vertical_head_id"
                                                control={control}
                                                rules={{ required: "Vertical Head is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        onChange={(selectedOption) => {
                                                            setValue("vertical_head_id", selectedOption); // Update the vertical_head_id
                                                            setValue("branch_manager_id", []); // Reset branch_manager_id when VH changes
                                                            setValue("client_service_id", []); // Reset branch_manager_id when VH changes
                                                        }}
                                                        options={verticalHeadList?.response?.map(item => ({ value: item.id, label: item.name }))}
                                                        components={animatedComponents}
                                                        placeholder="Select Vertical Head"
                                                    />
                                                )}
                                            />
                                            {errors.vertical_head_id && <span className="text-red-600 text-sm">{errors.vertical_head_id.message}</span>}
                                        </div>
                                    ) : null

                            }

                            {
                                selectedRole?.label === "BM" ||
                                    selectedRole?.label === "CS" ||
                                    selectedRole?.label === "Others" ?
                                    (

                                        <div className="form-group">
                                            <label htmlFor="branch_manager_id">Branch Manager <span className="text-red-600">*</span></label>
                                            <Controller
                                                name="branch_manager_id"
                                                control={control}
                                                rules={{ required: "At least one Branch Manager is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={branchManagerList?.response?.map(item => ({ value: item.id, label: item.name }))}
                                                        components={animatedComponents}
                                                        onChange={(selectedOption) => {
                                                            setValue("branch_manager_id", selectedOption); // Update the vertical_head_id
                                                            setValue("client_service_id", []); // Reset branch_manager_id when VH changes
                                                        }}
                                                        placeholder="Select Branch Manager"
                                                        isMulti
                                                    />
                                                )}
                                            />
                                            {errors.branch_manager_id && <span className="text-red-600 text-sm">{errors.branch_manager_id.message}</span>}
                                        </div>
                                    ) : null
                            }


                            {
                                selectedRole?.label === "Others" ?
                                    (
                                        <div className="form-group">
                                            <label htmlFor="client_service_id">Client Service<span className="text-red-600">*</span></label>
                                            <Controller
                                                name="client_service_id"
                                                control={control}
                                                rules={{ required: "Client Service is required" }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={clientServiceList?.response?.map(item => ({ value: item.id, label: item.name }))}
                                                        components={animatedComponents}
                                                        placeholder="Select Client Service"
                                                        isMulti
                                                    />
                                                )}
                                            />
                                            {errors.client_service_id && <span className="text-red-600 text-sm">{errors.client_service_id.message}</span>}
                                        </div>
                                    ) : null
                            }

                            {/* Other Service Multi-Select */}
                            {/* <div className="form-group">
                                <label htmlFor="other_service_id">Other Service</label>
                                <Controller
                                    name="other_service_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={otherServiceList?.response?.map(item => ({ value: item.id, label: item.name }))}
                                            components={animatedComponents}
                                            placeholder="Select Other Services"
                                            isMulti
                                        />
                                    )}
                                />
                            </div> */}


                            {/* State Select Field */}
                            <div className="form-group">
                                <label htmlFor="state_id">State <span className="text-red-600">*</span></label>
                                <Controller
                                    name="state_id"
                                    control={control}
                                    rules={{ required: "State is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={stateOptions} // stateOptions should be an array of { value, label }
                                            components={animatedComponents}
                                            isMulti
                                            placeholder="Select States"
                                        />
                                    )}
                                />
                                {errors.state_id && <span className="text-red-600 text-sm">{errors.state_id.message}</span>}
                            </div>


                            {/* Branch Select Field */}
                            <div className="form-group">
                                <label htmlFor="branch_id">Branch <span className="text-red-600">*</span></label>
                                <Controller
                                    name="branch_id"
                                    control={control}
                                    rules={{ required: "Branch is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={branchList?.response?.map(item => ({ value: item.id, label: item.branch_name }))}
                                            components={animatedComponents}
                                            placeholder="Select Branch"
                                        />
                                    )}
                                />
                                {errors.branch_id && <span className="text-red-600 text-sm">{errors.branch_id.message}</span>}
                            </div>

                            {/* Company Select Field */}
                            <div className="form-group">
                                <label htmlFor="company_id">Company <span className="text-red-600">*</span></label>
                                <Controller
                                    name="company_id"
                                    control={control}
                                    rules={{ required: "Company is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={companyList?.response?.map(item => ({ value: item.id, label: item.company_name }))}
                                            components={animatedComponents}
                                            placeholder="Select Company"
                                        />
                                    )}
                                />
                                {errors.company_id && <span className="text-red-600 text-sm">{errors.company_id.message}</span>}
                            </div>



                            {/* Contact Number Field */}
                            <div className="form-group">
                                <label htmlFor="contact_number">Contact Number <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    id="contact_number"
                                    placeholder="Contact Number"
                                    {...register("contact_number", { required: "Contact number is required" })}
                                />
                                {errors.contact_number && <span className="text-red-600 text-sm">{errors.contact_number.message}</span>}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password">Password <span className="text-red-600">*</span></label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required" })}
                                />
                                {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                            </div>

                            {/* Profile Image Field */}
                            <div className="form-group flex items-end gap-2">
                                <div className="">
                                    <label htmlFor="profile_img">Profile Image</label>
                                    <input
                                        type="file"
                                        id="profile_img"
                                        accept="image/*"
                                        {...register("profile_img")}
                                    />

                                </div>
                                {profilePreview && (
                                    <img src={profilePreview} alt="Profile Preview" className="w-20 h-20  border rounded-full" />
                                )}
                            </div>

                            {/* User Details Field */}
                            <div className="form-group">
                                <label htmlFor="user_details">User Details</label>
                                <input
                                    id="user_details"
                                    placeholder="Additional details about the user"
                                    {...register("user_details")}
                                />
                            </div>

                            {/* View Status Field
                            <div className="form-group flex">
                                <div className="flex items-center rounded-2xl p-2 gap-2 bg-whitesmoke text-nowrap shadow">
                                    <label htmlFor="view_status" className="m-0">View Status</label>
                                    <input
                                        type="checkbox"
                                        className="accent-lightdark w-5 h-5"
                                        id="view_status"
                                        {...register("view_status")}
                                    />
                                </div>
                            </div> */}


                        </div>

                        {/* LOADER */}

                        {
                            addUserMutation.isPending ?
                                <FormSubmitLoader loading_msg="Creating User..." /> : null
                        }
                        {/* Submit Button */}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addUserMutation.isPending}
                            >
                                {addUserMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset >
        </SidebarProvider >
    );
}
