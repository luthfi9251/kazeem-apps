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

/*
model User {
  id           Int         @id
  username     String      @db.VarChar(100)
  password     String      @db.VarChar(100)
  email        String      @db.VarChar(100)
  nama_lengkap String      @db.VarChar(100)
  aktif        Boolean     @default(true)
  UserGroup    UserGroup[]
  wali         Wali[]
}
*/

export const columns = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "nama_lengkap",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "aktif",
        header: "Aktif",
        cell: ({ row }) => {
            return row.original.aktif ? "Aktif" : "Non-Aktif";
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
                            <Link href={`/dashboard/users/action/${user.id}`}>
                                Edit User
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
