"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import CardDataKelas from "./CardDataKelas";
import CardDetailSiswa from "./CardDaftarSiswa";
import CardTahunAjar from "./CardTahunAjar";
import { HREF_URL } from "@/navigation-data";

export default function DetailPage({ dataKelas, dataTA }) {
    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href={HREF_URL.KEMADRASAHAN_KELAS_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                    data-e2e="btn-edit"
                >
                    Edit
                </Button>
            </div>
            <Card className=" col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>{dataKelas.nama_kelas}</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <CardDataKelas dataKelas={dataKelas} />
                    <CardTahunAjar dataKelas={dataKelas} />
                    <CardDetailSiswa dataKelas={dataKelas} dataTA={dataTA} />
                </CardContent>
            </Card>
        </div>
    );
}
