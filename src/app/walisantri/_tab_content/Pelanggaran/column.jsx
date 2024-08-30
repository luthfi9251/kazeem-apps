"use client";
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
        id: "no",
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
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
];
