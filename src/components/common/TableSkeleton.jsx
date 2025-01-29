import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

const TableSkeleton = ({ columns }) => {

    const demoColumn = new Array(+columns).fill(null);
    const demoRows = new Array(5).fill(null);

    return (
        <>
            <Skeleton className="w-[95%] mx-auto h-[50px] rounded my-3" />
            <Table className="text-black">
                <TableBody>

                    {demoRows.map((_, idx) => (
                        <TableRow key={idx}>
                            {demoColumn.map((_, index) => (
                                <TableCell key={index}>
                                    <Skeleton className="w-full h-[40px] rounded" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}



                </TableBody>
            </Table>
            <Skeleton className="w-[50%] mx-auto h-[30px] rounded my-3" />
        </>
    )
}

export default TableSkeleton
