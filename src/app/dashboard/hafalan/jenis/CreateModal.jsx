"use client";

import { addJenisHafalan } from "@/actions/hafalan";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const jenisHafalanSchema = yup.object({
    jenis_hafalan: yup
        .string()
        .max(100, "Panjang maksimal 100 karakter!")
        .required("Nama jenis wajib diisi!"),
});

export default function CreateModal({ open, onOpenChange }) {
    const formHafalan = useForm({
        resolver: yupResolver(jenisHafalanSchema),
        defaultValues: {
            jenis_hafalan: "",
        },
    });

    const onSubmitHandler = (formData) => {
        toast.promise(
            () => addJenisHafalan(formData),
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
                    <DialogTitle>Tambah Jenis Hafalan</DialogTitle>
                </DialogHeader>
                <Form {...formHafalan}>
                    <form
                        onSubmit={formHafalan.handleSubmit(onSubmitHandler)}
                        className="grid grid-cols-1 gap-5 mt-4"
                    >
                        <FormField
                            control={formHafalan.control}
                            name="jenis_hafalan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Jenis Hafalan
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
