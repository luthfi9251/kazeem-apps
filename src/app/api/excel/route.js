import { NextResponse } from "next/server";
import * as xlsx from "xlsx";
import { auth } from "@/auth";
import { getDataKesehatanForExcelExport } from "@/actions/kesehatan";
import { getDataPresensiForExcelExport } from "@/actions/presensi";
import { getDataPelanggaranForExcelExport } from "@/actions/pelanggaran";
import { getAllKelasDataForExcelExport } from "@/actions/kelas";
import { getOneKelasDataForExcelExport } from "@/actions/kelas";
import { getDataSantriForExcelExport } from "@/actions/santri";
import { getDataPegawaiForExcelExport } from "@/actions/pegawai";

export async function POST(req, props) {
    try {
        let session = await auth();
        if (!session?.user) {
            throw "Unauthenticated";
        }

        let formData = await req.formData();

        let data = [
            { name: "John Doe", age: 30 },
            { name: "Jane Smith", age: 25 },
        ];
        switch (formData.get("data")) {
            case "KESEHATAN":
                data = await getDataKesehatanForExcelExport();
                break;
            case "PRESENSI":
                data = await getDataPresensiForExcelExport();
                break;
            case "PELANGGARAN":
                data = await getDataPelanggaranForExcelExport();
                break;
            case "KELAS_ALL":
                data = await getAllKelasDataForExcelExport();
                break;
            case "KELAS_SPECIFIED":
                let ta = formData.get("kodeTa");
                let idKelas = formData.get("idKelas");
                data = await getOneKelasDataForExcelExport(idKelas, ta);
                break;
            case "SANTRI_ALL":
                data = await getDataSantriForExcelExport();
                break;
            case "PEGAWAI_ALL":
                data = await getDataPegawaiForExcelExport();
                break;
            case "EXPORT_TO_EXCEL_ONLY":
                data = JSON.parse(formData.get("dataRow"));
                console.log(data);
                break;
            default:
                throw "Field data must be filled!";
        }

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

        // Konversi workbook ke buffer
        const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "buffer",
        });

        const response = new NextResponse(excelBuffer);
        response.headers.set(
            "content-type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        response.headers.set(
            "Content-Disposition",
            'attachment; filename="data.xlsx"'
        );
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message });
    }
}
