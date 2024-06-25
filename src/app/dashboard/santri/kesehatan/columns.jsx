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
import { deleteDataKesehatan } from "../_actions/kesehatan";

export const columns = [
    {
        header: "No.",
        accessorKey: "no",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "nis",
        header: "NIS",
    },
    {
        accessorKey: "nama_lengkap",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "nama_penyakit",
        header: "Sakit",
    },
    {
        accessorKey: "tgl_masuk",
        header: "Tanggal Masuk",
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
    },
    {
        accessorKey: "kode_ta",
        header: "TA",
    },
    {
        accessorKey: "status",
        header: "Status",
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
        cell: ({ row, table }) => {
            const user = row.original;
            const [open, setOpen] = useState(false);
            const tableState = table.getState();

            const handleDelete = () => {
                toast.promise(
                    () => deleteDataKesehatan(user.id),
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
                                    href={HREF_URL.KESEHATAN_DETAIL(user.id)}
                                    className="w-full"
                                    data-e2e="btn-detail
                                "
                                >
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={HREF_URL.KESEHATAN_EDIT(user.id)}
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
