const { PrismaClient } = require("@prisma/client");
const {
    SANTRI,
    WALI,
    KELAS,
    TINGKATAN,
    TAHUN_AJAR,
    KELAS_SANTRI,
    GROUPS,
} = require("./seedData");
const prisma = new PrismaClient();

// Ini merupakan script untuk melakukan seeding pada prisma
// Untuk mendukung fitur minimum, maka yang wajib ada pada database adalah
//      1. Akun Admin
//      2. Group Admin

async function main() {
    const createGroups = await prisma.Group.createMany({
        data: GROUPS,
        skipDuplicates: true,
    });

    const adminUser = prisma.User.upsert({
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
    const santriManajemen = prisma.User.upsert({
        where: { email: "manajemen-santri@kazeem.com" },
        update: {},
        create: {
            email: "manajemen-santri@kazeem.com",
            username: "manajemen-santri",
            password:
                "$2a$10$fSzs9G09UjgGXP9/A7KBt.tRFIDFXrH31PfeTXsEntn9lFO92Uycu", //passwordadmin
            nama_lengkap: "Manajemen Santri",
            aktif: true,
            UserGroup: {
                create: {
                    group: {
                        connectOrCreate: {
                            where: {
                                nama_group: "KESANTRIAN",
                            },
                            create: {
                                nama_group: "KESANTRIAN",
                                deskripsi: "Grup Kesantrian",
                            },
                        },
                    },
                },
            },
        },
    });
    const madrasahManajemen = prisma.User.upsert({
        where: { email: "manajemen-madrasah@kazeem.com" },
        update: {},
        create: {
            email: "manajemen-madrasah@kazeem.com",
            username: "manajemen-madrasah",
            password:
                "$2a$10$fSzs9G09UjgGXP9/A7KBt.tRFIDFXrH31PfeTXsEntn9lFO92Uycu", //passwordadmin
            nama_lengkap: "Manajemen Madrasah",
            aktif: true,
            UserGroup: {
                create: {
                    group: {
                        connectOrCreate: {
                            where: {
                                nama_group: "KEMADRASAHAN",
                            },
                            create: {
                                nama_group: "KEMADRASAHAN",
                                deskripsi: "Grup Kemadrasahan",
                            },
                        },
                    },
                },
            },
        },
    });

    let res = await Promise.all([
        adminUser,
        santriManajemen,
        madrasahManajemen,
    ]);

    let userActionId = {
        connect: {
            id: res[0].id,
        },
    };

    const createSantri = SANTRI.map((item, i) => {
        let waliLoc = WALI[i];
        return prisma.Santri.create({
            data: {
                nama_lengkap: item.nama_lengkap,
                nis: item.nis,
                jenis_kel: item.jenis_kel,
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

    await Promise.all(createSantri).then((data) => {
        console.log({ adminUser, data });
    });

    // const createTingkatan = await prisma.Tingkat.createMany({
    //     data: TINGKATAN,
    // });

    // const createKelas = await prisma.Kelas.createMany({
    //     data: KELAS.map((item) => {
    //         return {
    //             id: item.id,
    //             nama_kelas: item.nama_kelas,
    //             tingkat_id: item.tingkat_id,
    //             keterangan: item.keterangan,
    //         };
    //     }),
    // });

    // const createTA = await prisma.TahunAjar.createMany({
    //     data: TAHUN_AJAR,
    // });

    // const createKelasSantri = await prisma.kelasSantri.createMany({
    //     data: KELAS_SANTRI,
    // });

    // console.log({ createTingkatan, createKelas, createTA, createKelasSantri });
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
