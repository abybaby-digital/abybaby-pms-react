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
import EditClient from "./EditClient";  // Assuming EditClient component exists

const ViewClient = ({ client, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);

    return (
        <Dialog open={modal}>
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        Client {add_or_edit === "view" ? "Details" : "Edit"}
                    </DialogTitle>
                    <DialogClose
                        asChild
                        onClick={() => { setModal(false); }}
                        className="text-black text-2xl bg-white absolute right-4 top-2 z-40 cursor-pointer"
                    >
                        <MdOutlineClose />
                    </DialogClose>
                </DialogHeader>

                <DialogDescription>
                    {
                        add_or_edit === "view" ? (
                            <Table className="text-black">
                                <TableBody className="grid md:grid-cols-2 grid-cols-1 gap-4 p-5">
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Company Name</TableCell>
                                        <TableCell>{client?.company_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Contact Person</TableCell>
                                        <TableCell>{client?.contact_person}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Client GST</TableCell>
                                        <TableCell>{client?.client_gst}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Contact Email</TableCell>
                                        <TableCell>{client?.client_email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Client Address</TableCell>
                                        <TableCell>{client?.office_address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Phone Number</TableCell>
                                        <TableCell>{client?.contact_number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Status</TableCell>
                                        <TableCell>
                                            {client?.status === "1" ? (
                                                <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                    Closed
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ) : (
                            <EditClient client={client} />
                        )
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default ViewClient;
