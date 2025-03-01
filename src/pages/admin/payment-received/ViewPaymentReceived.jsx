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

import EditPaymentReceived from "./EditPaymentReceived"; // Assuming you have an EditPaymentReceived component
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../../services/api";

const ViewPaymentReceived = ({ payment, add_or_edit }) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user?.id);
    const { modal, setModal } = useContext(dialogOpenCloseContext);
    const [imageModalOpen, setImageModalOpen] = useState(false); // state to control image modal visibility
    const [imageSrc, setImageSrc] = useState(null); // state to store the image source

    const handleImageClick = (src) => {
        setImageSrc(src); // set the image source to the clicked image
        setImageModalOpen(true); // open the image modal
    };

    const [project_by_id, setProjectById] = useState(null);



    const { data: projectById, isLoading } = useQuery({
        queryKey: ["project-view-by-id", payment?.project_id],
        queryFn: async () => {
            return await getProjectById(token, payment?.project_id);
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
                            Payment Received {add_or_edit === "view" ? "Details" : "Edit"}
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
                                        <h2 className="text-black text-2xl font-bold bg-whitesmoke text-center p-3 mx-5 capitalize font-merri">
                                            Payment Received
                                        </h2>
                                        <div className="px-5">
                                            <Table className="text-black">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[100px]">Sl No</TableHead>
                                                        <TableHead>Payment Receipt No</TableHead>
                                                        <TableHead>Payment Received Amount</TableHead>
                                                        <TableHead>Payment Received Date</TableHead>
                                                        <TableHead>Payment Received attachment</TableHead>
                                                        <TableHead>Payment Received details</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {project_by_id?.payment_received?.map(
                                                        (item, idx) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell>{idx + 1}</TableCell>
                                                                <TableCell>{item?.received_no}</TableCell>
                                                                <TableCell>{item?.received_amount}</TableCell>
                                                                <TableCell>
                                                                    {item?.received_date?.slice(0, 10)}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item?.received_img ? <a
                                                                        href={item?.received_img}
                                                                        target="_blank"
                                                                        className="border border-blue-500 text-blue-500 py-1 px-2 rounded-xl"
                                                                    >
                                                                        View
                                                                    </a> : "No attachment"}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {item?.received_details}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </>
                        ) : (
                            <EditPaymentReceived payment={payment} /> // Add or edit the payment information here
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* Image Modal (Lightbox) */}
            <Dialog open={imageModalOpen} onOpenChange={() => setImageModalOpen(false)}>
                <DialogContent className="p-0">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold font-merri">
                            Receipt Image
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
                            alt="Original Receipt"
                            className="w-full h-auto object-contain"
                        />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ViewPaymentReceived;
