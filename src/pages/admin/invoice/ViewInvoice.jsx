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
    TableHeader,
    TableHead,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";

import EditInvoice from "./EditInvoice"; // Assuming you have an EditInvoice component
import { getProjectById } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ViewInvoice = ({ invoice, add_or_edit }) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user?.id);
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const [imageModalOpen, setImageModalOpen] = useState(false);  // state to control image modal visibility
    const [imageSrc, setImageSrc] = useState(null); // state to store the image source

    const handleImageClick = (src) => {
        setImageSrc(src); // set the image source to the clicked image
        setImageModalOpen(true); // open the image modal
    };

    const [project_by_id, setProjectById] = useState(null);



    const { data: projectById, isLoading } = useQuery({
        queryKey: ["project-view-by-id", invoice?.project_id , modal],
        queryFn: async () => {
            return await getProjectById(token, invoice?.project_id);
        },
    });

    // console.log(projectById);
    useEffect(() => {
        if (projectById) {
            setProjectById(projectById?.response);
            // console.log("project_by_id", project_by_id.invoice);
        }
    });


    return (
        <>
            <Dialog open={modal}>
                <DialogContent className="pb-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Invoice {add_or_edit === "view" ? "Details" : "Edit"}
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
                            // <Table className="text-black">
                            //     <TableBody className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 p-5">
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Project Name:</TableCell>
                            //             <TableCell>{invoice?.project_name}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Invoice No:</TableCell>
                            //             <TableCell>{invoice?.invoice_no}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Amount (pre GST):</TableCell>
                            //             <TableCell>₹{invoice?.invoice_amount_pre_gst}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Amount (with GST):</TableCell>
                            //             <TableCell>₹{invoice?.invoice_amount_with_gst}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Invoice Date:</TableCell>
                            //             <TableCell>{new Date(invoice?.invoice_date).toLocaleDateString()}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Created By :</TableCell>
                            //             <TableCell>{invoice?.created_by_name ? invoice?.created_by_name : "...."}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Updated By:</TableCell>
                            //             <TableCell>{invoice?.updated_by_name ? invoice?.updated_by_name : "...."}</TableCell>
                            //         </TableRow>
                            //         <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Details:</TableCell>
                            //             <TableCell>{invoice?.invoice_details}</TableCell>
                            //         </TableRow>
                            //         {/* <TableRow className="flex justify-between">
                            //             <TableCell className="font-bold text-lg">Status:</TableCell>
                            //             <TableCell>
                            //                 {invoice?.status === "1" ? (
                            //                     <span className="bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                            //                         Active
                            //                     </span>
                            //                 ) : (
                            //                     <span className="bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                            //                         Inactive
                            //                     </span>
                            //                 )}
                            //             </TableCell>
                            //         </TableRow> */}
                            //         {invoice?.invoice_img && (
                            //             <TableRow className="flex justify-between">
                            //                 <TableCell className="font-bold text-lg">Invoice Image:</TableCell>
                            //                 <TableCell>
                            //                     <img
                            //                         src={invoice.invoice_img}
                            //                         alt="Invoice Image"
                            //                         className="w-32 h-32 object-cover rounded-md shadow cursor-pointer"
                            //                         onClick={() => handleImageClick(invoice.invoice_img)} // Make the image clickable
                            //                     />
                            //                 </TableCell>
                            //             </TableRow>
                            //         )}
                            //     </TableBody>
                            // </Table>

                            isLoading ?
                                <p className="text-center text-2xl">Loading ...</p>
                                :
                                <>
                                    <Accordion type="single" collapsible className="w-full px-5">
                                        <AccordionItem value="item-1" className="bg-whitesmoke">
                                            <AccordionTrigger className="text-xl text-black font-bold text-center font-merri">Project Details</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="project_data">
                                                    <Table className="text-black bg-white">
                                                        <TableBody className="grid lg:grid-cols-3 grid-cols-1 p-5 gap-5">
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Project Number :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.project_number}
                                                                </TableCell>
                                                            </TableRow>
                                                            {/* <TableRow>
                                            <TableCell className="font-bold text-lg">Purchase Order No</TableCell>
                                            <TableCell>{project?.purchase_order_no}</TableCell>
                                        </TableRow> */}
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Project Name :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.project_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Client :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.client_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Branch :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.branch_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Company :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.company_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Vertical Head :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.vertical_head_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Branch Manager :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.business_manager_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Client Service :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.client_service_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Others :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.other_service_names}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Activity Co-ordinator :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.activity_coordinator_name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Others Activity Co-ordinator :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.activity_coordinator_name_other}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Quotation No :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.quotation_no}
                                                                </TableCell>
                                                            </TableRow>
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableRow>
                                                                    <TableCell className="font-bold text-lg">
                                                                        Project Amount (pre GST) :
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {project_by_id?.project?.project_amount_pre_gst}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableRow>
                                                                    <TableCell className="font-bold text-lg">
                                                                        Project Amount (with GST) :
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {project_by_id?.project?.project_amount_with_gst}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableRow>
                                                                    <TableCell className="font-bold text-lg">
                                                                        Branch Expense (Cash) :
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {project_by_id?.project?.branch_expenses_cash}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableRow>
                                                                    <TableCell className="font-bold text-lg">
                                                                        Branch Expense (Cheque) :
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {project_by_id?.project?.branch_expenses_check}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Start Date :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.project_start_date}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    End Date :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.project_end_date}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Financial Year :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.financial_years}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Project Status :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.status === "1" ? (
                                                                        <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                                            Running
                                                                        </span>
                                                                    ) : (
                                                                        <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                                            Closed
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Billing Status :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.billing_status === "1" ? (
                                                                        <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                                            Billed
                                                                        </span>
                                                                    ) : (
                                                                        <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                                            Unbilled
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-bold text-lg">
                                                                    Payment Status :
                                                                </TableCell>
                                                                <TableCell>
                                                                    {project_by_id?.project?.payment_status === "1" ? (
                                                                        <span className="bg-dark text-sm bg-green-500 px-3 py-1 rounded-xl text-white shadow">
                                                                            Paid
                                                                        </span>
                                                                    ) : (
                                                                        <span className="bg-dark text-sm bg-red-500 px-3 py-1 rounded-xl text-white shadow">
                                                                            Unpaid
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <div className="client_po my-5">
                                        <h2 className="text-black text-xl font-bold shadow mb-3 bg-whitesmoke p-3 mx-5 capitalize font-merri">
                                            Invoice Details
                                        </h2>
                                        <div className="px-5">
                                            <Table className="text-black">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[100px]">Sl No</TableHead>
                                                        <TableHead>Invoice No :</TableHead>
                                                        {project_by_id?.project?.other_members_id
                                                            ?.split(",")
                                                            ?.map(Number)
                                                            ?.includes(userId) ? null : (
                                                            <TableHead>
                                                                Invoice Amount (pre gst) :
                                                            </TableHead>
                                                        )}
                                                        {project_by_id?.project?.other_members_id
                                                            ?.split(",")
                                                            ?.map(Number)
                                                            ?.includes(userId) ? null : (
                                                            <TableHead>
                                                                Invoice Amount (with gst) :
                                                            </TableHead>
                                                        )}

                                                        <TableHead>Invoice Date :</TableHead>
                                                        <TableHead>Invoice attachment :</TableHead>
                                                        <TableHead>Invoice details :</TableHead>
                                                        <TableHead>Created By :</TableHead>
                                                        <TableHead>Updated By :</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {project_by_id?.invoice?.map((item, idx) => (
                                                        <TableRow key="item.id">
                                                            <TableCell>{idx + 1}</TableCell>
                                                            <TableCell>{item?.invoice_no}</TableCell>
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableCell>{item?.invoice_amount_pre_gst}</TableCell>
                                                            )}
                                                            {project_by_id?.project?.other_members_id
                                                                ?.split(",")
                                                                ?.map(Number)
                                                                ?.includes(userId) ? null : (
                                                                <TableCell>{item?.invoice_amount_with_gst}</TableCell>
                                                            )}

                                                            <TableCell>
                                                                {item?.invoice_date?.slice(0, 10)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item?.invoice_img ?
                                                                    <a
                                                                        href={item?.invoice_img}
                                                                        target="_blank"
                                                                        className="border border-blue-500 text-blue-500 py-1 px-2 rounded-xl"
                                                                    >
                                                                        View
                                                                    </a> : "No attachment"}
                                                            </TableCell>

                                                            <TableCell>{item?.invoice_details}</TableCell>
                                                            <TableCell>{item?.created_by_name}</TableCell>
                                                            <TableCell>{item?.updated_by_name}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </>





                        ) : (
                            <EditInvoice invoice={invoice} /> // Add or edit the invoice information here
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* Image Modal (Lightbox) */}
            <Dialog open={imageModalOpen} onOpenChange={() => setImageModalOpen(false)}>
                <DialogContent className="p-0">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Invoice Image
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
                        <img
                            src={imageSrc}
                            alt="Original Invoice"
                            className="w-full h-auto object-contain"
                        />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewInvoice;
