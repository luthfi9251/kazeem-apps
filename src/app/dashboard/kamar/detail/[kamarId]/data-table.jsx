"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import {
    LoaderCircle,
    MoreVertical,
    Filter,
    MoreHorizontal,
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
import { generatePDFKamar, generatePDFPelanggaran } from "@/lib/generate-pdf";
import { generateExcel } from "@/lib/generate-excel";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import ModalDaftarSantri from "./ModalDaftarSantri";
import MenuItemDeleteAction from "@/components/MenuItemDeleteAction";
import { toast } from "react-toastify";
import { deleteSantriFromKamar, pindahKamar } from "@/actions/kamar";
import ModalPindahKamar from "./ModalPindahKamar";

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
        accessorKey: "nama_lengkap",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Santri" />
        ),
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row, table }) => {
            const [open, setOpen] = useState(false);
            const user = row.original;
            const tableState = table.getState();
            const showPindahKamarDialog = tableState.setisModalPindahKamarOpen;
            const setSelectedSantri = tableState.setSelectedSantriPindaKamar;
            const handleDelete = () => {
                toast.promise(
                    () => deleteSantriFromKamar(user.id),
                    {
                        pending: "Menghapus data",
                        success: {
                            render({ data }) {
                                if (data.isError) {
                                    throw data.error;
                                }
                                return "Data berhasil dihapus";
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
                );
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                data-e2e="btn-dropdown"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link
                                    href={HREF_URL.SANTRI_DETAIL(user.id)}
                                    className="w-full"
                                    data-e2e="btn-detail"
                                >
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <p
                                    className="w-full"
                                    onClick={() => {
                                        showPindahKamarDialog(true);
                                        setSelectedSantri(user.id);
                                    }}
                                >
                                    Pindah Kamar
                                </p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <p
                                    className="text-red-500 cursor-pointer w-full"
                                    onClick={() => setOpen(true)}
                                >
                                    Hapus
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MenuItemDeleteAction
                        open={open}
                        onOpenChange={setOpen}
                        onDeletehandle={handleDelete}
                    />
                </>
            );
        },
    },
];

export function DataTable({ data, info, kamarId, infoKamar }) {
    const filterSheetState = useState(false);
    const [globalFilter, setGlobalFilter] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const [isModalSantriOpen, setIsModalSantriOpen] = useState(false);
    const [isModalPindahKamarOpen, setisModalPindahKamarOpen] = useState(false);
    const [selectedSantriPindaKamar, setSelectedSantriPindaKamar] =
        useState(null);

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
            setisModalPindahKamarOpen,
            setSelectedSantriPindaKamar,
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

    const handlePindahKamarOneSantri = (idKamar) => {
        toast
            .promise(
                () => pindahKamar(idKamar, selectedSantriPindaKamar),
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
            .then(() => setisModalPindahKamarOpen(false));
    };

    const handleGenerateExcel = () => {
        generateExcel({
            filename: `Data Kamar - Detail ${info?.nama_kamar}`,
            type: "KAMAR_SPECIFIED",
            idKelas: kamarId,
        });
    };

    const handleGeneratePDF = () => {
        let dataRow = table
            .getFilteredRowModel()
            .rows.map((item) => item.original);

        generatePDFKamar(dataRow, infoKamar);
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
                        <Button
                            className="grow max-w-[150px] w-full  bg-kazeem-secondary "
                            id="tambah-santri"
                            data-e2e="btn-tambah"
                            onClick={() => setIsModalSantriOpen(true)}
                        >
                            Tambah
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
                                    onClick={handleGeneratePDF}
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
            <ModalDaftarSantri
                open={isModalSantriOpen}
                onOpenChange={setIsModalSantriOpen}
                kamarId={kamarId}
            />
            <ModalPindahKamar
                open={isModalPindahKamarOpen}
                onOpenChange={setisModalPindahKamarOpen}
                currentKamarId={kamarId}
                handleOnSimpan={handlePindahKamarOneSantri}
            />
        </>
    );
}
