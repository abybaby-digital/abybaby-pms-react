import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useContext, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { DialogClose } from "@radix-ui/react-dialog";
import { MdOutlineClose } from "react-icons/md";
import EditProject from "./EditProject";  // Assuming EditProject component exists

const ViewProject = ({ project, add_or_edit }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="p-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Project {add_or_edit === "view" ? "Details" : "Edit"}
                        </DialogTitle>
                        <DialogClose
                            asChild
                            onClick={() => { setModal(false) }}
                            className="text-black text-2xl bg-white absolute right-4 top-2 z-40 cursor-pointer"
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
                                            <TableCell className="font-bold text-lg">Project Number</TableCell>
                                            <TableCell>{project?.project_number}</TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                                            <TableCell className="font-bold text-lg">Purchase Order No</TableCell>
                                            <TableCell>{project?.purchase_order_no}</TableCell>
                                        </TableRow> */}
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Project Name</TableCell>
                                            <TableCell>{project?.project_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Client</TableCell>
                                            <TableCell>{project?.client_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Branch</TableCell>
                                            <TableCell>{project?.branch_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Company</TableCell>
                                            <TableCell>{project?.company_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Vertical Head</TableCell>
                                            <TableCell>{project?.vertical_head_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Branch Manager</TableCell>
                                            <TableCell>{project?.business_manager_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Client Service</TableCell>
                                            <TableCell>{project?.client_service_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Others</TableCell>
                                            <TableCell>{project?.other_service_names}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Quotation No</TableCell>
                                            <TableCell>{project?.quotation_no}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Project Amount</TableCell>
                                            <TableCell>{project?.project_amount}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Start Date</TableCell>
                                            <TableCell>{project?.project_start_date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">End Date</TableCell>
                                            <TableCell>{project?.project_end_date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Financial Year</TableCell>
                                            <TableCell>{project?.financial_year}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Status</TableCell>
                                            <TableCell>
                                                {project?.status === "1" ? (
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
                                <EditProject project={project} />
                            )
                        }
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewProject;
