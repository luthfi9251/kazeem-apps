"use client";

import { useState } from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export function DataTable({ columns, data }) {
    const [columnFilters, setColumnFilters] = useState();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <div>
            <div className="grid grid-cols-2 py-4">
                <Input
                    placeholder="Filter emails..."
                    value={table.getColumn("email")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Link
                    href="/dashboard/users/action"
                    className="w-1/4 justify-self-end flex justify-end"
                >
                    <Button className="self-end bg-kazeem-secondary ">
                        Tambah User
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-kazeem-primary ">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="hover:bg-kazeem-peimary"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-white"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <p className="text-sm text-slate-500">
                    {table.getState().pagination.pageIndex + 1} dari{" "}
                    {table.getPageCount()}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
