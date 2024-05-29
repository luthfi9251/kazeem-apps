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
import { HREF_URL } from "@/navigation-data";
import Link from "next/link";

export const columns = [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "kode_ta",
        header: "Kode TA",
    },
    {
        accessorKey: "aktif",
        header: "Status",
        cell: ({ row }) => {
            return <span>{row.original.aktif ? "Aktif" : "Non-Aktif"}</span>;
        },
    },
    {
        accessorKey: "tgl_mulai",
        header: "Tanggal Mulai",
    },
    {
        accessorKey: "tgl_selesai",
        header: "Tanggal Selesai",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
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
                                href={HREF_URL.KEMADRASAHAN_KELAS_EDIT(user.id)}
                                className="w-full"
                                data-e2e="btn-edit"
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
