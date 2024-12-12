"use client";

import { addIzinPulangSantri } from "@/actions/izin";
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

const perizinanSchema = yup.object({
    keperluan: yup.string().required("Keperluan wajib diisi!"),
    tgl_izin: yup.date().required("Tanggal wajib diisi!"),
    tgl_kembali: yup.date().optional(),
    statusIzin: yup.string().default("SEDANG_BERLANGSUNG").required(),
    keterangan: yup.string().optional(),
});

export default function CreateModal({
    open,
    onOpenChange,
    santriId,
}) {
    const formPerizinan = useForm({
        resolver: yupResolver(perizinanSchema),
        defaultValues: {
            id_santri: "",
            keperluan: "",
            tgl_izin: new Date().toISOString(),
            tgl_kembali: new Date().toISOString(),
            statusIzin: "SEDANG_BERLANGSUNG",
            keterangan: "",
        },
        values: {
            id_santri: santriId[0],
        },
    });
    
    const onSubmitHandler = (formData) => {       
        toast.promise(
            () => addIzinPulangSantri(formData),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        formPerizinan.reset();
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
                    <DialogTitle>Tambah Izin Pulang Santri</DialogTitle>
                </DialogHeader>
                <Form {...formPerizinan}>
                    <form
                        onSubmit={formPerizinan.handleSubmit(onSubmitHandler)}
                        className="grid grid-cols-1 gap-5 mt-4"
                    >
                        <FormField
                            control={formPerizinan.control}
                            name="keperluan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Keperluan</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formPerizinan.control}
                            name="tgl_izin"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Tanggal Izin
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="tgl_izin"
                                            id="tgl_izin"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formPerizinan.control}
                            name="tgl_kembali"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Kembali</FormLabel>
                                    <FormControl>
                                        <input
                                            className="border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="tgl_kembali"
                                            id="tgl_kembali"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formPerizinan.control}
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
