import axios from "axios";
import { getNamaPondok } from "./variable";
import dayjs from "dayjs";

export const NOTIFICATION_URL = {
    WHATSAPP_PELANGGARAN:
        process.env.KAZEEM_BACKEND_URL + "/whatsapp/pelanggaran",
};

export const generatePelanggaranMessage = async (data) => {
    let { idKelasSantri, namaPelanggaran } = data;
    let dataSantri = await prisma.KelasSantri.findFirst({
        where: {
            id: idKelasSantri,
        },
        select: {
            Santri: {
                select: {
                    nama_lengkap: true,
                    nis: true,
                    WaliSantri: {
                        select: {
                            wali: {
                                select: {
                                    hp: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    let payload = {
        nama_santri: dataSantri.Santri.nama_lengkap,
        nis_santri: dataSantri.Santri.nis,
        recipient: "6281390858986",
        callback_url: encodeURIComponent(
            "https://psm.kazeem.cloud/walisantri/login"
        ),
        nama_pondok: (await getNamaPondok()) || "test pondok",
        nama_pelanggaran: namaPelanggaran,
        tgl_pelanggaran: dayjs().locale("id").format("dddd, DD MMMM YYYY"),
    };
    return payload;
};

export const sendNotification = async (url, payload) => {
    try {
        let request = await axios.post(url, payload, {
            headers: {
                Authorization: "Bearer " + process.env.KAZEEM_BACKEND_AUTH,
            },
        });

        return { success: true, error: null };
    } catch (err) {
        console.log(err);
        return { success: false, error: err.message };
    }
};
