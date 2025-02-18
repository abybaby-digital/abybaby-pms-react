import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import axios from "axios";
import { approvePaymentRequisition } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";

const RequisitionApproval = ({
  payment,
  role_id,
  role_name,
  veto_power,
  approval_status,
  pr_id,
}) => {
  const { modal, setModal } = useContext(dialogOpenCloseContext);
  const [approveAmount, setApproveAmount] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const handleApprove = async (
    token,
    payment_requition_id,
    approved_amount,
    status
  ) => {
    setLoading(true);
    const response = await approvePaymentRequisition(
      token,
      payment_requition_id,
      approved_amount,
      status
    );
    if (response.status === 200 || response.status === 201) {
      toast.success("Payment requisition approved successfully!");
      setModal(false);
      setLoading(false);
    } else {
      toast.error("Unable to change status");
    }
  };

  const handleReject = async (
    token,
    payment_requition_id,
    approved_amount,
    status
  ) => {
    setLoading(true);
    const response = await approvePaymentRequisition(
      token,
      payment_requition_id,
      approved_amount,
      status
    );
    if (response.status === 200 || response.status === 201) {
      toast.success("Payment requisition rejected successfully!");
      setModal(false);
      setLoading(false);
    } else {
      toast.error("Unable to change status");
    }
  };
  return (
    <>
      {/* FOR ADMIN */}
      {role_id === 1 &&
      veto_power === "1" &&
      payment?.accountent_approve_status !== "1" ? (
        approval_status === "0" ? (
          <TableRow className="bg-whitesmoke lg:p-5 rounded-3xl shadow-lg">
            <TableCell className="font-bold text-2xl block text-center">
              Your Approval as {role_name}
            </TableCell>
            <TableCell className="flex lg:flex-row flex-col justify-center gap-5">
              <div className="approve-reject-button ">
                <button
                  type="button"
                  onClick={() => handleApprove(token, pr_id, "", "1")}
                  className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                >
                  Approve
                </button>
              </div>
              <div className="approve-reject-button">
                <button
                  type="button"
                  onClick={() => handleReject(token, pr_id, "", "2")}
                  className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                >
                  Reject
                </button>
              </div>
            </TableCell>
          </TableRow>
        ) : approval_status === "2" ? (
          <div className="approved pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Approval as {role_name}
            </p>
            <button
              type="button"
              onClick={() => handleApprove(token, pr_id, "", "1")}
              className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
            >
              Approve
            </button>
          </div>
        ) : (
          <div className="rejected pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Approval as {role_name}
            </p>
            <button
              type="button"
              onClick={() => handleReject(token, pr_id, "", "2")}
              className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
            >
              Reject
            </button>
          </div>
        )
      ) : role_id === 2 &&
        veto_power === "1" &&
        payment?.accountent_approve_status !== "1" ? (
        approval_status === "0" ? (
          <TableRow className="bg-whitesmoke lg:p-5 rounded-3xl shadow-lg">
            <TableCell className="font-bold text-2xl block text-center">
              Your Approval as {role_name}
            </TableCell>
            <TableCell className="flex lg:flex-row flex-col justify-center gap-5">
              <div className="approve-reject-button ">
                <button
                  type="button"
                  onClick={() => handleApprove(token, pr_id, "", "1")}
                  className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                >
                  Approve
                </button>
              </div>
              <div className="approve-reject-button">
                <button
                  type="button"
                  onClick={() => handleReject(token, pr_id, "", "2")}
                  className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                >
                  Reject
                </button>
              </div>
            </TableCell>
          </TableRow>
        ) : approval_status === "2" ? (
          <div className="approved pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Approval as {role_name}
            </p>
            <button
              type="button"
              onClick={() => handleApprove(token, pr_id, "", "1")}
              className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
            >
              Approve
            </button>
          </div>
        ) : (
          <div className="rejected pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Approval as {role_name}
            </p>
            <button
              type="button"
              onClick={() => handleReject(token, pr_id, "", "2")}
              className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
            >
              Reject
            </button>
          </div>
        )
      ) : role_id === 3 &&
        veto_power === "1" &&
        payment?.accountent_approve_status !== "1" ? (
        approval_status === "0" ? (
          <TableRow className="bg-whitesmoke lg:p-5 rounded-3xl shadow-lg">
            <TableCell className="font-bold text-2xl block text-center">
              Your Approval as {role_name}
            </TableCell>
            <TableCell className="flex lg:flex-row flex-col justify-center gap-5">
              <div className="approve-reject-button ">
                <button
                  type="button"
                  onClick={() => handleApprove(token, pr_id, "", "1")}
                  className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                >
                  Approve
                </button>
              </div>
              <div className="approve-reject-button">
                <button
                  type="button"
                  onClick={() => handleReject(token, pr_id, "", "2")}
                  className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                >
                  Reject
                </button>
              </div>
            </TableCell>
          </TableRow>
        ) : approval_status === "2" ? (
          <div className="approved pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Approval as {role_name}
            </p>
            <button
              type="button"
              onClick={() => handleApprove(token, pr_id, "", "1")}
              className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
            >
              Approve
            </button>
          </div>
        ) : (
          <div className="rejected pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Approval as {role_name}
            </p>
            <button
              type="button"
              onClick={() => handleReject(token, pr_id, "", "2")}
              className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
            >
              Reject
            </button>
          </div>
        )
      ) : role_id === 4 ? (
        approval_status === "0" &&
        payment?.purchase_approve_status === "1" &&
        payment?.finance_approve_status === "1" &&
        payment?.admin_approve_status === "1" ? (
          <TableRow className="bg-whitesmoke lg:p-5 rounded-3xl shadow-lg">
            <TableCell className="font-bold text-2xl block text-center">
              Your Action as {role_name}
            </TableCell>
            <TableCell className="flex flex-col justify-center gap-5">
              <div className="flex-1">
                <label htmlFor="approved_amount">Approved Amount</label>
                <input
                  type="number"
                  name="approved_amount"
                  id="approved_amount"
                  onChange={(e) => {
                    setApproveAmount(e.target.value);
                    console.log(payment);
                  }}
                />
                {+approveAmount > Math.floor(payment?.requisition_amount) ? (
                  <p className="text-sm text-red-500 my-2">
                    Amount cannot be greater than {payment?.requisition_amount}
                  </p>
                ) : null}
              </div>
              <div className="flex justify-center gap-3">
                <div className="approve-reject-button">
                  <button
                    type="button"
                    onClick={() =>
                      handleApprove(token, pr_id, approveAmount, "1")
                    }
                    disabled={
                      approveAmount === null ||
                      approveAmount === "" ||
                      +approveAmount > Math.floor(payment?.requisition_amount)
                    }
                    className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                  >
                    Paid
                  </button>
                </div>
                <div className="approve-reject-button">
                  <button
                    type="button"
                    onClick={() => handleReject(token, pr_id, "", "2")}
                    className="bg-red-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ) : approval_status === "0" ? (
          <div className="approved pt-3 bg-whitesmoke text-center">
            <p className="text-2xl my-2 font-bold">
              Your Action as {role_name}
            </p>
            <span className="text-orange-500 active:scale-95 w-[150px] rounded-xl  inline-block border border-dashed border-orange-500 p-3">
              Waiting for final approval
            </span>
          </div>
        ) : approval_status === "1" ? (
          <div className="approved pt-3 bg-whitesmoke text-center">
            <span className="text-green-500 active:scale-95 w-[150px] rounded-xl text-lg  inline-block border border-dashed border-green-500 p-3">
              Payment Done
            </span>
          </div>
        ) : approval_status === "2" ? (
          <div className="approved pt-3 bg-whitesmoke text-center flex flex-col items-center justify-center">
            <span className="text-red-500 active:scale-95 w-[150px] rounded-xl text-lg  inline-block border border-dashed border-red-500 p-3">
              Payment Rejected
            </span>
            <TableRow className="bg-whitesmoke lg:p-5 rounded-3xl">
              <TableCell className="font-bold text-2xl block text-center">
                Your Action as {role_name}
              </TableCell>
              <TableCell className="flex lg:flex-row flex-col justify-center gap-5">
                <div className="approve-reject-button ">
                  <button
                    type="button"
                    onClick={() => handleApprove(token, pr_id, "", "1")}
                    className="bg-green-500 active:scale-95 w-[150px] rounded-xl text-xl text-white p-3"
                  >
                    Paid
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </div>
        ) : null
      ) : null}
    </>
  );
};

export default RequisitionApproval;
