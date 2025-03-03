import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch"; // Assuming Switch is imported from your UI kit
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editProject,
  getActiveCoOrdinatorList,
  getBranchList,
  getBranchManagerList,
  getClientList,
  getClientServiceList,
  getCompanyList,
  getOtherList,
  getVerticalHeadList,
} from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const animatedComponents = makeAnimated();

const EditProject = ({ project }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { refetchList, setRefetchList, setModal } = useContext(
    dialogOpenCloseContext
  );

  const [Vh, setVh] = useState(project.vertical_head_id);
  const [Bm, setBm] = useState(project.business_manager_id);
  const [Cs, setCs] = useState(project.client_service_id);



  const project_id = project.id;
  console.log(project);

  // Fetch Branch List
  const { data: branchList } = useQuery({
    queryKey: ["branch-list"],
    queryFn: async () => {
      return await getBranchList(token);
    },
  });

  const branchListOptions = branchList?.response?.map((item) => ({
    value: item.id,
    label: item.branch_name,
  }));


  // Fetch Client List
  const { data: clientList } = useQuery({
    queryKey: ["client-list"],
    queryFn: async () => {
      return await getClientList(token);
    },
  });

  const clientListOptions = clientList?.response?.map((item) => ({
    value: item.id,
    label: item.company_name,
  }));
  // console.log(clientListOptions);

  // Fetch Company List
  const { data: companyList } = useQuery({
    queryKey: ["company-list"],
    queryFn: async () => {
      return await getCompanyList(token);
    },
  });

  const companyListOptions = companyList?.response?.map((item) => ({
    value: item.id,
    label: item.company_name,
  }));

  // Fetch Vertical Head List
  const { data: verticalHeadList } = useQuery({
    queryKey: ["vertical-head-list"],
    queryFn: async () => {
      return await getVerticalHeadList(token);
    },
  });

  const VH_id = verticalHeadList?.response?.find(
    (item) => item.vertical_head_id === project.vertical_head_id
  );
  console.log("project", VH_id);

  // Fetch Branch Manager List
  const { data: branchManagerList } = useQuery({
    queryKey: ["branch-manager-list", Vh],
    queryFn: async () => {
      return await getBranchManagerList(token, Vh);
    },
  });
  const branchManagerOptions = branchManagerList?.response?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  //   console.log(branchManagerOptions);

  // Fetch Client Service List
  const { data: clientServiceList } = useQuery({
    queryKey: ["client-service-list", Bm],
    queryFn: async () => {
      return await getClientServiceList(token, Bm);
    },
  });

  // Fetch Other List
  const { data: othersList } = useQuery({
    queryKey: ["others-list", Cs],
    queryFn: async () => {
      return await getOtherList(token, Cs);
    },
  });


  // Fetch Mis List
  const { data: misList } = useQuery({
    queryKey: ["mis-list"],
    queryFn: async () => {
      return await getActiveCoOrdinatorList(token);
    },
  });


  //  branch manager preselect
  const userBM = project?.business_manager_id?.split(",")?.map(Number);
  const filterselectedBM = branchManagerList?.response?.filter((item) =>
    userBM?.includes(item.id)
  );
  const preselectedBM = filterselectedBM?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  console.log("project bm", preselectedBM);

  // Initialize form with existing project data
  // Initialize form with useForm hook but no defaultValues initially
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      client_po_no: project?.client_po_no,
      project_name: project?.project_name,
      quotation_no: project?.quotation_no,
      project_amount_pre_gst: Math.floor(project?.project_amount_pre_gst),
      project_amount_with_gst: Math.floor(project?.project_amount_with_gst),
      project_start_date: project?.project_start_date,
      project_end_date: project?.project_end_date,
      client_id: { value: project?.client_id, label: project?.client_name },
      branch_id: { value: project?.branch_id, label: project?.branch_name },
      company_id: { value: project?.company_id, label: project?.company_name },
      vertical_head_id: project?.selected_vh,
      project_status: project?.status,
      branch_manager_id: project?.selected_bm,
      client_service_id: project?.selected_cs,
      other_members_id: project?.selected_others,
      activity_coordinator_id: project?.selected_activity_coordinator,
      activity_coordinator_other_id: project?.selected_activity_coordinator_other,
    },
  });

     // Watch selected values
     const selectedVerticalHead = watch("vertical_head_id");
     const selectedBranchManager = watch("branch_manager_id")?.map((item) =>
       item.value.toString()
     );
     const selectedClientService = watch("client_service_id")?.map(
       (item) => item.value
     );
     const selectedMis = watch("activity_coordinator_id")?.map(
       (item) => item.value
     );

     const cs_left = clientServiceList?.response?.filter(
      (item) => !selectedClientService?.includes(item.id)
    );
    const mis_left = misList?.response?.filter(
      (item) => !selectedMis?.includes(item.id)
    );
    console.log("cs left", cs_left);

  // console.log(selectedBranchManager);

  // UseMutation hook for editing project
  const editProjectMutation = useMutation({
    mutationFn: async (data) => {
      return await editProject(
        token,
        project_id,
        data.client_po_no,
        data.vertical_head_id.value,
        data.project_name,
        data.client_id.value,
        data.branch_id.value,
        data.company_id.value,
        VH_id?.vertical_head_id,
        data.branch_manager_id?.map((item) => item.value.toString()).join(","),
        data.client_service_id?.map((item) => item.value.toString()).join(","),
        data.other_members_id?.map((item) => item.value.toString()).join(","),
        data.activity_coordinator_id?.map((item) => item.value.toString()).join(","),
        data.activity_coordinator_other_id?.map((item) => item.value.toString()).join(","),
        data.quotation_no,
        data.project_amount_pre_gst,
        data.project_amount_with_gst,
        data.project_start_date,
        data.project_end_date,
        data.project_status
      );
    },
    onSuccess: (value) => {
      // console.log(value);

      if (value.status === 200 || value.status === 201) {
        toast.success("Project updated successfully!");
        setModal(false);
        setRefetchList(!refetchList);
      } else {
        toast.error(value?.message || "Error updating project");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Error updating project");
    },
  });

  const onSubmit = (data) => {
    console.log("submitted data",data);
    editProjectMutation.mutate(data);
  };

  useEffect(() => {
    const selectedVh = verticalHeadList?.response?.find(
      (item) => item.id === +watch("vertical_head_id")
    );
    // console.log("selected vh", selectedVh);
    setVh(selectedVh?.vertical_head_id);
  }, [watch("vertical_head_id")]);

  useEffect(() => {
    const selectedBranchManager = watch("branch_manager_id")?.map((item) =>
      item.value.toString()
    );
    setBm(selectedBranchManager?.join(","));
  }, [watch("branch_manager_id")]);

  //   console.log("Bm", Bm);

  // useEffect(() => {
  //     setValue("project_status", project.status); // Set default selection
  // }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full overflow-hidden">
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
            {...register("project_name", {
              required: "Project Name is required",
            })}
          />
          {errors.project_name && (
            <span className="text-red-600 text-sm">
              {errors.project_name.message}
            </span>
          )}
        </div>

        {/* Project Number Field */}
        <div className="form-group">
          <label htmlFor="client_po_no">
            Client PO Number
          </label>
          <input
            type="number"
            className="block"
            id="client_po_no"
            placeholder="Client PO Number"
            {...register("client_po_no")}
          />
          {errors.client_po_no && (
            <span className="text-red-600 text-sm">
              {errors.client_po_no.message}
            </span>
          )}
        </div>

        {/* Client Select Field */}
        <div className="form-group">
          <label>Client</label>
          <Controller
            name="client_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(selectedOption) => {
                  setValue("client_id", selectedOption); // Update the client_id
                  // Optionally reset other fields based on this selection
                }}
                options={clientListOptions?.map((client) => ({
                  value: client.value,
                  label: client.label,
                }))}
                components={animatedComponents}
              />
            )}
          />
          {errors.client_id && (
            <span className="text-red-600 text-sm">
              {errors.client_id.message}
            </span>
          )}
        </div>

        {/* Branch Select Field */}
        <div className="form-group">
          <label>Branch</label>
          <Controller
            name="branch_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(selectedOption) => {
                  setValue("branch_id", selectedOption); // Update the branch_id
                  // Optionally reset other fields based on this selection
                }}
                options={branchListOptions?.map((branch) => ({
                  value: branch.value,
                  label: branch.label,
                }))}
                components={animatedComponents}
              />
            )}
          />
          {errors.branch_id && (
            <span className="text-red-600 text-sm">
              {errors.branch_id.message}
            </span>
          )}
        </div>

        {/* Company Select Field */}
        <div className="form-group">
          <label>Company</label>
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(selectedOption) => {
                  setValue("company_id", selectedOption); // Update the company_id
                  // Optionally reset other fields based on this selection
                }}
                options={companyListOptions?.map((company) => ({
                  value: company.value,
                  label: company.label,
                }))}
                components={animatedComponents}
              />
            )}
          />
          {errors.company_id && (
            <span className="text-red-600 text-sm">
              {errors.company_id.message}
            </span>
          )}
        </div>

        {/* Vertical Head Multi-Select Field */}

        <div className="form-group">
          <label>Vertical Head</label>
          <Controller
            name="vertical_head_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(selectedOption) => {
                  setValue("vertical_head_id", selectedOption); // Update the vertical_head_id
                  setValue("branch_manager_id", []); // Reset branch_manager_id when VH changes
                  setValue("client_service_id", []); // Reset branch_manager_id when VH changes
                }}
                options={verticalHeadList?.response?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                components={animatedComponents}
              />
            )}
          />
        </div>

        {/* Branch Manager Multi-Select Field */}
        <div className="form-group">
          <label htmlFor="branch_manager_id">
            Branch Manager <span className="text-red-600">*</span>
          </label>
          <Controller
            name="branch_manager_id"
            control={control}
            // rules={{ required: "At least one Branch Manager is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={branchManagerList?.response?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                components={animatedComponents}
                placeholder="Select Branch Manager"
                isMulti
              />
            )}
          />
          {errors.branch_manager_id && (
            <span className="text-red-600 text-sm">
              {errors.branch_manager_id.message}
            </span>
          )}
        </div>

        {/* Client Service Select Field */}
        <div className="form-group">
          <label htmlFor="client_service_id">
            Client Service <span className="text-red-600">*</span>
          </label>
          <Controller
            name="client_service_id"
            control={control}
            // rules={{ required: "Client Service is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={clientServiceList?.response?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                components={animatedComponents}
                placeholder="Select Client Service"
                isMulti
              />
            )}
          />
          {errors.client_service_id && (
            <span className="text-red-600 text-sm">
              {errors.client_service_id.message}
            </span>
          )}
        </div>

        {/* Others Select Field */}
        <div className="form-group">
          <label htmlFor="other_members_id">
            Others <span className="text-red-600">*</span>
          </label>
          <Controller
            name="other_members_id"
            control={control}
            
            // rules={{ required: "At least one other member is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={cs_left?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                components={animatedComponents}
                placeholder="Select Other Members"
                isMulti
              />
            )}
          />
          {errors.other_members_id && (
            <span className="text-red-600 text-sm">
              {errors.other_members_id.message}
            </span>
          )}
        </div>

         {/* Activity Co-ordinator Field */}

         <div className="form-group">
                <label htmlFor="activity_coordinator_id">
                  Activity Co-ordinator <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="activity_coordinator_id"
                  control={control}
                  // rules={{ required: "At least one other member is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={misList?.response?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      components={animatedComponents}
                      placeholder="Select Active Co-ordinator"
                      isDisabled={
                        watch("client_service_id") === undefined ||
                        watch("client_service_id")?.length === 0
                      }
                      isMulti
                    />
                  )}
                />
                {errors.activity_coordinator_id && (
                  <span className="text-red-600 text-sm">
                    {errors.activity_coordinator_id.message}
                  </span>
                )}
              </div>
              
              {/*Other  Activity Co-ordinator Field */}

              <div className="form-group">
                <label htmlFor="activity_coordinator_other_id">
                  Others Activity Co-ordinator <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="activity_coordinator_other_id"
                  control={control}
                  // rules={{ required: "At least one other member is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={mis_left?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      components={animatedComponents}
                      placeholder="Select Other Active Co-ordinator"
                      isDisabled={
                        watch("client_service_id") === undefined ||
                        watch("client_service_id")?.length === 0
                      }
                      isMulti
                    />
                  )}
                />
                {errors.activity_coordinator_other_id && (
                  <span className="text-red-600 text-sm">
                    {errors.activity_coordinator_other_id.message}
                  </span>
                )}
              </div>

        

        {/* Quotation No Field */}
        <div className="form-group">
          <label htmlFor="project_amount">
            Quotation No <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="block"
            id="quotation_no"
            placeholder="Quotation Number"
            {...register("quotation_no", {
              required: "Quotation Number is required",
            })}
          />
          {errors.project_amount && (
            <span className="text-red-600 text-sm">
              {errors.quotation_no.message}
            </span>
          )}
        </div>

        {/* Project Amount Field pre gst */}
        <div className="form-group">
          <label htmlFor="project_amount_pre_gst">
            Project Amount (pre gst) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            className="block"
            id="project_amount_pre_gst"
            placeholder="Project Amount"
            {...register("project_amount_pre_gst", {
              required: "Project Amount is required",
            })}
          />
          {errors.project_amount_pre_gst && (
            <span className="text-red-600 text-sm">
              {errors.project_amount_pre_gst.message}
            </span>
          )}
        </div>
        {/* Project Amount Field with gst */}
        <div className="form-group">
          <label htmlFor="project_amount_with_gst">
            Project Amount (with gst) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            className="block"
            id="project_amount_with_gst"
            placeholder="Project Amount"
            {...register("project_amount_with_gst", {
              required: "Project Amount is required",
            })}
          />
          {errors.project_amount_with_gst && (
            <span className="text-red-600 text-sm">
              {errors.project_amount_with_gst.message}
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
            {...register("project_start_date", {
              required: "Start Date is required",
            })}
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
            {...register("project_end_date", {
              required: "End Date is required",
            })}
          />
          {errors.project_end_date && (
            <span className="text-red-600 text-sm">
              {errors.project_end_date.message}
            </span>
          )}
        </div>

        {/* Project Status Field */}
        <div className="form-group">
          <label htmlFor="project_status">
            Project Status <span className="text-red-600">*</span>
          </label>

          <select
            {...register("project_status", {
              required: "Project Status is required",
            })}
          >
            <option value="" selected>
              Select Status
            </option>
            <option value="1">Running</option>
            <option value="0">Closed</option>
            <option value="2">Cancelled</option>
          </select>
          {errors.project_status && (
            <span className="text-red-600 text-sm">
              {errors.project_status.message}
            </span>
          )}
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
