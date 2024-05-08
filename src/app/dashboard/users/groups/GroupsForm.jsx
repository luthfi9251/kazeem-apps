"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import groupSchema from "./yup-group-schema";
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
import { Button } from "@/components/ui/button";
import { addGroup } from "./_actions/group";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GroupContext } from "./GroupDataProvider";

export default function GroupsForm() {
    let [dataGroup, setDataGroup] = useContext(GroupContext);
    const form = useForm({
        resolver: yupResolver(groupSchema),
        defaultValues: {
            nama_group: "",
            deskripsi: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        toast
            .promise(
                () => addGroup(data),
                {
                    pending: "Menyimpan data",
                    success: "Data berhasil disimpan",
                    error: "Gagal Menyimpan Data",
                },
                {
                    position: "bottom-right",
                }
            )
            .then(() => {
                let findCurrentGroup = (elem) => {
                    return elem.id === group?.id;
                };
                let copyArr = [...dataGroup];
                copyArr.splice(
                    dataGroup.findIndex(findCurrentGroup),
                    1,
                    formData
                );
                setDataGroup([...copyArr]);
            });
    };
    const onError = (e) => console.log(e);

    return (
        <div className=" py-2 px-4 flex flex-col items-center justify-center">
            <Form {...form} className="w-full">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full md:w-2/3"
                >
                    <h2 className="font-semibold">Tambah Group</h2>
                    <FormField
                        control={form.control}
                        name="nama_group"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Group</FormLabel>
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
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className=" float-right">
                        Simpan
                    </Button>
                </form>
            </Form>
        </div>
    );
}
