import * as yup from "yup";

let kelasSantriSchema = yup.object({
    id_santri: yup
        .number("Harus berupa angka")
        .required("")
        .typeError("Santri harus diisi!"),
    status: yup.string().required(),
});

export default kelasSantriSchema;
