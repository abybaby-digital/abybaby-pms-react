import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHeader,
    TableHead,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";

import EditClientPO from "./EditClientPO"; // Assuming you have an EditClientPO component
import { useSelector } from "react-redux";
import { getProjectById } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

const ViewClientPO = ({ clientPO, add_or_edit }) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user?.id);
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const [imageModalOpen, setImageModalOpen] = useState(false);  // state to control image modal visibility
    const [fileSrc, setFileSrc] = useState(null); // state to store the file source (image or PDF)

    const handleFileClick = (src) => {
        setFileSrc(src); // set the file source to the clicked file
        setImageModalOpen(true); // open the file modal (image or PDF)
    };


    const [project_by_id, setProjectById] = useState(null);



    const { data: projectById, isLoading } = useQuery({
        queryKey: ["project-view-by-id", clientPO?.project_id],
        queryFn: async () => {
            return await getProjectById(token, clientPO?.project_id);
        },
    });

    // console.log(projectById);
    useEffect(() => {
        if (projectById) {
            setProjectById(projectById?.response);
            // console.log("project_by_id", project_by_id.invoice);
        }
    });

    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="pb-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Client PO {add_or_edit === "view" ? "Details" : "Edit"}
                        </DialogTitle>
                        <DialogClose
                            asChild
                            onClick={() => { setModal(false); }}
                            className="text-black text-2xl cursor-pointer"
                        >
                            <MdOutlineClose />
                        </DialogClose>
                    </DialogHeader>
                    <DialogDescription>
                        {add_or_edit === "view" ? (
                            isLoading ?
                                <p className="text-center text-2xl">Loading ...</p>
                                :
                                <>
                                    <div className="project_data">
                                        <Table className="text-black">
                                            <TableBody className="grid lg:grid-cols-3 grid-cols-1 p-5 gap-5">
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Project Number :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.project_number}
                                                    </TableCell>
                                                </TableRow>
                                                {/* <TableRow>
                                            <TableCell className="font-bold text-lg">Purchase Order No</TableCell>
                                            <TableCell>{project?.purchase_order_no}</TableCell>
                                        </TableRow> */}
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Project Name :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.project_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Client :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.client_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Branch :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.branch_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Company :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.company_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Vertical Head :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.vertical_head_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Branch Manager :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.business_manager_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Client Service :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.client_service_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Others :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.other_service_names}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Activity Co-ordinator :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.activity_coordinator_name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Others Activity Co-ordinator :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.activity_coordinator_name_other}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Quotation No :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.quotation_no}
                                                    </TableCell>
                                                </TableRow>
                                                {project_by_id?.project?.other_members_id
                                                    ?.split(",")
                                                    ?.map(Number)
                                                    ?.includes(userId) ? null : (
                                                    <TableRow>
                                                        <TableCell className="font-bold text-lg">
                                                            Project Amount (pre GST) :
                                                        </TableCell>
                                                        <TableCell>
                                                            {project_by_id?.project?.project_amount_pre_gst}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                {project_by_id?.project?.other_members_id
                                                    ?.split(",")
                                                    ?.map(Number)
                                                    ?.includes(userId) ? null : (
                                                    <TableRow>
                                                        <TableCell className="font-bold text-lg">
                                                            Project Amount (with GST) :
                                                        </TableCell>
                                                        <TableCell>
                                                            {project_by_id?.project?.project_amount_with_gst}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Start Date :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.project_start_date}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        End Date :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.project_end_date}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Financial Year :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.financial_years}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Project Status :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.status === "1" ? (
                                                            <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                                Running
                                                            </span>
                                                        ) : (
                                                            <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                                Closed
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Billing Status :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.billing_status === "1" ? (
                                                            <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                                Billed
                                                            </span>
                                                        ) : (
                                                            <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                                Unbilled
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">
                                                        Payment Status :
                                                    </TableCell>
                                                    <TableCell>
                                                        {project_by_id?.project?.payment_status === "1" ? (
                                                            <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                                Paid
                                                            </span>
                                                        ) : (
                                                            <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                                Unpaid
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="client_po my-5">
                                        <h2 className="text-black text-2xl font-bold bg-whitesmoke text-center p-3 mx-5 capitalize font-merri">
                                            Client Purchase order
                                        </h2>
                                        <div className="px-5">
                                            <Table className="text-black">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[100px]">Sl No</TableHead>

                                                        {project_by_id?.project?.other_members_id
                                                            ?.split(",")
                                                            ?.map(Number)
                                                            ?.includes(userId) ? null : (
                                                            <TableHead>
                                                                Client PO amount ( pre GST )
                                                            </TableHead>
                                                        )}
                                                        {project_by_id?.project?.other_members_id
                                                            ?.split(",")
                                                            ?.map(Number)
                                                            ?.includes(userId) ? null : (
                                                            <TableHead>
                                                                Client PO amount ( with GST )
                                                            </TableHead>
                                                        )}
                                                        <TableHead>Client PO date</TableHead>
                                                        {project_by_id?.project?.other_members_id
                                                            ?.split(",")
                                                            ?.map(Number)
                                                            ?.includes(userId) ? null : (
                                                            <TableHead>PO attachment</TableHead>
                                                        )}

                                                        <TableHead>Pament schedule days</TableHead>
                                                        <TableHead>PO details</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {project_by_id?.client_po?.map((item, idx) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{idx + 1}</TableCell>
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableCell>
                                                                    {item?.po_amount_pre_gst}
                                                                </TableCell>
                                                            )}
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableCell>
                                                                    {item?.po_amount_with_gst}
                                                                </TableCell>
                                                            )}

                                                            <TableCell>
                                                                {item?.po_date?.slice(0, 10)}
                                                            </TableCell>

                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableCell>
                                                                    {
                                                                    item?.po_img ? 
                                                                        <a
                                                                        href={item?.po_img}
                                                                        target="_blank"
                                                                        className="border border-blue-500 text-blue-500 py-1 px-2 rounded-xl"
                                                                    >
                                                                        View
                                                                    </a> :  "No attachment"}
                                                                </TableCell>
                                                            )}

                                                            <TableCell>
                                                                {item?.payment_schedule_days}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item?.project_order_details}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </>
                        ) : (
                            <EditClientPO clientPO={clientPO} /> // Add or edit the client PO information here
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* File Modal (for image or PDF) */}
            <Dialog open={imageModalOpen} onOpenChange={() => setImageModalOpen(false)}>
                <DialogContent className="p-0">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            PO {fileSrc?.endsWith(".pdf") ? "PDF" : "Image"}
                        </DialogTitle>
                        <DialogClose
                            asChild
                            onClick={() => { setImageModalOpen(false); }}
                            className="text-black text-2xl cursor-pointer"
                        >
                            <MdOutlineClose />
                        </DialogClose>
                    </DialogHeader>
                    <DialogDescription className="p-5">
                        {/* Check if the file is a PDF or image and render accordingly */}
                        {fileSrc?.endsWith(".pdf") ? (
                            <iframe
                                src={fileSrc}
                                width="100%"
                                height="500"
                                title="PO PDF"
                                className="border-none"
                            />
                        ) : (
                            <img
                                src={fileSrc}
                                alt="PO Image"
                                className="w-full h-auto object-contain"
                            />
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewClientPO;
