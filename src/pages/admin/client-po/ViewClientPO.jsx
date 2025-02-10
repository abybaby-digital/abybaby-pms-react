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
} from "@/components/ui/table";
import { useContext, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";

import EditClientPO from "./EditClientPO"; // Assuming you have an EditClientPO component

const ViewClientPO = ({ clientPO, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const [imageModalOpen, setImageModalOpen] = useState(false);  // state to control image modal visibility
    const [fileSrc, setFileSrc] = useState(null); // state to store the file source (image or PDF)

    const handleFileClick = (src) => {
        setFileSrc(src); // set the file source to the clicked file
        setImageModalOpen(true); // open the file modal (image or PDF)
    };

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
                            <Table className="text-black">
                                <TableBody className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 p-5">
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Project Name:</TableCell>
                                        <TableCell>{clientPO?.project_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">PO No:</TableCell>
                                        <TableCell>{clientPO?.project_no || "Not Available"}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Amount:</TableCell>
                                        <TableCell>₹{clientPO?.po_amount}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">PO Date:</TableCell>
                                        <TableCell>{new Date(clientPO?.po_date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Payment Schedule (Days):</TableCell>
                                        <TableCell>{clientPO?.payment_schedule_days} days</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Details:</TableCell>
                                        <TableCell>{clientPO?.project_order_details}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Status:</TableCell>
                                        <TableCell>
                                            {clientPO?.status === "1" ? (
                                                <span className="bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Inactive
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    {clientPO?.po_img && (
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">PO Image:</TableCell>
                                            <TableCell>
                                                {/* Check if po_img is a PDF or an image */}
                                                {clientPO.po_img.endsWith(".pdf") ? (
                                                    <button
                                                        className="text-blue-500"
                                                        onClick={() => handleFileClick(clientPO.po_img)}
                                                    >
                                                        View PO PDF
                                                    </button>
                                                ) : (
                                                    <img
                                                        src={clientPO.po_img}
                                                        alt="PO Image"
                                                        className="w-32 h-32 object-cover rounded-md shadow cursor-pointer"
                                                        onClick={() => handleFileClick(clientPO.po_img)} // Make the image clickable
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
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
