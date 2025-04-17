import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { getProjectList, editInvoice, FOList, editTeam } from "../../../services/api"; // Import necessary functions

const EditActivityCoOrdinator = ({ team }) => {
    console.log("team", team);

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);

    const [fincYear, setFincYear] = useState(null);
    const [selectedMainFO, setMainFO] = useState(null);
    const [otherFoList, setOtherFo] = useState([]);

    // Fetch projects for the project dropdown
    const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
        queryKey: ["project-list"],
        queryFn: async () => {
            return await getProjectList(token, null, null, null, fincYear, null, null, null, null, null); // Assuming this function fetches the list of projects
        }
    });

    const { data: FoList = [], isLoading: isLoadingFoList } = useQuery({
        queryKey: ["field-officer-list"],
        queryFn: async () => {
            return await FOList(token);
        },
    });

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({});

    // Pre-fill the form with existing data
    useEffect(() => {
        setValue("project_id", team.project_id);  // Ensure selected project is set
        setValue("team_name", team.team_name);
        setValue("main_fo_name", team.fo_main_id);  // Preselect main FO
        setValue("other_fo_name", team.fo_junior_id); // Preselect other FO

        // Automatically update other FO list when main FO is selected
        if (team.fo_main_id) {
            const filteredOtherFOs = FoList?.response?.filter((fo) => fo.id !== team.fo_main_id);
            setOtherFo(filteredOtherFOs);
        }
    }, [team, setValue, FoList]);

    // Mutation for updating the invoice
    const editTeamMutation = useMutation({
        mutationFn: async (data) => {
            return await editTeam(
                token,
                team.id, // Invoice ID
                data.team_name,
                +data.main_fo_name,
                +data.other_fo_name,
            );
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success("Team updated successfully!");
                setModal(false);
                setRefetchList(!refetchList);
                navigate("/team-list");
            } else {
                toast.error(response.message);
            }
        },
        onError: (error) => {
            toast.error("Failed to update invoice: " + error.message);
        },
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log(data);
        editTeamMutation.mutate(data);
    };

    // Handle main FO selection change
    const handleMainFOChange = (e) => {
        const selectedFO = e.target.value;
        setMainFO(selectedFO);

        // Filter the other Field Officers, excluding the selected main FO
        if (selectedFO) {
            const filteredOtherFOs = FoList?.response?.filter((fo) => fo.id !== selectedFO);
            setOtherFo(filteredOtherFOs);
        } else {
            setOtherFo([]); // Reset other FO list if no main FO selected
        }
    };

    return (
        isLoadingProjects ? (
            <div className="h-[350px] flex justify-center items-center">
                <p className="text-green-500 font-bold text-xl animate-pulse">Preparing for edit, Please Wait ...</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full overflow-hidden">
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
                            disabled={fincYear === null || fincYear === "NA"}
                        >
                            <option value="">Select Project</option>
                            {
                                isLoadingProjects ? (
                                    <option value="">Loading Projects List, Please Wait....</option>
                                ) : (
                                    projectList?.response?.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {`${project.project_number} - ${project.project_name}`}
                                        </option>
                                    ))
                                )
                            }
                        </select>
                        {errors.project_id && (
                            <span className="text-red-600 text-sm">
                                {errors.project_id.message}
                            </span>
                        )}
                    </div>

                    {/* Team Name Field */}
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

                    {/* Main Field Officer Dropdown */}
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
                            onChange={handleMainFOChange}
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

                    {/* Other Field Officer Dropdown */}
                    <div className="form-group">
                        <label htmlFor="other_fo_name">
                            Other Field Officer <span className="text-red-600">*</span>
                        </label>
                        <select
                            id="other_fo_name"
                            {...register("other_fo_name", {
                                // required: "Other FO name is required",
                            })}
                            className="block w-full"
                        >
                            <option value="">Select Other FO</option>
                            {FoList?.response?.map((fo) => (
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

                <div className="card-footer text-center bg-gray-100 py-5">
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                        disabled={editTeamMutation.isPending}
                    >
                        {editTeamMutation.isPending ? <ButtonLoader /> : "Submit"}
                    </button>
                </div>
            </form>
        )
    );
};

export default EditActivityCoOrdinator;
