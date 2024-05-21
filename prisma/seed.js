const { PrismaClient } = require("@prisma/client");
const { SANTRI, WALI } = require("./seedData");
const prisma = new PrismaClient();

// Ini merupakan script untuk melakukan seeding pada prisma
// Untuk mendukung fitur minimum, maka yang wajib ada pada database adalah
//      1. Akun Admin
//      2. Group Admin

async function main() {
    const adminUser = await prisma.User.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            username: "admin",
            password:
                "$2a$10$fSzs9G09UjgGXP9/A7KBt.tRFIDFXrH31PfeTXsEntn9lFO92Uycu", //passwordadmin
            nama_lengkap: "Admin Super",
            aktif: true,
            UserGroup: {
                create: {
                    group: {
                        connectOrCreate: {
                            where: {
                                nama_group: "ADMIN",
                            },
                            create: {
                                nama_group: "ADMIN",
                                deskripsi: "Grup Admin",
                            },
                        },
                    },
                },
            },
        },
    });

    let userActionId = {
        connect: {
            id: adminUser.id,
        },
    };

    const createSantri = SANTRI.map((item, i) => {
        let waliLoc = WALI[i];
        return prisma.Santri.create({
            data: {
                nama_lengkap: item.nama_lengkap,
                alamat: item.alamat,
                email: item.email,
                hp: item.hp,
                tempat_lahir: item.tempat_lahir,
                tgl_lhr: new Date(item.tgl_lhr).toISOString(),
                foto: null,
                created_by: userActionId,
                last_update_by: userActionId,
                WaliSantri: {
                    create: {
                        peran: waliLoc.list,
                        created_by: userActionId,
                        last_update_by: userActionId,
                        wali: {
                            connectOrCreate: {
                                where: {
                                    waliIdentifier: {
                                        nama_wali: waliLoc.nama_wali,
                                        tgl_lhr: new Date(
                                            waliLoc.tgl_lhr
                                        ).toISOString(),
                                    },
                                },
                                create: {
                                    nama_wali: waliLoc.nama_wali,
                                    tgl_lhr: new Date(
                                        waliLoc.tgl_lhr
                                    ).toISOString(),
                                    email: waliLoc.email,
                                    hp: waliLoc.hp,
                                    created_by: userActionId,
                                    last_update_by: userActionId,
                                },
                            },
                        },
                    },
                },
            },
        });
    });

    Promise.all(createSantri).then((data) => {
        console.log({ adminUser, data });
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
