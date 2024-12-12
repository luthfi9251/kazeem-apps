"use client";

import { editIzinPulangSantri } from "@/actions/izin";
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
import dayjs from "dayjs";

const perizinanSchema = yup.object({
    keperluan: yup.string().required("Keperluan wajib diisi!"),
    tgl_izin: yup.date().required("Tanggal wajib diisi!"),
    tgl_kembali: yup.date().required("Tanggal wajib diisi!"),
    statusIzin: yup.string().required(),
    keterangan: yup.string().optional(),
});

export default function DetailEditModal({
    data,
    open,
    onOpenChange,
    santriId,
    edit = false,
}) {
    const formPerizinan = useForm({
        resolver: yupResolver(perizinanSchema),
        values: {
            id_santri: santriId[0],
            keperluan: data?.keperluan,
            tgl_izin: dayjs(data?.tgl_izin).format("YYYY-MM-DD"),
            tgl_kembali: dayjs(data?.tgl_kembali).format("YYYY-MM-DD"),
            statusIzin: data?.statusIzin,
            keterangan: data?.keterangan || "",
        },
    });

    const onSubmitHandler = (formData) => {
        toast.promise(
            () => editIzinPulangSantri(data.id, formData),
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
                    <DialogTitle>
                        {edit ? "Edit" : "Detail"} Peizinan Pulang Santri
                    </DialogTitle>
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
                                        <Textarea
                                            disabled={!edit}
                                            {...field}
                                            rows={3}
                                        />
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
                                            disabled={!edit}
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
                                    <FormLabel required>
                                        Tanggal Kembali
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="tgl_kembali"
                                            id="tgl_kembali"
                                            disabled={!edit}
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
                                        <Textarea
                                            disabled={!edit}
                                            {...field}
                                            rows={3}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {edit && (
                            <Button className="bg-kazeem-primary hover:bg-kazeem-darker">
                            Simpan
                            </Button>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
