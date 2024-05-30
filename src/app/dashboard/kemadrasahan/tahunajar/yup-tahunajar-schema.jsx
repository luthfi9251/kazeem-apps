import * as yup from "yup";
let taSchema = yup.object({
    kode_ta: yup.string().required(),
    tgl_mulai: yup.date().required(),
    tgl_selesai: yup.date().required(),
    aktif: yup.boolean().default(false).required(),
});

export default taSchema;
