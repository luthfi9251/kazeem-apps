"use client";
import { toast } from "react-toastify";

export const generateExcel = ({
    filename,
    type,
    dataRow = [],
    idKelas = null,
    kodeTa = null,
}) => {
    const generate = new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("data", type);
        formData.append("idKelas", idKelas);
        formData.append("kodeTa", kodeTa);
        formData.append("dataRow", JSON.stringify(dataRow));
        fetch("/api/excel", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.blob())
            .then((data) => {
                const url = URL.createObjectURL(data);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${filename} - ${new Date().toLocaleString(
                    "id"
                )}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                resolve();
            })
            .catch((error) => reject(error));
    });

    toast.promise(
        generate,
        {
            pending: "Mengekspor data",
            success: {
                render({ data }) {
                    return "Data berhasil diexport";
                },
            },
            error: {
                render({ data }) {
                    // When the promise reject, data will contains the error
                    return `Data gagal diexport!`;
                },
            },
        },
        {
            position: "bottom-right",
        }
    );
};
