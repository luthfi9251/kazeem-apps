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
const { PAGE_NAME } = require("../src/variables/page-name");
const { hashPassword } = require("../src/lib/bcrypt");

// Ini merupakan script untuk melakukan seeding pada prisma
// Untuk mendukung fitur minimum, maka yang wajib ada pada database adalah
//      1. Akun Admin
//      2. Group Admin

const GROUP_SUPERADMIN_NAME = "SUPER ADMIN";
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || "admin@admin.com";
const SUPER_ADMIN_PASSWORD =
    process.env.SUPER_ADMIN_PASSWORD || "passwordadmin";

const seedSuperAdminGroup = async (idPages) => {
    let idGroup = await prisma.group.findFirst({
        where: {
            nama_group: GROUP_SUPERADMIN_NAME,
        },
        select: {
            id: true,
        },
    });

    if (idGroup) {
        let createAccessPage = await prisma.pageAccess.createMany({
            data: idPages.map((item) => {
                return {
                    group_id: idGroup.id,
                    page_id: item.id,
                };
            }),
        });

        return createAccessPage;
    }
};

const seedAdminSuperData = async () => {
    let hashedPassword = hashPassword(SUPER_ADMIN_PASSWORD);

    const adminUser = await prisma.User.upsert({
        where: { email: SUPER_ADMIN_EMAIL },
        update: {},
        create: {
            email: SUPER_ADMIN_EMAIL,
            username: "admin",
            password: hashedPassword,
            nama_lengkap: "Admin Super",
            aktif: true,
            UserGroup: {
                create: {
                    group: {
                        connectOrCreate: {
                            where: {
                                nama_group: GROUP_SUPERADMIN_NAME,
                            },
                            create: {
                                nama_group: GROUP_SUPERADMIN_NAME,
                                deskripsi: "Grup Admin",
                            },
                        },
                    },
                },
            },
        },
    });
    return adminUser;
};

const seedPageName = async () => {
    let LIST_PAGE = Object.keys(PAGE_NAME);
    let normalized = LIST_PAGE.map((item) => {
        let splitted = item.split("_");
        return {
            kategori: splitted.shift(),
            nama: splitted.join("_"),
        };
    });

    let insertPage = await prisma.Page.createMany({
        data: normalized,
    });

    let returned = await prisma.Page.findMany({
        select: {
            id: true,
        },
    });

    return returned;
};

const seedSantri = async (idAdmin) => {
    let userActionId = {
        connect: {
            id: idAdmin,
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

    return await Promise.all(createSantri);
};

async function main() {
    let seedAdmin = await seedAdminSuperData();
    let seedPage = await seedPageName();
    let seedGroupAcces = await seedSuperAdminGroup(seedPage);
    // let seedSantriDummy = await seedSantri(seedAdmin.id);

    console.log({ seedAdmin, seedPage, seedGroupAcces });
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
