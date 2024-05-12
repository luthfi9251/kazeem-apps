const { PrismaClient } = require("@prisma/client");
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
                        create: {
                            nama_group: "ADMIN",
                            deskripsi: "Grup Admin",
                        },
                    },
                },
            },
        },
    });

    console.log({ adminUser });
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
