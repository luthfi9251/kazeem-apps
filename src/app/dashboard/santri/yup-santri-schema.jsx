import * as yup from "yup";

let santriSchema = yup.object({
    nama_lengkap: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    alamat: yup
        .string()
        .min(1, "Panjang minimal 1 Karakter")
        .max(255, "Panjang maksimal 255 karakter")
        .required(),
    email: yup
        .string()
        .email("Format email tidak valid!")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    hp: yup
        .string()
        .min(6, "Panjang minimal 6 karakter!")
        .max(25, "Panjang maksimal 25 Karakter")
        .nullable(),
    // hp: yup.lazy((value) =>
    //     value === ""
    //         ? yup.string()
    //         : yup
    //               .string()
    //               .min(6, "Panjang minimal 6 karakter!")
    //               .max(25, "Panjang maksimal 25 Karakter")
    // ),
    tempat_lahir: yup
        .string()
        .min(1, "Panjang minimal 1 karakter!")
        .max(100, "Panjang maksimal 100 karakter")
        .required(),
    tgl_lhr: yup.date().required(),
    // foto: yup.object().shape({
    //     file: yup
    //         .mixed()
    //         .required("Please select a file")
    //         .test("fileType", "Unsupported file format", (value) => {
    //             const allowedTypes = ["image/jpeg", "image/png"];
    //             return value && allowedTypes.includes(value.type);
    //         }),
    // }),
});

export default santriSchema;
