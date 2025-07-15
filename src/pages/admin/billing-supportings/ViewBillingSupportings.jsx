import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { IoIosImage } from "react-icons/io";
import { FaFileZipper } from "react-icons/fa6";
import { RiFilePpt2Fill } from "react-icons/ri";
import { SiGoogledocs } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeXlsx } from "react-icons/bs";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useContext, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditBillingSupportings from "./EditBillingSupportings";

const ViewBillingSupportings = ({ billingSupportings, add_or_edit }) => {
  const { modal, setModal } = useContext(dialogOpenCloseContext);

  const getFileIcon = (url, size = 24) => {
    const extension = url.split('.').pop().split('?')[0].toLowerCase();

    switch (extension) {
      case 'pdf':
        return <FaFilePdf size={size} className="text-red-600" />;
      case 'doc':
      case 'docx':
        return <SiGoogledocs size={size} className="text-blue-600" />;
      case 'ppt':
      case 'pptx':
        return <RiFilePpt2Fill size={size} className="text-orange-600" />;
      case 'xls':
      case 'csv':
      case 'xlsx':
        return <BsFiletypeXlsx size={size} className="text-green-600" />;
      case 'zip':
      case 'rar':
      case '7z':
        return <FaFileZipper size={size} className="text-black" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'avif':
      case 'jfif':
        return <IoIosImage size={size} className="text-grey-600" />;

    }
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
                          No
                        </span>
                      )}
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.center_vehicle_hire_bill !== "0" && billingSupportings?.center_vehicle_hire_img && (
                          billingSupportings?.center_vehicle_hire_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.manpower_bill !== "0" && billingSupportings?.manpower_bill_img && (
                          billingSupportings?.manpower_bill_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.gift_bill !== "0" && billingSupportings?.gift_bill_img && (
                          billingSupportings?.gift_bill_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.billing_ppt !== "0" && billingSupportings?.billing_ppt_img && (
                          billingSupportings?.billing_ppt_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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

                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.report_img !== "0" && billingSupportings?.report_img && (
                          billingSupportings?.report_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.day_wise_log_book !== "0" && billingSupportings?.day_wise_log_book_img && (
                          billingSupportings?.day_wise_log_book_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.day_wise_meter_console !== "0" && billingSupportings?.day_wise_meter_console_img && (
                          billingSupportings?.day_wise_meter_console_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.no_objection_certificate !== "0" && billingSupportings?.no_objection_certificate_img && (
                          billingSupportings?.no_objection_certificate_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.snacks_bill !== "0" && billingSupportings?.snacks_bill_img && (
                          billingSupportings?.snacks_bill_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.element_wise_photo !== "0" && billingSupportings?.element_wise_photo_img && (
                          billingSupportings?.element_wise_photo_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.nagar_nigan !== "0" && billingSupportings?.nagar_nigan_img && (
                          billingSupportings?.nagar_nigan_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.fuel_bill !== "0" && billingSupportings?.fuel_bill_img && (
                          billingSupportings?.fuel_bill_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                     <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.customer_gift !== "0" && billingSupportings?.customer_gift_img && (
                          billingSupportings?.customer_gift_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>

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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.route_plan !== "0" && billingSupportings?.route_plan_img && (
                          billingSupportings?.route_plan_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.approvel_copy !== "0" && billingSupportings?.approvel_copy_img && (
                          billingSupportings?.approvel_copy_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.po !== "0" && billingSupportings?.po_img && (
                          billingSupportings?.po_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.wayforward_learning !== "0" && billingSupportings?.wayforward_learning_img && (
                          billingSupportings?.wayforward_learning_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>

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
                     <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.courier_delivery_challan !== "0" && billingSupportings?.courier_delivery_challan_img && (
                          billingSupportings?.courier_delivery_challan_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>

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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.transport_bill !== "0" && billingSupportings?.transport_bill_img && (
                          billingSupportings?.transport_bill_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
                     <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.anocher_bill !== "0" && billingSupportings?.anocher_bill_img && (
                          billingSupportings?.anocher_bill_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>

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
                      <div className="flex justify-center items-center gap-3 flex-wrap my-3">
                        {billingSupportings?.any_other_supporting !== "0" && billingSupportings?.any_other_supporting_img && (
                          billingSupportings?.any_other_supporting_img?.map((item) => (
                            <a href={item} target="_blank">
                              {getFileIcon(item)}
                            </a>
                          ))
                        )}
                      </div>
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
    </>
  );
};

export default ViewBillingSupportings;
