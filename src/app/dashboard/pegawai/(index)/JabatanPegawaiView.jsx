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
import { JabatanContext } from "./JabatanDataProvider";
import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JabatanPegawaiView(props) {
    let pathname = usePathname();
    let { disabled, allowDetail = true } = props;
    let [dataJabatan, setJabatanGroup] = useContext(JabatanContext);
    let handleDelete = (data) => {
        let filtered = dataJabatan.filter(
            (item) => item.nama_jabatan !== data.nama_jabatan
        );
        setJabatanGroup([...filtered]);
    };

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama Jabatan</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataJabatan.map((item, i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {item.nama_jabatan}
                            </TableCell>
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
                                        <DropdownMenuItem
                                            disabled={!allowDetail}
                                        >
                                            <Link
                                                className="flex gap-3 cursor-pointer w-full"
                                                href={`/dashboard/pegawai/jabatan/detail/${item.id}?back=${pathname}`}
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
