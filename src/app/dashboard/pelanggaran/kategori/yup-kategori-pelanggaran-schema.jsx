import * as yup from "yup";
let kategoriPelanggaranSchema = yup.object({
    nama_pelanggaran: yup
        .string()
        .max(25)
        .required("Nama Pelanggaran Wajib Diisi!"),
    kategori: yup.string().required(),
    jenis: yup.string().required(),
    poin: yup.number().optional(),
});

export default kategoriPelanggaranSchema;
