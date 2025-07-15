import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import { useContext } from "react";
import { dialogOpenCloseContext } from "../../../context/DialogOpenClose";
import { MdOutlineClose } from "react-icons/md";
import EditUser from "./EditUser";
import ChangePass from "./ChangePass";

const ViewUser = ({ user, add_or_edit, stateList, companyList, branchList, roleList }) => {
    const { modal, setModal } = useContext(dialogOpenCloseContext);

    return (
        <Dialog open={modal}>
            <DialogContent className="pb-5">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold font-merri">
                        {add_or_edit === "view" ? "User Details" : add_or_edit === "edit" ? "Edit User" : "Change Password"}
                    </DialogTitle>
                    <DialogClose asChild onClick={() => setModal(false)} className="text-black text-2xl cursor-pointer">
                        <MdOutlineClose />
                    </DialogClose>
                </DialogHeader>

                <DialogDescription>

                    {add_or_edit === "view" ?
                        <div className="flex flex-col items-center gap-4">
                            {/* Profile Image */}
                            <img
                                src={user?.profile_img}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border shadow"
                            />

                            {/* User Details Table */}
                            <Table className="text-black w-[90%] mx-auto">
                                <TableBody className="grid gap-5 lg:grid-cols-3 grid-cols-1">
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Name :</TableCell>
                                        <TableCell>{user?.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Email :</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Role :</TableCell>
                                        <TableCell>{user?.role_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Company :</TableCell>
                                        <TableCell>{user?.company_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Branch :</TableCell>
                                        <TableCell>{user?.branch_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">State :</TableCell>
                                        <TableCell>{user?.state_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Contact Number :</TableCell>
                                        <TableCell>{user?.contact_number}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                            <TableCell className="font-bold text-lg">Vertical Head :</TableCell>
                                            <TableCell>{user?.name_prefix || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Business Manager :</TableCell>
                                            <TableCell>{user?.business_manager_name || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Client Service :</TableCell>
                                            <TableCell>{user?.client_service_name || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-bold text-lg">Other Services :</TableCell>
                                            <TableCell>{user?.other_service_name || "N/A"}</TableCell>
                                        </TableRow> */}
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">User Details :</TableCell>
                                        <TableCell>{user?.user_details || "N/A"}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                            <TableCell className="font-bold text-lg">View Status :</TableCell>
                                            <TableCell>{user?.view_status === "1" ? "Enabled" : "Disabled"}</TableCell>
                                        </TableRow> */}
                                    {/* <TableRow>
                                            <TableCell className="font-bold text-lg">Veto Power :</TableCell>
                                            <TableCell>{user?.veto_power === "1" ? "Yes" : "No"}</TableCell>
                                        </TableRow> */}
                                    <TableRow>
                                        <TableCell className="font-bold text-lg">Account Status :</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-xl ${user?.status === "1" ? "bg-green-500" : "bg-red-500"} text-white shadow`}>
                                                {user?.status === "1" ? "Active" : "Inactive"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        :
                        add_or_edit === "edit" ?
                            < EditUser user={user} roleList={roleList}
                                branchList={branchList}
                                companyList={companyList}
                                stateList={stateList} />
                            :
                            <ChangePass user={user} />
                    }

                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default ViewUser;
