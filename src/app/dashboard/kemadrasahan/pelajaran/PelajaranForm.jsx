"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef } from "react";

const formSchema = yup.object({
    kode_mapel: yup.string().required(),
    nama_pelajaran: yup.string().required(),
    deskripsi: yup.string().optional(),
});

const PelajaranForm = forwardRef((props, ref) => {
    const defaultValueForm = {
        kode_mapel: "",
        nama_pelajaran: "",
        deskripsi: "",
    };

    const form = useForm({
        resolver: yupResolver(formSchema),

        values: props.defaultValue ?? defaultValueForm,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(props.handleSubmit)}
                className="space-y-8 "
            >
                <FormField
                    control={form.control}
                    name="kode_mapel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Kode Mata Pelajaran</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="A-001"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nama_pelajaran"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Nama Pelajaran</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Kimia"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="hidden" ref={ref}>
                    Submit
                </Button>
            </form>
        </Form>
    );
});

export default PelajaranForm;
