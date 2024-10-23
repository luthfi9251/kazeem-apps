"use client";
import * as yup from "yup";

let presensiSchema = yup.object({
    keterangan: yup.string(),
    tgl_presensi: yup.date().required(),
    status: yup.string().required(),
});

export default presensiSchema;
