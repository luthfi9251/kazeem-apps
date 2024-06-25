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
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <div className="px-1">
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            </div>
        ),
    },
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
        cell: ({ row, table }) => {
            const user = row.original;
            const idKelas = table.getState().idKelas;
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
                                    HREF_URL.KEMADRASAHAN_KELAS_EDIT(idKelas)
                                )}
                                className="w-full"
                                data-e2e="btn-detail"
                            >
                                Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p
                                className="w-full cursor-pointer"
                                data-e2e="btn-hapus"
                                onClick={() =>
                                    table.options.meta.deleteHandler(user.id)
                                }
                            >
                                Hapus
                            </p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <p
                                className="w-full cursor-pointer"
                                data-e2e="btn-pindah"
                                onClick={() =>
                                    table.options.meta.openPindahDialog(user.id)
                                }
                            >
                                Pindah Kelas
                            </p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
