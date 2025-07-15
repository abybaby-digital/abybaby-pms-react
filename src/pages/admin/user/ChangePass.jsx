import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { changePasswordByAdmin } from '../../../services/api';
import { dialogOpenCloseContext } from '../../../context/DialogOpenClose';

const ChangePass = ({ user }) => {
    const token = useSelector((state) => state.auth?.token);
    const { setModal, refetchList, setRefetchList } = useContext(dialogOpenCloseContext);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const newPassword = watch('newPassword');

    const changePassMutation = useMutation({
        mutationFn: async (data) => {
            return await changePasswordByAdmin(token, user.id, data.newPassword, data.confirmPassword);
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success('Password changed successfully');
                reset();
                setModal(false);
            } else {
                toast.error(response.message || 'Failed to change password');
            }
        },
        onError: (err) => {
            console.error(err);
            toast.error('Something went wrong');
        },
    });

    const onSubmit = (data) => {
        if (!user?.id) {
            toast.error('User ID is missing');
            return;
        }

        changePassMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white border rounded shadow space-y-4"
        >
            {/* New Password */}
            <div>
                <label className="block font-semibold mb-1">New Password</label>
                <input
                    type="password"
                    {...register('newPassword', {
                        required: 'New password is required',
                        minLength: {
                            value: 3,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="Enter new password"
                />
                {errors.newPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block font-semibold mb-1">Confirm Password</label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === newPassword || 'Passwords do not match',
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
                <button
                    type="submit"
                    disabled={changePassMutation.isLoading}
                    className={`px-4 py-2 rounded text-white ${changePassMutation.isLoading ? 'bg-gray-400' : 'bg-black hover:bg-gray-700'
                        }`}
                >
                    {changePassMutation.isLoading ? 'Changing...' : 'Change Password'}
                </button>
            </div>
        </form>
    );
};

export default ChangePass;
