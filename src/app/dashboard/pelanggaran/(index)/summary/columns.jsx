"use client";
import { MoreHorizontal } from "lucide-react";

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
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

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
        accessorKey: "nama_pelanggaran",
        header: "Nama Pelanggaran",
        filterFn: "equalsString",
    },
    {
        accessorKey: "nama_kelas",
        header: "Kelas",
        filterFn: "equals",
    },
    {
        accessorKey: "kode_ta",
        header: "TA",
    },
    {
        accessorKey: "kategori",
        header: "Kategori",
        filterFn: "equalsString",
    },
    {
        accessorKey: "jenis",
        header: "Departemen",
        filterFn: "equalsString",
    },
    {
        accessorKey: "poin",
        header: "Poin",
    },
    {
        accessorKey: "keterangan",
        header: "Keterangan",
    },
    {
        accessorKey: "konsekuensi",
        header: "Konsekuensi",
    },
    {
        accessorKey: "created_at",
        header: "Dibuat tgl",
        filterFn: (row, columnId, filterValue) => {
            let constraintDate = {
                start: dayjs(filterValue.tgl_start),
                end: dayjs(filterValue.tgl_end),
            };
            let rowDate = dayjs(row.original.created_at, "DD-MM-YYYY");

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
        cell: (data) => {
            const user = data.row.original;
            console.log(user);
            const idSantri = data.table.getState().idSantri;
            return (
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
                        <DropdownMenuItem className="cursor-pointer">
                            <Link
                                href={HREF_URL.PELANGGARAN_EDIT(
                                    user.id,
                                    HREF_URL.PELANGGARAN_REKAP(idSantri)
                                )}
                                className="w-full"
                                data-e2e="btn-edit"
                            >
                                Edit
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
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
