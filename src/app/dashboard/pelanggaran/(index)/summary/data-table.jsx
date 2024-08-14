"use client";

import { useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DebouncedInput from "@/components/DebouncedInput";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, MoreVertical } from "lucide-react";
import FilterSheetSummary from "./FilterSheetSummary";

export function DataTable({
    columns,
    dataPelanggaran,
    idSantri,
    handleGenerateExcel,
    handleGeneratePF,
}) {
    const [globalFilter, setGlobalFilter] = useState();
    const filterSheetState = useState(false);
    const [columnFilters, setColumnFilters] = useState([]);
    const namaKelasUnique = useMemo(
        () => [...new Set(dataPelanggaran.map((item) => item.nama_kelas))],
        []
    );

    const table = useReactTable({
        data: dataPelanggaran,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            idSantri,
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
        <div>
            <div className="flex justify-between items-end pb-4 flex-wrap">
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className=" max-w-sm"
                    placeholder="Search all columns..."
                />
                <div className="flex w-full justify-end gap-1">
                    <Button
                        variant="ghost"
                        className="h-10 w-10 p-0"
                        data-e2e="btn-filter"
                        onClick={() => filterSheetState[1](true)}
                    >
                        <span className="sr-only">Open filter</span>
                        <Filter className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-10 w-10 p-0"
                                data-e2e="btn-dropdown"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Exports</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() =>
                                    handleGeneratePF(
                                        table
                                            .getFilteredRowModel()
                                            .rows.map((item) => item.original)
                                    )
                                }
                            >
                                PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() =>
                                    handleGenerateExcel(
                                        table
                                            .getFilteredRowModel()
                                            .rows.map((item) => item.original)
                                    )
                                }
                            >
                                Excel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
                                    // className={
                                    //     (clsx("..."),
                                    //     row.original.id == idPelanggaran
                                    //         ? "bg-slate-200"
                                    //         : "")
                                    // }
                                    // className="bg-red-200"
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
            <FilterSheetSummary
                state={filterSheetState}
                namaKelas={namaKelasUnique}
                kodeTA={[]}
                getColumnFilter={setColumnFilters}
            />
        </div>
    );
}
