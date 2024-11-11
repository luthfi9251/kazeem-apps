"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataAddTable from "./DataAddTable";
import { useMemo, useCallback } from "react";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { Plus, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
    getAllKelas,
    getAllSantri,
    getSantriDataRecipient,
    getSantriInKelas,
} from "@/actions/pengumuman";
import { Button } from "@/components/ui/button";
import { useRecipientStore } from "@/providers/pengumumanRecipientProviders";

export default function ModalTambahRecipient({ open, onOpenChange, kamarId }) {
    const columnsSantri = useMemo(
        () => [
            {
                id: "no",
                header: "No.",
                cell: ({ row }) => {
                    return <span className="capitalize ">{row.index + 1}</span>;
                },
            },
            {
                accessorKey: "nis",
                filterFn: "equalsString",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="NIS" />
                ),
            },
            {
                accessorKey: "nama_lengkap",
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Nama Santri"
                    />
                ),
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row, table }) => {
                    const isSelected = row.getIsSelected();
                    return (
                        <Button
                            variant="outline"
                            size="icon"
                            className={
                                isSelected
                                    ? "bg-red-500 text-white"
                                    : "bg-kazeem-primary text-white"
                            }
                            onClick={row.getToggleSelectedHandler()}
                        >
                            {isSelected ? (
                                <Trash className="h-4 w-4" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </Button>
                    );
                },
            },
        ],
        []
    );
    const columnsGroup = useMemo(
        () => [
            {
                id: "no",
                header: "No.",
                cell: ({ row }) => {
                    return <span className="capitalize ">{row.index + 1}</span>;
                },
            },
            {
                accessorKey: "nama_kelas",
                filterFn: "equalsString",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Nama Kelas" />
                ),
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row, table }) => {
                    const isSelected = row.getIsSelected();
                    return (
                        <Button
                            variant="outline"
                            size="icon"
                            className={
                                isSelected
                                    ? "bg-red-500 text-white"
                                    : "bg-kazeem-primary text-white"
                            }
                            onClick={row.getToggleSelectedHandler()}
                        >
                            {isSelected ? (
                                <Trash className="h-4 w-4" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </Button>
                    );
                },
            },
        ],
        []
    );

    let queryAllSantri = useQuery({
        queryKey: ["all", "santri"],
        queryFn: async () => await getAllSantri(),
    });

    let queryAllKelas = useQuery({
        queryKey: ["all", "kelas"],
        queryFn: async () => await getAllKelas(),
    });

    const addRecipient = useRecipientStore((state) => state.addRecipient);
    const recipientList = useRecipientStore((state) => state.recipient);

    const handleOnSaveSantri = useCallback((val) => {
        const idSantri = val.map((item) => item.original.id);
        getSantriDataRecipient(idSantri)
            .then((res) => {
                if (res.isError) throw res.error;
                addRecipient(res.data);
            })
            .finally(() => onOpenChange(false));
    }, []);

    const handleOnSaveKelas = useCallback((val) => {
        const idKelas = val.map((item) => item.original.id);
        getSantriInKelas(idKelas)
            .then((res) => {
                if (res.isError) throw res.error;
                let currentSantriIdList = recipientList.map((item) => item.id);
                const filteredDuplicateSantri = res.data.filter(
                    (item) => !currentSantriIdList.includes(item.id)
                );

                addRecipient(filteredDuplicateSantri);
            })
            .finally(() => onOpenChange(false));
    }, []);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Tambahkan Penerima</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="individual" className="w-1/2">
                            Individual
                        </TabsTrigger>
                        <TabsTrigger value="group" className="w-1/2">
                            Group
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="individual">
                        <DataAddTable
                            columns={columnsSantri}
                            data={queryAllSantri.data?.data}
                            handleOnSave={handleOnSaveSantri}
                            isLoading={queryAllSantri.isLoading}
                            mode="INDIVIDUAL"
                        />
                    </TabsContent>
                    <TabsContent value="group">
                        <DataAddTable
                            columns={columnsGroup}
                            data={queryAllKelas.data?.data}
                            handleOnSave={handleOnSaveKelas}
                            isLoading={queryAllKelas.isLoading}
                            mode="GROUP"
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
