import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import {
    addPaymentRequisition,
    getProjectList,
    getBranchList,
    getVendorList,
    getProjectById,
    getFYList,
    addTeam,
    FOList,
} from "../../../services/api";
import { useState, useEffect } from "react";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddTeam() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const [fincYear, setFincYear] = useState(null);
    const [selectedMainFO, setMainFO] = useState(null);
    const [otherFoList, setOtherFo] = useState(null);

    console.log("sele",selectedMainFO);
    

    // FY LIST CALL
    const { data: fincYearList } = useQuery({
        queryKey: ["finc-year-list", token],
        queryFn: async () => {
            return await getFYList(token);
        },
    });


    const project_id = watch("project_id");
    console.log(project_id);

    const { data: projectById } = useQuery({
        queryKey: ["single-project", project_id],
        queryFn: async () => await getProjectById(token, project_id)
    })


    // Fetch projects, branches, and vendors from APIs
    const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
        queryKey: ["project-list", fincYear],
        queryFn: async () => {
            return await getProjectList(token, null, null, null, fincYear, null, null, null, null, null);
        },
    });


    const { data: FoList = [], isLoading: isLoadingFoList } = useQuery({
        queryKey: ["field-officer-list"],
        queryFn: async () => {
            return await FOList(token);
        },
    });

    console.log("folist", FoList);


    // Add Team Mutation
    const addTeamMutation = useMutation({
        mutationFn: async (data) => {
            return await addTeam(
                token,
                +data.project_id,
                data.team_name,
                +data.main_fo_name,
                +data.other_fo_name,
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success("Team added successfully!");
                navigate("/team-list");
            }
            else {
                toast.error(response.message);
            }
        },
        onError: (error) => {
            toast.error("Failed to add team: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        addTeamMutation.mutate(data);
    };

    const checkFinancialYear = () => {
        if (fincYear === null || fincYear === "NA") {
            toast.error("Choose Financial Year First !!");
        }
    }

    const getOtherFoList = () => {
        const restFoList = FoList?.response?.filter((item) => (item.id !== +selectedMainFO));
        setOtherFo(restFoList);
        console.log(restFoList && restFoList.length);
    }

    useEffect(() => {
        getOtherFoList();
    }, [selectedMainFO])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AdminHead breadcrumb_name="Team" />
                <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow mx-auto 2xl:w-[80%] w-full overflow-hidden"
                    >
                        {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                ADD PAYMENT REQUISITION
              </h2> */}
                        <div className="flex bg-gray-200 items-center justify-between px-10">
                            <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                                ADD TEAM
                            </h2>
                            <div className="finance-year-filter">
                                <form action="#" className="flex items-center gap-3">
                                    <label htmlFor="financeYear" className="text-nowrap m-0">Select Financial Year</label>
                                    <select
                                        name="financeYear"
                                        id="financeYear"
                                        className="block"
                                        onChange={(e) => {
                                            setFincYear(e.target.value);
                                        }}

                                    >
                                        {/* <option value="NA">--Select--</option> */}
                                        {fincYearList?.response?.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.financial_year}
                                            </option>
                                        ))}
                                    </select>
                                </form>
                            </div>
                        </div>
                        {isLoadingProjects ?
                            <FormSubmitLoader loading_msg="" />
                            :
                            <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                                {/* Project ID Dropdown */}
                                <div className="form-group">
                                    <label htmlFor="project_id">
                                        Project Name <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        id="project_id"
                                        {...register("project_id", {
                                            required: "Project ID is required",
                                        })}
                                        className="block w-full"
                                        // disabled={fincYear === null || fincYear === "NA"}
                                    >
                                        <option value="">Select Project</option>
                                        {
                                            isLoadingProjects ?
                                                <option value="">Loading Projects List , Please Wait....</option> :
                                                projectList?.response?.map((project) => (
                                                    <option key={project.id} value={project.id}>
                                                        {`${project.project_number} - ${project.project_name}`}
                                                    </option>
                                                ))
                                        }
                                    </select>
                                    {errors.project_id && (
                                        <span className="text-red-600 text-sm">
                                            {errors.project_id.message}
                                        </span>
                                    )}
                                </div>

                                {/* Vendor Name Field */}
                                <div className="form-group">
                                    <label htmlFor="team_name">
                                        Team Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="block"
                                        id="team_name"
                                        placeholder="Enter Team Name"
                                        {...register("team_name", { required: "Team Name is required" })}
                                    />
                                    {errors.team_name && (
                                        <span className="text-red-600 text-sm">
                                            {errors.team_name.message}
                                        </span>
                                    )}
                                </div>

                                {/* Main Field Office Dropdown */}
                                <div className="form-group">
                                    <label htmlFor="main_fo_name">
                                        Main Field Officer <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        id="main_fo_name"
                                        {...register("main_fo_name", {
                                            required: "Main FO name is required",
                                        })}
                                        className="block w-full"
                                        onChange={(e) => { setMainFO(e.target.value); console.log(selectedMainFO) }}
                                    >
                                        <option value="NA">Select Main FO</option>
                                        {FoList?.response?.map((fo) => (
                                            <option key={fo.id} value={fo.id}>
                                                {fo.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.main_fo_name && (
                                        <span className="text-red-600 text-sm">
                                            {errors.main_fo_name.message}
                                        </span>
                                    )}
                                </div>
                                {/* Other Field Office Dropdown */}
                                <div className="form-group">
                                    <label htmlFor="other_fo_name">
                                        Junior Field Officer
                                    </label>
                                    <select
                                        id="other_fo_name"
                                        {...register("other_fo_name", {
                                            // required: "Other FO name is required",
                                        })}
                                        className="block w-full"
                                        disabled={selectedMainFO === null || selectedMainFO === "NA"}
                                    >
                                        <option value="">Select Other FO</option>
                                        {otherFoList?.map((fo) => (
                                            <option key={fo.id} value={fo.id}>
                                                {fo.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.other_fo_name && (
                                        <span className="text-red-600 text-sm">
                                            {errors.other_fo_name.message}
                                        </span>
                                    )}
                                </div>

                            </div>
                        }

                        {/* LOADER */}

                        {addTeamMutation.isPending ? (
                            <FormSubmitLoader loading_msg="Creating Team..." />
                        ) : null}
                        <div className="card-footer text-center bg-gray-100 py-5">
                            <button
                                // onClick={() => { checkFinancialYear() }}
                                type="submit"
                                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                            >
                                {addTeamMutation.isPending ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </form>

                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
