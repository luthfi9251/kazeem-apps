import prisma from "@/lib/prisma";

export default async function getAllAvailableGroups() {
    let groups = await prisma.Group.findMany();
    return groups;
}
