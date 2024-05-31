"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { getAllKelas, pindahKelasSiswa } from "../../_actions/kelas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PindahKelasDialogForm({
    open,
    onOpenChange,
    id,
    idKelas,
    kodeTA,
}) {
    const queryClient = useQueryClient();
    let [selectVal, setSelectVal] = useState(undefined);
    let { data, isFetching, isError } = useQuery({
        queryKey: ["kelas", "all"],
        queryFn: () => getAllKelas(),
        initialData: [],
    });

    const pindahMutation = useMutation({
        mutationFn: () => {
            return pindahKelasSiswa({ id, idKelas: selectVal });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["siswa", idKelas, kodeTA],
            });
            toast.success("Berhasil pindah siswa", {
                position: "bottom-right",
            });
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error("Gagal pindah kelas siswa", {
                position: "bottom-right",
            });
        },
    });

    let submitHandler = () => {
        if (!selectVal)
            toast.warn("Harap pillih kelas", { position: "bottom-right" });
        else {
            pindahMutation.mutate();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-1/2">
                <DialogHeader>
                    <DialogTitle>Pindah Siswa</DialogTitle>
                    <DialogDescription>
                        Make changes to your Siswa List here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Select defaultValue={selectVal} onValueChange={setSelectVal}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                        {data.map((item, key) => {
                            return (
                                <SelectItem
                                    value={item.id}
                                    disabled={item.id == idKelas}
                                    key={key}
                                >
                                    {item.nama_kelas}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <DialogFooter>
                    <Button onClick={submitHandler}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
