import * as yup from "yup";

let waliSantriSchema = yup.object({
    nama_wali: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    tgl_lhr: yup.date().required(),
    email: yup
        .string()
        .email("Format email tidak valid!")
        .max(100, "Panjang maksimal 100 karakter")
        .optional(),
    hp: yup
        .string()
        .min(6, "Panjang minimal 6 karakter!")
        .max(25, "Panjang maksimal 25 Karakter")
        .nullable(),
    peran: yup.string().optional(),
});

export default waliSantriSchema;
