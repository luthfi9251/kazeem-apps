"use server";
import prisma from "@/lib/prisma";
import { HREF_URL } from "@/navigation-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

const GROUP_SUPERADMIN_NAME = "SUPER ADMIN";
export const checkIsSuperAdminGroup = async (id) => {
    let adminGroup = await prisma.Group.findFirst({
        where: {
            nama_group: GROUP_SUPERADMIN_NAME,
        },
        select: {
            id: true,
        },
    });

    return adminGroup.id === parseInt(id);
};

export const getAllPageName = async () => {
    try {
        const transformData = (data) => {
            const groupedData = data.reduce((acc, item) => {
                if (!acc[item.kategori]) {
                    acc[item.kategori] = [];
                }
                acc[item.kategori].push({ id: item.id, name: item.nama });
                return acc;
            }, {});
            const result = Object.keys(groupedData).map((kategori) => ({
                kategori,
                pages: groupedData[kategori],
            }));

            return result;
        };
        let pageName = await prisma.Page.findMany({
            select: {
                id: true,
                nama: true,
                kategori: true,
            },
        });

        return transformData(pageName);
    } catch (err) {
        throw err;
    }
};

export const addGroup = async (data) => {
    try {
        let insertGroupQuery = prisma.Group.create({
            data: {
                nama_group: data.nama_group,
                deskripsi: data.deskripsi,
                PageAccess: {
                    create: data.page_access.map((item) => {
                        return {
                            Page: {
                                connect: {
                                    id: item,
                                },
                            },
                        };
                    }),
                },
            },
        });
        revalidatePath(HREF_URL.USER_GROUP_HOME);
        return insertGroupQuery;
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.meta.target === "Group_nama_group_key") {
                throw new Error("Group dengan nama tersebut sudah ada!");
            }
        } else {
            console.log(err);
        }
        throw err;
    }
};

export const getGroupDataById = async (id) => {
    try {
        let data = await prisma.Group.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                PageAccess: true,
            },
        });
        let dataMapped = {
            nama_group: data.nama_group,
            deskripsi: data.deskripsi,
            page_access: data.PageAccess.map((item) => item.page_id),
        };

        return dataMapped;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateGroup = async (data, id) => {
    try {
        if (await checkIsSuperAdminGroup(id)) {
            throw new Error("Tidak dapat update grup Super Admin!");
        }

        let updateData = prisma.Group.update({
            where: {
                id: parseInt(id),
            },
            data: {
                nama_group: data.nama_group,
                deskripsi: data.deskripsi,
                PageAccess: {
                    deleteMany: {},
                },
            },
        });

        // let deleteAllPageAccess = prisma.PageAccess.deleteMany({
        //     where: {
        //         Group: {
        //             id: parseInt(id),
        //         },
        //     },
        // });

        let addNewPageAccess = prisma.PageAccess.createMany({
            data: data.page_access.map((item) => {
                return {
                    page_id: item,
                    group_id: parseInt(id),
                };
            }),
        });

        await prisma.$transaction([updateData, addNewPageAccess]);
        revalidatePath(HREF_URL.USER_GROUP_EDIT(id));
        revalidatePath(HREF_URL.USER_GROUP_HOME);
        return "Berhasil edit";
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.meta.target === "Group_nama_group_key") {
                throw new Error("Group dengan nama tersebut sudah ada!");
            }
        } else {
            console.log(err);
        }
        throw err;
    }
};

export const deleteGroup = async (id, name) => {
    try {
        if (await checkIsSuperAdminGroup(id)) {
            throw new Error("Tidak dapat hapus grup Super Admin!");
        }
        let deleteGroup = await prisma.Group.delete({
            where: {
                id: parseInt(id),
            },
        });
        revalidatePath(HREF_URL.USER_GROUP_HOME);
        return deleteGroup;
    } catch (err) {
        throw err;
    }
};

export const reducePageAccessGroups = (data) => {
    let accessPage = [];

    data.forEach((item) => {
        item.group.PageAccess.forEach((item2) => {
            let pageName = item2.Page.kategori + "_" + item2.Page.nama;
            accessPage.push(pageName);
        });
    });

    return [...new Set(accessPage)];
};
