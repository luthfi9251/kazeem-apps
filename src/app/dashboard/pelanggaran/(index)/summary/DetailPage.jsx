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
import CardDataSantri from "./CardDataSantri";
import CardJumlahPelanggaran from "./CardJumlahPelanggaran";
import CardPelanggaran from "./CardPelanggaran";
import { HREF_URL } from "@/navigation-data";
import { generateExcel } from "@/lib/generate-excel";
import { generatePDFPelanggaranSummary } from "@/lib/generate-pdf";

export default function DetailPage({
    dataSantri,
    dataSummary,
    dataPelanggaran,
    idSantri,
}) {
    const handleGenerateExcel = (dataRow) => {
        let addSantri = dataRow.map((item) => {
            return {
                ...dataSantri,
                ...item,
            };
        });

        generateExcel({
            filename: "Data Pelanggaran santri " + dataSantri.nama_santri,
            type: "EXPORT_TO_EXCEL_ONLY",
            dataRow: addSantri,
        });
    };

    const handleGeneratePF = (dataRow) => {
        let addSantri = dataRow.map((item) => {
            return {
                ...dataSantri,
                ...item,
            };
        });
        generatePDFPelanggaranSummary(addSantri, dataSantri.nama_santri);
    };

    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="flex gap-2 col-span-1 md:col-span-2">
                <Link href={HREF_URL.PELANGGARAN_HOME}>
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
            </div>
            <Card className=" col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>{dataSantri.nama_santri}</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <CardDataSantri dataSantri={dataSantri} />
                    <CardJumlahPelanggaran dataSummary={dataSummary} />
                    <CardPelanggaran
                        dataPelanggaran={dataPelanggaran}
                        idSantri={idSantri}
                        handleGenerateExcel={handleGenerateExcel}
                        handleGeneratePF={handleGeneratePF}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
