"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import {
    LoaderCircle,
    MoreVertical,
    Filter,
    MoreHorizontal,
    Trash,
} from "lucide-react";
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
import Link from "next/link";
import { HREF_URL } from "@/navigation-data";
import { generatePDFPelanggaran } from "@/lib/generate-pdf";
import { generateExcel } from "@/lib/generate-excel";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { MenuItemDeleteActionWithConfirmation } from "@/components/MenuItemDeleteAction";
import { useRouter } from "next/navigation";
import ModalTambahRecipient from "./ModalTambahRecipient";
import { useRecipientStore } from "@/providers/pengumumanRecipientProviders";

const columns = [
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
        accessorKey: "nama_santri",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Santri" />
        ),
    },
    {
        accessorKey: "kelas",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kelas" />
        ),
    },
    {
        accessorKey: "wa_ortu",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="WA Ortu" />
        ),
        cell: ({ row }) => {
            return row.original.no_hp_wali.join(" ");
        },
    },
    {
        id: "actions",
        header: "Actions",
        size: 100,
        cell: ({ row }) => {
            const data = row.original;
            const removeRecipient = useRecipientStore(
                (state) => state.removeRecipient
            );

            return (
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-red-500 text-white"
                    onClick={() => removeRecipient(data.id)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            );
        },
    },
];

export default function DataTable() {
    const [globalFilter, setGlobalFilter] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const recipientList = useRecipientStore((state) => state.recipient);
    const clearRecipientList = useRecipientStore(
        (state) => state.clearRecipient
    );

    const table = useReactTable({
        data: recipientList ?? [],
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
                    <div className="flex w-full justify-end gap-1">
                        <Button
                            className="grow max-w-[120px] w-full  bg-red-600 hover:bg-red-900"
                            id="tambah-kelas"
                            data-e2e="btn-tambah"
                            onClick={() => clearRecipientList()}
                        >
                            Bersihkan
                        </Button>
                        <Button
                            className="grow max-w-[120px] w-full  bg-kazeem-secondary "
                            id="tambah-kelas"
                            data-e2e="btn-tambah"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Tambah
                        </Button>
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
            <ModalTambahRecipient
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </>
    );
}
