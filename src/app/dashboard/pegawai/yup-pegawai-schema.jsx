import * as yup from "yup";

let pegawaiSchema = yup.object({
    nama_pegawai: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    jenis_kel: yup.string().required(),
    no_telp: yup
    .string()
        .min(6, "Panjang minimal 6 karakter!")
        .max(25, "Panjang maksimal 25 Karakter")
        .nullable(),
    email: yup
        .string()
        .email("Format email tidak valid!")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    tempat_lahir: yup
        .string()
        .min(1, "Panjang minimal 1 karakter!")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    tgl_lhr: yup.date().required(),
});

export default pegawaiSchema;
