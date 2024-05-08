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
import loginSchema from "./yup-login-schema";
import { logIn } from "./_actions/login";
import { useState } from "react";

export function LoginForm() {
    let [isLoading, setIsLoading] = useState(false);
    let [errorMsg, setErrorMsg] = useState(null);
    const form = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMsg(null);
        try {
            await logIn("credentials", data);
            setIsLoading(false);
        } catch (err) {
            setErrorMsg(err.message);
            setIsLoading(false);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {errorMsg ? (
                            <p className="text-xs bg-red-200 rounded-sm flex items-center gap-2 p-1 font-semibold">
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
