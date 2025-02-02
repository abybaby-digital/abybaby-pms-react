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
import EditCompany from "./EditCompany";  // Assuming EditCompany component exists

const ViewCompany = ({ company, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    
    return (
        <Dialog open={modal} >
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        Company {add_or_edit === "view" ? "Details" : "Edit"}
                    </DialogTitle>
                    <DialogClose
                        asChild
                        onClick={() => { setModal(false); }}
                        className="text-black text-2xl  cursor-pointer"
                    >
                        <MdOutlineClose />
                    </DialogClose>
                </DialogHeader>

                <DialogDescription>
                    {
                        add_or_edit === "view" ? (
                            <Table className="text-black">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Company Name</TableCell>
                                        <TableCell>{company?.company_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Company Details</TableCell>
                                        <TableCell>{company?.company_details}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Company GST</TableCell>
                                        <TableCell>{company?.company_gst}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Company Address</TableCell>
                                        <TableCell>{company?.company_address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Contact Person</TableCell>
                                        <TableCell>{company?.contact_person}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Contact Number</TableCell>
                                        <TableCell>{company?.contact_number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Contact Email</TableCell>
                                        <TableCell>{company?.contact_email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Status</TableCell>
                                        <TableCell>
                                            {company?.status === "1" ? (
                                                <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Inactive
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ) : (
                            <EditCompany company={company} />
                        )
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default ViewCompany;
