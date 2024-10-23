"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { serverResponse } from "@/lib/utils";
import dayjs from "dayjs";

export async function addPegawai(pegawaiFormData, jabatanPegawaiFormData) {
    function generateIdPegawai(namaPegawai, tglLahir, noUrut) {
        const namaArray = namaPegawai.split(" ");
        const inisial = namaArray.length > 1
        ? namaArray[0][0].toUpperCase() + namaArray[1][0].toUpperCase()
        : namaArray[0][0].toUpperCase(); 
        const formatTanggal = dayjs(tglLahir).format('YYMMDD');
        const nomorUrut = noUrut.toString().padStart(3, '0');
    
        return `${inisial}-${formatTanggal}-${nomorUrut}`;
    }
    let pegawai = pegawaiFormData;
    let jabatanPegawai = jabatanPegawaiFormData;

    const namaPegawai = pegawai.get("nama_pegawai");
    const tglLahir = new Date(pegawai.get("tgl_lhr")).toISOString();
    const noUrut = await prisma.Pegawai.count();
    const idPegawai = generateIdPegawai(namaPegawai, tglLahir, noUrut);
    let query = {
        data: {
            id_pegawai: idPegawai,
            nama_pegawai: pegawai.get("nama_pegawai"),
            email: pegawai.get("email"),
            no_telp: pegawai.get("no_telp") || null,
            jenis_kel: pegawai.get("jenis_kel"),
            tempat_lahir: pegawai.get("tempat_lahir"),
            tgl_lhr: new Date(pegawai.get("tgl_lhr")).toISOString(),
            JabatanPegawai: {
                create: jabatanPegawai.map((item) => {
                    console.log(item.nama_jabatan)
                    return {
                        Jabatan: {
                            connectOrCreate: {
                                where: {
                                    nama_jabatan: item.nama_jabatan,
                                },
                                create: {
                                    nama_jabatan: item.nama_jabatan,
                                },
                            },
                        },
                    }
                }),
            },

        },
    };

    try {
        console.log("Query untuk disimpan:", JSON.stringify(query, null, 2)); // Log query
        let pegawaiSave = await prisma.Pegawai.create(query);
        // console.log("Data berhasil disimpan:", pegawaiSave);
        revalidatePath("/dashboard/pegawai");
        return serverResponse("Success add pegawai");
    } catch (err) {
        if (
            err instanceof PrismaClientKnownRequestError &&
            err.meta.target === "Pegawai_id_pegawai_key"
        ) {
            return serverResponse(null, true, "ID Pegawai sudah dipakai!");
        }
        return serverResponse(
            null,
            true,
            "Terjadi kesalahan saat menambahkan pegawai!"
        );
    }
}
