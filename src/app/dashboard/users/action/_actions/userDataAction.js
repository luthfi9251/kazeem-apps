"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { revalidatePath } from "next/cache";
/*  
    algorithm
    1. Get userGroups dulu
    2. Bandingkan usergroups db dengan data usergroups yang di submit
    3. Jika di db tidak ada data usergroups yang disubmit, maka hapus db nya, Jika ada dibiarkan
    4. Bandingkan data usergroups yang disubmit dengan usergroups db
    5. Jika di submit tidak ada pada usergroups di db, maka tambah db nya, Jika ada biarkan
    6. Update data user sekalian step 5

    [
    { id: 1, nama_group: 'ADMIN', deskripsi: 'Grup Admin' },
    { id: 2, nama_group: 'USER', deskripsi: 'Group User' }
    ]


    [ { id: 2, group_id: 1 } ]
*/

export async function deleteUser(id) {
    let deleteUserGroup = prisma.userGroup.deleteMany({
        where: {
            user_id: id,
        },
    });

    let deleteUser = prisma.user.delete({
        where: {
            id: id,
        },
    });

    revalidatePath("/dashboard/users");

    return Promise.all([deleteUserGroup, deleteUser]);
}

export async function createUserData(data) {
    console.log("User Baru");
    let password = hashPassword(data.user.password);
    const user = await prisma.user.create({
        data: {
            nama_lengkap: data.user.nama_lengkap,
            email: data.user.email,
            password,
            aktif: data.user.aktif,
            username: data.user.username,
        },
    });

    let addId = data.groups.flatMap((item) => item.group.id);
    let addGroupProm = prisma.UserGroup.createMany({
        data: addId.map((item) => {
            return { user_id: user.id, group_id: item };
        }),
    });
    revalidatePath("/dashboard/users");
    return addGroupProm;
}

export async function saveUserData(data) {
    // step 1
    const userGroups = await prisma.UserGroup.findMany({
        where: {
            user_id: data.user.id,
        },
        select: {
            id: true,
            group_id: true,
        },
    });

    //step 2 3
    let deletedId = userGroups.filter(
        (item1) =>
            !data.groups.find((item2) => {
                return item2.group.id === item1.group_id;
            })
    );

    //diambil id userGroup nya bukan id Group nya
    deletedId = deletedId.flatMap((item) => item.id);

    //step 4 5
    let addId = data.groups.filter(
        (item2) => !userGroups.find((item1) => item1.group_id == item2.group.id)
    );

    addId = addId.flatMap((item) => item.group.id);

    //step 6
    let deleteGroupProm = Promise.resolve(null);
    let addGroupProm = Promise.resolve(null);
    let updateUserProm = Promise.resolve(null);
    if (deletedId.length > 0) {
        deleteGroupProm = prisma.UserGroup.deleteMany({
            where: {
                id: {
                    in: deletedId,
                },
            },
        });
    }

    if (addId.length > 0) {
        addGroupProm = prisma.UserGroup.createMany({
            data: addId.map((item) => {
                return { user_id: data.user.id, group_id: item };
            }),
        });
    }

    if (data.user.password === "") {
        updateUserProm = prisma.user.update({
            where: {
                id: data.user.id,
            },
            data: {
                nama_lengkap: data.user.nama_lengkap,
                email: data.user.email,
                aktif: data.user.aktif,
                username: data.user.username,
            },
        });
    } else {
        let password = hashPassword(data.user.password);
        updateUserProm = prisma.user.update({
            where: {
                id: data.user.id,
            },
            data: {
                nama_lengkap: data.user.nama_lengkap,
                email: data.user.email,
                password,
                aktif: data.user.aktif,
                username: data.user.username,
            },
        });
    }

    revalidatePath("/dashboard/users/" + data.user.id);
    return Promise.all([deleteGroupProm, addGroupProm, updateUserProm]);
}
