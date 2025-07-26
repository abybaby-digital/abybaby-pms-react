import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
    FOListByProjectTeamId,
    getFOExpenseListAll,
    getTeamListById,
    rejectExpense,
} from '../../../services/api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const FoExpenseListById = ({ payment }) => {
    const [teamFilterId, setTeamFilter] = useState(null);
    const [foFilterId, setFoFilter] = useState(null);

    const token = useSelector(state => state.auth.token);
    const queryClient = useQueryClient();

    const { data: foExpenseList, isLoading } = useQuery({
        queryKey: ['fo-expense-list-all', payment?.id, teamFilterId, foFilterId],
        queryFn: async () => await getFOExpenseListAll(token, payment.project_id, teamFilterId, foFilterId, null),
        enabled: !!payment
    });

    const { data: teamList } = useQuery({
        queryKey: ['team-list-by-id', payment?.id],
        queryFn: async () => await getTeamListById(token, payment.project_id),
        enabled: !!payment
    });

    const { data: foList } = useQuery({
        queryKey: ['fo-list-by-id', payment?.id, teamFilterId],
        queryFn: async () => {
            if (!teamFilterId) return { response: [] };
            return await FOListByProjectTeamId(token, payment.project_id, teamFilterId);
        },
        enabled: !!teamFilterId,
    });

    const rejectMutation = useMutation({
        mutationFn: async (data) => await rejectExpense(token, data.id),
        onSuccess: (response) => {
            if (response.success === 1) {
                toast.success("Expense rejected successfully");
                queryClient.invalidateQueries(['fo-expense-list-all', payment?.id]);
            } else {
                toast.error("Already rejected");
            }
        },
    });

    const handleReject = (id) => rejectMutation.mutate({ id });

    const handleResetFilters = () => {
        setTeamFilter(null);
        setFoFilter(null);
    };

    const expenses = foExpenseList?.response.expenses_list || [];

    const attachmentTemplate = (rowData) => (
        <a href={rowData.exp_attachment} target="_blank" rel="noopener noreferrer" className="flex justify-center">
            <img src={rowData.exp_attachment} alt="" className="w-10 h-10 rounded-full aspect-square" />
        </a>
    );

    const statusTemplate = (rowData) =>
        rowData.status === "1" ? (
            <span className="bg-green-500 p-1 rounded-xl text-sm text-white px-3">Approved</span>
        ) : (
            <span className="bg-red-500 p-1 rounded-xl text-sm text-white px-3">Rejected</span>
        );

    const rejectButtonTemplate = (rowData) =>
        rowData.status === "1" ? (
            <Button
                label="Click here"
                className="p-button-sm p-button-outlined p-button-success"
                onClick={() => handleReject(rowData.id)}
            />
        ) : (
            <span className="border border-red-500 p-1 rounded-xl text-red-500 text-sm px-3">
                Rejected Already
            </span>
        );

    const dateTemplate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString() : '-');

    if (isLoading) return <p className="text-center">Loading expenses...</p>;

    return (
        <div className="px-5">
            <div className="px-5 rounded shadow py-2 mb-2">
                <h3 className="text-lg font-semibold mb-3"><span>Project Name : </span>{payment.project_name}</h3>
                <div className="my-2 font-merri text-black flex justify-between flex-wrap gap-3">
                    {
                        (foExpenseList?.response.project_details || []).map((item, i) => (
                            <p key={i} className="text-sm font-semibold">
                                <span>{item.name} : </span>{item.amount}
                            </p>
                        ))
                    }
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Team</label>
                    <select
                        className="border px-3 py-2 rounded w-64"
                        value={teamFilterId || ''}
                        onChange={(e) => {
                            const val = e.target.value || null;
                            setTeamFilter(val);
                            setFoFilter(null); // reset FO filter when team changes
                        }}
                    >
                        <option value="">Select Team</option>
                        {teamList?.response.map((team) => (
                            <option key={team.id} value={team.id}>{team.team_name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">FO</label>
                    <select
                        className="border px-3 py-2 rounded w-64"
                        value={foFilterId || ''}
                        onChange={(e) => setFoFilter(e.target.value || null)}
                        disabled={!teamFilterId}
                    >
                        <option value="">Select FO</option>
                        {foList?.response.map((fo) => (
                            <option key={fo.id} value={fo.id}>{fo.name}</option>
                        ))}
                    </select>
                </div>

                <Button label="Reset Filters" className="p-button-sm p-button-secondary mt-6" onClick={handleResetFilters} />
            </div>

            {/* Table */}
            <DataTable
                value={expenses}
                paginator
                rows={10}
                className="p-datatable-sm"
                responsiveLayout="scroll"
                emptyMessage="No expenses found."
            >
                <Column field="id" header="#" body={(_, { rowIndex }) => rowIndex + 1} />
                <Column field="fo_names" header="FO Name" />
                <Column field="exp_amount" header="Amount" body={(rowData) => `₹ ${rowData.exp_amount}`} />
                <Column field="exp_reason" header="Reason" />
                <Column header="Attachment" body={attachmentTemplate} />
                <Column field="status" header="Status" body={statusTemplate} />
                <Column header="Want to reject?" body={rejectButtonTemplate} />
                <Column field="created_at" header="Created At" body={(rowData) => dateTemplate(rowData.created_at)} />
                <Column field="updated_at" header="Updated At" body={(rowData) => dateTemplate(rowData.updated_at)} />
            </DataTable>
        </div>
    );
};

export default FoExpenseListById;
