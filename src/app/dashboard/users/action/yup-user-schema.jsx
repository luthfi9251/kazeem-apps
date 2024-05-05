import * as yup from "yup";

let userSchema = yup.object({
    username: yup
        .string()
        .min(6, "Panjang minimal 6 Karakter")
        .default("")
        .required(),
    password: yup.lazy((value) =>
        value === ""
            ? yup.string()
            : yup
                  .string()
                  .min(8, "Panjang minimal 8 karakter!")
                  .max(16, "Panjang maksimal 16 Karakter")
    ),
    email: yup.string().email("Email tidak valid!").default("").required(),
    nama_lengkap: yup
        .string()
        .max(100, "Maksimal 100 Karakter")
        .default("")
        .required(),
    aktif: yup.boolean().default(true).required(),
});

export default userSchema;
