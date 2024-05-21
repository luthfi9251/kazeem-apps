import * as yup from "yup";

let pelanggaranSchema = yup.object({
    id_santri: yup
        .string()
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
});

export default pelanggaranSchema;
