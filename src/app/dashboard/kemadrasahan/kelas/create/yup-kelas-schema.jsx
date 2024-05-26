import * as yup from "yup";
let kelasSchema = yup.object({
    tingkatan_kelas: yup
        .string()
        .required("Minimal terdapat 1 tingkatan Kelas!"),
    paralel_kelas: yup.string().required("Minimal terdapat 1 paralel Kelas!"),
    tahun_ajaran_mulai: yup
        .number()
        .max(3000)
        .min(2000)
        .required("Tahun Ajaran harus diisi!"),
    tahun_ajaran_selesai: yup
        .number()
        .max(3000)
        .min(2000)
        .required("Tahun Ajaran harus diisi!"),
    aktif: yup.boolean().required().default(true),
});

export default kelasSchema;
