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
    nama_pelajaran: yup.string().required(),
    deskripsi: yup.string().optional(),
});

const PelajaranForm = forwardRef((props, ref) => {
    const form = useForm({
        resolver: yupResolver(formSchema),
    });

    function onSubmit(values) {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={form.control}
                    name="nama_pelajaran"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Pelajaran</FormLabel>
                            <FormControl>
                                <Input placeholder="Kimia" type="" {...field} />
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
