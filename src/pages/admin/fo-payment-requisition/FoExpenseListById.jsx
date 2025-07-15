import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { getFOExpenseListById, rejectExpense } from '../../../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const FoExpenseListById = ({ payment }) => {
    const token = useSelector(state => state.auth.token);
    const queryClient = useQueryClient();
    const { data: foExpenseList, isLoading } = useQuery({
        queryKey: ['fo-expense-list', payment?.id],
        queryFn: async () => await getFOExpenseListById(token, payment.id),
        enabled: !!payment
    });

    const rejectMutation = useMutation({
        mutationFn: async (data) => {
            return await rejectExpense(token, data.id);
        },
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success("Expense rejected successfully");
            }
            else {
                toast.error("Already rejected");
            }
        },
    })

    const handleReject = (id) => {
        console.log("clicked", id);
        rejectMutation.mutate({ id });
    }

    if (isLoading) return <p className="text-center">Loading expenses...</p>;

    const expenses = foExpenseList?.response || [];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="p-1 border">#</th>
                        <th className="p-1 border">FO Name</th>
                        <th className="p-1 border">Amount</th>
                        <th className="p-1 border">Reason</th>
                        <th className="p-1 border">Attachment</th>
                        <th className="p-1 border">Status</th>
                        <th className="p-1 border">Want to reject?</th>
                        <th className="p-1 border">Created At</th>
                        <th className="p-1 border">Updated At</th>
                    </tr>
                </thead>
                <caption className='mb-3'>{payment.project_name}</caption>
                <tbody>

                    {expenses.length === 0 ? (
                        <tr>
                            <td colSpan="11" className="text-center p-4">
                                No expenses found.
                            </td>
                        </tr>
                    ) : (
                        expenses.map((item, index) => (
                            <tr key={item.id} className="text-sm text-center">
                                <td className="p-1 border">{index + 1}</td>
                                <td className="p-1 border">{item.fo_names}</td>
                                <td className="p-1 border">₹ {item.exp_amount}</td>
                                <td className="p-1 border">{item.exp_reason}</td>
                                <td className="p-1 border ">
                                    <a href={item.exp_attachment} target="_blank" data-fancybox={item.id} rel="noopener noreferrer" className="text-blue-600 flex justify-center">
                                        <img src={item.exp_attachment} alt="" className='w-10 h-10 rounded-full aspect-square' />
                                    </a>
                                </td>
                                <td className="p-1 border">
                                    {item.status === "1" ? <span className='bg-green-500 p-1 rounded-xl text-sm text-white px-3'>Approved</span> : <span className='bg-red-500 p-1 rounded-xl text-white text-sm px-3'>Rejected</span>}
                                </td>
                                <td className="p-1 border">
                                    {item.status === "1" ? <button type='button' onClick={() => { handleReject(item.id) }} className='border border-green-500 p-1 rounded-xl text-sm text-green-500 hover:bg-green-500 hover:text-white px-3'>Click here</button> : <span className='border border-red-500 p-1 rounded-xl text-red-500 text-sm px-3'>Rejected Already</span>}
                                </td>
                                <td className="p-1 border">{new Date(item.created_at).toLocaleString()}</td>
                                <td className="p-1 border">{item.updated_at ? new Date(item.updated_at).toLocaleString() : "-"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FoExpenseListById;
