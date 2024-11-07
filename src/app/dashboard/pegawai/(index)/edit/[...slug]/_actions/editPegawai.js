"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HREF_URL } from "@/navigation-data";
import { serverResponse } from "@/lib/utils";

export async function editPegawai(pegawaiFormData, jabatanPegawaiFormData) {
    try {
        let pegawai = pegawaiFormData;
        let jabatanPegawai = jabatanPegawaiFormData;

        let updateQueryData = {
            nama_pegawai: pegawai.get("nama_pegawai"),
            jenis_kel: pegawai.get("jenis_kel"),
            email: pegawai.get("email"),
            no_telp: pegawai.get("no_telp") || null,
            tempat_lahir: pegawai.get("tempat_lahir"),
            tgl_lhr: new Date(pegawai.get("tgl_lhr")).toISOString(),
            JabatanPegawai: {
                deleteMany: {},
                create: jabatanPegawai.map((item) => {
                    return {
                        Jabatan: {
                            connectOrCreate: {
                                where: {
                                    nama_jabatan: item.nama_jabatan,
                                },
                                create: {
                                    nama_jabatan: item.nama_jabatan,
                                }
                            }
                        }
                    }
                })
            },
        };

        let updatePegawai = await prisma.Pegawai.update({
            where: {
                id: parseInt(pegawai.get("id")),              
            },
            data: updateQueryData,
        });

        revalidatePath("/dashboard/pegawai/edit/" + pegawai.get("id"));
        revalidatePath("/dashboard/pegawai/detail/" + pegawai.get("id"));
        return serverResponse("Berhasil update pegawai", false, null);
    } catch (err) {
        if (
            err instanceof PrismaClientKnownRequestError &&
            err.meta.target === "Pegawai_id_pegawai_key"
        ) {
            return serverResponse(null, true, "ID Pegawai sudah dipakai!");
        }
        console.log(err);
        return serverResponse(
            null,
            true,
            "Terjadi kesalahan saat edit pegawai!"
        );
    }
}

export async function deletePegawai(id) {
    try {
        let deleteJabatanPegawai = prisma.JabatanPegawai.deleteMany({
            where: {
                id_pegawai: id,
            },
        });

        let deletePegawai = prisma.Pegawai.delete({
            where: {
                id: id,
            },
        });

        let deleteJabatan = prisma.Jabatan.deleteMany({
            where: { JabatanPegawai: { none: {} } },
        });

        let deleteTransaction = await prisma.$transaction([
            deleteJabatanPegawai,
            deletePegawai,
            deleteJabatan,
        ]);

        revalidatePath("/dashboard/pegawai");
        return serverResponse(deleteTransaction);
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return serverResponse(
                null,
                true,
                "Tidak dapat hapus pegawai, karena data pegawai memiliki hubungan dengan data lainnya!"
            );
        }
        return serverResponse(
            null,
            true,
            "Terjadi kesalahan saat menghapus data!"
        );
    }
}
