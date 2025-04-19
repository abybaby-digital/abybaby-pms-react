import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useContext, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditTeam from "./EditTeam";
import { useQuery } from "@tanstack/react-query";
import { viewTeamById } from "../../../services/api";
import { useSelector } from "react-redux";
import { MdOutlineDownloading } from "react-icons/md";
import JSZip from "jszip";
import { saveAs } from "file-saver";  // To trigger a file download

const ViewTeam = ({ team, add_or_edit, stateList, companyList, branchList, roleList }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    const [selectedPhotos, setSelectedPhotos] = useState([]); // State for selected photos
    const [searchKeyword, setSearchKeyword] = useState("");

    const { data: teamActivityDetails, isLoading } = useQuery({
        queryKey: ["team-activity-details", team],
        queryFn: async () => {
            return await viewTeamById(token, team?.id);
        },
    });

    // Function to handle photo selection
    const handleSelectPhoto = (id, url) => {
        setSelectedPhotos((prevSelectedPhotos) => {
            if (prevSelectedPhotos.some(photo => photo.id === id)) {
                return prevSelectedPhotos.filter(photo => photo.id !== id);  // Remove photo if already selected
            } else {
                return [...prevSelectedPhotos, { id, url }];  // Add photo to selection
            }
        });
    };

    // Function to download all selected images as a ZIP
    const handleBulkDownload = async () => {
        const zip = new JSZip();

        selectedPhotos.forEach((photo, index) => {
            // Fetch the image as a blob
            fetch(photo.url, { mode: 'cors' })
                .then(response => response.blob())
                .then(blob => {
                    zip.file(`activity-${photo.id}.jpg`, blob); // Add image to ZIP with a unique name
                    if (index === selectedPhotos.length - 1) {
                        // Once all files are added, generate and download the ZIP
                        zip.generateAsync({ type: "blob" })
                            .then(content => {
                                saveAs(content, "team-activities.zip"); // Trigger download
                            });
                    }
                })
                .catch(err => console.error("Error downloading image:", err));
        });
    };

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
                                    <div className="flex items-center gap-2">
                                        <div className="w-full text-center text-nowrap">
                                            {/* <button
                                                onClick={handleBulkDownload}
                                                disabled={selectedPhotos.length === 0}
                                                className="px-4 w-full py-2 bg-black text-white rounded-md hover:bg-lightdark disabled:bg-gray-400"
                                            >
                                                Download Selected Photos
                                            </button> */}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search by FO name..."
                                            className="p-2 w-full border rounded-md shadow "
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid xl:grid-cols-4 lg:grid-cols-3 items-center gap-4 max-h-[80vh] overflow-y-auto p-3">
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
                                                            <div className="text-center my-4 absolute top-2 left-3">
                                                                {/* <input
                                                                    type="checkbox"
                                                                    onChange={() => handleSelectPhoto(item.id, item.activity_photo)}
                                                                    checked={selectedPhotos.some(photo => photo.id === item.id)}
                                                                    className="mr-2"
                                                                /> */}
                                                                {/* <button type="button"
                                                                    onClick={() => downloadImage(item?.activity_photo, `activity-by-${item.team_created_by}-${item.id}`)}
                                                                    className="ml-4 px-1 rounded-full py-1 bg-lightdark text-white text-sm hover:bg-black transition"
                                                                >
                                                                    <MdOutlineDownloading className="text-xl " />
                                                                </button> */}
                                                            </div>
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
