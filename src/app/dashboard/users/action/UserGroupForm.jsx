"use client";

import { Trash2 } from "lucide-react";
import { GroupContext } from "./[[...slug]]/ActionPage";
import { useContext } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

export default function UserGroupForm({ groups, userGroups, getData }) {
    const [groupSelected, setGroupSelected] = useContext(GroupContext);

    let handleDeleteGroup = (id) => {
        let filteredGroup = [...groupSelected].filter((item) => {
            return item.group.id !== id;
        });
        setGroupSelected([...filteredGroup]);
    };

    let handleAddGrup = (dataGroup) => {
        let idToAdd = dataGroup.target[1].value;
        let copyGroup = [...groupSelected].some(
            (elem) => elem.group.id == idToAdd
        );

        if (!copyGroup) {
            let group = groups.find((item) => item.id == idToAdd);
            setGroupSelected([...groupSelected, { group }]);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Group</CardTitle>
                <CardDescription>mengatur Grup User</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Group</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groupSelected.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">
                                        {item.group.nama_group}
                                    </TableCell>
                                    <TableCell>
                                        {item.group.deskripsi}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            className="h-8 w-8 p-0"
                                            onClick={() =>
                                                handleDeleteGroup(item.group.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Separator />
                <div className="flex w-full space-x-2 items-end mt-5">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (e.target[1].value == "") return;
                            handleAddGrup(e);
                        }}
                        className="w-full flex items-end"
                    >
                        <div className="w-full flex flex-col gap-2 px-4">
                            <Label htmlFor="tambahGroup">Tambah Group</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Group" />
                                </SelectTrigger>
                                <SelectContent>
                                    {groups.map((item, i) => (
                                        <SelectItem
                                            key={i}
                                            value={item.id.toString()}
                                        >
                                            {item.nama_group}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="">
                            Tambah
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
