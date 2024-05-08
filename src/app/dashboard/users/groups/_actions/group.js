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
    let escapeAndCapitalize = (string) => {
        return string.split(" ").join("_").toUpperCase();
    };

    let prom = prisma.Group.create({
        data: {
            nama_group: escapeAndCapitalize(data.nama_group),
            deskripsi: data.deskripsi,
        },
    });
    revalidatePath("/dashboard/users/groups");
    return prom;
}

export async function deleteGroup(id) {
    //delete groups otomatis delete userGroups
    let delUserGroup = prisma.UserGroup.deleteMany({ where: { group_id: id } });
    let delGroup = prisma.Group.delete({ where: { id: id } });
    const transaction = await prisma.$transaction([delUserGroup, delGroup]);
    return transaction;
}
