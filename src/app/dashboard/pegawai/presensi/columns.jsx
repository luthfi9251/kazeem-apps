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
import MenuItemDeleteAction from "@/components/MenuItemDeleteAction";
import Link from "next/link";
import { HREF_URL } from "@/navigation-data";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteDataPresensi } from "../_actions/presensi";
import "dayjs/locale/id";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DataTableColumnHeader } from "@/components/DataTableHeader.jsx";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export const columns = [
    {
        header: "No.",
        accessorKey: "no",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "id_pegawai",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID Pegawai" />
        ),
    },
    {
    accessorKey: "nama_pegawai",
    header: "Nama Lengkap",
    filterFn: "includesString",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama Lengkap" />
    ),
    },
    {
        accessorKey: "jabatan",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jabatan" />
        ),
    },
    // {
    //     accessorKey: "tgl_presensi",
    //     sortingFn: (rowA, rowB, columnId) => {
    //         let dateRowA = dayjs(rowA.original.tgl_presensi, "DD-MM-YYYY");
    //         let dateRowB = dayjs(rowB.original.tgl_presensi, "DD-MM-YYYY");

    //         if (dateRowA.isSame(dateRowB, "day")) {
    //             return 0;
    //         } else if (dateRowA.isBefore(dateRowB, "day")) {
    //             return -1;
    //         } else {
    //             return 1;
    //         }
    //     },
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Tanggal Presensi" />
    //     ),
    //     filterFn: (row, columnId, filterValue) => {
    //         let constraintDate = {
    //             start: dayjs(filterValue.tgl_start),
    //             end: dayjs(filterValue.tgl_end),
    //         };
    //         let rowDate = dayjs(row.original.tgl_presensi, "DD-MM-YYYY");

    //         if (filterValue.tgl_start && filterValue.tgl_end) {
    //             if (
    //                 rowDate.isSameOrBefore(constraintDate.end) &&
    //                 rowDate.isSameOrAfter(constraintDate.start)
    //             ) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         }

    //         if (filterValue.tgl_start) {
    //             if (rowDate.isSameOrAfter(constraintDate.start)) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         }

    //         if (filterValue.tgl_end) {
    //             if (rowDate.isSameOrBefore(constraintDate.end)) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         }

    //         return true;
    //     },
    //     cell: ({ row }) => {
    //         return row.original.tgl_presensi;
    //     },
    // },
    {
        accessorKey: "tgl_presensi",
        sortingFn: (rowA, rowB, columnId) => {
            let dateRowA = dayjs(rowA.original.tgl_presensi, "DD-MM-YYYY");
            let dateRowB = dayjs(rowB.original.tgl_presensi, "DD-MM-YYYY");

            if (dateRowA.isSame(dateRowB, "day")) {
                return 0;
            } else if (dateRowA.isBefore(dateRowB, "day")) {
                return -1;
            } else {
                return 1;
            }
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Presensi" />
        ),
        filterFn: (row, columnId, filterValue) => {
            let constraintDate = {
                start: dayjs(filterValue.tgl_start),
                end: dayjs(filterValue.tgl_end),
            };
            let rowDate = dayjs(row.original.tgl_presensi, "DD-MM-YYYY");

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
        accessorKey: "status",
        filterFn: "equals",
        sortingFn: (rowA, rowB, columnId) => {
            let dataRowA = rowA.original.status;
            let dataRowB = rowB.original.status;

            const priority = {
                "HADIR": 1,
                "IJIN": 2,
                "ALPHA": 3,
                "LAINNYA": 4
            };

            return priority[dataRowA] - priority[dataRowB];

        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const data = row.original;
            const latestPresensi = data[data.length - 1]; 

            switch (data.status) {
                case "HADIR":
                return (
                    <span className=" bg-green-500 text-white p-2 rounded cursor-default">
                        Hadir
                    </span>
                );
                case "IJIN":
                return (
                    <span className=" bg-yellow-500 text-white p-2 rounded cursor-default">
                        Ijin
                    </span>
                ); 
                case "ALPHA":
                return (
                    <span className=" bg-red-500 text-white p-2 rounded cursor-default">
                        Alpha
                    </span>
                );  
                default:
                    return (
                    <span className=" bg-gray-500 text-white p-2 rounded cursor-default">
                            Lainnya
                    </span>
                );   
            } 
        },
    },
    {
        accessorKey: "keterangan",
        filterFn: "includesString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" />
        ),
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const user = row.original;
            const [open, setOpen] = useState(false);
            const tableState = table.getState();

            const handleDelete = () => {
                toast.promise(
                    () => deleteDataPresensi(user.id),
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
                                    href={HREF_URL.PRESENSI_DETAIL(user.id)}
                                    className="w-full"
                                    data-e2e="btn-detail
                                "
                                >
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={HREF_URL.PRESENSI_EDIT(user.id)}
                                    className="w-full"
                                    data-e2e="btn-edit"
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <p
                                    className="text-red-500 cursor-pointer"
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
