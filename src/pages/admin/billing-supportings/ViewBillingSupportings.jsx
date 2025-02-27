import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useContext, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditBillingSupportings from "./EditBillingSupportings";

const ViewBillingSupportings = ({ billingSupportings, add_or_edit }) => {
  const { modal, setModal } = useContext(dialogOpenCloseContext);
  const [imageModalOpen, setImageModalOpen] = useState(false); // state to control image modal visibility
  const [fileSrc, setFileSrc] = useState(null); // state to store the file source (image or PDF)

  const handleFileClick = (src) => {
    setFileSrc(src); // set the file source to the clicked file
    setImageModalOpen(true); // open the file modal (image or PDF)
  };

  return (
    <>
      <Dialog open={modal}>
        <DialogContent className="pb-5">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold font-merri">
              Billing Supportings {add_or_edit === "view" ? "Details" : "Edit"}
            </DialogTitle>
            <DialogClose
              asChild
              onClick={() => {
                setModal(false);
              }}
              className="text-black text-2xl cursor-pointer"
            >
              <MdOutlineClose />
            </DialogClose>
          </DialogHeader>
          <DialogDescription>
            {add_or_edit === "view" ? (
              <Table className="text-black">
                <TableBody className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 p-5">
                  {/* Directly displaying fields by key name */}

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Center Vehicle Hire Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.center_vehicle_hire_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.center_vehicle_hire_bill ===
                        "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      )}
                      {billingSupportings?.center_vehicle_hire_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.center_vehicle_hire_img
                            )
                          }
                        >
                          {billingSupportings.center_vehicle_hire_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.center_vehicle_hire_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.center_vehicle_hire_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Manpower Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.manpower_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.manpower_bill === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.manpower_bill_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.manpower_bill_img
                            )
                          }
                        >
                          {billingSupportings.manpower_bill_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.manpower_bill_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.manpower_bill_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Gift Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.gift_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.gift_bill === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.gift_bill_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.gift_bill_img)
                          }
                        >
                          {billingSupportings.gift_bill_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.gift_bill_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.gift_bill_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Billing PPT:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.billing_ppt === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.billing_ppt === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.billing_ppt_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.billing_ppt_img)
                          }
                        >
                          {billingSupportings.billing_ppt_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.billing_ppt_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.billing_ppt_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">Report:</TableCell>
                    <TableCell>
                      {billingSupportings?.report === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.report === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}

                      {billingSupportings?.report_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.report_img)
                          }
                        >
                          {billingSupportings.report_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.report_img_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.report_img_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Day Wise Log Book */}

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Day Wise Log Book:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.day_wise_log_book === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.day_wise_log_book === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.day_wise_log_book_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.day_wise_log_book_img
                            )
                          }
                        >
                          {billingSupportings.day_wise_log_book_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.day_wise_log_book_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.day_wise_log_book_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Day Wise Meter Console */}

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Day Wise Meter Console:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.day_wise_meter_console === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.day_wise_meter_console === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.day_wise_meter_console_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.day_wise_meter_console_img
                            )
                          }
                        >
                          {billingSupportings.day_wise_meter_console_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.day_wise_meter_console_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.day_wise_meter_console_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* No Objection Certificate */}

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      No Objection Certificate:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.no_objection_certificate === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.no_objection_certificate ===
                        "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.no_objection_certificate_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.no_objection_certificate_img
                            )
                          }
                        >
                          {billingSupportings.no_objection_certificate_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.no_objection_certificate_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.no_objection_certificate_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Snacks Bill */}

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Snacks Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.snacks_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.snacks_bill === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.snacks_bill_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.snacks_bill_img)
                          }
                        >
                          {billingSupportings.snacks_bill_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.snacks_bill_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.snacks_bill_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Element Wise Photo:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.element_wise_photo === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.element_wise_photo === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.element_wise_photo_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.element_wise_photo_img
                            )
                          }
                        >
                          {billingSupportings.element_wise_photo_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.element_wise_photo_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.element_wise_photo_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Nagar Nigan:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.nagar_nigan === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.nagar_nigan === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.nagar_nigan_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.nagar_nigan_img)
                          }
                        >
                          {billingSupportings.nagar_nigan_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.nagar_nigan_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.nagar_nigan_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Fuel Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.fuel_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.fuel_bill === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.fuel_bill_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.fuel_bill_img)
                          }
                        >
                          {billingSupportings.fuel_bill_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.fuel_bill_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.fuel_bill_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Customer Gift:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.customer_gift === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.customer_gift === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.customer_gift_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.customer_gift_img
                            )
                          }
                        >
                          {billingSupportings.customer_gift_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}

                      {billingSupportings?.customer_gift_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.customer_gift_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Route Plan:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.route_plan === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.route_plan === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.route_plan_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.route_plan_img)
                          }
                        >
                          {billingSupportings.route_plan_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.route_plan_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.route_plan_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Approval Copy:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.approvel_copy === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.approvel_copy === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.approvel_copy_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.approvel_copy_img
                            )
                          }
                        >
                          {billingSupportings.approvel_copy_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.approvel_copy_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.approvel_copy_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">PO:</TableCell>
                    <TableCell>
                      {billingSupportings?.po === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.po === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.po_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.po_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Wayforward Learning:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.wayforward_learning === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.wayforward_learning === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.wayforward_learning_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.wayforward_learning_img
                            )
                          }
                        >
                          {billingSupportings.wayforward_learning_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}

                      {billingSupportings?.wayforward_learning_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.wayforward_learning_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Courier Delivery Challan:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.courier_delivery_challan === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.courier_delivery_challan ===
                        "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.courier_delivery_challan_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.courier_delivery_challan_img
                            )
                          }
                        >
                          {billingSupportings.courier_delivery_challan_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}

                      {billingSupportings?.courier_delivery_challan_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.courier_delivery_challan_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Transport Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.transport_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.transport_bill === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.transport_bill_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.transport_bill_img
                            )
                          }
                        >
                          {billingSupportings.transport_bill_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.transport_bill_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.transport_bill_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Anocher Bill:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.anocher_bill === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.anocher_bill === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.anocher_bill_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(billingSupportings.anocher_bill_img)
                          }
                        >
                          {billingSupportings.anocher_bill_img.endsWith(".pdf")
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}

                      {billingSupportings?.anocher_bill_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.anocher_bill_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between">
                    <TableCell className="font-bold text-lg">
                      Any Other Supporting:
                    </TableCell>
                    <TableCell>
                      {billingSupportings?.any_other_supporting === "1" ? (
                        <span className="bg-green-500 px-5 py-1 rounded-xl text-white font-semibold inline-block">
                          Yes
                        </span>
                      ) : billingSupportings?.any_other_supporting === "" ? (
                        <span className="bg-black px-5 py-1 rounded-xl text-white font-semibold">
                          Not Applicable
                        </span>
                      ) : (
                        <span className="bg-red-500 px-5 py-1 rounded-xl text-white font-semibold">
                          No
                        </span>
                      )}
                      {billingSupportings?.any_other_supporting_img && (
                        <button
                          className="text-blue-500 ms-5"
                          onClick={() =>
                            handleFileClick(
                              billingSupportings.any_other_supporting_img
                            )
                          }
                        >
                          {billingSupportings.any_other_supporting_img.endsWith(
                            ".pdf"
                          )
                            ? "View PDF"
                            : "View Image"}
                        </button>
                      )}
                      {billingSupportings?.any_other_supporting_comment && (
                        <p className="my-5 text-end">
                          <strong>Remarks :</strong>{" "}
                          {billingSupportings?.any_other_supporting_comment}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <EditBillingSupportings billingSupportings={billingSupportings} /> // You can add your edit component here
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* File Modal (for image or PDF) */}
      <Dialog
        open={imageModalOpen}
        onOpenChange={() => setImageModalOpen(false)}
      >
        <DialogContent className="p-0">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold font-merri">
              {fileSrc?.endsWith(".pdf")
                ? "Billing Supportings PDF"
                : "Billing Supportings Image"}
            </DialogTitle>
            <DialogClose
              asChild
              onClick={() => {
                setImageModalOpen(false);
              }}
              className="text-black text-2xl cursor-pointer"
            >
              <MdOutlineClose />
            </DialogClose>
          </DialogHeader>
          <DialogDescription className="p-5">
            {/* Check if the file is a PDF or image and render accordingly */}
            {fileSrc?.endsWith(".pdf") ? (
              <iframe
                src={fileSrc}
                width="100%"
                height="500"
                title="Billing Supportings PDF"
                className="border-none"
              />
            ) : (
              <img
                src={fileSrc}
                alt="Billing Supportings"
                className="w-full h-auto object-contain"
              />
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewBillingSupportings;
