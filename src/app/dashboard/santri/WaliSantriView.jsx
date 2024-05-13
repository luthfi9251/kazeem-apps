"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { WaliContext } from "./WaliDataProvider";
import { useContext } from "react";
import Link from "next/link";

export default function WaliSantriView(props) {
    let { disabled } = props;
    let [dataWali, setWaliGroup] = useContext(WaliContext);
    let handleDelete = (data) => {
        let filtered = dataWali.filter(
            (item) => item.nama_wali !== data.nama_wali
        );
        setWaliGroup([...filtered]);
    };

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama Wali</TableHead>
                    <TableHead>Peran</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataWali.map((item, i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {item.nama_wali}
                            </TableCell>
                            <TableCell>{item.peran}</TableCell>
                            <TableCell className="text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem disabled={disabled}>
                                            <div
                                                className="flex gap-3 cursor-pointer"
                                                onClick={() => {
                                                    handleDelete(item);
                                                }}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                                Hapus
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                className="flex gap-3 cursor-pointer w-full"
                                                href={`/dashboard/santri/wali/detail/${item.id}`}
                                            >
                                                <PenLine className="h-5 w-5" />
                                                Detail
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
