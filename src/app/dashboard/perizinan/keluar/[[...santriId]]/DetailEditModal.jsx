"use client";

import { editIzinKeluarSantri } from "@/actions/izin";
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
    tujuan: yup.string().required("Tujuan wajib diisi!"),
    keperluan: yup.string().required("Keperluan wajib diisi!"),
    tgl_izin: yup.date().required("Tanggal wajib diisi!"),
    jam_keluar: yup.string().required("Jam keluar wajib diisi!").matches(/^\d{2}:\d{2}$/, "Jam keluar tidak valid"),
    jam_kembali: yup.string().required("Jam kembali wajib diisi!").matches(/^\d{2}:\d{2}$/, "Jam kembali tidak valid"),
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
            tujuan: data?.tujuan,
            keperluan: data?.keperluan,
            tgl_izin: dayjs(data?.tgl_izin).format("YYYY-MM-DD"),
            jam_keluar: dayjs(data?.jam_keluar).format("HH:mm"),
            jam_kembali: dayjs(data?.jam_kembali).format("HH:mm"),
            statusIzin: data?.statusIzin,
            keterangan: data?.keterangan || "",
        },
    });

    const onSubmitHandler = (formData) => {
        const tglIzin = formData.tgl_izin;
        const jamKeluar = formData.jam_keluar;
        const jamKembali = formData.jam_kembali;

        formData.jam_keluar = new Date(`${tglIzin.toISOString().split("T")[0]}T${jamKeluar}:00`);
        formData.jam_kembali = new Date(`${tglIzin.toISOString().split("T")[0]}T${jamKembali}:00`);  
        toast.promise(
            () => editIzinKeluarSantri(data.id, formData),
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
                        {edit ? "Edit" : "Detail"} Peizinan Non-Kepulangan Santri
                    </DialogTitle>
                </DialogHeader>
                <Form {...formPerizinan}>
                    <form
                        onSubmit={formPerizinan.handleSubmit(onSubmitHandler)}
                        className="grid grid-cols-1 gap-5 mt-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={formPerizinan.control}
                            name="tujuan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Tujuan</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="text"
                                            name="tujuan"
                                            id="tujuan"
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
                            name="jam_keluar"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Jam Keluar
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="time"
                                            name="jam_keluar"
                                            id="jam_keluar"
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
                        <FormField
                            control={formPerizinan.control}
                            name="jam_kembali"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Jam Kembali
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                            type="time"
                                            name="jam_kembali"
                                            id="jam_kembali"
                                            disabled={!edit}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
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
