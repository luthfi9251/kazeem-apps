import * as yup from "yup";
let kelasSchema = yup.object({
    tingkatan_kelas: yup
        .string()
        .required("Minimal terdapat 1 tingkatan Kelas!"),
    paralel_kelas: yup.string().required("Minimal terdapat 1 paralel Kelas!"),
});

export default kelasSchema;
