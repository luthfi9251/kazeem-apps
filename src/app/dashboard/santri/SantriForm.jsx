"use client";
import { yupResolver } from "@hookform/resolvers/yup";

import santriSchema from "./yup-santri-schema";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
import Image from "next/image";

export default function SantriForm({ form, disabled, foto = null }) {
    const fileRef = form.register("foto");
    const [imageurl, setImageURL] = useState(foto);

    return (
        <div className="col-span-1">
            <Card className="max-h-min">
                <CardHeader>
                    <CardTitle>Data Santri</CardTitle>
                    <CardDescription> </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className=" space-y-6">
                            <FormField
                                control={form.control}
                                name="nama_lengkap"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Lengkap</FormLabel>
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
                                        <FormLabel>Email</FormLabel>
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
                                name="alamat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alamat</FormLabel>
                                        <FormControl>
                                            <Textarea
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
                                name="hp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No. Hp</FormLabel>
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
                                        <FormLabel>Tempat Lahir</FormLabel>
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
                                        <FormLabel>Tanggal Lahir</FormLabel>
                                        <FormControl>
                                            {/* <Datepicker
                                                {...field}
                                                disabled={
                                                    disabled ? true : false
                                                }
                                            /> */}
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
                            <div className="grid grid-cols-2 space-x-2">
                                <FormField
                                    control={form.control}
                                    name="foto"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Foto</FormLabel>
                                            <FormControl>
                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        disabled={
                                                            disabled
                                                                ? true
                                                                : false
                                                        }
                                                        {...fileRef}
                                                        onChange={(event) => {
                                                            field.onChange(
                                                                event.target
                                                                    ?.files?.[0] ??
                                                                    undefined
                                                            );
                                                            const file =
                                                                event.target
                                                                    .files[0];
                                                            const imageUrl1 =
                                                                URL.createObjectURL(
                                                                    file
                                                                );
                                                            setImageURL(
                                                                imageUrl1
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className=" bg-slate-200 h-60 w-44 relative rounded-sm">
                                    {imageurl && (
                                        <Image
                                            src={imageurl}
                                            alt="profile"
                                            fill
                                            objectFit="contain"
                                        />
                                    )}
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
