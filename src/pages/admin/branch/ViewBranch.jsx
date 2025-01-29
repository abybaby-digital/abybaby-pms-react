import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useContext, useState } from "react"
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose"
import { DialogClose } from "@radix-ui/react-dialog"
import { MdOutlineClose } from "react-icons/md";
import EditBranch from "./EditBranch"

const ViewBranch = ({ branch, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    return (
        <>
            <Dialog open={modal}>
                {/* <DialogTrigger>Open</DialogTrigger> */}

                <DialogContent className="p-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">Branch {add_or_edit === "view" ? "Details" : "Edit"}</DialogTitle>
                        <DialogClose asChild onClick={() => { setModal(false) }} className="text-black text-2xl bg-white absolute 
                        right-4 top-2 z-40 cursor-pointer">

                            <MdOutlineClose />

                        </DialogClose>
                        <DialogDescription>
                            {
                                add_or_edit === "view" ?
                                    (
                                        <Table className="text-black">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">Branch Code</TableCell>
                                                    <TableCell>{branch?.branch_code}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">Branch Name</TableCell>
                                                    <TableCell>{branch?.branch_name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">Branch Address</TableCell>
                                                    <TableCell>{branch?.branch_address}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-bold text-lg">Status</TableCell>
                                                    <TableCell>{branch?.status === "1" ? <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">Active</span> : <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">Active</span>}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                    :
                                    (
                                        <EditBranch branch={branch} />
                                    )
                            }
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </>
    )
}

export default ViewBranch
