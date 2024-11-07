"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import { Trash } from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { useRouter } from "next/navigation";
const columns = [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "recipient_name",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Santri" />
        ),
    },
    {
        accessorKey: "recipient_type",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tipe Penerima" />
        ),
    },
    {
        accessorKey: "recipient_number",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nomor HP" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
    },
];

export default function DataTable({ data }) {
    const [globalFilter, setGlobalFilter] = useState();
    const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        initialState: {
            sorting: [
                {
                    id: "no",
                    asc: true,
                },
            ],
        },
    });

    return (
        <>
            <div>
                <div className="grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 py-4">
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className=" max-w-sm"
                        placeholder="Search all columns..."
                    />
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
                                                          header.column
                                                              .columnDef.header,
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
        </>
    );
}
