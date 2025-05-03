import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";

import EditGift from "./EditGift";
import AddGift from "./AddGift";

const ViewGift = ({ gift, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);

    return (
        <Dialog open={modal}>
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        {add_or_edit === "view" ? "Add Gift" : "Edit Gift"}
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
                    {
                        add_or_edit === "view" ? (
                            <AddGift />
                        ) : (
                            <EditGift gift={gift} />
                        )
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default ViewGift;
