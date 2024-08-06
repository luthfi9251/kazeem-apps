import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import "dayjs/locale/id";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const getFirstAndLastDateInYear = () => {
    let currentDate = new Date();
    let theFirstDateInTheYear = new Date(currentDate.getFullYear(), 0, 1);
    let theLastDateInTheYear = new Date(currentDate.getFullYear(), 11, 31);

    return { theFirstDateInTheYear, theLastDateInTheYear };
};

const calculateOneYearBehind = (refDate = new Date()) => {
    let dateAsRef = dayjs(refDate);
    let oneYearBehind = dateAsRef.subtract(1, "year").add(1, "month");

    return {
        dateAhead: dateAsRef.toDate(),
        dateBehind: oneYearBehind.toDate(),
    };
};

export const getTotalHeader = async () => {
    const { theFirstDateInTheYear, theLastDateInTheYear } =
        getFirstAndLastDateInYear();
    let totalSantri = prisma.santri.count();
    let totalPelanggaran = prisma.pelanggaran.count({
        where: {
            created_at: {
                gte: theFirstDateInTheYear.toISOString(),
                lte: theLastDateInTheYear.toISOString(),
            },
        },
    });
    let totalSantriPerawatan = prisma.kesehatan.count({
        where: {
            status: "PERAWATAN",
            created_at: {
                gte: theFirstDateInTheYear.toISOString(),
                lte: theLastDateInTheYear.toISOString(),
            },
        },
    });

    let promAll = await Promise.all([
        totalSantri,
        totalPelanggaran,
        totalSantriPerawatan,
    ]);

    return {
        totalSantri: promAll[0],
        totalPelanggaran: promAll[1],
        totalSantriPerawatan: promAll[2],
    };
};

export const getTop5PelanggaranKategori = async () => {
    const { theFirstDateInTheYear, theLastDateInTheYear } =
        getFirstAndLastDateInYear();
    let topFivePelanggaran = await prisma.KategoriPelanggaran.findMany({
        take: 5,
        orderBy: {
            Pelangaran: {
                _count: "desc",
            },
        },
        select: {
            nama_pelanggaran: true,
            _count: {
                select: {
                    Pelangaran: {
                        where: {
                            created_at: {
                                gte: theFirstDateInTheYear.toISOString(),
                                lte: theLastDateInTheYear.toISOString(),
                            },
                        },
                        select: true,
                    },
                },
            },
        },
    });

    return topFivePelanggaran.map((item) => {
        return {
            label: item.nama_pelanggaran,
            jumlah: item._count.Pelangaran,
        };
    });
};

export const getTop5PenyakitSantri = async () => {
    const { theFirstDateInTheYear, theLastDateInTheYear } =
        getFirstAndLastDateInYear();
    let topFivePenyakit = await prisma.Kesehatan.groupBy({
        by: ["nama_penyakit"],
        _count: true,
        orderBy: {
            _count: {
                nama_penyakit: "desc",
            },
        },
        where: {
            created_at: {
                gte: theFirstDateInTheYear.toISOString(),
                lte: theLastDateInTheYear.toISOString(),
            },
        },
        take: 5,
    });

    return topFivePenyakit.map((item) => {
        return {
            label: item.nama_penyakit,
            jumlah: item._count,
        };
    });
};

export const getTrenKesehatanOneYearBehind = async () => {
    let { dateAhead, dateBehind } = calculateOneYearBehind();

    let responseMonth = {};

    let maxMonth = dayjs(dateAhead);
    let currMonth = dayjs(dateBehind);

    // console.log(maxMonth.isBefore(currMonth, "date"));
    while (currMonth.isSameOrBefore(maxMonth)) {
        let convertToDate = dayjs().month(currMonth.month());
        responseMonth[convertToDate.locale("id").format("MMMM")] = 0;
        currMonth = currMonth.add(1, "month");
    }

    let kesehatanBehind = await prisma.Kesehatan.findMany({
        where: {
            tgl_masuk: {
                lte: dateAhead.toISOString(),
                gte: dateBehind.toISOString(),
            },
        },
        select: {
            id: true,
            tgl_masuk: true,
        },
    });

    kesehatanBehind.forEach((item) => {
        let monthObj = dayjs(item.tgl_masuk).locale("id").format("MMMM");
        responseMonth[monthObj] += 1;
    }, {});

    return Object.keys(responseMonth).map((item) => {
        return {
            label: item,
            jumlah: responseMonth[item],
        };
    });
};

export const getTrenPelanggarannOneYearBehind = async () => {
    let { dateAhead, dateBehind } = calculateOneYearBehind();

    let responseMonth = {};

    let maxMonth = dayjs(dateAhead);
    let currMonth = dayjs(dateBehind);

    // console.log(maxMonth.isBefore(currMonth, "date"));
    while (currMonth.isSameOrBefore(maxMonth)) {
        let convertToDate = dayjs().month(currMonth.month());
        responseMonth[convertToDate.locale("id").format("MMMM")] = 0;
        currMonth = currMonth.add(1, "month");
    }

    let pleanggaranBehind = await prisma.Pelanggaran.findMany({
        where: {
            created_at: {
                lte: dateAhead.toISOString(),
                gte: dateBehind.toISOString(),
            },
        },
        select: {
            id: true,
            created_at: true,
        },
    });

    pleanggaranBehind.forEach((item) => {
        let monthObj = dayjs(item.created_at).locale("id").format("MMMM");
        responseMonth[monthObj] += 1;
    }, {});

    return Object.keys(responseMonth).map((item) => {
        return {
            label: item,
            jumlah: responseMonth[item],
        };
    });
};

export const getTAAktif = async () => {
    let ta = await prisma.TahunAjar.findFirst({
        where: {
            aktif: true,
        },
        select: {
            kode_ta: true,
        },
    });

    if (ta) {
        return ta.kode_ta;
    } else {
        return "Tidak ada TA Aktif";
    }
};
