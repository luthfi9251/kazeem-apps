import prisma from "@/lib/prisma";

export default async function getUserById(id) {
    if (id) {
        let user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                UserGroup: {
                    select: {
                        group: {
                            select: {
                                id: true,
                                nama_group: true,
                                deskripsi: true,
                            },
                        },
                    },
                },
            },
        });
        return user;
    }

    return Promise.resolve(null);
}
