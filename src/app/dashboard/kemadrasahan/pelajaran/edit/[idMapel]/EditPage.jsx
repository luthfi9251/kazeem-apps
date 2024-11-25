"use client";
import ActionBarCreate from "@/components/ActionBarCreate";
import PelajaranForm from "../../PelajaranForm";
import { HREF_URL } from "@/navigation-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useMemo, useRef } from "react";
import {
    addMataPelajaran,
    editMataPelajaran,
    getMataPelajaranById,
} from "@/actions/pelajaran";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

function EditPage({ id, data }) {
    const submitButton = useRef(null);
    const router = useRouter();

    const handleSubmit = (value) => {
        toast.promise(
            async () => await editMataPelajaran(id, value),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        if (data.isError) throw data.err;
                        router.push(HREF_URL.KEMADRASAHAN_MAPEL_HOME);
                        return "Data berhasil disimpan";
                    },
                },
                error: (err) => err.message,
            },
            {
                position: "bottom-right",
            }
        );
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href={HREF_URL.PELANGGARAN_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                    data-e2e="btn-simpan"
                    onClick={() => submitButton.current?.click()}
                >
                    Simpan
                </Button>
            </div>
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Edit Mata Pelajaran</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <PelajaranForm
                        ref={submitButton}
                        handleSubmit={handleSubmit}
                        defaultValue={{
                            kode_mapel: data?.kode_mapel,
                            nama_pelajaran: data?.nama_pelajaran,
                            deskripsi: data?.deskripsi,
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default EditPage;
