import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";  // Assuming Switch is imported from your UI kit
import { useMutation, useQuery } from "@tanstack/react-query";
import { editProject, getBranchList, getBranchManagerList, getClientList, getClientServiceList, getCompanyList, getOtherList, getVerticalHeadList, } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const animatedComponents = makeAnimated();

const EditProject = ({ project }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { refetchList, setRefetchList, setModal } = useContext(dialogOpenCloseContext);

    const project_id = project.id;
    console.log(project);

    // Initialize form with existing project data
    // Initialize form with useForm hook but no defaultValues initially
    const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm();

    // Watch selected values
    const selectedVerticalHead = watch("vertical_head_id");
    // console.log(selectedVerticalHead);

    const selectedBranchManager = watch("branch_manager_id")?.map((item) => item.value);
    const selectedClientService = watch("client_service_id")?.map((item) => item.value);

    // console.log(selectedBranchManager);

    // Fetch Branch List
    const { data: branchList } = useQuery({
        queryKey: ["branch-list"],
        queryFn: async () => {
            return await getBranchList(token);
        }
    });

    const branchListOptions = branchList?.response?.map((item) => ({ value: item.id, label: item.branch_name }));
    // console.log(branchListOptions);

    // Fetch Client List
    const { data: clientList } = useQuery({
        queryKey: ["client-list"],
        queryFn: async () => {
            return await getClientList(token);
        }
    });



    const clientListOptions = clientList?.response?.map((item) => ({ value: item.id, label: item.company_name }));
    // console.log(clientListOptions);


    // Fetch Company List
    const { data: companyList } = useQuery({
        queryKey: ["company-list"],
        queryFn: async () => {
            return await getCompanyList(token);
        }
    });

    const companyListOptions = companyList?.response?.map((item) => ({ value: item.id, label: item.company_name }));

    // Fetch Vertical Head List
    const { data: verticalHeadList } = useQuery({
        queryKey: ["vertical-head-list"],
        queryFn: async () => {
            return await getVerticalHeadList(token);
        }
    });

    const verticalHeadOptions = verticalHeadList?.response?.map((item) => ({ value: item.id, label: item.name }));

    // Fetch Branch Manager List
    const { data: branchManagerList } = useQuery({
        queryKey: ["branch-manager-list", selectedVerticalHead],
        queryFn: async () => {
            return await getBranchManagerList(token, `${selectedVerticalHead ? selectedVerticalHead : project.vertical_head_id}`);
        }
    });
    const branchManagerOptions = branchManagerList?.response?.map((item) => ({ value: item.id, label: item.name }));
    console.log(branchManagerOptions);

    // Fetch Client Service List
    const { data: clientServiceList } = useQuery({
        queryKey: ["client-service-list", selectedBranchManager],
        queryFn: async () => {
            return await getClientServiceList(token, `${selectedBranchManager ? selectedBranchManager : project.business_manager_id}`);
        }
    });


    // Fetch Other List
    const { data: othersList } = useQuery({
        queryKey: ["others-list", selectedClientService],
        queryFn: async () => {
            return await getOtherList(token, `${selectedClientService ? selectedClientService : project.client_service_id}`);
        }
    });

    // UseMutation hook for editing project
    const editProjectMutation = useMutation({
        mutationFn: async (data) => {
            return await editProject(
                token,
                project_id,
                data.project_number,
                "",
                data.project_name,
                +data.client_id,
                +data.branch_id,
                +data.company_id,
                data.vertical_head_id,
                data.branch_manager_id?.map((item) => item.value.toString()).join(","),
                data.client_service_id?.map((item) => item.value.toString()).join(","),
                data.other_members_id?.map((item) => item.value.toString()).join(","),
                data.quotation_no,
                data.project_amount,
                data.project_start_date,
                data.project_end_date,
                data.project_status
            );
        },
        onSuccess: (value) => {
            // console.log(value);

            if (value.status === 200 || value.status === 201) {
                toast.success("Project updated successfully!");
                // setModal(false);
                // setRefetchList(!refetchList);
            }
            else {
                toast.error(value?.message || "Error updating project");
            }
        },
        onError: (error) => {
            toast.error(error?.message || "Error updating project");
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        console.log(project_id);
        editProjectMutation.mutate(data);
    };

    // useEffect(() => {
    //     setValue("project_status", project.status); // Set default selection
    // }, [setValue]);



    // Set values in the form when the project data is available
    useEffect(() => {
        // Setting values only if project is available
        setValue("project_number", project.project_number);
        setValue("project_name", project.project_name);
        setValue("quotation_no", project.quotation_no);
        setValue("project_amount", Math.floor(project.project_amount));
        setValue("project_start_date", project.project_start_date);
        setValue("project_end_date", project.project_end_date);
        setValue("project_status", project.status);
        // setValue("vertical_head_id", project.status);
        // setValue("client_service_id", filteredCS ? filteredCS : null);
        // setValue("branch_manager_id", filteredBM ? filteredBM : null);
    }, []);




    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full overflow-hidden"
        >
            <div className="card-body grid gap-3 lg:grid-cols-3 grid-cols-1 p-5">

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
                    <select {...register("client_id", { required: "Client is required" })}>
                        <option value="">Select Client</option>
                        {clientListOptions?.map((client) => (
                            <option key={client.value} value={client.value} selected={project.client_id === client.value}>
                                {client.label}
                            </option>
                        ))}
                    </select>
                    {errors.client_id && <span className="text-red-600 text-sm">{errors.client_id.message}</span>}
                </div>

                {/* Branch Select Field */}
                <div className="form-group">
                    <label htmlFor="branch_id">Branch <span className="text-red-600">*</span></label>
                    <select {...register("branch_id", { required: "Branch is required" })}>
                        <option value="">Select Branch</option>
                        {branchListOptions?.map((branch) => (
                            <option key={branch.value} value={branch.value} selected={project.branch_id === branch.value}>
                                {branch.label}
                            </option>
                        ))}
                    </select>
                    {errors.branch_id && <span className="text-red-600 text-sm">{errors.branch_id.message}</span>}
                </div>

                {/* Company Select Field */}
                <div className="form-group">
                    <label htmlFor="company_id">Company <span className="text-red-600">*</span></label>
                    <select {...register("company_id", { required: "Company is required" })}>
                        <option value="">Select Company</option>
                        {companyListOptions?.map((company) => (
                            <option key={company.value} value={company.value} selected={project.company_id === company.value}>
                                {company.label}
                            </option>
                        ))}
                    </select>
                    {errors.company_id && <span className="text-red-600 text-sm">{errors.company_id.message}</span>}
                </div>

                {/* Vertical Head Select Field */}
                <div className="form-group">
                    <label htmlFor="vertical_head_id">Vertical Head <span className="text-red-600">*</span></label>
                    <select {...register("vertical_head_id", { required: "Vertical Head is required" })}>
                        <option value="">Select Vertical Head</option>
                        {verticalHeadOptions?.map((verticalHead) => (
                            <option key={verticalHead.value} value={verticalHead.value} selected={+project.vertical_head_id === verticalHead.value} >
                                {verticalHead.label}
                            </option>
                        ))}
                    </select>
                    {errors.vertical_head_id && <span className="text-red-600 text-sm">{errors.vertical_head_id.message}</span>}
                </div>

                {/* Branch Manager Multi-Select Field */}
                <div className="form-group">
                    <label htmlFor="branch_manager_id">Branch Manager <span className="text-red-600">*</span></label>
                    <Controller
                        name="branch_manager_id"
                        control={control}
                        // rules={{ required: "At least one Branch Manager is required" }}
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
                        // rules={{ required: "Client Service is required" }}
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
                        // rules={{ required: "At least one other member is required" }}
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
                        placeholder="Quotation Number"
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

                {/* Status Toggle */}
                {/* <div className="form-group">
                    <label htmlFor="project_status">Project Status</label>
                    <Controller
                        name="project_status"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                id="project_status"
                                className="block mx-2"
                                {...field}
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                            />
                        )}
                    />
                </div> */}

                {/* Project Status Field */}
                <div className="form-group">
                    <label htmlFor="project_status">Project Status <span className="text-red-600">*</span></label>
                    {/* <Controller
                        name="project_status"
                        control={control}
                        rules={{ required: "Project Status is required" }}
                        render={({ field }) => (
                            <RadioGroup
                                className="flex items-center"
                                defaultValue={field.value}
                                onValueChange={field.onChange} // Updating form value on selection change
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="1" id="r1" />
                                    <label htmlFor="r1" className="text-green-500 text-sm font-bold mb-0">Running</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="0" id="r2" />
                                    <label htmlFor="r2" className="text-red-500 text-sm font-bold mb-0">Closed</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="2" id="r3" />
                                    <label htmlFor="r3" className="text-gray-500 text-sm font-bold mb-0">Cancelled</label>
                                </div>
                            </RadioGroup>
                        )}
                    /> */}
                    <select {...register("project_status", { required: "Project Status is required" })}>
                        <option value="" selected>Select Vertical Head</option>
                        <option value="1">Running</option>
                        <option value="0">Closed</option>
                        <option value="2">Cancelled</option>
                    </select>
                    {errors.project_status && <span className="text-red-600 text-sm">{errors.project_status.message}</span>}
                </div>


            </div>

            {/* Submit Button */}
            <div className="card-footer text-center bg-gray-100 py-5">
                <button
                    type="submit"
                    className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                    disabled={editProjectMutation.isPending}
                >
                    {editProjectMutation.isPending ? <ButtonLoader /> : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default EditProject;
