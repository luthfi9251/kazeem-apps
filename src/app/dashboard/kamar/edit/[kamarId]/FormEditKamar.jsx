"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateKamarSantri } from "@/actions/kamar";
import { useRouter } from "next/navigation";
import { HREF_URL } from "@/navigation-data";

const kamarSchema = yup.object({
    nama_kamar: yup
        .string()
        .max(100, "Panjang maksimal 100 karakter!")
        .required("Nama kamar wajib diisi!"),
    kapasitas: yup.number().default(10),
    deskripsi: yup
        .string()
        .max(255, "Panjang maksimal 255 karakter")
        .optional(),
});

export default function FormEditKamar({ data }) {
    const router = useRouter();
    const formKamar = useForm({
        resolver: yupResolver(kamarSchema),
        defaultValues: {
            nama_kamar: data.nama_kamar,
            kapasitas: data.kapasitas,
            deskripsi: data.deskripsi,
        },
    });
    const onSubmitHandler = (formData) => {
        toast.promise(
            () => updateKamarSantri(data.id, formData),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        formKamar.reset();
                        router.push(HREF_URL.KAMAR_SANTRI_HOME);
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
        <Form {...formKamar}>
            <form
                onSubmit={formKamar.handleSubmit(onSubmitHandler)}
                className="grid grid-cols-1 gap-5 mt-4"
            >
                <FormField
                    control={formKamar.control}
                    name="nama_kamar"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel required>Nama Kamar</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formKamar.control}
                    name="kapasitas"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel required>Kapasitas</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formKamar.control}
                    name="deskripsi"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={3} />
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
    );
}
