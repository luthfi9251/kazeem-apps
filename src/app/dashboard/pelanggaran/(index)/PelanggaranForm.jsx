"use client";
import { useState } from "react";

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
    const languages = [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
        { label: "Portuguese", value: "pt" },
        { label: "Russian", value: "ru" },
        { label: "Japanese", value: "ja" },
        { label: "Korean", value: "ko" },
        { label: "Chinese", value: "zh" },
    ];
    let { namaSantri } = data;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Pelanggaran</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className=" space-y-6">
                        <FormField
                            control={form.control}
                            name="id_santri"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Nama Santri</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
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
                                                        Santri Tidak Ditemukan
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
                                                                        setOpen(
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
                                        Silahkan cari santri berdasarkan nama
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
