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
const dayjs = require("dayjs");
const prisma = new PrismaClient();
const { PAGE_NAME } = require("../src/variables/page-name");
const { hashPassword } = require("../src/lib/bcrypt");
/**
 *
 *
 *
 *
 */
let faker = null;
let fakerID_ID = null;

if (process.env.USE_DUMMY_DATA == "true") {
    const fakerAll = require("@faker-js/faker");
    faker = fakerAll.faker;
    fakerID_ID = fakerAll.fakerID_ID;
}

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

    const JENIS_KELAMIN = ["LAKI_LAKI", "PEREMPUAN"];
    const WALI_PERAN = ["AYAH", "IBU", "WALI", "lainnya"];

    const nisSantri = Date.now() + "";
    const namaWali = fakerID_ID.person.fullName();
    const tglLahirWali = faker.date
        .birthdate({ min: 34, max: 70, mode: "age" })
        .toISOString();
    const filteredTglLahirWali = new Date(
        tglLahirWali.split("T")[0]
    ).toISOString();
    console.log(
        `Santri : ${nisSantri} - ${namaWali} - ${filteredTglLahirWali}`
    );

    const createSantri = await prisma.Santri.create({
        data: {
            nama_lengkap: fakerID_ID.person.fullName(),
            nis: nisSantri,
            jenis_kel: faker.helpers.arrayElement(JENIS_KELAMIN),
            alamat: faker.location.streetAddress({ useFullAddress: true }),
            email: faker.internet.email(),
            hp: faker.phone.number(),
            tempat_lahir: fakerID_ID.location.city(),
            tgl_lhr: faker.date
                .birthdate({ min: 18, max: 20, mode: "age" })
                .toISOString(),
            foto: null,
            created_by: userActionId,
            last_update_by: userActionId,
            WaliSantri: {
                create: {
                    peran: faker.helpers.arrayElement(WALI_PERAN),
                    created_by: userActionId,
                    last_update_by: userActionId,
                    wali: {
                        connectOrCreate: {
                            where: {
                                waliIdentifier: {
                                    nama_wali: namaWali,
                                    tgl_lhr: filteredTglLahirWali,
                                },
                            },
                            create: {
                                nama_wali: namaWali,
                                tgl_lhr: filteredTglLahirWali,
                                email: faker.internet.email(),
                                hp: faker.phone.number(),
                                created_by: userActionId,
                                last_update_by: userActionId,
                            },
                        },
                    },
                },
            },
        },
    });

    return createSantri;
};

const seedkelas = async (idAdmin) => {
    let userActionId = {
        connect: {
            id: idAdmin,
        },
    };

    let TINGKAT = ["X", "XI", "XII"];
    let PARALEL = "MIPA";

    let createKelas = TINGKAT.map((item) => {
        return prisma.kelas.create({
            data: {
                nama_kelas: `${item}-${PARALEL}`,
                Tingkat: {
                    create: {
                        nama_tingkatan: item,
                        keterangan: "-",
                    },
                },
                keterangan: "-",
                created_by: userActionId,
                last_update_by: userActionId,
            },
        });
    });

    return await Promise.all(createKelas);
};

const seedTahunAjar = async (tglMulai, tglSelesai, kodeTA, aktif = false) => {
    let createTahunAjar = await prisma.tahunAjar.create({
        data: {
            kode_ta: kodeTA,
            tgl_mulai: new Date(tglMulai).toISOString(),
            tgl_selesai: new Date(tglSelesai).toISOString(),
            aktif,
        },
    });
    return createTahunAjar;
};

const seedKelasSantri = async (listKelas, listSantri, taId) => {
    let createKelasSantri = listSantri.map((item, idx) => {
        return prisma.kelasSantri.create({
            data: {
                Kelas: {
                    connect: {
                        id: listKelas[idx % listKelas.length].id,
                    },
                },
                TahunAjar: {
                    connect: {
                        id: taId,
                    },
                },
                Santri: {
                    connect: {
                        id: item.id,
                    },
                },
                status: "BARU",
            },
        });
    });

    return await Promise.all(createKelasSantri);
};

