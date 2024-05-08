import * as yup from "yup";

let loginSchema = yup.object({
    email: yup
        .string()
        .email("Email tidak valid!")
        .max(100, "Maksimal 100 karakter")
        .required(),
    password: yup
        .string()
        .min(6, "Password minimal 6 karakter")
        .max(20, "Maksimal 20 Karakter")
        .required(),
});

export default loginSchema;
