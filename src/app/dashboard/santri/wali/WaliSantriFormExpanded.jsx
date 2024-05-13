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
import waliSantriSchema from "../yup-wali-santri-schema";

export default function WaliSantriFormExpanded(props) {
    let { form, onSubmit, disabled = false } = props;

    return (
        <Card className="max-h-min">
            <CardHeader>
                <CardTitle>Data Wali Santri</CardTitle>
                <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Form {...form}>
                    <form
                        id="form-wali"
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="nama_wali"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Wali</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
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
                                    <FormLabel>Email Wali</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No. Hp Wali</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={disabled}
                                            data-e2e="hp"
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
                                    <FormLabel>Tanggal Lahir Wali</FormLabel>
                                    <input
                                        className=" border-slate-100 border-2 text-sm w-1/2 p-2 rounded-sm outline-slate-200"
                                        type="date"
                                        name="tgl_lhr"
                                        id="tgl_lhr"
                                        {...field}
                                        disabled={disabled}
                                    />
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
