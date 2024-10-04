"use client";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import DebouncedInput from "@/components/DebouncedInput";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { addSantriToKelas, getAllSantriNotInKamar } from "@/actions/kamar";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

function DataTableSantri({ data, handleOnSave }) {
    const [globalFilter, setGlobalFilter] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const columns = useMemo(
        () => [
            {
                id: "no",
                header: "No.",
                cell: ({ row }) => {
                    return <span className="capitalize ">{row.index + 1}</span>;
                },
            },
            {
                accessorKey: "nis",
                filterFn: "equalsString",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="NIS" />
                ),
            },
            {
                accessorKey: "nama_lengkap",
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Nama Santri"
                    />
                ),
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row, table }) => {
                    const isSelected = row.getIsSelected();
                    return (
                        <Button
                            variant="outline"
                            size="icon"
                            className={
                                isSelected
                                    ? "bg-red-500 text-white"
                                    : "bg-kazeem-primary text-white"
                            }
                            onClick={row.getToggleSelectedHandler()}
                        >
                            {isSelected ? (
                                <Trash className="h-4 w-4" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </Button>
                    );
                },
            },
        ],
        []
    );
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
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 5, //custom default page size
            },
        },
    });

    return (
        <>
            <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 py-4">
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className=" max-w-xs"
                        placeholder="Cari Nama atau NIS"
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
                <p className="text-xs text-center pt-5">
                    {table.getSelectedRowModel().rows.length} data dipilih
                </p>
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
                <Button
                    className=" self-center"
                    onClick={() =>
                        handleOnSave(
                            table
                                .getSelectedRowModel()
                                .rows.map((item) => item.original.id)
                        )
                    }
                >
                    Simpan
                </Button>
            </div>
        </>
    );
}

export default function ModalDaftarSantri({ open, onOpenChange, kamarId }) {
    let { data } = useQuery({
        queryKey: ["santri_not_in", "kamar"],
        queryFn: async () => await getAllSantriNotInKamar(),
    });

    let handleOnAddSantri = (dataSantri) => {
        // console.log(dataSantri);
        toast
            .promise(
                () => addSantriToKelas(dataSantri, kamarId),
                {
                    pending: "Menyimpan data",
                    success: {
                        render({ data }) {
                            if (data.isError) {
                                throw data.error;
                            }
                            return "Data berhasil disimpan";
                        },
                    },
                    error: {
                        render({ data }) {
                            return `${data}`;
                        },
                    },
                },
                {
                    position: "bottom-right",
                }
            )
            .then(() => onOpenChange(false));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Masukkan Santri</DialogTitle>
                </DialogHeader>
                <DataTableSantri data={data} handleOnSave={handleOnAddSantri} />
            </DialogContent>
        </Dialog>
    );
}
