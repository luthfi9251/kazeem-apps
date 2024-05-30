"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import kelasSantriSchema from "./yup-kelasSantri-schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllSiswaNotJoinKelas, addSiswaToKelas } from "../../_actions/kelas";

export default function SiswaDialogForm({
    open,
    onOpenChange,
    idKelas,
    kodeTA,
}) {
    let namaSantri = [{ id: 1, nama_lengkap: "Muhammad Luthfi" }];
    const queryClient = useQueryClient();
    let { data } = useQuery({
        queryKey: ["santri", "notin", idKelas],
        queryFn: () => getAllSiswaNotJoinKelas(idKelas),
        initialData: [],
    });

    const mutation = useMutation({
        mutationFn: ({ idSantri, status }) => {
            return addSiswaToKelas({ idKelas, idSantri, kodeTA, status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["santri", "notin", idKelas],
            });
            queryClient.invalidateQueries({
                queryKey: ["siswa", idKelas, kodeTA],
            });
        },
    });
    const [openPopover, setOpenPopover] = useState(false);
    const form = useForm({
        resolver: yupResolver(kelasSantriSchema),
        defaultValues: {
            id_santri: "",
            status: "BARU",
        },
    });
    const onSubmit = (dataForm) => {
        onOpenChange(false);
        mutation.mutate({
            idSantri: dataForm.id_santri,
            status: dataForm.status,
        });
        form.reset();
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-1/2">
                <DialogHeader>
                    <DialogTitle>Tambah Siswa</DialogTitle>
                    <DialogDescription>
                        Make changes to your Siswa List here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className=" space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="id_santri"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Nama Santri</FormLabel>
                                    <Popover
                                        open={openPopover}
                                        onOpenChange={setOpenPopover}
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
                                                        ? data.find(
                                                              (santri) =>
                                                                  santri.id ===
                                                                  field.value
                                                          )?.nama_lengkap
                                                        : "Pilih Santri"}
                                                    <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0">
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
                                                        {data.map((santri) => (
                                                            <CommandItem
                                                                value={
                                                                    santri.nama_lengkap
                                                                }
                                                                key={santri.id}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "id_santri",
                                                                        santri.id
                                                                    );
                                                                    setOpenPopover(
                                                                        false
                                                                    );
                                                                }}
                                                                data-e2e="select-item"
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
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Statu" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="BARU">
                                                Baru
                                            </SelectItem>
                                            <SelectItem value="ULANG">
                                                Ulang
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
