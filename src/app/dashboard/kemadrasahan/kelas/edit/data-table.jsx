"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
    getSiswaByKelasAndTA,
    deleteSiswaFromKelas,
} from "../../_actions/kelas";
import SiswaDialogForm from "./SiswaDialogForm";

export function DataTable({ columns, dataTA, idKelas }) {
    const [taSelected, setTASelected] = useState(
        dataTA.find((item) => item.aktif)?.kode_ta || dataTA[0].kode_ta
    );
    const queryClient = useQueryClient();

    const [dialogOpen, setDialogOpen] = useState(false);

    let { data, isFetching, isError } = useQuery({
        queryKey: ["siswa", idKelas, taSelected],
        queryFn: () => getSiswaByKelasAndTA(idKelas, taSelected),
        initialData: [],
    });

    const deleteMutation = useMutation({
        mutationFn: (idKelasSantri) => {
            return deleteSiswaFromKelas(idKelasSantri);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["siswa", idKelas, taSelected],
            });
            queryClient.invalidateQueries({
                queryKey: ["santri", "notin", idKelas],
            });
        },
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
        meta: {
            deleteHandler: (id) => deleteMutation.mutate(id),
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
                <Button
                    data-e2e="btn-add-siswa"
                    className="bg-kazeem-secondary"
                    onClick={() => setDialogOpen(true)}
                >
                    Tambah Siswa
                </Button>
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
            <SiswaDialogForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                idKelas={idKelas}
                kodeTA={taSelected}
            />
        </div>
    );
}
