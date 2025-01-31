import { useForm } from "react-hook-form";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProject, getBranchList, getBranchManagerList, getClientList, getClientServiceList, getCompanyList, getOtherList, getVerticalHeadList } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AddProject() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

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
        queryKey: ["branch-manager-list"],
        queryFn: async () => {
            return await getBranchManagerList(token, "12");
        }
    });
    // Fetch Client Service List
    const { data: clientServiceList } = useQuery({
        queryKey: ["client-service-list"],
        queryFn: async () => {
            return await getClientServiceList(token, 19);
        }
    });
    // Fetch Other List
    const { data: othersList } = useQuery({
        queryKey: ["others-list"],
        queryFn: async () => {
            return await getOtherList(token, 21);
        }
    });

    // Mutation for adding the project
    const addProjectMutation = useMutation({
        mutationFn: async (data) => {
            return await addProject(
                token,
                data.project_number,
                data.purchase_order_no,
                data.project_name,
                +data.client_id,
                +data.branch_id,
                +data.company_id,
                data.vertical_head_id,
                data.business_manager_id,
                data.client_service_id,
                data.other_members_id,
                data.quotation_no,
                data.project_amount,
                data.project_start_date,
                data.project_end_date,
                data.status
            );
        },
        onSuccess: () => {
            toast.success("Project added successfully!");
            // navigate("/project-list"); // Redirect after successful submission
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
                                    type="text"
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
                                <label htmlFor="client_id">
                                    Client <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Client--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.company_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.client_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.client_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Branch Select Field */}
                            <div className="form-group">
                                <label htmlFor="branch_id">
                                    Branch <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Branch--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branchList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.branch_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.branch_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.branch_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Company Select Field */}
                            <div className="form-group">
                                <label htmlFor="company_id">
                                    Company <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Company--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companyList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.company_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.company_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.company_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Vertical Head Select Field */}
                            <div className="form-group">
                                <label htmlFor="vertical_head_id">
                                    Vertical Head <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Vertical Head--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {verticalHeadList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.vertical_head_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vertical_head_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Branch Manager Select Field */}
                            <div className="form-group">
                                <label htmlFor="vertical_head_id">
                                    Branch Manager <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Branch Manager--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branchManagerList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.vertical_head_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vertical_head_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Client Service Select Field */}
                            <div className="form-group">
                                <label htmlFor="vertical_head_id">
                                    Client Service <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Client Service--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientServiceList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.vertical_head_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vertical_head_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Others Select Field */}
                            <div className="form-group">
                                <label htmlFor="vertical_head_id">
                                    Others <span className="text-red-600">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="--Select Others--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {othersList?.response.map((item) => (
                                            <SelectItem value={item.id} key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.vertical_head_id && (
                                    <span className="text-red-600 text-sm">
                                        {errors.vertical_head_id.message}
                                    </span>
                                )}
                            </div>

                            {/* Project Amount Field */}
                            <div className="form-group">
                                <label htmlFor="project_amount">
                                    Quotation No <span className="text-red-600">*</span>
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
