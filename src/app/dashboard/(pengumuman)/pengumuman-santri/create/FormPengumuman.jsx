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
import { useRecipientStore } from "@/providers/pengumumanRecipientProviders";
import { kirimPengumumanSantri } from "@/actions/pengumuman";

const pengumumanSchema = yup.object({
    judul: yup.string().required("Judul wajib diisi!"),
    teks: yup.string().required("Teks wajib diisi!"),
});

export default function FormPengumuman({ data }) {
    const router = useRouter();
    const form = useForm({
        resolver: yupResolver(pengumumanSchema),
        defaultValues: {
            judul: "",
            teks: "",
        },
    });
    const recipientList = useRecipientStore((state) => state.recipient);

    const onSubmitHandler = (formData) => {
        if (recipientList.length < 1) {
            toast.error("Anda belum memilih penerima pengumuman!", {
                position: "bottom-right",
                autoClose: 5000,
            });
            return;
        }

        const normalizedRecipient = recipientList.map((item) => ({
            recipient_name: item.nama_santri,
            recipient_type: "WALI_SANTRI",
            recipient_number: item.no_hp_wali[0],
        }));

        toast.promise(
            () => kirimPengumumanSantri(formData, normalizedRecipient),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) {
                            throw data.error;
                        }
                        router.push(HREF_URL.PENGUMUMAN_SANTRI);
                        return "Pengumuman berhasil dikirim";
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="grid grid-cols-1 gap-5 mt-4"
            >
                <FormField
                    control={form.control}
                    name="judul"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel required>Judul</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="teks"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel required>Teks</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        className=" bg-kazeem-primary hover:bg-kazeem-darker"
                        type="submit"
                    >
                        Kirim Pengumuman
                    </Button>
                </div>
            </form>
        </Form>
    );
}
