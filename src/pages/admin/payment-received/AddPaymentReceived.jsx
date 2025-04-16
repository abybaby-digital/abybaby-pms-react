import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminHead from "../../../components/common/AdminHead";
import ButtonLoader from "../../../components/common/ButtonLoader";
import {
  addPaymentReceived,
  getFYList,
  getInvoiceNumberByProjectId,
  getProjectList,
} from "../../../services/api"; // Import the API function for projects
import { useState, useEffect } from "react"; // Import useState
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddPaymentReceived() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [selectedInvoice, setInvoice] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [fincYear, setFincYear] = useState(null);

  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  // console.log("project id", projectId);

  // State to hold image preview URL
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch projects for the project dropdown
  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list", fincYear],
    queryFn: async () => {
      return await getProjectList(token, null, null, null, fincYear, null, null, 2, 1, 0); // Assume this function fetches the list of projects
    },
  });

  const receivedNo = watch("received_no");
  console.log("rev", typeof receivedNo);
  const receivedAmount = watch("received_amount");

  // Fetch projects for the project dropdown
  const { data: invoiceNumberList = [], isLoading: isInvoiceLoading } =
    useQuery({
      queryKey: ["invoice-number-list", projectId],
      queryFn: async () => {
        return await getInvoiceNumberByProjectId(token, projectId); // Assume this function fetches the list of projects
      },
      enabled: Boolean(projectId),
    });

  console.log(invoiceNumberList);

  useEffect(() => {
    if (invoiceNumberList) {
      const selectedInv = invoiceNumberList?.response?.find(
        (item) => item.invoice_no === receivedNo
      );
      if (selectedInv) {
        setInvoice(selectedInv);
      }
    }
  }, [projectId, receivedNo]);

  console.log(+selectedInvoice?.invoice_amount_with_gst);
  console.log(+selectedInvoice?.invoice_amount_with_gst);

  const addPaymentMutation = useMutation({
    mutationFn: async (data) => {
      return await addPaymentReceived(
        token,
        data.project_id,
        data.received_no,
        data.received_amount,
        data.received_date,
        data.received_img, // File input
        data.received_details,
        +fincYear,
        1
      );
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Payment received added successfully!");
        navigate("/payment-receipt-list");
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to add payment: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    addPaymentMutation.mutate(data);
  };

  const checkFinancialYear = () => {
    if (fincYear === null || fincYear === "NA") {
      toast.error("Choose Financial Year First !!");
    }
  }

  // Handle image file input change and display preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Set the preview image URL
    }
  };

  // console.log("finc", fincYear);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Payment Received" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto 2xl:w-[50%] w-full overflow-hidden"
          >
            {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
              ADD PAYMENT RECEIVED
            </h2> */}
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                ADD PAYMENT RECEIVED
              </h2>
              <div className="finance-year-filter">
                <form action="#" className="flex items-center gap-3">
                  <label htmlFor="financeYear" className="text-nowrap m-0">Select Financial Year</label>
                  <select
                    name="financeYear"
                    id="financeYear"
                    className="block"
                    onChange={(e) => {
                      setFincYear(e.target.value);
                      // console.log(e.target.value); 
                    }}
                  >
                    {/* <option value="NA">--Select--</option> */}
                    {fincYearList?.response?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.financial_year}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>

            {
              isLoadingProjects ?
                <FormSubmitLoader loading_msg="" />
                :
                <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                  {/* Project ID Dropdown */}
                  <div className="form-group">
                    <label htmlFor="project_id">
                      Project ID <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="project_id"
                      {...register("project_id", {
                        required: "Project ID is required",
                      })}
                      className="block w-full"
                      onChange={(e) => setProjectId(e.target.value)}
                      // disabled={fincYear === null || fincYear === "NA"}
                    >
                      <option value="">Select Project</option>
                      {isLoadingProjects ? (
                        <option value="#">Loading Projects, Please wait...</option>
                      ) : (
                        projectList?.response?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {`${project.project_number} - ${project.project_name}`}
                          </option>
                        ))
                      )}
                    </select>
                    {errors.project_id && (
                      <span className="text-red-600 text-sm">
                        {errors.project_id.message}
                      </span>
                    )}
                  </div>

                  {/* Invoice No Dropdown */}
                  <div className="form-group">
                    <label htmlFor="received_no">
                      Invoice No<span className="text-red-600">*</span>
                    </label>
                    <select
                      id="received_no"
                      {...register("received_no", {
                        required: "Invoice No is required",
                      })}
                      className="block w-full"
                    >
                      <option value="">Select Invoice No</option>
                      {isInvoiceLoading ? (
                        <option value="#">Loading...</option>
                      ) : (
                        invoiceNumberList?.response?.map((invoice_no) => (
                          <option key={invoice_no.id} value={invoice_no.invoice_no}>
                            {invoice_no.invoice_no}
                          </option>
                        ))
                      )}
                    </select>
                    {errors.received_no && (
                      <span className="text-red-600 text-sm">
                        {errors.received_no.message}
                      </span>
                    )}
                  </div>

                  {/* Received No Input */}
                  {/* <div className="form-group">
                <label htmlFor="received_no">Received No <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  id="received_no"
                  {...register("received_no", { required: "Received No is required" })}
                  className="block"
                  placeholder="Enter Received No"
                />
                {errors.received_no && <span className="text-red-600 text-sm">{errors.received_no.message}</span>}
              </div> */}

                  {/* Invoice Amount Input */}
                  <div className="form-group">
                    <label htmlFor="invoice_amount_pre_gst">
                      Invoice Amount Pre GST
                    </label>
                    <input
                      type="number"
                      id="invoice_amount_pre_gst"
                      {...register("invoice_amount_pre_gst")}
                      className="block"
                      disabled
                      value={selectedInvoice?.invoice_amount_pre_gst}
                      placeholder="Enter Amount"
                    />

                  </div>

                  {/* Invoice Amount Input */}
                  <div className="form-group">
                    <label htmlFor="invoice_amount_with_gst">
                      Invoice Amount With GST{" "}
                    </label>
                    <input
                      type="number"
                      id="invoice_amount_with_gst"
                      {...register("invoice_amount_with_gst")}
                      className="block"
                      disabled
                      value={selectedInvoice?.invoice_amount_with_gst}
                      placeholder="Enter Amount"
                    />

                  </div>

                  {/* Received Amount Input */}
                  <div className="form-group">
                    <label htmlFor="received_amount">
                      Received Amount <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="received_amount"
                      {...register("received_amount", {
                        max: {
                          value: +selectedInvoice?.invoice_amount_with_gst - +selectedInvoice?.received_amount_with_gst,
                          message: `Received amount should not be greater than ${+selectedInvoice?.invoice_amount_with_gst - +selectedInvoice?.received_amount_with_gst}`,
                        },
                      })}
                      className="block"
                      placeholder="Enter Amount"
                    />
                    {errors.received_amount && (
                      <span className="text-red-600 text-sm">
                        {errors.received_amount.message}
                      </span>
                    )}
                  </div>

                  {/* Received Date Input */}
                  <div className="form-group">
                    <label htmlFor="received_date">
                      Received Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="received_date"
                      {...register("received_date", {
                        required: "Received Date is required",
                      })}
                      className="block"
                    />
                    {errors.received_date && (
                      <span className="text-red-600 text-sm">
                        {errors.received_date.message}
                      </span>
                    )}
                  </div>

                  {/* Upload Receipt */}
                  <div className="form-group lg:col-span-2">
                    <label htmlFor="received_img">Upload Receipt (Optional)</label>
                    <input
                      type="file"
                      id="received_img"
                      accept="image/*"
                      {...register("received_img")}
                      className="block border w-full rounded-lg p-3"
                      onChange={handleImageChange} // Add this line
                    />
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-2 text-center lg:col-span-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-[350px] h-[350px] rounded-lg inline-block"
                      />
                    </div>
                  )}

                  {/* Payment Details */}
                  <div className="form-group lg:col-span-2">
                    <label htmlFor="received_details">Received Details</label>
                    <textarea
                      id="received_details"
                      {...register("received_details")}
                      className="block border w-full rounded-lg p-3"
                      placeholder="Enter Payment Details"
                    />
                  </div>
                </div>

            }

            {/* LOADER */}

            {addPaymentMutation.isPending ? (
              <FormSubmitLoader loading_msg="Creating Payment Receipt..." />
            ) : null}

            <div className="card-footer text-center bg-gray-100 py-5">
              <button
                type="submit"
                onClick={() => { checkFinancialYear() }}
                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                disabled={addPaymentMutation.isPending}
              >
                {addPaymentMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
