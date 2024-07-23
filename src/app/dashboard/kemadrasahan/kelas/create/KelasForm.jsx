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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function KelasForm({ data, onSubmit, form, disabled = false }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Kelas</CardTitle>
                <CardDescription>
                    Penambahan Kelas dapat dilakukan secara langsung dengan
                    menyertakan beberapa Tingkatan kelas dan Paralel kelas.
                    Contohnya Tingkatan 1,2 dan Paralel A,B akan menghasilkan
                    kelas 1A,1B,2A,2B
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
                            name="tingkatan_kelas"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tingkatan Kelas</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Pisahkan dengan tanda koma, Contoh : 1,2,3,4,5"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="separator_kelas"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Separator</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih separator nama kelas" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="STRIP">
                                                -
                                            </SelectItem>
                                            <SelectItem value="SPASI">
                                                (Spasi)
                                            </SelectItem>
                                            <SelectItem value="NONE">
                                                Tidak Ada
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Tanda hubung yang akan menghubungkan
                                        nama dan tingkatan kelas pada Nama Kelas
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paralel_kelas"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Paralel Kelas</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Pisahkan dengan tanda koma, Contoh : A,B,C,D,E"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className=" bg-kazeem-secondary hover:bg-kazeem-darker"
                        >
                            Buat Kelas
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
