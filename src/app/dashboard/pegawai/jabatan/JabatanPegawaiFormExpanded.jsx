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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JabatanPegawaiSchema from "../yup-jabatan-pegawai-schema";

export default function JabatanPegawaiFormExpanded(props) {
    let { form, onSubmit, disabled = false } = props;

    return (
        <Card className="max-h-min col-span-1 ">
            <CardHeader>
                <CardTitle>Data Jabatan Pegawai</CardTitle>
                <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Form {...form}>
                    <form
                        id="form-jabatan"
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="nama_jabatan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Jabatan</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
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
