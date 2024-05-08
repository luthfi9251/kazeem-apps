import * as yup from "yup";

let groupSchema = yup.object({
    nama_group: yup
        .string()
        .min(3, "Panjang minimal 3 Karakter")
        .max(100, "Panjang maksimal 100 Karakter")
        .required("Nama group wajib diisi!"),
    deskripsi: yup
        .string()
        .min(1, "Panjang minimal 1 karakter!")
        .max(100, "Panjang maksimal 100 Karakter")
        .required("Deskripsi wajib diisi!"),
});

export default groupSchema;
