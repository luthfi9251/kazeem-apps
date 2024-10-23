"use client";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ArrowUpDown } from "lucide-react";
let FORM_CREATE = {
    title: "Tambah Data Presensi",
    pegawai: false,
    id_pegawai: false,
    keterangan: false,
    tgl_presensi: false,
    status: false,
};
let FORM_EDIT = {
    title: "Edit Data Presensi",
    pegawai: true,
    id_pegawai: false,
    keterangan: false,
    tgl_presensi: false,
    status: false,
};
let FORM_DETAIL = {
    title: "Detail Data Presensi",
    pegawai: true,
    id_pegawai: true,
    keterangan: true,
    tgl_presensi: true,
    status: true,
};

export default function PresensiForm({
    namaPegawai = [],
    form,
    mode = "CREATE",
}) {
    const [openPegawai, setopenPegawai] = useState(false);
    const formState = useMemo(() => {
        let val = null;
        switch (mode) {
            case "EDIT":
                val = FORM_EDIT;
                break;
            case "DETAIL":
                val = FORM_DETAIL;
                break;
            default:
                val = FORM_CREATE;
        }
        return val;
    }, [mode]);

    return (
        <div className="col-span-2">
            <Card className="max-h-min">
                <CardHeader>
                    <CardTitle>{formState.title}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="id_pegawai"
                            render={({ field }) => (
                                // console.log("Nilai field.value id:", field.value),
                                <FormItem className="flex flex-col">
                                    <FormLabel required>Nama Pegawai</FormLabel>
                                    <Popover open={openPegawai} onOpenChange={setopenPegawai}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    data-e2e="btn-tambah-pegawai"
                                                    className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                                    disabled={formState.pegawai}
                                                >
                                                    {field.value
                                                        ? namaPegawai.find(pegawai => pegawai.id_pegawai === field.value)?.nama_pegawai
                                                        : "Pilih Pegawai"}
                                                    <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari Pegawai..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>Pegawai Tidak Ditemukan</CommandEmpty>
                                                    <CommandGroup>
                                                        {namaPegawai.map(pegawai => (
                                                            <CommandItem
                                                                value={pegawai.nama_pegawai}
                                                                key={pegawai.id_pegawai}
                                                                data-e2e="select-item"
                                                                onSelect={() => {
                                                                    // console.log("Item dipilih:", pegawai); 
                                                                    form.setValue("id_pegawai", pegawai.id_pegawai); 
                                                                    setopenPegawai(false);
                                                                    // console.log("Nilai id_pegawai setelah dipilih:", form.getValues("id_pegawai")); 
                                                                }}                                                                
                                                            >
                                                                {pegawai.nama_pegawai}
                                                                <CheckIcon className={cn("ml-auto h-4 w-4", pegawai.id_pegawai === field.value ? "opacity-100" : "opacity-0")} />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
        

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={formState.status}
                                                data-e2e="select-status"
                                            >
                                                <SelectTrigger
                                                    className="w-full"
                                                    data-e2e="btn-status"
                                                >
                                                    <SelectValue placeholder="Pilih Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="HADIR">
                                                        Hadir
                                                    </SelectItem>
                                                    <SelectItem value="IJIN">
                                                        Ijin
                                                    </SelectItem>
                                                    <SelectItem value="ALPHA">
                                                        Alpha
                                                    </SelectItem>
                                                    <SelectItem value="LAINNYA">
                                                        Lainnya
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tgl_presensi"
                                disabled={formState.tgl_presensi}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel required>
                                            Tanggal
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                className=" border-slate-100 border-2 text-sm w-1/3 p-2 rounded-sm outline-slate-200"
                                                type="date"
                                                name="tgl_presensi"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keterangan"
                                disabled={formState.keterangan}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            Keterangan
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="send_notification"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="terms"
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Kirim notifikasi ke Wali
                                                    Santri
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
