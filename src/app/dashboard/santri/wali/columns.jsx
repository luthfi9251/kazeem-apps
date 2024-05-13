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

export const columns = [
    {
        accessorKey: "nama_wali",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "tgl_lhr",
        header: "Tanggal Lahir",
        cell: ({ row }) => {
            const tgl = new Date(row.original.tgl_lhr);
            let date = `${tgl.getDate()}/${
                tgl.getMonth() + 1 > 9
                    ? tgl.getMonth() + 1
                    : "0" + (tgl.getMonth() + 1)
            }/${tgl.getFullYear()}`;
            return date;
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
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
