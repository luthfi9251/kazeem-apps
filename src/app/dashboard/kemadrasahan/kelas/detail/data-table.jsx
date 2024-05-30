"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
import Link from "next/link";
import { getSiswaByKelasAndTA } from "../../_actions/kelas";

export function DataTable({ columns, dataTA, idKelas }) {
    const [taSelected, setTASelected] = useState(
        dataTA.find((item) => item.aktif)?.kode_ta || dataTA[0].kode_ta
    );

    let { data, isLoading, isError } = useQuery({
        queryKey: ["siswa", idKelas, taSelected],
        queryFn: () => getSiswaByKelasAndTA(idKelas, taSelected),
        initialData: [],
    });

    if (isError) throw new Error();

    const [columnFilters, setColumnFilters] = useState();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    // console.log(dataSiswa);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
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
            <div className="flex justify-between items-end pb-4 flex-wrap">
                <Input
                    placeholder="Cari Siswa"
                    value={
                        table.getColumn("nama_lengkap")?.getFilterValue() ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("nama_lengkap")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="d">
                    <p>Tahun Ajaran</p>
                    <Select
                        defaultValue={taSelected}
                        onValueChange={setTASelected}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Tahun Ajaran" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataTA.map((item, i) => {
                                return (
                                    <SelectItem value={item.kode_ta} key={i}>
                                        {item.kode_ta}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
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
