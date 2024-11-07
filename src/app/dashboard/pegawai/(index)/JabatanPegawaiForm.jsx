"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import jabatanPegawaiSchema from "../yup-jabatan-pegawai-schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useContext, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { JabatanContext } from "./JabatanDataProvider";
// import { valuesIn } from "cypress/types/lodash";

function DialogFormJabatan({ open, openChange, context }) {
    let [dataJabatan, setJabatanGroup] = context;
    let user = false;
    const form = useForm({
        resolver: yupResolver(jabatanPegawaiSchema),
        defaultValues: {
            nama_jabatan: user ? user.nama_pegawai : "",
        },
    });

    let onSubmit = (data) => {
        let isAlreadyAdd = dataJabatan.find(
            (element) => element.nama_jabatan == data.nama_jabatan
        );

        if (!isAlreadyAdd) {
            const newId = Date.now();
            const newJabatan = { ...data, id: newId };
            
            setJabatanGroup([...dataJabatan, newJabatan]);
        }
        form.reset();
        openChange(false);
    };
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent className=" w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Jabatan</DialogTitle>
                    <DialogDescription>
                        Jika data jabatan belum ada, silahkan tambah data jabatan.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        id="form-jabatan"
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="nama_jabatan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Nama Jabatan</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Tambah Jabatan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function JabatanPegawaiForm({
    disabled = false,
    listJabatan = []
}) {

    let [isOpen, setIsOpen] = useState(false);
    const jabatanContextVal = useContext(JabatanContext);
    const [dataJabatan, setJabatanGroup] = jabatanContextVal;
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteJabatan = (id) => {
        setJabatanGroup(dataJabatan.filter((item) => item.id !== id));
    };

    const handleSelectJabatan = () => {
        const jabatan = listJabatan.find((item) => item.id === selectedId);
        if (jabatan && !dataJabatan.some((item) => item.nama_jabatan === jabatan.nama_jabatan)) {
            setJabatanGroup([...dataJabatan, jabatan]);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Data Jabatan</CardTitle>
                    <CardDescription> </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Jabatan</TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataJabatan.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.nama_jabatan}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                        className="h-8 w-8 p-0"
                                        onClick={() => 
                                            handleDeleteJabatan(
                                                item.id
                                            )
                                        }
                                        disabled={disabled}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Separator />
                    <div className="flex w-full space-x-2 items-end mt-5">
                            <div className="w-full flex flex-col gap-2 px-4">
                            <Label htmlFor="tambahJabatan">Pilih Jabatan</Label>
                            <Select disabled={disabled} onValueChange={(value) => setSelectedId(parseInt(value))} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jabatan"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {listJabatan.length > 0 ? (
                                        listJabatan.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                {item.nama_jabatan}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-2">
                                        Tidak ada jabatan tersedia
                                        </p>
                                    )}
                                </SelectContent>
                            </Select>
                            </div>
                            <Button 
                            onClick={handleSelectJabatan}
                            disabled={disabled}
                            >Pilih
                            </Button>                   
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                        disabled={disabled}
                    >
                        Tambah
                    </Button>
                    </div>
                    <DialogFormJabatan
                        open={isOpen}
                        openChange={setIsOpen}
                        context={jabatanContextVal}
                        setJabatanGroup={setJabatanGroup}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
