"use client";
import dayjs from "dayjs";
import { SheetBase } from "@/components/SheetBase";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function FilterSheetSummary({
    state,
    namaKelas,
    kodeTA,
    getColumnFilter,
}) {
    const formFilter = useForm({
        defaultValues: {
            nama_pelanggaran: "",
            jenis: "",
            kategori: "",
            tgl_start: "",
            tgl_end: "",
            nama_kelas: "ALL",
        },
    });

    const submitHandler = (data) => {
        let keysObject = Object.keys(data);
        let filterValue = [];
        keysObject.forEach((item) => {
            if (item === "tgl_start" || item === "tgl_end") {
                return;
            }
            const IGNORED_VALUE = ["ALL", "", null];
            if (!IGNORED_VALUE.includes(data[item])) {
                filterValue.push({
                    id: item,
                    value: data[item] === "" ? null : data[item],
                });
            }
        });

        if (data.tgl_start !== "" || data.tgl_end !== "") {
            let filTanggal = {
                id: "created_at",
                value: {
                    tgl_start: data.tgl_start === "" ? null : data.tgl_start,
                    tgl_end: data.tgl_end === "" ? null : data.tgl_end,
                },
            };
            filterValue.push(filTanggal);
        }

        getColumnFilter(filterValue);
    };

    return (
        <SheetBase state={state} title="Filter Data Pelanggaran">
            <Form {...formFilter}>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={formFilter.handleSubmit(submitHandler)}
                >
                    <FormField
                        control={formFilter.control}
                        name="nama_pelanggaran"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Nama Pelanggaran</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formFilter.control}
                        name="jenis"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Departemen</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formFilter.control}
                        name="kategori"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Kategori</SelectLabel>
                                            {["RINGAN", "SEDANG", "BERAT"].map(
                                                (item, key) => {
                                                    return (
                                                        <SelectItem
                                                            key={key}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                            <SelectItem key="ALL" value="ALL">
                                                Semua Kategori
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formFilter.control}
                        name="kelas"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Kelas</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Kelas" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Nama Kelas
                                            </SelectLabel>
                                            {namaKelas.map((item, key) => {
                                                return (
                                                    <SelectItem
                                                        key={key}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                );
                                            })}
                                            <SelectItem key="ALL" value="ALL">
                                                Semua Kelas
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <fieldset className="grid grid-cols-1 gap-3 py-5 my-2 px-2 border rounded">
                        <legend className="-ml-1 text-sm font-medium">
                            Tanggal Pelanggaran
                        </legend>
                        <FormField
                            control={formFilter.control}
                            name="tgl_start"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="tgl_start"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formFilter.control}
                            name="tgl_end"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="tgl_end"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </fieldset>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button
                                onClick={() => {
                                    formFilter.reset();
                                    getColumnFilter([]);
                                }}
                                variant="outline"
                            >
                                Atur Ulang
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button type="submit">Simpan</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </Form>
        </SheetBase>
    );
}
