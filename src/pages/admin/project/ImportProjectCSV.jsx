import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { importProject } from "../../../services/api"; // Import the importProject API
import { useState } from "react";
import ButtonLoader from "../../../components/common/ButtonLoader";
import { useNavigate } from "react-router-dom";

export default function ImportCSV() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [filePreview, setFilePreview] = useState(null); // For file preview

  // Mutation for file upload
  const importCSVMutation = useMutation({
    mutationFn: async (data) => {
      const file = data.import_project[0]; // Assuming only one file
      // File validation check
      if (file && !file.name.endsWith(".csv")) {
        throw new Error("The file must be a CSV file.");
      }
      return await importProject(token, file); // Send the file directly
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("CSV Imported successfully!");
        navigate("/project-list");
      }
      else{
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to import CSV: " + error.message);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(file); // Store the file itself, not the Blob URL
    }
  };

  const onSubmit = (data) => {
    importCSVMutation.mutate(data); // Trigger the mutation
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow mx-auto 2xl:w-[50%] w-full overflow-hidden"
    >
      <h2 className="font-merri font-semibold p-5 text-center text-2xl bg-gray-200">
        IMPORT CSV
      </h2>
      <div className="card-body grid gap-3 lg:grid-cols-2 grid-cols-1 p-5">
        {/* File Input */}
        <div className="form-group">
          <label htmlFor="import_project">
            Upload CSV <span className="text-red-600">*</span>
          </label>
          <input
            type="file"
            id="import_project"
            {...register("import_project", {
              required: "CSV file is required",
            })}
            className="block"
            accept=".csv"
            onChange={handleFileChange}
          />
          {errors.import_project && (
            <span className="text-red-600 text-sm">
              {errors.import_project.message}
            </span>
          )}
        </div>

        {/* File Preview */}
        <div className="form-group mt-3 text-center">
          {filePreview && (
            <div>
              <p>File selected: {filePreview.name}</p>{" "}
              {/* Display the file name */}
              {/* Optional: You can add a preview mechanism for CSV here if necessary */}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="card-footer text-center bg-gray-100 py-5">
        <button
          type="submit"
          className="px-10 py-2 text-white bg-lightdark rounded-2xl"
          disabled={importCSVMutation.isLoading}
        >
          {importCSVMutation.isLoading ? <ButtonLoader /> : "Import CSV"}
        </button>
      </div>
    </form>
  );
}
