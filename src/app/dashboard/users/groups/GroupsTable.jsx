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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    SquareArrowRight,
    SquareArrowDown,
    Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState, useContext, useCallback } from "react";
import ModalEditGroupContext from "./ModalEditGroupContext";
import { GroupContext } from "./GroupDataProvider";

export default function GroupsTable() {
    let [search, setSearch] = useState("");
    let [dataGroup, setDataGroup] = useContext(GroupContext);
    let [data, setData] = useState(dataGroup);
    let [activeGroup, setActiveGroup] = useState(null);
    let [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (search === "") {
            setData(dataGroup);
            return;
        }
        let filtered = dataGroup.filter((item) =>
            item.nama_group.toLowerCase().includes(search.toLowerCase())
        );
        setData(filtered);
    }, [search]);

    useEffect(() => {
        setData([...dataGroup]);
    }, [dataGroup]);

    return (
        <div className="bg-blue-1010 py-2 px-2 flex items-start justify-start flex-col">
            <Input
                className="self-start w-2/3 md:w-1/3 mb-3"
                placeholder="Cari Grup"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[25px]">Id</TableHead>
                        <TableHead>Nama grup</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <ModalEditGroupContext
                    isOpen={isModalOpen}
                    setIsOpen={setModalOpen}
                    group={activeGroup}
                    data={data}
                    setData={setData}
                >
                    <TableBody>
                        {data.map((item, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">
                                        {item.id}
                                    </TableCell>
                                    <TableCell>{item.nama_group}</TableCell>
                                    <TableCell>{item.deskripsi}</TableCell>
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
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        setActiveGroup(item);
                                                    }}
                                                    className="w-full flex justify-between"
                                                >
                                                    Edit Grup{" "}
                                                    <SquareArrowDown className="md:hidden h-4 w-4" />{" "}
                                                    <SquareArrowRight className="hidden md:inline-block h-4 w-4" />
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={`/dashboard/users/action/`}
                                                        className="w-full flex justify-between"
                                                    >
                                                        Hapus Grup{" "}
                                                        <Trash2 className="h-4 w-4" />
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </ModalEditGroupContext>
            </Table>
        </div>
    );
}
