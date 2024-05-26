"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function addKelas(data, isTaAktif) {
    /**
     1. Menambahkan TA
     2. Menambahkan Tingkatan Kelas
     3. Menambahkan Paralel Kelas
     */

    return new Promise(async (resolve, reject) => {
        try {
            let session = await auth();
            let uniqueTingkatan = [
                ...new Set(data.map((item) => item.tingkatan)),
            ];
            let uniqueParalel = [...new Set(data.map((item) => item.paralel))];

            let createTingkatan = prisma.TingkatanKelas.createMany({
                data: uniqueTingkatan.map((item) => {
                    return {
                        tingkatan: item,
                        created_by_id: session.user.id,
                        last_update_by_id: session.user.id,
                    };
                }),
                skipDuplicates: true,
            });
            let createParalel = prisma.ParalelKelas.createMany({
                data: uniqueParalel.map((item) => {
                    return {
                        paralel: item,
                        created_by_id: session.user.id,
                        last_update_by_id: session.user.id,
                    };
                }),
                skipDuplicates: true,
            });

            await Promise.all([createTingkatan, createParalel]);
            let tingkatanData = prisma.TingkatanKelas.findMany({
                where: {
                    tingkatan: { in: uniqueTingkatan },
                },
                select: {
                    id: true,
                    tingkatan: true,
                },
            });
            let paralelData = prisma.ParalelKelas.findMany({
                where: {
                    paralel: { in: uniqueParalel },
                },
                select: {
                    id: true,
                    paralel: true,
                },
            });
            let ta = {
                mulai: data[0].ta.mulai,
                selesai: data[0].ta.selesai,
            };
            let createTa = prisma.TahunAkademik.upsert({
                where: {
                    tahunIdentifier: {
                        tahun_mulai: ta.mulai,
                        tahun_berakhir: ta.selesai,
                        aktif: isTaAktif,
                    },
                },
                update: {},
                create: {
                    tahun_mulai: ta.mulai,
                    tahun_berakhir: ta.selesai,
                    aktif: isTaAktif,
                    created_by_id: session.user.id,
                    last_update_by_id: session.user.id,
                },
            });

            let [dataTingkatan, dataParalel, dataTa] = await Promise.all([
                tingkatanData,
                paralelData,
                createTa,
            ]);
            // console.log({ dataTingkatan, dataParalel, dataTa });

            let queryKelas = data.map((item) => {
                return {
                    tingkatan_id: dataTingkatan.find(
                        (ting) => ting.tingkatan === item.tingkatan
                    ).id,
                    paralel_id: dataParalel.find(
                        (par) => par.paralel === item.paralel
                    ).id,
                    ta_id: dataTa.id,
                    created_by_id: session.user.id,
                    last_update_by_id: session.user.id,
                };
            });

            let createKelas = await prisma.KelasAkademik.createMany({
                data: queryKelas,
                skipDuplicates: true,
            });
            console.log(createKelas);
            resolve(createKelas);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
