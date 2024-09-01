"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderCircle, CircleAlert } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { waliSantriLogin } from "@/actions/wallisantriview";
import * as yup from "yup";
import { HREF_URL } from "@/navigation-data";

let loginSchema = yup.object({
    nis: yup.string().required(),
    tgl_lahir_wali: yup.date().required(),
});

export function LoginForm() {
    let [isLoading, setIsLoading] = useState(false);
    let [errorMsg, setErrorMsg] = useState(null);
    let router = useRouter();
    const form = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            nis: "",
            tgl_lahir_wali: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMsg(null);

        waliSantriLogin(data.nis, data.tgl_lahir_wali)
            .then((res) => {
                if (res.isError) throw res.error;
                router.push(HREF_URL.WALISANTRI_VIEW);
            })
            .catch((err) => setErrorMsg(err))
            .finally(() => setIsLoading(false));

        // try {
        //     await logIn("credentials", data);
        //     setIsLoading(false);
        //     router.push("/dashboard");
        // } catch (err) {
        //     setErrorMsg("Email atau password salah!");
        //     setIsLoading(false);
        // }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login Wali Santri</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form} className="w-full">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <FormField
                            className="grid gap-2"
                            control={form.control}
                            name="nis"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>NIS</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            className="grid gap-2"
                            control={form.control}
                            name="tgl_lahir_wali"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Tanggal Lahir Wali
                                    </FormLabel>
                                    <input
                                        className=" border-slate-100 border-2 text-sm p-2 rounded-sm"
                                        type="date"
                                        name="tgl_lahir_wali"
                                        id="tgl_lahir_wali"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {errorMsg ? (
                            <p
                                className="text-xs bg-red-200 rounded-sm flex items-center gap-2 p-1 font-semibold"
                                id="error-msg"
                            >
                                <CircleAlert className="h-4 w-4 inline" />{" "}
                                {errorMsg}
                            </p>
                        ) : (
                            ""
                        )}
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="bg-kazeem-darker"
                        >
                            {isLoading ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
