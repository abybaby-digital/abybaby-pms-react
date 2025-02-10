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

import EditPaymentRequisition from "./EditPaymentRequisition"; // Assuming you have an EditPaymentReceived component
import { useSelector } from "react-redux";
import RequisitionApproval from "./RequisitionApproval";

const ViewPaymentReceived = ({ payment, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const [imageModalOpen, setImageModalOpen] = useState(false); // state to control image modal visibility
    const [imageSrc, setImageSrc] = useState(null); // state to store the image source
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    console.log(user?.role_id);
    console.log(payment.accountent_approve_status);

    const handleImageClick = (src) => {
        setImageSrc(src); // set the image source to the clicked image
        setImageModalOpen(true); // open the image modal
    };

    // Function to check if the file is a PDF
    const isPdf = (filePath) => {
        return filePath && filePath.endsWith(".pdf");
    };

    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="pb-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Payment Requisition {add_or_edit === "view" ? "Details" : "Edit"}
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
                                        <TableCell>{payment?.project_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Branch Name:</TableCell>
                                        <TableCell>{payment?.branch_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Vendor Name:</TableCell>
                                        <TableCell>{payment?.vendor_name}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Requisition Amount:</TableCell>
                                        <TableCell>₹{payment?.requisition_amount}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Date of Payment:</TableCell>
                                        <TableCell>{new Date(payment?.date_of_payments).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Requisition Remarks:</TableCell>
                                        <TableCell>{payment?.requisition_remarks}</TableCell>
                                    </TableRow>
                                    {/* Admin Approval Status */}
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Admin Approval:</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-xl text-white shadow ${payment?.admin_approve_status === "1" ? "bg-green-500" : payment?.admin_approve_status === "0" ? "bg-orange-400" : "bg-red-500"}`}>
                                                {payment?.admin_approve_status === "0" ? "Pending" : payment?.admin_approve_status === "1" ? "Approved" : "Rejected"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    {/* Finance Approval Status */}
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Finance Approval:</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-xl text-white shadow ${payment?.finance_approve_status === "1" ? "bg-green-500" : payment?.finance_approve_status === "0" ? "bg-orange-400" : "bg-red-500"}`}>
                                                {payment?.finance_approve_status === "0" ? "Pending" : payment?.finance_approve_status === "1" ? "Approved" : "Rejected"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    {/* Purchase Approval Status */}
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Purchase Approval:</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-xl text-white shadow ${payment?.purchase_approve_status === "1" ? "bg-green-500" : payment?.purchase_approve_status === "0" ? "bg-orange-400" : "bg-red-500"}`}>
                                                {payment?.purchase_approve_status === "0" ? "Pending" : payment?.purchase_approve_status === "1" ? "Approved" : "Rejected"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    {/* Accountant Approval Status */}
                                    <TableRow className="flex justify-between">
                                        <TableCell className="font-bold text-lg">Accountant Approval:</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-xl text-white shadow ${payment?.accountent_approve_status === "1" ? "bg-green-500" : payment?.accountent_approve_status === "0" ? "bg-black" : "bg-red-500"}`}>
                                                {payment?.accountent_approve_status === "1" ? "Paid" : payment?.accountent_approve_status === "0" ? "Unpaid" : "Rejected"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    {/* Requisition Image */}
                                    {payment?.requisition_img && (
                                        <TableRow className="flex flex-col justify-between">
                                            <TableCell className="font-bold text-lg">Requisition Image:</TableCell>
                                            <TableCell>
                                                {isPdf(payment.requisition_img) ? (
                                                    <iframe
                                                        src={payment.requisition_img}
                                                        width="400"
                                                        height="400"
                                                        className="rounded-md shadow"
                                                        title="Requisition PDF"
                                                    />
                                                ) : (
                                                    <img
                                                        src={payment.requisition_img}
                                                        alt="Requisition"
                                                        className="w-32 h-32 object-cover rounded-md shadow cursor-pointer"
                                                        onClick={() => handleImageClick(payment.requisition_img)} // Make the image clickable
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}


                                    {/* Approval Action Button Showing Logic for Each Role */}
                                    {/* Admin Approval */}

                                    {user?.role_id === 1 ? (
                                        <RequisitionApproval
                                            payment={payment}
                                            role_id={user?.role_id}
                                            role_name={user?.role}
                                            veto_power={user?.veto_power}
                                            approval_status={payment?.admin_approve_status}
                                            pr_id={payment?.id}
                                        />) : null}

                                    {/* Finance Approval */}
                                    {user?.role_id === 2 ? (
                                        <RequisitionApproval
                                            payment={payment}
                                            role_id={user?.role_id}
                                            role_name={user?.role}
                                            veto_power={user?.veto_power}
                                            approval_status={payment?.finance_approve_status}
                                            pr_id={payment?.id}
                                        />
                                    ) : null}


                                    {/* Purchase Approval */}
                                    {user?.role_id === 3 ? (
                                        <RequisitionApproval
                                            payment={payment}
                                            role_id={user?.role_id}
                                            role_name={user?.role}
                                            veto_power={user?.veto_power}
                                            approval_status={payment?.purchase_approve_status}
                                            pr_id={payment?.id}
                                        />
                                    ) : null}


                                    {/* Accountant Approval */}
                                    {user?.role_id === 4 ? (
                                        <RequisitionApproval
                                            payment={payment}
                                            role_id={user?.role_id}
                                            role_name={user?.role}
                                            veto_power={user?.veto_power}
                                            approval_status={payment?.accountent_approve_status}
                                            pr_id={payment?.id}
                                        />) : null}




                                    {/* <TableRow className="bg-whitesmoke lg:p-5 rounded-3xl shadow-lg">
                                        <TableCell className="font-bold text-2xl block text-center">Your Approval:</TableCell>
                                        <TableCell className="flex lg:flex-row flex-col justify-center gap-5">
                                            <div className="approve-reject-button">
                                                <button type="button" className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3" >Approve</button>
                                            </div>
                                            <div className="approve-reject-button">
                                                <button type="button" className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3" >Reject</button>
                                            </div>
                                        </TableCell>
                                    </TableRow> */}

                                </TableBody>
                            </Table>

                        ) : (
                            <EditPaymentRequisition payment={payment} /> // Add or edit the payment information here
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* Image Modal (Lightbox) */}
            <Dialog open={imageModalOpen} onOpenChange={() => setImageModalOpen(false)}>
                <DialogContent className="p-0">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Requisition Image
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
                        {isPdf(imageSrc) ? (
                            <iframe
                                src={imageSrc}
                                width="100%"
                                height="500"
                                className="rounded-md shadow"
                                title="Requisition PDF"
                            />
                        ) : (
                            <img
                                src={imageSrc}
                                alt="Original Requisition Image"
                                className="w-full h-auto object-contain"
                            />
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewPaymentReceived;
