"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllGroups() {
    let groups = await prisma.Group.findMany({ orderBy: { id: "asc" } });
    return groups;
}

export async function saveEditedGroup(id, data) {
    let prom = await prisma.Group.update({
        where: {
            id: id,
        },
        data: {
            nama_group: data["nama_group"],
            deskripsi: data["deskripsi"],
        },
    });
    revalidatePath("/dashboard/users/groups");
    redirect("/dashboard/users/groups");
}

export async function addGroup(data) {
    let prom = prisma.Group.create({
        data: { nama_group: data.nama_group, deskripsi: data.deskripsi },
    });
    revalidatePath("/dashboard/users/groups");
    return prom;
}
