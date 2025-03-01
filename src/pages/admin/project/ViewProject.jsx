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
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { DialogClose } from "@radix-ui/react-dialog";
import { MdOutlineClose } from "react-icons/md";
import EditProject from "./EditProject"; // Assuming EditProject component exists
import { useQuery } from "@tanstack/react-query";
import { changeProjectPaymentStatus, getProjectById } from "../../../services/api";
import { useSelector } from "react-redux";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";
import axios from "axios";

const ViewProject = ({ project, add_or_edit }) => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);
  const roleId = useSelector((state) => state.auth.user?.role_id);
  const { modal, setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);

  const changePaymentStatus = async (projectId) => {
    try {
      const response = await changeProjectPaymentStatus(token, projectId);
      console.log(response);
    } catch (error) {
      console.error("Error changing payment status:", error);
      throw error;
    }
  };

  const [project_by_id, setProjectById] = useState(null);

  const { data: projectById, isLoading } = useQuery({
    queryKey: ["project-view-by-id", project.id, refetchList],
    queryFn: async () => {
      return await getProjectById(token, project.id);
    },
  });

  // console.log(token);
  // console.log(project);
  //   console.log(project_id);
  useEffect(() => {
    if (projectById) {
      setProjectById(projectById?.response);
      // console.log("project_by_id", project_by_id.invoice);
    }
  });

  return (
    <>
      <Dialog open={modal}>
        <DialogContent className=" pb-5">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold font-merri">
              Project {add_or_edit === "view" ? "Details" : "Edit"}
            </DialogTitle>
            <DialogClose
              onClick={() => {
                setModal(false);
              }}
              className="text-black text-2xl z-40 cursor-pointer"
            >
              <MdOutlineClose />
            </DialogClose>
          </DialogHeader>

          <DialogDescription>
            {add_or_edit === "view" ? (
              !isLoading ? (
                <>
                  <div className="project_data">
                    <Table className="text-black">
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
                            {project_by_id?.project?.vh_prefix_name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold text-lg">
                            Vertical Head Name:
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
                            {project?.billing_status === "1" ? (
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
                            {project?.payment_status === "1" ? (
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
                        {(roleId === 1 || roleId === 4) &&
                          (project?.payment_status === "0" && project?.billing_status === "1" && project_by_id?.project?.status === "2") &&
                          <TableRow className="col-span-3 flex flex-col items-center justify-center bg-whitesmoke py-2 rounded-lg ">
                            <TableCell className="font-bold text-lg">
                              To Change Project Payment Status Click here:
                            </TableCell>
                            <TableCell>
                              <button onClick={() => {
                                changePaymentStatus(project_by_id?.project?.id);
                                setRefetchList(!refetchList);
                                setModal(false);
                              }} className="bg-green-500 active:scale-95 py-2 px-5 rounded-lg text-white">Payment Done</button>
                            </TableCell>
                          </TableRow>}
                      </TableBody>
                    </Table>
                  </div>
                  {project_by_id?.client_po?.length > 0 && (
                    <div className="client_po my-5">
                      <h2 className="text-black text-2xl font-bold bg-whitesmoke text-center p-3 mx-5 capitalize font-merri">
                        Client Purchase order
                      </h2>
                      <div className="px-5">
                        <Table className="text-black">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Sl No</TableHead>

                              {project_by_id?.project?.other_members_id
                                ?.split(",")
                                ?.map(Number)
                                ?.includes(userId) ? null : (
                                <TableHead>
                                  Client PO amount ( pre GST )
                                </TableHead>
                              )}
                              {project_by_id?.project?.other_members_id
                                ?.split(",")
                                ?.map(Number)
                                ?.includes(userId) ? null : (
                                <TableHead>
                                  Client PO amount ( with GST )
                                </TableHead>
                              )}
                              <TableHead>Client PO date</TableHead>
                              {project_by_id?.project?.other_members_id
                                ?.split(",")
                                ?.map(Number)
                                ?.includes(userId) ? null : (
                                <TableHead>PO attachment</TableHead>
                              )}

                              <TableHead>Pament schedule days</TableHead>
                              <TableHead>PO details</TableHead>
                              <TableHead>PO created by</TableHead>
                              <TableHead>PO updated by</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {project_by_id?.client_po?.map((item, idx) => (
                              <TableRow key={item.id}>
                                <TableCell>{idx + 1}</TableCell>
                                {project_by_id?.project?.other_members_id
                                  ?.split(",")
                                  ?.map(Number)
                                  ?.includes(userId) ? null : (
                                  <TableCell>
                                    {item?.po_amount_pre_gst}
                                  </TableCell>
                                )}
                                {project_by_id?.project?.other_members_id
                                  ?.split(",")
                                  ?.map(Number)
                                  ?.includes(userId) ? null : (
                                  <TableCell>
                                    {item?.po_amount_with_gst}
                                  </TableCell>
                                )}

                                <TableCell>
                                  {item?.po_date?.slice(0, 10)}
                                </TableCell>

                                {project_by_id?.project?.other_members_id
                                  ?.split(",")
                                  ?.map(Number)
                                  ?.includes(userId) ? null : (
                                  <TableCell>
                                    {item?.po_img ?
                                      <a
                                        href={item?.po_img}
                                        target="_blank"
                                        className="border border-blue-500 text-blue-500 py-1 px-2 rounded-xl"
                                      >
                                        View
                                      </a> : "No attachment"
                                    }
                                  </TableCell>
                                )}

                                <TableCell>
                                  {item?.payment_schedule_days}
                                </TableCell>
                                <TableCell>
                                  {item?.project_order_details}
                                </TableCell>
                                <TableCell>
                                  {item?.created_by_name}
                                </TableCell>
                                <TableCell>
                                  {item?.updated_by_name}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {project_by_id?.invoice?.length > 0 && (
                    <div className="client_po my-5">
                      <h2 className="text-black text-2xl font-bold bg-whitesmoke text-center p-3 mx-5 capitalize font-merri">
                        Invoice
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
                              <TableRow key={item.id}>
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
                                    </a> : "No attachment"
                                  }
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
                  )}

                  {project_by_id?.payment_received?.length > 0 && (
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
                              <TableHead>Created By</TableHead>
                              <TableHead>Received Status</TableHead>
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
                                    {item?.received_img ?
                                      <a
                                        href={item?.received_img}
                                        target="_blank"
                                        className="border border-blue-500 text-blue-500 py-1 px-2 rounded-xl"
                                      >
                                        View
                                      </a> : "No attachment"
                                    }
                                  </TableCell>

                                  <TableCell>
                                    {item?.received_details}
                                  </TableCell>
                                  <TableCell>
                                    {item?.created_by_name}
                                  </TableCell>
                                  <TableCell>
                                    {item?.received_status === "1" ?
                                      <p className="border border-green-500 text-green-500 px-2 py-1 text-[12px] text-center rounded-xl">Full Paid</p> : item?.received_status === "2" ? <p className="border border-orange-500 text-orange-500 px-2 py-1 rounded-xl text-[12px] text-center text-nowrap">Partial Payment</p> : "..."

                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-2xl">Loading ...</p>
              )
            ) : (
              <EditProject project={project} />
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewProject;
