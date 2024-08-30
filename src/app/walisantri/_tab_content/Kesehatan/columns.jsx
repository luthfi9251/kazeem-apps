"use client";
import "dayjs/locale/id";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DataTableColumnHeader } from "@/components/DataTableHeader";

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
            let dateRowA = dayjs(rowA.original.tgl_masuk, "DD-MM-YYYY");
            let dateRowB = dayjs(rowB.original.tgl_masuk, "DD-MM-YYYY");

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
        filterFn: (row, columnId, filterValue) => {
            let constraintDate = {
                start: dayjs(filterValue.tgl_start),
                end: dayjs(filterValue.tgl_end),
            };
            let rowDate = dayjs(row.original.tgl_masuk, "DD-MM-YYYY");

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
        accessorKey: "tgl_keluar",
        sortingFn: (rowA, rowB, columnId) => {
            let dateRowA = dayjs(rowA.original.tgl_keluar, "DD-MM-YYYY");
            let dateRowB = dayjs(rowB.original.tgl_keluar, "DD-MM-YYYY");

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
        cell: ({ row }) => row.original.tgl_keluar || "-",
        filterFn: (row, columnId, filterValue) => {
            let constraintDate = {
                start: dayjs(filterValue.tgl_start),
                end: dayjs(filterValue.tgl_end),
            };
            let rowDate = dayjs(row.original.tgl_keluar, "DD-MM-YYYY");

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
        accessorKey: "kelas",
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
];
