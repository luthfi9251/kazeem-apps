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

export default function FilterSheetKesehatan({
    state,
    // namaKelas,
    // kodeTA,
    getColumnFilter,
}) {
    const formFilter = useForm({
        defaultValues: {
            id_pegawai: "",
            nama_pegawai: "",
            jabatan: "",
            presensi_tgl_start: "",
            presensi_tgl_end: "",
            status: "ALL",
            // keluar_tgl_start: "",
            // keluar_tgl_end: "",
            // kelas: "ALL",
            // kode_ta: "ALL",
        },
    });

    const submitHandler = (data) => {
        let keysObject = Object.keys(data);
        let filterValue = [];
        keysObject.forEach((item) => {
            if (item.endsWith("tgl_start") || item.endsWith("tgl_end")) {
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

        if (data.presensi_tgl_start !== "" || data.presensi_tgl_end !== "") {
            let filTanggal = {
                id: "tgl_presensi",
                value: {
                    tgl_start:
                        data.presensi_tgl_start === ""
                            ? null
                            : data.presensi_tgl_start,
                    tgl_end:
                        data.presensi_tgl_end === "" ? null : data.presensi_tgl_end,
                },
            };
            filterValue.push(filTanggal);
        }

        // if (data.keluar_tgl_start !== "" || data.keluar_tgl_end !== "") {
        //     let filTanggal = {
        //         id: "tgl_keluar",
        //         value: {
        //             tgl_start:
        //                 data.keluar_tgl_start === ""
        //                     ? null
        //                     : data.keluar_tgl_start,
        //             tgl_end:
        //                 data.keluar_tgl_end === "" ? null : data.keluar_tgl_end,
        //         },
        //     };
        //     filterValue.push(filTanggal);
        // }

        getColumnFilter(filterValue);
    };

    return (
        <SheetBase state={state} title="Filter Data Presensi">
            <Form {...formFilter}>
                <form
                    className="flex flex-col gap-2 px-2 py-5 h-full overflow-y-auto"
                    onSubmit={formFilter.handleSubmit(submitHandler)}
                >
                    <FormField
                        control={formFilter.control}
                        name="id_pegawai"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Id</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formFilter.control}
                        name="nama_pegawai"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Nama Pegawai</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formFilter.control}
                        name="jabatan"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Jabatan</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
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
                    /> */}
                    {/* <FormField
                        control={formFilter.control}
                        name="kode_ta"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode TA</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih TA" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Kode TA</SelectLabel>
                                            {kodeTA.map((item, key) => {
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
                                                Semua TA
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={formFilter.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>

                                            <SelectItem value="HADIR">
                                                Hadir
                                            </SelectItem>
                                            <SelectItem value="IJIN">
                                                Ijin
                                            </SelectItem>
                                            <SelectItem value="ALPHA">
                                                Alpha
                                            </SelectItem>
                                            <SelectItem value="LANNYA">
                                                Lainnya
                                            </SelectItem>
                                            <SelectItem key="ALL" value="ALL">
                                                Semua Status
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
                            Tanggal Presensi
                        </legend>
                        <FormField
                            control={formFilter.control}
                            name="presensi_tgl_start"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="presensi_tgl_start"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formFilter.control}
                            name="presensi_tgl_end"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="presensi_tgl_end"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </fieldset>
                    {/* <fieldset className="grid grid-cols-1 gap-3 py-5 my-2 px-2 border rounded">
                        <legend className="-ml-1 text-sm font-medium">
                            Tanggal Keluar
                        </legend>
                        <FormField
                            control={formFilter.control}
                            name="keluar_tgl_start"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="keluar_tgl_start"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formFilter.control}
                            name="keluar_tgl_end"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End</FormLabel>
                                    <FormControl>
                                        <input
                                            className=" border-slate-100 border-2 text-sm p-2 rounded-sm outline-slate-200"
                                            type="date"
                                            name="keluar_tgl_end"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </fieldset> */}
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
