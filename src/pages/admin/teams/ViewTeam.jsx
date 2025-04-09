import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditTeam from "./EditTeam";
import { useQuery } from "@tanstack/react-query";
import { viewTeamById } from "../../../services/api";
import { useSelector } from "react-redux";

const ViewTeam = ({ team, add_or_edit, stateList, companyList, branchList, roleList }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);

    console.log("team", team);


    const { data: teamActivityDetails, isLoading } = useQuery({
        queryKey: ["team-activity-details", team],
        queryFn: async () => {
            return await viewTeamById(token, team?.id);
        },
    })

    console.log(teamActivityDetails);


    return (
        <Dialog open={modal}>
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        {add_or_edit === "view" ? "Team Activity Details" : "Edit Team"}
                    </DialogTitle>
                    <DialogClose asChild onClick={() => setModal(false)} className="text-black text-2xl cursor-pointer">
                        <MdOutlineClose />
                    </DialogClose>
                </DialogHeader>

                <DialogDescription>
                    {
                        add_or_edit === "view" ? (
                            <div className="grid grid-cols-3 items-center gap-4 max-h-[80vh] overflow-y-auto p-3">
                                <h2 className="col-span-3 text-center text-black text-xl border-b pb-3 uppercase">{team.project_name}</h2>

                                {/* User Details Table */}
                                {/* <Table className="text-black w-[90%] mx-auto">
                                    <TableBody className="grid gap-5 lg:grid-cols-3 grid-cols-1">
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Project Name :</TableCell>
                                            <TableCell>{user?.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Team Name :</TableCell>
                                            <TableCell>{user?.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Financial Year :</TableCell>
                                            <TableCell>{user?.role_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Main Field Officer :</TableCell>
                                            <TableCell>{user?.company_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Other Field Officer :</TableCell>
                                            <TableCell>{user?.branch_name}</TableCell>
                                        </TableRow>
                                        
                                    </TableBody>
                                </Table> */}
                                {
                                    teamActivityDetails?.response?.length === 0 ?
                                        "No Activity Found" :
                                        teamActivityDetails?.response?.map((item) =>
                                        (
                                            <div key={item.id}>
                                                <div className="team-activity border border-dashed cursor-pointer shadow rounded-2xl transition-all p-2 hover:scale-95">
                                                    <img src={item?.activity_photo} alt="activity_photo" className="h-[250px] object-cover rounded-2xl" />
                                                    <p className="text-center py-2">{item.activity_description}</p>
                                                    <p className="bg-black text-center text-white py-2 rounded-2xl">uploaded by : {item.team_created_by}</p>
                                                </div>
                                            </div>
                                        ))
                                }


                            </div>
                        ) : (
                            <EditTeam team={team} roleList={roleList}
                                branchList={branchList}
                                companyList={companyList}
                                stateList={stateList} />
                        )
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default ViewTeam;
