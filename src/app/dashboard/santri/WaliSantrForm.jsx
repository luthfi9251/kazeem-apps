"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import WaliSantriView from "./WaliSantriView";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import waliSantriSchema from "./yup-wali-santri-schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useContext } from "react";
import { Label } from "@/components/ui/label";
import { WaliContext } from "./WaliDataProvider";

function DialogFormWali({ open, openChange, context }) {
    let [dataWali, setWaliGroup] = context;
    let user = false;
    const form = useForm({
        resolver: yupResolver(waliSantriSchema),
        defaultValues: {
            nama_wali: user ? user.nama_lengkap : "",
            tgl_lhr: user
                ? user.tgl_lhr
                : new Date(Date.now()).toISOString().split("T")[0],
            email: user ? user.email : "",
            alamat: user ? user.nama_lengkap : "",
            hp: user ? user.hp : "",
            peran: user ? user.peran : "lainnya",
        },
    });

    function formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, pad with leading zero
        const day = String(date.getDate()).padStart(2, "0");

        // Return the formatted date string
        return `${year}-${month}-${day}`;
    }

    let onSubmit = (data) => {
        let isAlreadyAdd = dataWali.find(
            (element) => element.nama_wali == data.nama_wali
        );
        let date = formatDate(data.tgl_lhr);
        data.tgl_lhr = date;
        if (!isAlreadyAdd) {
            let wali = [...dataWali, data];
            setWaliGroup([...wali]);
        }
        form.reset();
        openChange(false);
    };
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent className=" w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Wali</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
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
                                        <Input {...field} />
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
                                        <Input {...field} />
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
                                        <Input {...field} />
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
                                        className=" border-slate-100 border-2 text-sm w-1/3 p-2 rounded-sm outline-slate-200"
                                        type="date"
                                        name="tgl_lhr"
                                        id="tgl_lhr"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="peran"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Peran Wali</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih peran wali" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="AYAH">
                                                Ayah
                                            </SelectItem>
                                            <SelectItem value="IBU">
                                                Ibu
                                            </SelectItem>
                                            <SelectItem value="WALI">
                                                Wali
                                            </SelectItem>
                                            <SelectItem value="lainnya">
                                                Lainnya
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Tambah Wali</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function WaliSantriForm({
    disabled = false,
    allowDetail = true,
}) {
    let [isOpen, setIsOpen] = useState(false);
    const waliContextVal = useContext(WaliContext);

    return (
        <div>
            <Card className="max-h-min">
                <CardHeader>
                    <CardTitle>Data Wali</CardTitle>
                    <CardDescription> </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <WaliSantriView
                        disabled={disabled}
                        allowDetail={allowDetail}
                    />
                    <Separator />
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                        disabled={disabled}
                    >
                        Tambah Wali
                    </Button>
                    <DialogFormWali
                        open={isOpen}
                        openChange={setIsOpen}
                        context={waliContextVal}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
