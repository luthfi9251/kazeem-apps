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

export default function PelanggaranForm({ data, form, disabled = false }) {
    let { namaSantri, kategoriPelanggaran } = data;
    const [openSantri, setOpenSantri] = useState(false);
    const [openKategori, setOpenKategori] = useState(false);
    const [valKategori, setValKategori] = useState(null);
    const [isEditedKategori, setIsEditedKategori] = useState(false);
    const [value, setValue] = useState("");
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Tambah Pelanggaran</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-6">
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
                                name="nama_pelanggaran_option"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Pelanggaran</FormLabel>
                                        <Popover
                                            open={openKategori}
                                            onOpenChange={setOpenKategori}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        disabled={
                                                            isEditedKategori
                                                        }
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? kategoriPelanggaran.find(
                                                                  (
                                                                      pelanggaran
                                                                  ) =>
                                                                      pelanggaran.id ===
                                                                      field.value
                                                              )
                                                                  ?.nama_pelanggaran
                                                            : "Pilih Pelanggaran"}
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
                                                            Kategori Tidak
                                                            Ditemukan
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {kategoriPelanggaran.map(
                                                                (
                                                                    pelanggaran
                                                                ) => (
                                                                    <CommandItem
                                                                        value={
                                                                            pelanggaran.nama_pelanggaran
                                                                        }
                                                                        key={
                                                                            pelanggaran.id
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "nama_pelanggaran_option",
                                                                                pelanggaran.id
                                                                            );
                                                                            form.setValue(
                                                                                "nama_pelanggaran",
                                                                                pelanggaran.nama_pelanggaran
                                                                            );
                                                                            form.setValue(
                                                                                "kategori",
                                                                                pelanggaran.kategori
                                                                            );
                                                                            form.setValue(
                                                                                "jenis",
                                                                                pelanggaran.jenis
                                                                            );
                                                                            form.setValue(
                                                                                "poin",
                                                                                pelanggaran.poin
                                                                            );
                                                                            setOpenKategori(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            pelanggaran.nama_pelanggaran
                                                                        }
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                pelanggaran.id ===
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
                                        <FormDescription></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keterangan"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Keterangan</FormLabel>
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
                                name="allow_edit"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="terms"
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        field.onChange(e);
                                                        setIsEditedKategori(e);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Ubah Kategori Pelanggaran
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <fieldset className="grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Kategori Pelanggaran
                            </legend>
                            <FormField
                                control={form.control}
                                name="nama_pelanggaran"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Nama Pelanggaran</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditedKategori}
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
                                                <SelectTrigger className="w-full">
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
                                name="jenis"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Jenis</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditedKategori}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="poin"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Poin</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                disabled={!isEditedKategori}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </fieldset>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
