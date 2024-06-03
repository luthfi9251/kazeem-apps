"use client";
import { useState } from "react";
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

export default function KesehatanForm({
    namaSantri = [],
    form,
    edit = false,
    disabled = false,
}) {
    const [openSantri, setOpenSantri] = useState(false);
    const [openKategori, setOpenKategori] = useState(false);
    const [valKategori, setValKategori] = useState(null);
    const [isEditedKategori, setIsEditedKategori] = useState(false);

    return (
        <div className="col-span-2">
            <Card className="max-h-min">
                <CardHeader>
                    <CardTitle>
                        {edit ? "Edit Data" : "Tambah Data Kesehatan"}
                    </CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="id_santri"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Nama Santri</FormLabel>
                                        <Popover
                                            open={openSantri}
                                            onOpenChange={setOpenSantri}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        data-e2e="btn-tambah-santri"
                                                        disabled={edit}
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? namaSantri.find(
                                                                  (santri) =>
                                                                      santri.id ===
                                                                      field.value
                                                              )?.nama_lengkap
                                                            : "Pilih Santri"}
                                                        <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Cari Santri..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            Santri Tidak
                                                            Ditemukan
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {namaSantri.map(
                                                                (santri) => (
                                                                    <CommandItem
                                                                        value={
                                                                            santri.nama_lengkap
                                                                        }
                                                                        key={
                                                                            santri.id
                                                                        }
                                                                        data-e2e="select-item"
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "id_santri",
                                                                                santri.id
                                                                            );
                                                                            setOpenSantri(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            santri.nama_lengkap
                                                                        }
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                santri.id ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Silahkan cari santri berdasarkan
                                            nama
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nama_penyakit"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Sakit</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="penanganan"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Penanganan</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="kategori"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Kategori</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={!isEditedKategori}
                                            >
                                                <SelectTrigger
                                                    className="w-full"
                                                    data-e2e="btn-kategori"
                                                >
                                                    <SelectValue placeholder="Pilih Kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="RINGAN">
                                                        Ringan
                                                    </SelectItem>
                                                    <SelectItem value="SEDANG">
                                                        Sedang
                                                    </SelectItem>
                                                    <SelectItem value="BERAT">
                                                        Berat
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
                                name="tgl_masuk"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal Masuk</FormLabel>
                                        <FormControl>
                                            <input
                                                className=" border-slate-100 border-2 text-sm w-1/3 p-2 rounded-sm outline-slate-200"
                                                type="date"
                                                name="tgl_masuk"
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
                            <FormField
                                control={form.control}
                                name="tgl_keluar"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal Keluar</FormLabel>
                                        <FormControl>
                                            <input
                                                className=" border-slate-100 border-2 text-sm w-1/3 p-2 rounded-sm outline-slate-200"
                                                type="date"
                                                name="tgl_keluar"
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
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={!isEditedKategori}
                                            >
                                                <SelectTrigger
                                                    className="w-full"
                                                    data-e2e="btn-status"
                                                >
                                                    <SelectValue placeholder="Pilih Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PERAWATAN">
                                                        Perawatan
                                                    </SelectItem>
                                                    <SelectItem value="SEMBUH">
                                                        Sembuh
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
