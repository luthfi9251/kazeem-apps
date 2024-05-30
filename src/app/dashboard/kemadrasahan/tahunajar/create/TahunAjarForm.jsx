"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export default function TahunAjarForm({
    data,
    onSubmit,
    form,
    title = "Tambah Tahun Ajar",
    disabled = false,
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Hanya boleh ada 1 TA Aktif, apabila sudah ada TA aktif, maka
                    TA tersebut akan dinon-aktifkan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className=" space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="tgl_mulai"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Mulai</FormLabel>
                                    <FormControl>
                                        <input
                                            type="date"
                                            {...field}
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tgl_selesai"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Selesai</FormLabel>
                                    <FormControl>
                                        <input
                                            type="date"
                                            {...field}
                                            className=" border-slate-100 border-2 text-sm w-full p-2 rounded-sm outline-slate-200"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kode_ta"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Kode TA</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aktif"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="aktif"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <label
                                                htmlFor="aktif"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Aktif
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className=" bg-kazeem-secondary hover:bg-kazeem-darker"
                        >
                            Simpan
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
