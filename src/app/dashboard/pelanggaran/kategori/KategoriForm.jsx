"use client";

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

export default function KategoriForm({ data, form, disabled = false }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Kategori Pelanggaran</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className=" space-y-6">
                        <FormField
                            control={form.control}
                            name="nama_pelanggaran"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Nama Pelanggaran
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kategori"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Kategori</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={disabled}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="RINGAN">
                                                    Ringan
                                                </SelectItem>
                                                <SelectItem value="SEDANG">
                                                    Sedang
                                                </SelectItem>
                                                <SelectItem value="BERAT">
                                                    Berat
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jenis"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Jenis</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="poin"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Poin</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            disabled={disabled}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
