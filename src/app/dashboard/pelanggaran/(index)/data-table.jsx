"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import { LoaderCircle, MoreVertical, Filter } from "lucide-react";
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getPelanggaranByKelasAndTA } from "../_actions/pelanggaran";
import Link from "next/link";
import { HREF_URL } from "@/navigation-data";
import { generatePDFPelanggaran } from "@/lib/generate-pdf";
import { generateExcel } from "@/lib/generate-excel";
import FilterSheetPelanggaran from "./FilterSheetPelanggaran";

export function DataTable({ columns, data, selectData }) {
    const [namaKelas, setNamaKelas] = useState();
    const filterSheetState = useState(false);
    const [kodeTA, setKodeTA] = useState();
    const [globalFilter, setGlobalFilter] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const table = useReactTable({
        data,
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

    const handleGenerateExcel = () => {
        let dataRow = table
            .getFilteredRowModel()
            .rows.map((item) => item.original);
        generateExcel({
            filename: "Data Pelanggaran santri",
            type: "EXPORT_TO_EXCEL_ONLY",
            dataRow,
        });
    };

    const handleGeneratePF = () => {
        let dataRow = table
            .getFilteredRowModel()
            .rows.map((item) => item.original);
        generatePDFPelanggaran(dataRow, "Filtered", "Filtered");
    };

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
                    <div className="flex w-full justify-end gap-1">
                        <Link
                            href={HREF_URL.PELANGGARAN_CREATE}
                            className="grow max-w-[150px]"
                        >
                            <Button
                                className="w-full  bg-kazeem-secondary "
                                id="tambah-kelas"
                                data-e2e="btn-tambah"
                            >
                                Tambah
                            </Button>
                        </Link>
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
                                    onClick={handleGeneratePF}
                                >
                                    PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={handleGenerateExcel}
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
            <FilterSheetPelanggaran
                state={filterSheetState}
                namaKelas={selectData.kelas}
                kodeTA={selectData.kode_ta}
                getColumnFilter={setColumnFilters}
            />
        </>
    );
}
