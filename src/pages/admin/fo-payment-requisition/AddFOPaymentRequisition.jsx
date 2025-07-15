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
  addPaymentRequisition,
  getProjectList,
  getBranchList,
  getVendorList,
  getProjectById,
  getFYList,
  addFOPaymentRequisition,
  FOList,
  FOListByProjectId,
} from "../../../services/api";
import { useState, useEffect } from "react";
import FormSubmitLoader from "../../../components/common/FormSubmitLoader";

export default function AddFOPaymentRequisition() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();



  // FY LIST CALL
  const { data: fincYearList } = useQuery({
    queryKey: ["finc-year-list", token],
    queryFn: async () => {
      return await getFYList(token);
    },
  });

  console.log(fincYearList?.response[0].id);

  const [fincYear, setFincYear] = useState(null);


  const requisitionAmount = watch("requisition_amount");
  const requisitionAmountReEnter = watch("requisition_amount_re_enter");


  console.log(requisitionAmount);
  console.log(requisitionAmountReEnter);

  // console.log("pr", watch("project_id"));

  // State to hold vendor details
  const [selectedVendor, setSelectedVendor] = useState(null);
  // State for file preview (image or PDF)
  const [filePreview, setFilePreview] = useState(null);

  const [singlePorj, setSingleProj] = useState(null);

  const project_id = watch("project_id");
  const entered_requisition_amount = watch("requisition_amount");
  console.log(project_id);

  const { data: projectById } = useQuery({
    queryKey: ["single-project", project_id],
    queryFn: async () => await getProjectById(token, project_id)
  })




  const project_amount = Math.floor(+singlePorj?.project_amount);
  const requisition_amount = Math.floor(+singlePorj?.requition_amount);

  console.log(entered_requisition_amount);
  console.log(project_amount);

  // DATE SELECTION LOGIC
  // Inside your AddPaymentRequisition component
  const [minDate, setMinDate] = useState("");

  // Effect hook to calculate the minimum date based on current time
  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // If the current hour is greater than or equal to 16 (4 PM), set the minimum date to tomorrow
    if (currentHour >= 16) {
      currentDate.setDate(currentDate.getDate() + 1); // Set to the next day
    }

    // Format the date to YYYY-MM-DD format
    const formattedDate = currentDate.toISOString().split("T")[0];
    setMinDate(formattedDate); // Set the minimum date to the next day (or today if before 4 PM)
  }, []);



  // Fetch projects, branches, and vendors from APIs
  const { data: projectList = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ["project-list", fincYear],
    queryFn: async () => {
      return await getProjectList(token, null, null, null, fincYear, null, null, null, null, null);
    },
  });


  useEffect(() => {
    setSingleProj(projectById?.response?.project)
  }, [projectById])

  const { data: foList = [], isLoading: isLoadingFo } = useQuery({
    queryKey: ["fo-list-by-project-id", +project_id],
    queryFn: async () => {
      return await FOListByProjectId(token, +project_id);
    },
    enabled: !!project_id
  });

  console.log("fo list", foList);

  // Add Payment Requisition Mutation
  const addFOPaymentMutation = useMutation({
    mutationFn: async (data) => {
      return await addFOPaymentRequisition(
        token,
        +data.project_id,
        data.requisition_amount,
        data.fo_requisition_img,
        data.requisition_remarks,
        +data.assign_fo_id,
      );
    },
    onSuccess: (response) => {
      if (response.success === 1) {
        toast.success("FO Payment Requisition added successfully!");
        navigate("/fo-payment-requisition-list");
      }
      else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to add fo payment requisition: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log("finc", fincYear);
    addFOPaymentMutation.mutate(data);
  };

  // Handle file input for preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check file type (image or pdf) and set preview accordingly
    if (file) {
      const fileType = file.type.split("/")[0]; // Get the type (image/pdf)
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        setFilePreview(URL.createObjectURL(file));
      }
    }
  };


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHead breadcrumb_name="Payment Requisition" />
        <div className="flex flex-1 flex-col gap-2 p-3 bg-whitesmoke lg:justify-center">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow mx-auto 2xl:w-[80%] w-full overflow-hidden"
          >
            {/* <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
                ADD PAYMENT REQUISITION
              </h2> */}
            <div className="flex bg-gray-200 items-center justify-between px-10">
              <h2 className="font-merri font-semibold p-5 text-center text-2xl">
                ADD FO PAYMENT REQUISITION
              </h2>
              <div className="finance-year-filter">
                <form action="#" className="flex items-center gap-3">
                  <label htmlFor="financeYear" className="text-nowrap m-0">Select Financial Year</label>
                  <select
                    name="financeYear"
                    id="financeYear"
                    className="block"
                    value={fincYear || ""} // 👈 controlled component
                    onChange={(e) => {
                      setFincYear(e.target.value);
                    }}
                  >
                    {fincYearList?.response?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.financial_year}
                      </option>
                    ))}
                  </select>

                </form>
              </div>
            </div>
            {isLoadingProjects ?
              <FormSubmitLoader loading_msg="" />
              :
              <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
                {/* Project ID Dropdown */}
                <div className="form-group">
                  <label htmlFor="project_id">
                    Project Name <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="project_id"
                    {...register("project_id", {
                      required: "Project ID is required",
                    })}
                    className="block w-full"
                  // disabled={fincYear === null || fincYear === "NA"}
                  >
                    <option value="">Select Project</option>
                    {
                      isLoadingProjects ?
                        <option value="">Loading Projects List , Please Wait....</option> :
                        projectList?.response?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {`${project.project_number} - ${project.project_name}`}
                          </option>
                        ))
                    }
                  </select>
                  {errors.project_id && (
                    <span className="text-red-600 text-sm">
                      {errors.project_id.message}
                    </span>
                  )}
                </div>

                {/* Vendor ID Dropdown */}
                <div className="form-group">
                  <label htmlFor="vendor_id">
                    FO Name <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="vendor_id"
                    {...register("assign_fo_id", {
                      required: "FO is required",
                    })}
                    className="block w-full"
                  >
                    <option value="">Select FO</option>
                    {
                      Array.isArray(foList?.response)
                        ? foList.response.map((fo) => (
                          <option key={fo.id} value={fo.id}>
                            {fo.name}
                          </option>
                        ))
                        : <option value="">No FO available</option>
                    }
                  </select>
                  {errors.vendor_id && (
                    <span className="text-red-600 text-sm">
                      {errors.vendor_id.message}
                    </span>
                  )}
                </div>

                {/* Requisition Amount Input */}
                {watch("project_id") !== "" && watch("project_id") !== undefined ? (
                  <div className="form-group">
                    <label htmlFor="requisition_amount">
                      Requisition Amount <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="requisition_amount"
                      {...register("requisition_amount",
                        { required: "Amount is required" },
                        {
                          max: {
                            value: +singlePorj?.branch_expenses_cash,
                            message: `Requisition amount should not be greater than branch cost (Cash) amount ${singlePorj?.branch_expenses_cash}`,
                          },
                        })}
                      className="block"
                      placeholder="Enter Amount"
                    />
                    {errors.requisition_amount && (
                      <span className="text-red-600 text-sm">
                        {errors.requisition_amount.message}
                      </span>
                    )}
                  </div>
                ) : null}


                {/*Re Enter Requisition Amount Input */}
                {watch("project_id") !== "" && watch("project_id") !== undefined ? (
                  <div className="form-group">
                    <label htmlFor="requisition_amount_re_enter">
                      Re-enter Requisition Amount <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="requisition_amount_re_enter"
                      {...register("requisition_amount_re_enter",
                        { required: "Amount (re entered) is required" })}
                      className="block"
                      placeholder="Enter Amount"
                    />
                    {errors.requisition_amount_re_enter && (
                      <span className="text-red-600 text-sm">
                        {errors.requisition_amount_re_enter.message}
                      </span>
                    )}

                    {
                      +requisitionAmount !== +requisitionAmountReEnter ?
                        (
                          requisitionAmount !== "" && requisitionAmountReEnter !== "" ? <p className="text-red-500 text-sm mt-2">Requisition mismatch</p> : null
                        ) : null
                    }
                  </div>
                ) : null}

                {/* Requisition Image Input */}
                <div className="form-group">
                  <label htmlFor="fo_requisition_img">
                    FO Requisition Image (Image/PDF){" "}
                  </label>
                  <input
                    type="file"
                    id="fo_requisition_img"
                    {...register("fo_requisition_img")}
                    accept=".jpg, .jpeg, .png, .pdf"
                    className="block"
                    onChange={handleFileChange}
                  />
                  {errors.fo_requisition_img && (
                    <span className="text-red-600 text-sm">
                      {errors.fo_requisition_img.message}
                    </span>
                  )}
                </div>
                {/* Display Preview */}
                <div className="form-group mt-3 lg:col-span-2 text-center">
                  {filePreview && (
                    <>
                      {filePreview.includes("data:image") ? (
                        <img
                          src={filePreview}
                          alt="Image Preview"
                          className="inline max-w-full h-[250px] object-contain"
                        />
                      ) : filePreview.includes("pdf") ? (
                        <iframe
                          src={filePreview}
                          width="100%"
                          height="500px"
                          title="PDF Preview"
                        />
                      ) : null}
                    </>
                  )}
                </div>

                {/* Requisition Remarks Input */}
                <div className="form-group">
                  <label htmlFor="requisition_remarks">Requisition Remarks</label>
                  <input
                    id="requisition_remarks"
                    {...register("requisition_remarks")}
                    className="block"
                    placeholder="Enter remarks"
                  />
                </div>
              </div>
            }

            {/* LOADER */}

            {addFOPaymentMutation.isPending ? (
              <FormSubmitLoader loading_msg="Creating Payment Requisition..." />
            ) : null}
            <div className="card-footer text-center bg-gray-100 py-5">
              <button
                // onClick={() => { checkFinancialYear() }}
                type="submit"
                className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                disabled={+requisitionAmount !== +requisitionAmountReEnter}
              >
                {addFOPaymentMutation.isPending ? <ButtonLoader /> : "Submit"}
              </button>
            </div>
          </form>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
