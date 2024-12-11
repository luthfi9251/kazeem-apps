"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckIcon } from "lucide-react";

export default function KategoriForm({
    data,
    form,
    listPegawai = [],
    disabled = false,
}) {
    const KELOMPOK_KECAKAPAN = [
        "spiritual",
        "pengetahuan",
        "keterampilan",
        "emosianal",
    ];

    const [openPegawai, setOpenPegawai] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kategori Pelanggaran</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className=" space-y-6">
                        <FormField
                            control={form.control}
                            name="nama_pelanggaran"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Nama Pelanggaran
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
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
                                    <FormLabel required>Kategori</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={disabled}
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
                            name="kelKecakapan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Kelompok Kecakapan
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={disabled}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {KELOMPOK_KECAKAPAN.map(
                                                    (item) => (
                                                        <SelectItem
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item.toUpperCase()}
                                                        </SelectItem>
                                                    )
                                                )}
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
                                    <FormLabel required>Jenis</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={disabled} />
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
                                    <FormLabel required>Poin</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            disabled={disabled}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="penangan"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel required>
                                        Ditangani Oleh
                                    </FormLabel>
                                    <Popover
                                        open={openPegawai}
                                        onOpenChange={setOpenPegawai}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    data-e2e="btn-tambah-santri"
                                                    disabled={disabled}
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? listPegawai.find(
                                                              (santri) =>
                                                                  santri.id ===
                                                                  field.value
                                                          )?.nama_pegawai
                                                        : "Pilih Pegawai"}
                                                    <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari Pegawai..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        Pegawai Tidak Ditemukan
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {listPegawai.map(
                                                            (pegawai) => (
                                                                <CommandItem
                                                                    value={
                                                                        pegawai.nama_pegawai
                                                                    }
                                                                    key={
                                                                        pegawai.id
                                                                    }
                                                                    data-e2e="select-item"
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "penangan",
                                                                            pegawai.id
                                                                        );
                                                                        setOpenPegawai(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        pegawai.nama_pegawai
                                                                    }
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            pegawai.id ===
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
                                        Silahkan pilih orang yang menangnai
                                        pelanggaran
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
