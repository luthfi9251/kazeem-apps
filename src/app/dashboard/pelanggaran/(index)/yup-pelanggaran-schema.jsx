import * as yup from "yup";

let pelanggaranSchema = yup.object({
    id_santri: yup
        .string()
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    nama_pelanggaran_option: yup.string(),
    nama_pelanggaran: yup
        .string()
        .max(25)
        .required("Nama Pelanggaran Wajib Diisi!"),
    allow_add: yup.boolean().default(false),
    keterangan: yup.string().optional(),
    konsekuensi: yup.string().required(),
    kategori: yup.string().required(),
    jenis: yup.string().required(),
    poin: yup.number().optional(),
});

export default pelanggaranSchema;
