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

import EditDealership from "./EditDealership";
import AddDealership from "./AddDealership";

const ViewDealership = ({ dealership, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);

    return (
        <Dialog open={modal} >
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        {add_or_edit === "view" ? "Add Dealership" : "Edit Dealership"}
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
                            <AddDealership />
                        ) : (
                            <EditDealership dealership={dealership} />
                        )
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default ViewDealership;
