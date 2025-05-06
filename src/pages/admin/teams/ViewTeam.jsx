import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditTeam from "./EditTeam";
import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadImages, removeImageZip, viewTeamById } from "../../../services/api";
import { useSelector } from "react-redux";
import { MdOutlineDownloading } from "react-icons/md";
import JSZip from "jszip";
import { saveAs } from "file-saver";  // To trigger a file download
import toast from "react-hot-toast";
import { IoIosCloudDownload } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { GrSelect } from "react-icons/gr";
import { MdDeselect } from "react-icons/md";

const ViewTeam = ({ team, add_or_edit, stateList, companyList, branchList, roleList }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const token = useSelector((state) => state.auth.token);
    const [selectedPhotos, setSelectedPhotos] = useState([]); // State for selected photos
    const [searchKeyword, setSearchKeyword] = useState("");
    const [downloadready, setDownloadReady] = useState(false);
    const [zipLink, setZipLink] = useState("");
    const [allZipLinks, setallZipLinks] = useState([]);



    const generatedUrls = selectedPhotos.map((image) => image.url);
    console.log("selectedPhotos", generatedUrls.join(","));

    const { data: teamActivityDetails, isLoading } = useQuery({
        queryKey: ["team-activity-details", team, downloadready, modal],
        queryFn: async () => {
            return await viewTeamById(token, team?.id);
        },
    });



    // const getAllFileLinks = () => {
    //     let fileName = zipLink?.split('/').pop();

    // }

    useEffect(() => {
        if (zipLink) {
            const fileName = zipLink.split('/').pop();
            if (fileName) {
                setallZipLinks(prev => [...prev, fileName]);
                if (allZipLinks) {
                    sessionStorage.setItem("zipLinks", allZipLinks);
                }

            }
        }
    }, [zipLink]);

    // const { data: downloadedZip } = useQuery({
    //     queryKey: ["downloaded-photos"],
    //     queryFn: async () => {
    //         return await downloadImages(token, generatedUrls);
    //     }
    // })

    // console.log("getAllFileLinks", allZipLinks);




    const downloadMutation = useMutation({
        mutationFn: async () => {
            return await downloadImages(token, generatedUrls);
        },
        onSuccess: (response) => {

            // Optional: handle the zip (e.g., save to state, trigger download)
            if (response.status === 200) {
                toast.success(response.message);
                console.log(response.response.zip_file_download_url);
                setDownloadReady(true);
                setZipLink(response.response.zip_file_download_url);
            }

        },
        onError: (error) => {
            console.error('Download failed', error);
        }
    })

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

    const removeZipFileMutation = useMutation({
        mutationFn: async () => {
            return await removeImageZip(token, allZipLinks.join(","));
        },
        onSuccess: (response) => {

            // Optional: handle the zip (e.g., save to state, trigger download)
            // if (response.status === 200) {
            //     toast.success(response.message);
            //     console.log(response.response.zip_file_download_url);
            //     setDownloadReady(true);
            //     setZipLink(response.response.zip_file_download_url);
            // }
            sessionStorage.removeItem("zipLinks");

        },
        onError: (error) => {
            console.error('Download failed', error);
        }
    })

    const handleSelectAll = () => {
        const visibleItems = teamActivityDetails?.response?.filter(item =>
            item.team_created_by?.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        if (!visibleItems) return;

        const allSelected = visibleItems.every(item =>
            selectedPhotos.some(photo => photo.id === item.id)
        );

        if (allSelected) {
            // Deselect all
            setSelectedPhotos(prev =>
                prev.filter(photo => !visibleItems.some(item => item.id === photo.id))
            );
        } else {
            // Select all
            const newSelections = visibleItems
                .filter(item => !selectedPhotos.some(photo => photo.id === item.id))
                .map(item => ({ id: item.id, url: item.activity_photo }));

            setSelectedPhotos(prev => [...prev, ...newSelections]);
        }
    };

    // Inside the component...
    useEffect(() => {
        return () => {
            // Cleanup logic on unmount
            if (zipLink) {
                const file = zipLink.split("/").pop();
                if (file) {
                    removeZipFileMutation.mutate();
                }
            }
        };
    }, [zipLink]); // Run cleanup if zipLink was ever set

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

                <DialogDescription className="pb-10">
                    {
                        add_or_edit === "view" ? (
                            <>
                                <div className="flex w-full justify-between border-b px-3 py-2 items-center" >
                                    <h2 className="text-center text-black text-xl  uppercase">{team.project_name}</h2>
                                    <button
                                        onClick={handleSelectAll}
                                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 absolute right-5 bottom-5 z-30 animate-pulse shadow-xl shadow-white hover:animate-none"
                                    >
                                        {
                                            teamActivityDetails?.response?.filter(item =>
                                                item.team_created_by?.toLowerCase().includes(searchKeyword.toLowerCase())
                                            ).every(item => selectedPhotos.some(photo => photo.id === item.id))
                                                ? <><MdDeselect className="inline text-white me-1" />"Deselect All"</>
                                                : <><GrSelect className="inline text-white me-1" />"Select All"</>
                                        }
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <div className="w-full text-center text-nowrap">
                                            {
                                                downloadready ?

                                                    <div className="downloadbtn ">
                                                        <a href={zipLink}
                                                            onClick={() => {
                                                                setDownloadReady(false);
                                                                setModal(false);
                                                                setSelectedPhotos([]);
                                                                setSearchKeyword("");
                                                                // getAllFileLinks();
                                                            }}
                                                            className="px-4 text-5xl py-2 bg-black text-white rounded-md hover:bg-lightdark disabled:bg-gray-400"
                                                        >

                                                            <>
                                                                <FaFileDownload className="inline me-2 text-white animate-pulse" />
                                                                <span>Download Zip</span>
                                                            </>

                                                        </a>
                                                    </div>
                                                    :
                                                    selectedPhotos.length === 0 ? null : (
                                                        <button
                                                            onClick={() => downloadMutation.mutate()}
                                                            disabled={downloadMutation.isPending}
                                                            className="px-4 w-full py-2 bg-black text-white rounded-md hover:bg-lightdark disabled:bg-gray-400"
                                                        >
                                                            {downloadMutation.isPending ? (
                                                                "Making Zip..."
                                                            ) : (
                                                                <>
                                                                    <IoIosCloudDownload className="inline me-2 text-white" />
                                                                    <span>Start Download</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    )
                                            }


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
                                {
                                    isLoading ?
                                        <p className="text-center">Loading Photos..</p>
                                        :
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

                                                                        <input
                                                                            type="checkbox"
                                                                            onChange={() => handleSelectPhoto(item.id, item.activity_photo)}
                                                                            checked={selectedPhotos.some(photo => photo.id === item.id)}
                                                                            className="mr-2"
                                                                        />

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
                                }
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
