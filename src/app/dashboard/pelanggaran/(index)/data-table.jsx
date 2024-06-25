"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { getPelanggaranByKelasAndTA } from "../_actions/pelanggaran";
import Link from "next/link";
import { HREF_URL } from "@/navigation-data";

export function DataTable({ columns, selectData }) {
    const [namaKelas, setNamaKelas] = useState();
    const [kodeTA, setKodeTA] = useState();
    const [globalFilter, setGlobalFilter] = useState();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    let { data, isFetching, refetch } = useQuery({
        queryKey: ["pelanggaran", namaKelas, kodeTA],
        queryFn: () =>
            getPelanggaranByKelasAndTA({
                nama_kelas: namaKelas,
                kode_ta: kodeTA,
            }),
        initialData: [],
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
            refetch,
        },
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
            <div className="grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 py-4">
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className=" max-w-sm"
                    placeholder="Search all columns..."
                />
                <div className=" grid grid-cols-3 gap-2">
                    <Select
                        value={namaKelas}
                        onValueChange={setNamaKelas}
                        defaultValue="undefined"
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Nama Kelas</SelectLabel>
                                {selectData.kelas.map((item, key) => {
                                    return (
                                        <SelectItem key={key} value={item}>
                                            {item}
                                        </SelectItem>
                                    );
                                })}
                                <SelectItem
                                    key="ALL"
                                    value="undefined"
                                    onClick={() => setNamaKelas(null)}
                                >
                                    Semua Kelas
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        defaultValue="undefined"
                        value={kodeTA}
                        onValueChange={setKodeTA}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Tahun Ajaran" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Kode TA</SelectLabel>
                                {selectData.kode_ta.map((item, key) => {
                                    return (
                                        <SelectItem key={key} value={item}>
                                            {item}
                                        </SelectItem>
                                    );
                                })}
                                <SelectItem
                                    key="ALL"
                                    value="undefined"
                                    onClick={() => setKodeTA(null)}
                                >
                                    Semua TA
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Link href={HREF_URL.PELANGGARAN_CREATE}>
                        <Button
                            className="w-full bg-kazeem-secondary "
                            id="tambah-kelas"
                            data-e2e="btn-tambah"
                        >
                            Tambah
                        </Button>
                    </Link>
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
                        {isFetching ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center relative"
                                >
                                    <LoaderCircle className="h-5 w-5 animate-spin m-auto" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
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
