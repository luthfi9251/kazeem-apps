import prisma from "@/lib/prisma";

export const getNamaPondok = async () => {
    let nama = await prisma.PageVariable.findUnique({
        where: {
            key: "NAMA_PONDOK",
        },
    });

    return nama?.value || "";
};

export const getEnableWhatsappNotification = async () => {
    let data = await prisma.PageVariable.findUnique({
        where: {
            key: "ENABLE_WHATSAPP_PELANGGARAN",
        },
    });

    return data?.value === "true" ? true : false;
};
