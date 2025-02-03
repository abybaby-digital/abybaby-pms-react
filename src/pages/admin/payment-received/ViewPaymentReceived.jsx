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

const ViewPaymentReceived = ({ payment }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);

    return (
        <Dialog open={modal}>
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        Payment Received Details
                    </DialogTitle>
                    <DialogClose
                        asChild
                        onClick={() => setModal(false)}
                        className="text-black text-2xl cursor-pointer"
                    >
                        <MdOutlineClose />
                    </DialogClose>
                </DialogHeader>

                <DialogDescription>
                    <Table className="text-black">
                        <TableBody className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
                            <TableRow className="flex justify-between">
                                <TableCell className="font-bold text-lg">Project Name:</TableCell>
                                <TableCell>{payment?.project_name}</TableCell>
                            </TableRow>
                            <TableRow className="flex justify-between">
                                <TableCell className="font-bold text-lg">Received No:</TableCell>
                                <TableCell>{payment?.received_no}</TableCell>
                            </TableRow>
                            <TableRow className="flex justify-between">
                                <TableCell className="font-bold text-lg">Amount:</TableCell>
                                <TableCell>₹{payment?.received_amount}</TableCell>
                            </TableRow>
                            <TableRow className="flex justify-between">
                                <TableCell className="font-bold text-lg">Received Date:</TableCell>
                                <TableCell>{new Date(payment?.received_date).toLocaleDateString()}</TableCell>
                            </TableRow>
                            <TableRow className="flex justify-between">
                                <TableCell className="font-bold text-lg">Details:</TableCell>
                                <TableCell>{payment?.received_details}</TableCell>
                            </TableRow>
                            <TableRow className="flex justify-between">
                                <TableCell className="font-bold text-lg">Status:</TableCell>
                                <TableCell>
                                    {payment?.status === "1" ? (
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
                            {payment?.received_img && (
                                <TableRow className="flex justify-between">
                                    <TableCell className="font-bold text-lg">Receipt:</TableCell>
                                    <TableCell>
                                        <img
                                            src={payment.received_img}
                                            alt="Receipt"
                                            className="w-32 h-32 object-cover rounded-md shadow"
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default ViewPaymentReceived;
