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
import PegawaiListView from "./PegawaiListView";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import jabatanPegawaiSchema from "../yup-jabatan-pegawai-schema";
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
import { PegawaiContext } from "./PegawaiDataProvider";
// import CardKelas from "./detail/[[...slug]]/CardKelas";

function DialogFormJabatan({ open, openChange, context }) {
    let [dataJabatan, setJabatanGroup] = context;
    let user = false;
    const form = useForm({
        resolver: yupResolver(jabatanPegawaiSchema),
        defaultValues: {
            nama_jabatan: user ? user.nama_pegawai : "",
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
        let isAlreadyAdd = dataJabatan.find(
            (element) => element.nama_jabatan == data.nama_jabatan
        );
        // let date = formatDate(data.tgl_lhr);
        // data.tgl_lhr = date;
        if (!isAlreadyAdd) {
            let jabatan = [...dataJabatan, data];
            setJabatanGroup([...jabatan]);
        }
        form.reset();
        openChange(false);
    };
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent className=" w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Jabatan</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
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
                                    <FormLabel required>Nama Jabatan</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Tambah Jabatan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function PegawaiListForm({
    disabled = false,
    allowDetail = true,
    // showKelas = false,
    // dataKelas = [],
}) {
    let [isOpen, setIsOpen] = useState(false);
    const PegawaiContextVal = useContext(PegawaiContext);

    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                    <CardDescription> </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <PegawaiListView
                        disabled={disabled}
                        allowDetail={allowDetail}
                    />
                    {/* <Separator />
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                        disabled={disabled}
                    >
                        Tambah Jabatan
                    </Button> */}
                    {/* <DialogFormJabatan
                        open={isOpen}
                        openChange={setIsOpen}
                        context={PegawaiContextVal}
                        disabled={disabled}
                    /> */}
                </CardContent>
            </Card>
        </div>
    );
}
