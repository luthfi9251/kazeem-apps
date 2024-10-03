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
        accessorKey: "nama_kamar",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Kamar" />
        ),
    },
    {
        accessorKey: "kapasitas",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kapasitas" />
        ),
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
                                    href={HREF_URL.KAMAR_SANTRI_DETAIL(user.id)}
                                    className="w-full"
                                    data-e2e="btn-detail"
                                >
                                    Detail
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
