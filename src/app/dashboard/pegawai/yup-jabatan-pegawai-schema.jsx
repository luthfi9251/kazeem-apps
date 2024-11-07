import * as yup from "yup";

let jabatanPegawaiSchema = yup.object({
    nama_jabatan: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
});

export default jabatanPegawaiSchema;
