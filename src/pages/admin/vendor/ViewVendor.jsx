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
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";

import EditVendor from "./EditVendor";

const ViewVendor = ({ vendor, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);

    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="p-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Vendor {add_or_edit === "view" ? "Details" : "Edit"}
                        </DialogTitle>
                        <DialogClose
                            asChild
                            onClick={() => { setModal(false); }}
                            className="text-black text-2xl bg-white absolute right-4 top-2 z-40 cursor-pointer"
                        >
                            <MdOutlineClose />
                        </DialogClose>
                        <DialogDescription>
                            {add_or_edit === "view" ? (
                                <Table className="text-black">
                                    <TableBody className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Vendor Code:</TableCell>
                                            <TableCell>{vendor?.vendor_code}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Vendor Name:</TableCell>
                                            <TableCell>{vendor?.vendor_name}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Vendor Email:</TableCell>
                                            <TableCell>{vendor?.vendor_email}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Vendor Mobile:</TableCell>
                                            <TableCell>{vendor?.vendor_mobile}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Vendor Address:</TableCell>
                                            <TableCell>{vendor?.vendor_address}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">State:</TableCell>
                                            <TableCell>{vendor?.state_name}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Branch Name:</TableCell>
                                            <TableCell>{vendor?.branch_name}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Vendor Category:</TableCell>
                                            <TableCell>{vendor?.vendor_category_name}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">PAN Card No.:</TableCell>
                                            <TableCell>{vendor?.pancard_no}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">GST No.:</TableCell>
                                            <TableCell>{vendor?.gst_no}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Bank Name:</TableCell>
                                            <TableCell>{vendor?.bank_name}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Bank Account No.:</TableCell>
                                            <TableCell>{vendor?.bank_account}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">IFSC Code:</TableCell>
                                            <TableCell>{vendor?.ifsc_code}</TableCell>
                                        </TableRow>
                                        <TableRow className="flex justify-between">
                                            <TableCell className="font-bold text-lg">Status:</TableCell>
                                            <TableCell>
                                                {vendor?.status === "1" ? (
                                                    <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span>
                                                ) : (
                                                    <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">Inactive</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ) : (
                                <EditVendor vendor={vendor} />
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewVendor;
