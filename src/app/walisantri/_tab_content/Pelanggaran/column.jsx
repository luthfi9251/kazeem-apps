"use client";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { Button } from "@/components/ui/button";
import { ChevronRight, Info, MoreVertical } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

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
        accessorKey: "created_at",
        cell: ({ row }) =>
            dayjs(row.original.created_at).locale("id").format("DD MMMM YYYY"),
        sortingFn: (rowA, rowB, columnId) => {
            let dateRowA = dayjs(rowA.original.tanggal);
            let dateRowB = dayjs(rowB.original.tanggal);

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
    },
    {
        accessorKey: "Kategori.nama_pelanggaran",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pelanggaran" />
        ),
    },
    {
        id: "kelas",
        accessorKey: "nama_kelas",
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
        accessorKey: "Kategori.jenis",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis" />
        ),
    },
    {
        accessorKey: "Kategori.poin",
        header: "Poin",
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
                            <div className="flex flex-col gap-5">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black">
                                        Kategori
                                    </h4>
                                    <p>{row.original.Kategori.kategori}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black">
                                        Keterangan
                                    </h4>
                                    <p>{row.original.konsekuensi}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black">
                                        Konsekuensi
                                    </h4>
                                    <p>{row.original.konsekuensi}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-black">
                                        Berkas Penunjang
                                    </h4>
                                    <p>
                                        {row.original.berkas_penunjang ? (
                                            <Link
                                                href={`/api/${row.original.berkas_penunjang}`}
                                                className="w-full"
                                                data-e2e="btn-download"
                                                prefetch={false}
                                            >
                                                Unduh Berkas Penunjang
                                            </Link>
                                        ) : (
                                            "-"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
