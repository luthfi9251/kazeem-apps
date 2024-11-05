import prisma from "@/lib/prisma";

export default async function getAllJabatan() {
    let jabatans = await prisma.Jabatan.findMany();
    return jabatans;
}