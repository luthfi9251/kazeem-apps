"use client";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HREF_URL } from "@/navigation-data";
import Link from "next/link";
import MenuItemDeleteAction from "@/components/MenuItemDeleteAction";
import { toast } from "react-toastify";
import { deletePelanggaran } from "../_actions/pelanggaran";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DataTableColumnHeader } from "./data-table-header";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export const columns = [
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
        filterFn: "includesString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Santri" />
        ),
    },
    {
        id: "kelas",
        accessorKey: "kelas",
        filterFn: "equals",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kelas" />
        ),
    },
    {
        id: "kode_ta",
        accessorKey: "kode_ta",
        filterFn: "equals",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TA" />
        ),
    },
    {
        accessorKey: "nama_pelanggaran",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pelanggaran" />
        ),
    },
    {
        accessorKey: "jenis_pelanggaran",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Departemen" />
        ),
    },
    {
        accessorKey: "tanggal",
        sortingFn: (rowA, rowB, columnId) => {
            let dateRowA = dayjs(rowA.original.tanggal, "DD-MM-YYYY");
            let dateRowB = dayjs(rowB.original.tanggal, "DD-MM-YYYY");

            if (dateRowA.isSame(dateRowB, "day")) {
                return 0;
            } else if (dateRowA.isBefore(dateRowB, "day")) {
                return -1;
            } else {
                return 1;
            }
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal" />
        ),
        filterFn: (row, columnId, filterValue) => {
            let constraintDate = {
                start: dayjs(filterValue.tgl_start),
                end: dayjs(filterValue.tgl_end),
            };
            let rowDate = dayjs(row.original.tanggal, "DD-MM-YYYY");

            if (filterValue.tgl_start && filterValue.tgl_end) {
                if (
                    rowDate.isSameOrBefore(constraintDate.end) &&
                    rowDate.isSameOrAfter(constraintDate.start)
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            if (filterValue.tgl_start) {
                if (rowDate.isSameOrAfter(constraintDate.start)) {
                    return true;
                } else {
                    return false;
                }
            }

            if (filterValue.tgl_end) {
                if (rowDate.isSameOrBefore(constraintDate.end)) {
                    return true;
                } else {
                    return false;
                }
            }

            return true;
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row, table }) => {
            const [open, setOpen] = useState(false);
            const user = row.original;
            const tableState = table.getState();
            const handleDelete = () => {
                toast.promise(
                    () => deletePelanggaran(user.id),
                    {
                        pending: "Menghapus data",
                        success: {
                            render({ data }) {
                                tableState.refetch();
                                return "Data berhasil dihapus";
                            },
                        },
                        error: {
                            render({ data }) {
                                // When the promise reject, data will contains the error
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
                                    href={HREF_URL.PELANGGARAN_EDIT(user.id)}
                                    className="w-full"
                                    data-e2e="btn-edit"
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={HREF_URL.PELANGGARAN_REKAP(
                                        user.santri_id
                                    )}
                                    className="w-full"
                                    data-e2e="btn-rekap"
                                >
                                    Rekap
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="cursor-pointer"
                                disabled={!user.berkas_penunjang}
                            >
                                <Link
                                    href={`/api/${user.berkas_penunjang}`}
                                    className="w-full"
                                    data-e2e="btn-download"
                                    prefetch={false}
                                >
                                    Unduh Berkas Penunjang
                                </Link>
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