const seedPelanggaranSantri = async (
    kelasSantriList,
    kategoriPelanggaranList,
    jumlah = 30
) => {
    let pelProm = [];
    for (let i = 0; i < jumlah; i++) {
        let tglCreate = faker.date.between({
            from: dayjs().subtract(1, "year").toISOString(),
            to: dayjs().toISOString(),
        });
        let createPelanggaran = prisma.pelanggaran.create({
            data: {
                Kategori: {
                    connect: {
                        id: faker.helpers.arrayElement(kategoriPelanggaranList)
                            .id,
                    },
                },
                KelasSantri: {
                    connect: {
                        id: faker.helpers.arrayElement(kelasSantriList).id,
                    },
                },
                keterangan: faker.lorem.paragraph(),
                konsekuensi: faker.lorem.paragraph(),
                created_at: tglCreate,
            },
        });
        pelProm.push(createPelanggaran);
    }

    return await Promise.all(pelProm);
};

const seedTenKategoriPelanggaran = async () => {
    let KATEGORI = [
        "tidur",
        "merokok",
        "kabur",
        "bernyanyi",
        "tidak sholat",
        "nyawer",
        "narkoba",
        "mencuri",
        "mengintip",
        "merusak",
    ];
    let createKategoriPelanggaran = KATEGORI.map((item) => {
        return prisma.kategoriPelanggaran.create({
            data: {
                nama_pelanggaran: item,
                kategori: "SEDANG",
                jenis: "PRILAKU",
                poin: 10,
            },
        });
    });

    return await Promise.all(createKategoriPelanggaran);
};

const seedKesehatanSantri = async (kelasSantriList, jumlah = 10) => {
    const STATUS = ["PERAWATAN", "SEMBUH"];
    const NAMA_PENYAKIT = [
        "demam",
        "sariawan",
        "tipes",
        "panu",
        "gatal",
        "flu",
        "batuk",
        "belekan",
        "pusing",
        "gerd",
    ];

    let kesProm = [];
    for (let i = 0; i < jumlah; i++) {
        let statusSantri = faker.helpers.arrayElement(STATUS);
        let tglMasuk = faker.date.between({
            from: dayjs().subtract(1, "year").toISOString(),
            to: dayjs().toISOString(),
        });
        let createKesehatan = prisma.kesehatan.create({
            data: {
                nama_penyakit: faker.helpers.arrayElement(NAMA_PENYAKIT),
                penanganan: faker.lorem.sentences(),
                kategori: "SEDANG",
                status: statusSantri,
                tgl_masuk: tglMasuk,
                tgl_keluar:
                    statusSantri === "SEMBUH"
                        ? faker.date
                              .soon({ days: 3, refDate: tglMasuk })
                              .toISOString()
                        : null,
                KelasSantri: {
                    connect: {
                        id: faker.helpers.arrayElement(kelasSantriList).id,
                    },
                },
            },
        });
        kesProm.push(createKesehatan);
    }
    return await Promise.all(kesProm);
};

const templateSeedDevelopment = async (seedAdmin) => {
    let santriDataList = [];
    for (let i = 0; i < 20; i++) {
        let santri = await seedSantri(seedAdmin.id);
        santriDataList.push(santri);
        console.log(`create santri: ${santri.nama_lengkap}`);
    }
    let kelas = await seedkelas(seedAdmin.id);
    let tahunAjar2023 = await seedTahunAjar(
        "2023-03-02",
        "2024-03-01",
        "2023/2024",
        false
    );
    let tahunAjar2024 = await seedTahunAjar(
        "2024-03-02",
        "2025-03-01",
        "2024/2025",
        true
    );

    await seedKelasSantri(kelas, santriDataList, tahunAjar2023.id);
    let kelasSantriAktifList = await seedKelasSantri(
        kelas,
        santriDataList,
        tahunAjar2024.id
    );
    let kategoriPelanggaranList = await seedTenKategoriPelanggaran();
    await seedPelanggaranSantri(kelasSantriAktifList, kategoriPelanggaranList);
    await seedKesehatanSantri(kelasSantriAktifList, 15);
};

async function main() {
    let seedAdmin = await seedAdminSuperData();
    let seedPage = await seedPageName();
    let seedGroupAcces = await seedSuperAdminGroup(seedPage);

    if (process.env.USE_DUMMY_DATA == "true") {
        await templateSeedDevelopment(seedAdmin);
    }

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
