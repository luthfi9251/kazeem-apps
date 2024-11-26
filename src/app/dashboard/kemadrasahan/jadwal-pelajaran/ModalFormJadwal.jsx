"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { useJadwalStore } from "@/providers/jadwalProviders";

const formSchema = yup.object({
    id_pelajaran: yup.number(),
    id_pegawai: yup.string(),
    hari: yup.string(),
    jam_mulai: yup.string(),
    menit_mulai: yup.string(),
    jam_akhir: yup.string(),
});

function MyForm() {
    const jadwalStore = useJadwalStore();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            id_pelajaran: null,
            id_pegawai: "",
            hari: "",
            jam_mulai: "",
            menit_mulai: "",
            jam_akhir: "",
        },
    });

    // console.log(jadwalStore.listJadwal);
    function onSubmit(values) {
        console.log({ values });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="id_pelajaran"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mata Pelajaran</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Mapel" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {jadwalStore.listJadwal.map((item, idx) => (
                                        <SelectItem
                                            value={item.id + ""}
                                            key={idx}
                                        >
                                            {item.kode_mapel} -{" "}
                                            {item.nama_pelajaran}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id_pegawai"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pengampu</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {jadwalStore.listPengampu.map(
                                        (item, idx) => (
                                            <SelectItem
                                                key={idx}
                                                value={item.id + ""}
                                            >
                                                {item.nama_pegawai}
                                            </SelectItem>
                                        )
                                    )}
                                    s
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hari"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hari</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-3 items-end">
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jam Mulai</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        type="time"
                                        className="w-auto"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <span>-</span>
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jam Selesai</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        type="time"
                                        className="w-auto"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    variant="kazeemPrimary"
                    className="w-full"
                >
                    Simpan
                </Button>
            </form>
        </Form>
    );
}

export default function ModalFormJadwal({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <MyForm />
            </DialogContent>
        </Dialog>
    );
}
