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

const perizinanSchema = yup.object({
    statusIzin: yup.string().required(),
    keterangan: yup.string().when("statusIzin", {
        is: (statusIzin) => ["MELEBIHI_BATAS_WAKTU", "DISPENSASI_TERLAMBAT"].includes(statusIzin),
        then: (schema) => schema.required("Field keterangan wajib diisi dengan alasan keterlambatan dan durasi melebihi batas waktu izin."),
        otherwise: (schema) => schema.optional(),
    }),
});

export default function ConfirmationStatusModal({
    data,
    open,
    onOpenChange,
    santriId,
}) {
    const [placeholder, setPlaceholder] = useState("Tambahkan catatan terkait terkait perizinan");
    
    const formPerizinan = useForm({
        resolver: yupResolver(perizinanSchema),
        values: {
            id_santri: santriId[0],
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
                        Konfirmasi Perizinan Pulang Santri
                    </DialogTitle>
                </DialogHeader>
                <Form {...formPerizinan}>
                    <form
                        onSubmit={formPerizinan.handleSubmit(onSubmitHandler)}
                        className="grid grid-cols-1 gap-5 mt-4"
                    >
                        <FormField
                            control={formPerizinan.control}
                            name="statusIzin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status Izin</FormLabel>
                                    <div className="flex flex-col space-y-2 mt-2">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                value="MELEBIHI_BATAS_WAKTU"
                                                checked={
                                                    field.value ===
                                                    "MELEBIHI_BATAS_WAKTU"
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPlaceholder(
                                                        "Berikan alasan dan durasi keterlambatan secara jelas"
                                                    );
                                                }}
                                                className="form-radio"
                                            />
                                            <span>Melebihi Batas Waktu</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                value="DISPENSASI_TERLAMBAT"
                                                checked={
                                                    field.value ===
                                                    "DISPENSASI_TERLAMBAT"
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPlaceholder(
                                                        "Berikan alasan dan durasi keterlambatan secara jelas"
                                                    );
                                                }}
                                                className="form-radio"
                                            />
                                            <span>Dispensasi Keterlambatan</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                value="TELAH_SELESAI"
                                                checked={
                                                    field.value ===
                                                    "TELAH_SELESAI"
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPlaceholder(
                                                        "Tambahkan catatan terkait terkait perizinan (optional)"
                                                    );
                                                }}
                                                className="form-radio"
                                            />
                                            <span>Selesai Tepat Waktu</span>
                                        </label>
                                    </div>
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
                                            {...field}
                                            rows={3}
                                            placeholder={placeholder}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button className="bg-kazeem-primary hover:bg-kazeem-darker">
                            Simpan
                            </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
