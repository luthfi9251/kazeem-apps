"use client";

import { addHafalanSantri } from "@/actions/hafalan";
import { createKamarSantri } from "@/actions/kamar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const hafalanSchema = yup.object({
    // id_jenis_hafalan: yup.number().required("Jenis hafalan wajib diisi!"),
    hafalan_baru: yup.string().required("Hafalan baru wajib diisi!"),
    tgl_hafalan: yup.date().required("Tanggal wajib diisi!"),
    keterangan: yup.string().optional(),
});

export default function CreateModal({
    open,
    onOpenChange,
    santriId,
    jenis_hafalan_list,
}) {
    const formHafalan = useForm({
        resolver: yupResolver(hafalanSchema),
        defaultValues: {
            id_santri: "",
            id_jenis_hafalan: "2",
            hafalan_baru: "",
            tgl_hafalan: new Date().toISOString(),
            keterangan: "",
        },
        values: {
            id_santri: santriId[0],
        },
    });

    const onSubmitHandler = (formData) => {
        toast.promise(
            () => addHafalanSantri(formData),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        formHafalan.reset();
                        onOpenChange(false);
                        return "Data berhasil disimpan";
                    },
                },
                error: {
                    render({ data }) {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Kamar Santri</DialogTitle>
                </DialogHeader>
                <Form {...formHafalan}>
                    <form
                        onSubmit={formHafalan.handleSubmit(onSubmitHandler)}
                        className="grid grid-cols-1 gap-5 mt-4"
                    >
                        <FormField
                            control={formHafalan.control}
                            name="id_jenis_hafalan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Hafalan</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Jenis Hafalan" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {jenis_hafalan_list.map(
                                                (item, i) => (
                                                    <SelectItem
                                                        value={"" + item.id}
                                                        key={i}
                                                    >
                                                        {item.jenis_hafalan}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formHafalan.control}
                            name="hafalan_baru"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Hafalan Baru</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formHafalan.control}
                            name="tgl_hafalan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Tanggal Hafalan
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="tgl_hafalan"
                                            id="tgl_hafalan"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formHafalan.control}
                            name="keterangan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Keterangan</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="bg-kazeem-primary hover:bg-kazeem-darker">
                            Tambah
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
