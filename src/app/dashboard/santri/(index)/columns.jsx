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
import { deleteSantri } from "./edit/[...slug]/_actions/editSantri";

/*
model Santri {
  id           Int          @id @default(autoincrement())
  nama_lengkap String       @db.VarChar(100)
  alamat       String       @db.VarChar(255)
  email        String       @db.VarChar(100)
  hp           String?      @db.VarChar(25)
  tempat_lahir String       @db.VarChar(100)
  tgl_lhr      DateTime
  foto         String       @db.VarChar(100)
  WaliSantri   WaliSantri[]
}
*/

export const columns = [
    {
        accessorKey: "no",
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
        header: "Nama Lengkap",
    },
    {
        accessorKey: "alamat",
        header: "Alamat",
    },
    {
        accessorKey: "hp",
        header: "No. HP",
    },
    {
        accessorKey: "nama_wali",
        header: "Nama Wali",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [open, setOpen] = useState(false);
            const user = row.original;

            const handleDelete = () => {
                toast.promise(
                    () => deleteSantri(user.id, user.foto),
                    {
                        pending: "Menghapus data",
                        success: {
                            render({ data }) {
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
                                    href={`/dashboard/santri/detail/${user.id}`}
                                    className="w-full"
                                >
                                    Detail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={`/dashboard/santri/edit/${user.id}`}
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
