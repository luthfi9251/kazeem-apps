"use client";
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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HREF_URL } from "@/navigation-data";
import Link from "next/link";

let groupSchema = yup.object({
    nama_group: yup.string().max(25).required("Nama group wajib diisi!"),
    deskripsi: yup.string().required("Deskripsi wajib diisi!"),
    page_access: yup.array(),
});

let CheckBoxPage = ({ form, item }) => {
    return (
        <FormField
            key={item.id}
            control={form.control}
            name="page_access"
            render={({ field }) => {
                return (
                    <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0 "
                    >
                        <FormControl>
                            <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([
                                              ...field.value,
                                              item.id,
                                          ])
                                        : field.onChange(
                                              field.value?.filter(
                                                  (value) => value !== item.id
                                              )
                                          );
                                }}
                            />
                        </FormControl>
                        <FormLabel className="text-sm font-normal  cursor-pointer">
                            {item.name}
                        </FormLabel>
                    </FormItem>
                );
            }}
        />
    );
};

export default function GroupForm({
    handleSubmit,
    pages,
    defaultValue = null,
}) {
    const schema = useMemo(() => groupSchema, []);
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nama_group: defaultValue?.nama_group || "",
            deskripsi: defaultValue?.deskripsi || "",
            page_access: defaultValue?.page_access || [],
        },
    });

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    className=" space-y-6"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="nama_group"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel required>Nama Group</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deskripsi"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel required>Deskripsi</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="page_access"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <h2 className="font-semibold text-lg">Akses</h2>
                                {pages.map((page, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-5 border p-2"
                                    >
                                        <p className="text-sm font-medium">
                                            {page.kategori}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {page.pages.map((item, j) => (
                                                <CheckBoxPage
                                                    key={j}
                                                    form={form}
                                                    item={item}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end w-full md:w-full gap-2">
                        <Link href={HREF_URL.USER_GROUP_HOME}>
                            <Button
                                variant="outline"
                                className="bg-red-500 text-white w-1/2 md:w-[150px]"
                            >
                                Batal
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            className="bg-kazeem-primary hover:bg-kazeem-darker w-1/2 md:w-[150px]"
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
