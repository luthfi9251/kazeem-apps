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
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "nama_pelanggaran",
        header: "Nama Pelanggaran",
    },
    {
        accessorKey: "kategori",
        header: "Kategori",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.original.kategori}</span>;
        },
    },
    {
        accessorKey: "jenis",
        header: "Jenis",
    },
    {
        accessorKey: "poin",
        header: "Poin",
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
                                href={`/dashboard/pelanggaran/kategori/detail/${user.id}`}
                                className="w-full"
                            >
                                Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={`/dashboard/pelanggaran/kategori/edit/${user.id}`}
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
