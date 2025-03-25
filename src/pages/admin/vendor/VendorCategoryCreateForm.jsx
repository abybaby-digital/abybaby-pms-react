import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormSubmitLoader from '../../../components/common/FormSubmitLoader';
import ButtonLoader from '../../../components/common/ButtonLoader';
import toast from 'react-hot-toast';
import { addVendorCategory } from '../../../services/api';
import { useMutation } from '@tanstack/react-query';
import { dialogOpenCloseContext } from '../../../context/DialogOpenClose';

const VendorCategoryCreateForm = ({ setCatModal }) => {
    const token = useSelector((state) => state.auth.token);
    // const navigate = useNavigate();
    const { refetchList, setRefetchList } = useContext(dialogOpenCloseContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // ADD VENDOR CATEGORY
    const addVendorCategoryMutation = useMutation({
        mutationFn: async (data) => {
            // Pass the form data and status to the addBranch API
            return await addVendorCategory(token,
                data.vendor_category_name,
            );
        },
        onSuccess: (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Vendor Category added successfully!");
                setCatModal(false);
                setRefetchList(!refetchList)
            }
            else {
                toast.error("Something went wrong !!")
            }
        },
        onError: (error) => {
            toast.error("Failed to add vendor: " + error.message);
        },
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data); // Log the form data to verify
        addVendorCategoryMutation.mutate(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group px-5">
                    <label htmlFor="vendor_name">
                        Vendor Category Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="block"
                        id="vendor_name"
                        placeholder="Enter Vendor Name"
                        {...register("vendor_category_name", { required: "Vendor Category Name is required" })}
                    />
                    {errors.vendor_category_name && (
                        <span className="text-red-600 text-sm">
                            {errors.vendor_category_name.message}
                        </span>
                    )}


                </div>
                {/* LOADER */}

                

                <div className="card-footer text-center bg-gray-100 py-5 mt-2">
                    <button
                        type="submit"
                        className="px-10 py-2 text-white bg-lightdark rounded-2xl"
                        disabled={addVendorCategoryMutation.isPending}
                    >
                        {addVendorCategoryMutation.isPending ? <ButtonLoader /> : "Submit"}

                    </button>
                </div>
            </form>
        </div>
    )
}

export default VendorCategoryCreateForm
