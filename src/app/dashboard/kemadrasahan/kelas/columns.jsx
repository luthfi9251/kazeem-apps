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
        accessorKey: "nama_kelas",
        header: "Nama Kelas",
    },
    {
        accessorKey: "tingkatan",
        header: "Tingkatan",
    },
    {
        accessorKey: "paralel",
        header: "Paralel",
    },
    {
        accessorKey: "ta",
        header: "Tahun Akademik",
    },
    {
        accessorKey: "jumlah_siswa",
        header: "Jumlah Siswa",
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
                                href={`/dashboard/pelanggaran/kategori/detail/${user.id}`}
                                className="w-full"
                                data-e2e="btn-detail"
                            >
                                Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={`/dashboard/pelanggaran/kategori/edit/${user.id}`}
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
