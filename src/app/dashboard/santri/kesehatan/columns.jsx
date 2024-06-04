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

import Link from "next/link";
import { HREF_URL } from "@/navigation-data";

export const columns = [
    {
        header: "No.",
        accessorKey: "no",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
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
        accessorKey: "penanganan",
        header: "Penanganan",
    },
    {
        accessorKey: "kategori",
        header: "Kategori",
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
        cell: ({ row }) => {
            const user = row.original;

            return (
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
                                href={HREF_URL.KESEHATAN_DETAIL(user.id)}
                                className="w-full"
                            >
                                Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={HREF_URL.KESEHATAN_EDIT(user.id)}
                                className="w-full"
                            >
                                Edit
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
