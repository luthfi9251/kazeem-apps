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
        id: "no",
        header: "No.",
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
        header: "Nama Siswa",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "kode_ta",
        header: "Tahun Akademik",
    },
    {
        id: "actions",
        header: "Actions",
        cell: (data) => {
            const user = data.row.original;
            const idKelas = data.table.getState().idKelas;
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
                                href={HREF_URL.SANTRI_DETAIL(
                                    user.santri_id,
                                    HREF_URL.KEMADRASAHAN_KELAS_DETAIL(idKelas)
                                )}
                                className="w-full"
                                data-e2e="btn-detail"
                            >
                                Detail
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
