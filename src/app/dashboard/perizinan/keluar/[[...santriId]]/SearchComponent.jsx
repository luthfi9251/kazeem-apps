"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import { ArrowUpDown, CheckIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchComponent({ dataSantri }) {
    const field = {};
    const router = useRouter();
    const params = useParams();
    const [openSantri, setOpenSantri] = useState(false);
    const [selectedSantri, setSelectedSantri] = useState(
        params.santriId ? parseInt(params.santriId[0]) : null
    );
    return (
        <Popover open={openSantri} onOpenChange={setOpenSantri}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    data-e2e="btn-tambah-santri"
                    className={cn(
                        "max-w-[450px] w-full justify-between",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    {selectedSantri
                        ? dataSantri.find(
                              (santri) => santri.id === selectedSantri
                          )?.nama_lengkap
                        : "Pilih Santri"}
                    <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Cari Santri..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>Santri Tidak Ditemukan</CommandEmpty>
                        <CommandGroup>
                            {dataSantri.map((santri) => (
                                <CommandItem
                                    value={
                                        santri.nis + " - " + santri.nama_lengkap
                                    }
                                    key={santri.id}
                                    data-e2e="select-item"
                                    onSelect={() => {
                                        setOpenSantri(false);
                                        setSelectedSantri(santri.id);
                                        router.push(
                                            HREF_URL.PERIZINAN_KELUAR_SANTRI_DETAIL(
                                                santri.id
                                            )
                                        );
                                    }}
                                >
                                    {santri.nis + " - " + santri.nama_lengkap}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            santri.id === selectedSantri
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
    );
}
