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
import MenuItemDeleteAction from "@/components/MenuItemDeleteAction";
import { deleteWaliSantri } from "./_actions/walisantri";
import Link from "next/link";
import { toast } from "react-toastify";
import "dayjs/locale/id";
import dayjs from "dayjs";

export const columns = [
    {
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "nama_wali",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "tgl_lhr",
        header: "Tanggal Lahir",
        cell: ({ row }) => {
            return dayjs(row.original.tgl_lhr)
                .locale("id")
                .format("DD MMMM YYYY");
        },
    },
    {
        accessorKey: "hp",
        header: "No. HP",
    },
    {
        accessorKey: "santri_count",
        header: "Jumlah Perwalian",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            const [open, setOpen] = useState(false);

            const handleDelete = () => {
                toast.promise(
                    () => deleteWaliSantri(user.id),
                    {
                        pending: "Menghapus data",
                        success: {
                            render({ _data }) {
                                return "Data berhasil dihapus";
                            },
                        },
                        error: {
                            render({ data }) {
                                // When the promise reject, data will contains the error
                                return `Kesalahan saat menghapus data, pastikan wali tidak memiliki perwalian!`;
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link
                                    href={`/dashboard/santri/wali/detail/${user.id}`}
                                    className="w-full"
                                >
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={`/dashboard/santri/wali/edit/${user.id}`}
                                    className="w-full"
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
