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
import { useContext, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditTeam from "./EditTeam";
import { useQuery } from "@tanstack/react-query";
import { viewTeamById } from "../../../services/api";
import { useSelector } from "react-redux";
import { MdOutlineDownloading } from "react-icons/md";

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

    const downloadImage = async (url, filename) => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    // console.log(teamActivityDetails);

    const [searchKeyword, setSearchKeyword] = useState("");


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
                            <>
                                <div className="flex w-full justify-between border-b px-3 py-2 items-center" >
                                    <h2 className="text-center text-black text-xl  uppercase">{team.project_name}</h2>
                                    <input
                                        type="text"
                                        placeholder="Search by FO name..."
                                        className="p-2 w-full border rounded-md shadow lg:w-[300px]"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                    />
                                </div>
                                <div className="grid xl:grid-cols-4 lg:grid-cols-3 items-center gap-4 max-h-[80vh] overflow-y-auto p-3">
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
                                        teamActivityDetails?.response?.length === 0 ? (
                                            "No Activity Found"
                                        ) : (
                                            teamActivityDetails?.response
                                                ?.filter(item =>
                                                    item.team_created_by?.toLowerCase().includes(searchKeyword.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <div key={item.id}>
                                                        <div className="team-activity relative border border-dashed cursor-pointer shadow rounded-2xl transition-all p-2 hover:scale-95">
                                                            <img
                                                                src={item?.activity_photo}
                                                                alt="activity_photo"
                                                                className="h-[250px] w-full object-cover rounded-2xl"
                                                                data-fancybox={item.team_created_by}
                                                                data-caption={`uploaded by : ${item.team_created_by}`}
                                                            />

                                                            <p className="text-center py-2">{item.activity_description}</p>
                                                            <p className="bg-black text-center text-white py-2 rounded-2xl">
                                                                uploaded by : {item.team_created_by}
                                                            </p>
                                                            {/* <div className="text-center my-4 absolute top-2 left-3">
                                                                <button type="button"
                                                                    onClick={() => downloadImage(item?.activity_photo, `activity-by-${item.team_created_by}-${item.id}`)}
                                                                    className="ml-4 px-1 rounded-full py-1 bg-lightdark text-white text-sm hover:bg-black transition"
                                                                >
                                                                    <MdOutlineDownloading className="text-xl " />
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                ))
                                        )
                                    }

                                </div>
                            </>
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
