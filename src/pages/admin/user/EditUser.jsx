import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editUser,
  getBranchList,
  getCompanyList,
  getVerticalHeadList,
  getClientServiceList,
  getBranchManagerList,
  getOtherList,
  getStateList,
  getRoleList,
} from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function EditUser({ user }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { refetchList, setRefetchList, setModal } = useContext(
    dialogOpenCloseContext
  );
  console.log(user.business_manager_id?.split(",").map(Number));

  // Profile Image Preview State
  const [profilePreview, setProfilePreview] = useState(
    user.profile_img || null
  );
  const [vhId, setVHid] = useState(user?.vertical_head_id);
  const [bmId, setBMid] = useState(user?.client_service_id);

  // Fetch Data for Select Fields
  const { data: roleList } = useQuery({
    queryKey: ["role-list"],
    queryFn: () => getRoleList(token),
  });
  const { data: branchList } = useQuery({
    queryKey: ["branch-list"],
    queryFn: () => getBranchList(token),
  });
  const { data: companyList } = useQuery({
    queryKey: ["company-list"],
    queryFn: () => getCompanyList(token),
  });
  const { data: stateList } = useQuery({
    queryKey: ["state-list"],
    queryFn: () => getStateList(token),
  });

  const stateOptions = stateList?.response?.map((state) => ({
    value: state.id,
    label: state.state_name,
  }));

  // console.log(stateOptions[0]);

  // Fetch Data for Conditional Fields
  const { data: verticalHeadList } = useQuery({
    queryKey: ["vertical-head-list"],
    queryFn: () => getVerticalHeadList(token),
  });
  const { data: branchManagerList } = useQuery({
    queryKey: ["branch-manager-list", vhId],
    queryFn: () => getBranchManagerList(token, vhId),
  });
  const { data: clientServiceList } = useQuery({
    queryKey: ["client-service-list", bmId],
    queryFn: () => getClientServiceList(token, bmId),
  });
  const { data: otherServiceList } = useQuery({
    queryKey: ["other-service-list"],
    queryFn: () => getOtherList(token, user.client_service_id),
  });
  const VH_w_vh = verticalHeadList?.response?.find(
    (item) => item.id === user.name_prefix_id
  );
  // vertical head when role is not vh
  const VH_wo_vh = verticalHeadList?.response.find(
    (item) => item?.vertical_head_id === user?.vertical_head_id
  );
  console.log(VH_wo_vh);

  // branch manager preselect
  const userBM = user?.business_manager_id?.split(",")?.map(Number);
  const filterselectedBM = branchManagerList?.response?.filter((item) =>
    userBM?.includes(item.id)
  );
  const preselectedBM = filterselectedBM?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  console.log(preselectedBM);

  // client service preselect
  const userCS = user?.client_service_id?.split(",")?.map(Number);
  const filterselectedCS = clientServiceList?.response?.filter((item) =>
    userCS?.includes(item.id)
  );
  const preselectedCS = filterselectedCS?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  console.log(preselectedCS);

  // state preselect
  const userStates = user?.state_id?.split(",")?.map(Number);
  const filterselectedStates = stateList?.response?.filter((item) =>
    userStates.includes(item.id)
  );
  const preselectedStates = filterselectedStates?.map((item) => ({
    value: item.id,
    label: item.state_name,
  }));
  console.log(filterselectedStates);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      role_id: { value: user.role_id, label: user.role_name },
      state_id: preselectedStates,
      company_id: { value: user.company_id, label: user.company_name },
      branch_id: { value: user.branch_id, label: user.branch_name },
      vertical_head_id: user.name_prefix
        ? { value: VH_w_vh?.id, label: VH_w_vh?.name }
        : { value: VH_wo_vh?.id, label: VH_wo_vh?.name },
      branch_manager_id: preselectedBM,
      client_service_id: user.client_service_id
        ? user.client_service_id
            .split(",")
            .map((id) => ({ value: id, label: id }))
        : [],
      other_service_id: user.other_service_id
        ? user.other_service_id
            .split(",")
            .map((id) => ({ value: id, label: id }))
        : [],
      contact_number: user.contact_number,
      password: "",
      user_details: user.user_details || "",
      status: user.status === "1" ? "active" : "inactive",
      view_status: user.view_status === "1",
    },
  });

  // Watch Role Selection
  const selectedRole = watch("role_id");
  console.log("selected role", selectedRole);

  //   Watch VH ID
  const getvhId = verticalHeadList?.response?.find(
    (item) => item.id === watch("vertical_head_id")?.value
  );
  console.log("vh", vhId);
  useEffect(() => {
    setVHid(getvhId?.vertical_head_id);
  }, [getvhId]);

  useEffect(() => {
    setBMid(
      watch("branch_manager_id")
        ?.map((item) => item.value.toString())
        .join(",")
    );
  }, [watch("branch_manager_id")]);

  // Profile Image Watch & Preview
  const profileImgFile = watch("profile_img");
  useEffect(() => {
    if (profileImgFile && profileImgFile.length > 0) {
      const file = profileImgFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setProfilePreview(user.profile_img || null);
    }
  }, [profileImgFile]);

  // Mutation for updating the user
  const editUserMutation = useMutation({
    mutationFn: async (data) => {
      const vertical_head_id = verticalHeadList?.response?.find(
        (item) => item?.id === data.vertical_head_id?.value
      );
      return await editUser(
        token,
        user.id,
        data.role_id.value === 5 ? data.vertical_head_id.value : "",
        data.name,
        data.email,
        data.role_id.value,
        data.state_id?.map((item) => item.value).join(","),
        data.company_id.value,
        data.branch_id.value,
        vertical_head_id.vertical_head_id,
        // data?.vertical_head_id?.value || null,
        data?.branch_manager_id?.map((item) => item.value).join(",") || null,
        data?.client_service_id?.map((item) => item.value).join(",") || null,
        data?.other_service_id?.map((item) => item.value).join(",") || null,
        data.contact_number,
        data.password || null,
        data.profile_img,
        data.user_details,
        data.view_status ? "1" : "0",
        data.status === "active" ? "1" : "0"
      );
    },
    onSuccess: (response) => {
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        toast.success("User updated successfully!");
        setModal(false);
        setRefetchList(!refetchList);
        navigate("/user-list");
      } else {
        toast.error(response.message);
        toast.error(response.response.email[0]);
        toast.error(response.response.profile_img[0]);
      }
    },
    onError: (error) => {
      toast.error("Failed to update user: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    editUserMutation.mutate(data);
  };

  return (
    <div className="flex flex-1 flex-col gap-2 lg:justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto xl:w-[50%] w-full overflow-hidden"
      >
        {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                    Edit User
                </h2> */}
        <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>
            <Controller
              name="role_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(selectedOption) => {
                    setValue("role_id", selectedOption);
                    setValue("vertical_head_id", ""); // Update the vertical_head_id
                    setValue("branch_manager_id", []); // Reset branch_manager_id when VH changes
                    setValue("client_service_id", []); // Reset branch_manager_id when VH changes
                  }}
                  options={roleList?.response?.map((role) => ({
                    value: role.id,
                    label: role.role_name,
                  }))}
                  components={animatedComponents}
                />
              )}
            />
          </div>

          {/* Vertical Head */}
          {selectedRole?.label === "VH" ||
          selectedRole?.label === "BM" ||
          selectedRole?.label === "CS" ||
          selectedRole?.label === "Others" ? (
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
          ) : null}

          {/* Branch Manager */}
          {selectedRole?.label === "CS" || selectedRole?.label === "Others" ? (
            <div className="form-group">
              <label>Branch Manager</label>
              <Controller
                name="branch_manager_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={(selectedOption) => {
                      setValue("branch_manager_id", selectedOption); // Reset branch_manager_id when VH changes
                      setValue("client_service_id", []); // Reset branch_manager_id when VH changes
                    }}
                    options={branchManagerList?.response?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    components={animatedComponents}
                    isMulti
                  />
                )}
              />
            </div>
          ) : null}

          {/* Client Service */}
          {selectedRole?.label === "Others" ? (
            <div className="form-group">
              <label>Client Service</label>
              <Controller
                name="client_service_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={clientServiceList?.response?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    components={animatedComponents}
                    isMulti
                  />
                )}
              />
            </div>
          ) : null}

          {/* Other Services */}
          {/* <div className="form-group">
                        <label>Other Services</label>
                        <Controller
                            name="other_service_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={otherServiceList?.response?.map(item => ({ value: item.id, label: item.name }))}
                                    components={animatedComponents}
                                    isMulti
                                />
                            )}
                        />
                    </div> */}

          {/* State */}
          <div className="form-group">
            <label>State</label>
            <Controller
              name="state_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  {...field}
                  options={stateOptions}
                  components={animatedComponents}
                  isMulti
                />
              )}
            />
          </div>

          {/* Branch */}
          <div className="form-group">
            <label>Branch</label>
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={branchList?.response?.map((item) => ({
                    value: item.id,
                    label: item.branch_name,
                  }))}
                  components={animatedComponents}
                />
              )}
            />
          </div>

          {/* Company */}
          <div className="form-group">
            <label>Company</label>
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={companyList?.response?.map((item) => ({
                    value: item.id,
                    label: item.company_name,
                  }))}
                  components={animatedComponents}
                />
              )}
            />
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              {...register("contact_number", {
                required: "Contact number is required",
              })}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} />
          </div>

          {/* Profile Image */}
          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" {...register("profile_img")} />
            {profilePreview && (
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="w-20 h-20 border rounded-full"
              />
            )}
          </div>

          {/* User Details */}
          <div className="form-group">
            <label>User Details</label>
            <input type="text" {...register("user_details")} />
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select {...register("status")}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* View Status */}
          <div className="form-group">
            <label>View Status</label>
            <input type="checkbox" {...register("view_status")} />
          </div>
        </div>
        <div className="card-footer text-center">
          <button
            type="submit"
            className="px-10 py-2 bg-lightdark text-white rounded-2xl"
          >
            {editUserMutation.isPending ? <ButtonLoader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
