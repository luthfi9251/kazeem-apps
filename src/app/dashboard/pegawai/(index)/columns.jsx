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
import Link from "next/link";
import { toast } from "react-toastify";
import { deletePegawai } from "./edit/[...slug]/_actions/editPegawai";
import "dayjs/locale/id";
import dayjs from "dayjs";

export const columns = [
    {
        accessorKey: "no",
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "id_pegawai",
        header: "ID Pegawai",
    },
    {
        accessorKey: "nama_pegawai",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "no_telp",
        header: "No. Telp",
    },
    {
        accessorKey: "tgl_lhr",
        header: "Tanggal Lahir",
        cell: ({ row }) =>
            dayjs(row.original.tgl_lhr).locale("id").format("DD MMMM YYYY"),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "nama_jabatan",
        header: "Jabatan",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [open, setOpen] = useState(false);
            const user = row.original;

            const handleDelete = () => {
                toast.promise(
                    () => deletePegawai(user.id),
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link
                                    href={`/dashboard/pegawai/detail/${user.id}`}
                                    className="w-full"
                                >
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={`/dashboard/pegawai/edit/${user.id}`}
                                    className="w-full"
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
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
