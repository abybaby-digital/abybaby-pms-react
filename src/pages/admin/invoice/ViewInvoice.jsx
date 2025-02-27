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

import EditInvoice from "./EditInvoice"; // Assuming you have an EditInvoice component

const ViewInvoice = ({ invoice, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const [imageModalOpen, setImageModalOpen] = useState(false);  // state to control image modal visibility
    const [imageSrc, setImageSrc] = useState(null); // state to store the image source

    const handleImageClick = (src) => {
        setImageSrc(src); // set the image source to the clicked image
        setImageModalOpen(true); // open the image modal
    };

    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="pb-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Invoice {add_or_edit === "view" ? "Details" : "Edit"}
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
                                        <TableCell>{invoice?.project_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Invoice No:</TableCell>
                                        <TableCell>{invoice?.invoice_no}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Amount (pre GST):</TableCell>
                                        <TableCell>₹{invoice?.invoice_amount_pre_gst}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Amount (with GST):</TableCell>
                                        <TableCell>₹{invoice?.invoice_amount_with_gst}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Invoice Date:</TableCell>
                                        <TableCell>{new Date(invoice?.invoice_date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Created By :</TableCell>
                                        <TableCell>{invoice?.created_by_name ? invoice?.created_by_name : "...."}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Updated By:</TableCell>
                                        <TableCell>{invoice?.updated_by_name ? invoice?.updated_by_name : "...."}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Details:</TableCell>
                                        <TableCell>{invoice?.invoice_details}</TableCell>
                                    </TableRow>
                                    {/* <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Status:</TableCell>
                                        <TableCell>
                                            {invoice?.status === "1" ? (
                                                <span className="bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Inactive
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow> */}
                                    {invoice?.invoice_img && (
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Invoice Image:</TableCell>
                                            <TableCell>
                                                <img
                                                    src={invoice.invoice_img}
                                                    alt="Invoice Image"
                                                    className="w-32 h-32 object-cover rounded-md shadow cursor-pointer"
                                                    onClick={() => handleImageClick(invoice.invoice_img)} // Make the image clickable
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            <EditInvoice invoice={invoice} /> // Add or edit the invoice information here
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* Image Modal (Lightbox) */}
            <Dialog open={imageModalOpen} onOpenChange={() => setImageModalOpen(false)}>
                <DialogContent className="p-0">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Invoice Image
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
                        <img
                            src={imageSrc}
                            alt="Original Invoice"
                            className="w-full h-auto object-contain"
                        />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewInvoice;
