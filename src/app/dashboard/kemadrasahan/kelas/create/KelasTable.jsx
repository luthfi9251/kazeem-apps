"use client";

import { Trash2, Info } from "lucide-react";
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
import { KelasContext } from "./KelasDataProvider";
import { useContext } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { generateNamaKelas } from "@/lib/utils";

export default function KelasTable() {
    let [kelas, setKelas, allNamaKelas] = useContext(KelasContext);

    let handleDeleteKelas = (index) => {
        let copyKelas = [...kelas];
        copyKelas.splice(index, 1);
        setKelas([...copyKelas]);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Kelas</CardTitle>
                <CardDescription>Data kelas sementara</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Kelas</TableHead>
                            <TableHead className="w-[120px] text-center">
                                Tingkatan
                            </TableHead>
                            <TableHead className="w-[120px] text-center">
                                Paralel
                            </TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {kelas.map((item, i) => {
                            return (
                                <TableRow key={i} className="relative">
                                    <TableCell className="font-medium">
                                        {generateNamaKelas(
                                            item.tingkatan,
                                            item.separator,
                                            item.paralel
                                        )}
                                        {allNamaKelas.includes(
                                            generateNamaKelas(
                                                item.tingkatan,
                                                item.separator,
                                                item.paralel
                                            )
                                        ) && (
                                            <p className="bottom-0 left-3 flex items-center bg-yellow-300 p-1 text-xs gap-2 rounded-sm cursor-default">
                                                <Info className="h-4 w-4" />
                                                Kelas sudah ada
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.tingkatan}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.paralel}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            onClick={() => handleDeleteKelas(i)}
                                            className=" bg-red-600 hover:bg-red-300"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
