"use client";
import { createUserData, saveUserData } from "./_actions/userDataAction";
import { yupResolver } from "@hookform/resolvers/yup";
import { GroupContext } from "./[[...slug]]/ActionPage";
import { toast } from "react-toastify";
import { useContext } from "react";
import userSchema from "./yup-user-schema";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useImperativeHandle } from "react";

export default function UserForm({ reference, user }) {
    const [groupSelected, setGroupSelected, userId] = useContext(GroupContext);
    const form = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            username: user ? user.username : "",
            password: user ? "" : null,
            email: user ? user.email : "",
            nama_lengkap: user ? user.nama_lengkap : "",
            aktif: user ? user.aktif : true,
        },
    });

    useImperativeHandle(reference, () => ({
        submitForm() {
            form.handleSubmit(onSubmit)();
        },
    }));

    const onSubmit = (data) => {
        let requestData = {
            user: {
                ...data,
                id: user ? user.id : "",
            },
            groups: groupSelected,
        };

        toast.promise(
            () =>
                user ? saveUserData(requestData) : createUserData(requestData),
            {
                pending: "Menyimpan data",
                success: "Data berhasil disimpan",
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `${data}`;
                    },
                },
            },
            {
                position: "bottom-right",
            }
        );
    };
    return (
        <div>
            <Card className="max-h-min">
                <CardHeader>
                    <CardTitle>Data User</CardTitle>
                    <CardDescription>Masukkan data user</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                required
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            required={user ? false : true}
                                        >
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                required={user ? false : true}
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
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nama_lengkap"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>
                                            Nama Lengkap
                                        </FormLabel>
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
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="aktif"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
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
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
