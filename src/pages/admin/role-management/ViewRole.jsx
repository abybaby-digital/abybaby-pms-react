import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditRole from "./EditRole";

const ViewRole = ({ role, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="pb-5 ">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Role {add_or_edit === "view" ? "Details" : "Edit"}
                        </DialogTitle>
                        <DialogClose asChild onClick={() => { setModal(false); }} className="text-black text-2xl cursor-pointer">
                            <MdOutlineClose />
                        </DialogClose>
                    </DialogHeader>

                    <DialogDescription>
                        {
                            add_or_edit === "view" ?
                                (
                                    <Table className="text-black ">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-bold text-lg">Role Name</TableCell>
                                                <TableCell>{role?.role_name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-bold text-lg">Access Type (Add)</TableCell>
                                                <TableCell>{role?.add_access_name?.split(',').join(', ')}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-bold text-lg">Access Type (Edit)</TableCell>
                                                <TableCell>{role?.edit_access_name?.split(',').join(', ')}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-bold text-lg">Status</TableCell>
                                                <TableCell>
                                                    {
                                                        role?.status === "1" ?
                                                            <span className="bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span> :
                                                            <span className="bg-red-500 px-3 py-1 rounded-xl text-white shadow">Inactive</span>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                )
                                :
                                (
                                    <EditRole role={role} />
                                )
                        }
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewRole;
