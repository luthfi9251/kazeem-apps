"use client";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import Datepicker from "@/components/Datepicker";

export default function PegawaiForm({ form, disabled }) {

    return (
        <div className="col-span-1">
            <Card className="max-h-min">
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                    <CardDescription> </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className=" space-y-6">
                            <FormField
                                control={form.control}
                                name="nama_pegawai"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>
                                            Nama Lengkap
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={
                                                    disabled ? true : false
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={
                                                    disabled ? true : false
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jenis_kel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>
                                            Jenis Kelamin
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={disabled ? true : false}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis Kelamin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="LAKI_LAKI">
                                                    Laki-Laki
                                                </SelectItem>
                                                <SelectItem value="PEREMPUAN">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="no_telp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>No. Telp</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={
                                                    disabled ? true : false
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tempat_lahir"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>
                                            Tempat Lahir
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={
                                                    disabled ? true : false
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tgl_lhr"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>
                                            Tanggal Lahir
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                className=" border-slate-100 border-2 text-sm w-1/3 p-2 rounded-sm outline-slate-200"
                                                type="date"
                                                name="tgl_lhr"
                                                id="tgl_lhr"
                                                disabled={
                                                    disabled ? true : false
                                                }
                                                {...field}
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
        </div>
    );
}
