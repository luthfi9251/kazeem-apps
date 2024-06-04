"use client";
import * as yup from "yup";

let kesehatanSchema = yup.object({
    nama_penyakit: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    penanganan: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(255, "Panjang maksimal 255 karakter")
        .required(),
    kategori: yup.string().required(),
    tgl_masuk: yup.date().required(),
    tgl_keluar: yup.string().when("status", (status, schema) => {
        if (status[0] === "SEMBUH") {
            return schema.required(
                "Wajib isi tanggal Keluar saat status sembuh!"
            );
        } else {
            return schema.optional();
        }
    }),
    status: yup.string().required(),
});

export default kesehatanSchema;
