"use client";
import "dayjs/locale/id";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

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
        accessorKey: "nama_penyakit",
        filterFn: "includesString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sakit" />
        ),
    },
    {
        accessorKey: "tgl_masuk",
        sortingFn: (rowA, rowB, columnId) => {
            let dateRowA = dayjs(rowA.original.tgl_masuk);
            let dateRowB = dayjs(rowB.original.tgl_masuk);

            if (dateRowA.isSame(dateRowB, "day")) {
                return 0;
            } else if (dateRowA.isBefore(dateRowB, "day")) {
                return -1;
            } else {
                return 1;
            }
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Masuk" />
        ),
        cell: ({ row }) =>
            dayjs(row.original.tgl_masuk).locale("id").format("DD MMMM YYYY"),
    },
    {
        accessorKey: "tgl_keluar",
        sortingFn: (rowA, rowB, columnId) => {
            let dateRowA = dayjs(rowA.original.tgl_keluar);
            let dateRowB = dayjs(rowB.original.tgl_keluar);

            if (dateRowA.isSame(dateRowB, "day")) {
                return 0;
            } else if (dateRowA.isBefore(dateRowB, "day")) {
                return -1;
            } else {
                return 1;
            }
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Keluar" />
        ),
        cell: ({ row }) =>
            row.original.tgl_keluar
                ? dayjs(row.original.tgl_keluar)
                      .locale("id")
                      .format("DD MMMM YYYY")
                : "-",
    },
    {
        accessorKey: "nama_kelas",
        filterFn: "equals",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kelas" />
        ),
    },
    {
        accessorKey: "kode_ta",
        filterFn: "equals",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TA" />
        ),
    },
    {
        accessorKey: "status",
        filterFn: "equals",
        sortingFn: (rowA, rowB, columnId) => {
            let dataRowA = rowA.original.status;
            let dataRowB = rowB.original.status;

            if (dataRowA === dataRowB) {
                return 0;
            } else {
                if (dataRowA === "PERAWATAN") {
                    return 1;
                } else {
                    return -1;
                }
            }
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const data = row.original;

            if (data.status === "PERAWATAN") {
                return (
                    <span className=" bg-yellow-500 text-white p-2 rounded cursor-default">
                        Perawatan
                    </span>
                );
            } else {
                return (
                    <span className=" bg-green-600 text-white p-2 rounded cursor-default">
                        Sembuh
                    </span>
                );
            }
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <>
                    <Dialog>
                        <DialogTrigger>
                            <Info className="h-4 w-4" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Detail Pelanggaran</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-5 text-sm">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black">
                                        Kategori
                                    </h4>
                                    <p>{row.original.kategori}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black">
                                        Penanganan
                                    </h4>
                                    <p>{row.original.penanganan}</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
