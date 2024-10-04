"use client";
import { getAllKamarSantri } from "@/actions/kamar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ModalPindahKamar({
    open,
    onOpenChange,
    currentKamarId,
    handleOnSimpan = () => {},
}) {
    const [selectedKamarId, setSelectedKamarId] = useState(null);
    let { data, isLoading } = useQuery({
        queryKey: ["kamar", "all"],
        queryFn: async () => {
            let response = await getAllKamarSantri();
            if (response.isError) throw response.error;
            return response.data;
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Pindah Kamar</DialogTitle>
                </DialogHeader>
                <p>Pilih kamar</p>
                <Select onValueChange={(val) => setSelectedKamarId(val)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Silakan pilih kamar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Nama Kamar</SelectLabel>
                            {data?.map(
                                (item) =>
                                    item.id !== parseInt(currentKamarId) && (
                                        <SelectItem
                                            value={item.id}
                                            key={item.id}
                                        >
                                            {item.nama_kamar}
                                        </SelectItem>
                                    )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    className="bg-kazeem-primary hover:bg-kazeem-darker"
                    disabled={selectedKamarId === null}
                    onClick={() => handleOnSimpan(selectedKamarId)}
                >
                    Simpan
                </Button>
            </DialogContent>
        </Dialog>
    );
}
