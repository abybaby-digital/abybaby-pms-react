import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { MdOutlineClose } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditPaymentRequisition = ({ payment }) => {
    const [formData, setFormData] = useState({
        project_name: "",
        branch_name: "",
        vendor_name: "",
        requisition_amount: "",
        date_of_payments: "",
        requisition_remarks: "",
        status: "",
        requisition_img: "",
    });

    useEffect(() => {
        // Set the form fields when the component is first mounted or payment data is updated
        if (payment) {
            setFormData({
                project_name: payment.project_name || "",
                branch_name: payment.branch_name || "",
                vendor_name: payment.vendor_name || "",
                requisition_amount: payment.requisition_amount || "",
                date_of_payments: payment.date_of_payments || "",
                requisition_remarks: payment.requisition_remarks || "",
                status: payment.status || "",
                requisition_img: payment.requisition_img || "",
            });
        }
    }, [payment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic, e.g., send the updated data to the server
        console.log("Updated Payment Requisition Data:", formData);
    };

    return (
        <Dialog open={true}>
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        Edit Payment Requisition
                    </DialogTitle>
                    <DialogClose
                        asChild
                        onClick={() => { }}
                        className="text-black text-2xl cursor-pointer"
                    >
                        <MdOutlineClose />
                    </DialogClose>
                </DialogHeader>
                <DialogDescription>
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 p-5">
                            <div>
                                <label className="font-bold text-lg">Project Name:</label>
                                <Input
                                    type="text"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="font-bold text-lg">Branch Name:</label>
                                <Input
                                    type="text"
                                    name="branch_name"
                                    value={formData.branch_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="font-bold text-lg">Vendor Name:</label>
                                <Input
                                    type="text"
                                    name="vendor_name"
                                    value={formData.vendor_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="font-bold text-lg">Requisition Amount:</label>
                                <Input
                                    type="number"
                                    name="requisition_amount"
                                    value={formData.requisition_amount}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="font-bold text-lg">Date of Payment:</label>
                                <Input
                                    type="date"
                                    name="date_of_payments"
                                    value={formData.date_of_payments}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="font-bold text-lg">Requisition Remarks:</label>
                                <Textarea
                                    name="requisition_remarks"
                                    value={formData.requisition_remarks}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="font-bold text-lg">Status:</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="1">Paid</option>
                                    <option value="0">Pending</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-lg">Requisition Image URL:</label>
                                <Input
                                    type="text"
                                    name="requisition_img"
                                    value={formData.requisition_img}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4 mt-4">
                            <Button type="submit">Save Changes</Button>
                            <Button
                                type="button"
                                onClick={() => { }}
                                className="bg-gray-300 text-black"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default EditPaymentRequisition;
