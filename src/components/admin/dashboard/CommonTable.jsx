import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Link } from 'react-router-dom'





const CommonTable = ({ table_title, table_head_items = [], table_data_items = [] }) => {

    return (
        <div className="latest-post-table bg-white rounded-2xl shadow p-5 mt-5">
            <header className='flex justify-between mt-2 mb-5'>
                <p className='text-xl font-merri italic capitalize font-semibold text-darkGreen'>{table_title}</p>
            </header>
            <Table className="border">
                <TableHeader className="bg-[#e6e5e5] pb-2">
                    <TableRow>
                        {
                            table_head_items.map((item, idx) => (
                                <TableHead key={idx}>{item}</TableHead>
                            ))
                        }
                        {/* <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody >

                    <TableRow key="" className="border-b capitalize">
                        {
                            table_data_items.map((item, idx) => (
                                <TableCell key={idx}>...</TableCell>
                            ))
                        }



                        {/* <TableCell>
                            <span className={`inline-block w-[100px] text-center bg-green-600 px-2 py-1 rounded-xl text-white capitalize`}>
                                approved
                            </span>
                            <span className={`inline-block w-[100px] text-center bg-yellow-500 px-2 py-1 rounded-xl text-white capitalize`}>
                                Pending
                            </span>
                            <span className={`inline-block w-[100px] text-center bg-red-600 px-2 py-1 rounded-xl text-white capitalize`}>
                                rejected
                            </span>
                        </TableCell> */}

                    </TableRow>

                </TableBody>
            </Table>
        </div>
    )
}

export default CommonTable
