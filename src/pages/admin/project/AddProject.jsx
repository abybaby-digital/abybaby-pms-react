import { useForm, Controller } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProject, getBranchList, getBranchManagerList, getClientList, getClientServiceList, getCompanyList, getOtherList, getVerticalHeadList } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";
const animatedComponents = makeAnimated();

export default function AddProject() {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm();

    // Watch selected values
    const selectedVerticalHead = watch("vertical_head_id")?.value.toString();
    const selectedBranchManager = watch("branch_manager_id")?.map((item) => (item.value.toString()));
    const selectedClientService = watch("client_service_id")?.map((item) => (item.value.toString()));

    //  console.log(selectedVerticalHead);
    //  console.log(selectedBranchManager?.join(","));
    //  console.log(selectedClientService?.join(","));

    // Fetch Branch List
    const { data: branchList } = useQuery({
        queryKey: ["branch-list"],
        queryFn: async () => {
            return await getBranchList(token);
        }
    });

    // Fetch Client List
    const { data: clientList } = useQuery({
        queryKey: ["client-list"],
        queryFn: async () => {
            return await getClientList(token);
        }
    });

    // Fetch Company List
    const { data: companyList } = useQuery({
        queryKey: ["company-list"],
        queryFn: async () => {
            return await getCompanyList(token);
        }
    });

    // Fetch Vertical Head List
    const { data: verticalHeadList } = useQuery({
        queryKey: ["vertical-head-list"],
        queryFn: async () => {
            return await getVerticalHeadList(token);
        }
    });
    // Fetch Branch Manager List
    const { data: branchManagerList } = useQuery({
        queryKey: ["branch-manager-list", selectedVerticalHead],
        queryFn: async () => {
            return await getBranchManagerList(token, `${selectedVerticalHead}`);
        }
    });
    // Fetch Client Service List
    const { data: clientServiceList } = useQuery({
        queryKey: ["client-service-list", selectedBranchManager],
        queryFn: async () => {
            return await getClientServiceList(token, `${selectedBranchManager}`);
        }
    });
    // Fetch Other List
    const { data: othersList } = useQuery({
        queryKey: ["others-list", selectedClientService],
        queryFn: async () => {
            return await getOtherList(token, `${selectedClientService}`);
        }
    });

    // Mutation for adding the project
    const addProjectMutation = useMutation({
        mutationFn: async (data) => {
            return await addProject(
                token,
                data.project_number,
                "",
                data.project_name,
                data.client_id.value,
                data.branch_id.value,
                data.company_id.value,
                data.vertical_head_id.value?.toString(),
                data?.branch_manager_id?.map((item) => (item.value.toString())).join(","),
                data.client_service_id?.map((item) => (item.value.toString())).join(","),
                data.other_members_id?.map((item) => (item.value.toString())).join(","),
                data.quotation_no,
                data.project_amount,
                data.project_start_date,
                data.project_end_date,
                "1"
            );
        },
        onSuccess: () => {
            toast.success("Project added successfully!");
            navigate("/project-list"); // Redirect after successful submission
        },
        onError: (error) => {
            toast.error("Failed to add project: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data);
        addProjectMutation.mutate(data); // Call mutation with form data
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="project" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto xl:w-[50%] w-full overflow-hidden"
                    >
                        <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                            ADD PROJECT
                        </h2>
                        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">

                            {/* Project Name Field */}
                            <div className="form-group">
                                <label htmlFor="project_name">
                                    Project Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="block"
                                    id="project_name"
                                    placeholder="Project Name"
                                    {...register("project_name", { required: "Project Name is required" })}
                                />
                                {errors.project_name && (
                                    <span className="text-red-600 text-sm">
                                        {errors.project_name.message}
                                    </span>
                                )}
                            </div>

                            {/* Project Number Field */}
                            <div className="form-group">
                                <label htmlFor="project_number">
                                    Project Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="block"
                                    id="project_number"
                                    placeholder="Project Number"
                                    {...register("project_number", { required: "Project Number is required" })}
                                />
                                {errors.project_number && (
                                    <span className="text-red-600 text-sm">
                                        {errors.project_number.message}
                                    </span>
                                )}
                            </div>



                            {/* Client Select Field */}
                            <div className="form-group">
                                <label htmlFor="client_id">Client <span className="text-red-600">*</span></label>
                                <Controller
                                    name="client_id"
                                    control={control}
                                    rules={{ required: "Client is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={clientList?.response?.map((item) => ({ value: item.id, label: item.company_name }))}
                                            components={animatedComponents}
                                            placeholder="Select Client"
                                        />
                                    )}
                                />
                                {errors.client_id && <span className="text-red-600 text-sm">{errors.client_id.message}</span>}
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
                                            options={branchList?.response?.map((item) => ({ value: item.id, label: item.branch_name }))}
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
                                            options={companyList?.response?.map((item) => ({ value: item.id, label: item.company_name }))}
                                            components={animatedComponents}
                                            placeholder="Select Company"
                                        />
                                    )}
                                />
                                {errors.company_id && <span className="text-red-600 text-sm">{errors.company_id.message}</span>}
                            </div>

                            {/* Vertical Head Select Field */}
                            <div className="form-group">
                                <label htmlFor="vertical_head_id">Vertical Head <span className="text-red-600">*</span></label>
                                <Controller
                                    name="vertical_head_id"
                                    control={control}
                                    rules={{ required: "Vertical Head is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={verticalHeadList?.response?.map((item) => ({ value: item.id, label: item.name }))}
                                            components={animatedComponents}
                                            placeholder="Select Vertical Head"
                                        />
                                    )}
                                />
                                {errors.vertical_head_id && <span className="text-red-600 text-sm">{errors.vertical_head_id.message}</span>}
                            </div>

                            {/* Branch Manager Multi-Select Field */}
                            <div className="form-group">
                                <label htmlFor="branch_manager_id">Branch Manager <span className="text-red-600">*</span></label>
                                <Controller
                                    name="branch_manager_id"
                                    control={control}
                                    rules={{ required: "At least one Branch Manager is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={branchManagerList?.response?.map((item) => ({ value: item.id, label: item.name }))}
                                            components={animatedComponents}
                                            placeholder="Select Branch Manager"
                                            isMulti
                                        />
                                    )}
                                />
                                {errors.branch_manager_id && <span className="text-red-600 text-sm">{errors.branch_manager_id.message}</span>}
                            </div>

                            {/* Client Service Select Field */}
                            <div className="form-group">
                                <label htmlFor="client_service_id">Client Service <span className="text-red-600">*</span></label>
                                <Controller
                                    name="client_service_id"
                                    control={control}
                                    rules={{ required: "Client Service is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={clientServiceList?.response?.map((item) => ({ value: item.id, label: item.name }))}
                                            components={animatedComponents}
                                            placeholder="Select Client Service"
                                            isMulti
                                        />
                                    )}
                                />
                                {errors.client_service_id && <span className="text-red-600 text-sm">{errors.client_service_id.message}</span>}
                            </div>

                            {/* Others Select Field */}
                            <div className="form-group">
                                <label htmlFor="other_members_id">Others <span className="text-red-600">*</span></label>
                                <Controller
                                    name="other_members_id"
                                    control={control}
                                    rules={{ required: "At least one other member is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={othersList?.response?.map((item) => ({ value: item.id, label: item.name }))}
                                            components={animatedComponents}
                                            placeholder="Select Other Members"
                                            isMulti
                                        />
                                    )}
                                />
                                {errors.other_members_id && <span className="text-red-600 text-sm">{errors.other_members_id.message}</span>}
                            </div>


                            {/* Quotation No Field */}
                            <div className="form-group">
                                <label htmlFor="project_amount">
                                    Quotation No <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="block"
                                    id="quotation_no"
                                    placeholder="Project Amount"
                                    {...register("quotation_no", { required: "Quotation Number is required" })}
                                />
                                {errors.project_amount && (
                                    <span className="text-red-600 text-sm">
                                        {errors.quotation_no.message}
                                    </span>
                                )}
                            </div>

                            {/* Project Amount Field */}
                            <div className="form-group">
                                <label htmlFor="project_amount">
                                    Project Amount <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="block"
                                    id="project_amount"
                                    placeholder="Project Amount"
                                    {...register("project_amount", { required: "Project Amount is required" })}
                                />
                                {errors.project_amount && (
                                    <span className="text-red-600 text-sm">
                                        {errors.project_amount.message}
                                    </span>
                                )}
                            </div>

                            {/* Project Start Date Field */}
                            <div className="form-group">
                                <label htmlFor="project_start_date">
                                    Project Start Date <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="block"
                                    id="project_start_date"
                                    {...register("project_start_date", { required: "Start Date is required" })}
                                />
                                {errors.project_start_date && (
                                    <span className="text-red-600 text-sm">
                                        {errors.project_start_date.message}
                                    </span>
                                )}
                            </div>

                            {/* Project End Date Field */}
                            <div className="form-group">
                                <label htmlFor="project_end_date">
                                    Project End Date <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="block"
                                    id="project_end_date"
                                    {...register("project_end_date", { required: "End Date is required" })}
                                />
                                {errors.project_end_date && (
                                    <span className="text-red-600 text-sm">
                                        {errors.project_end_date.message}
                                    </span>
                                )}
                            </div>

                        </div>

                        {/* LOADER */}

                        {
                            addProjectMutation.isPending ?
                                <FormSubmitLoader loading_msg="Creating Project..." /> : null
                        }

                        {/* Submit Button */}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                                disabled={addProjectMutation.isPending}
                            >
                                {addProjectMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
