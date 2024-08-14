import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, pad with leading zero
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date string
    return `${year}-${month}-${day}`;
}

export function generateNamaKelas(tingkatan, separator, paralel) {
    return `${tingkatan}${separator}${paralel}`;
}

export function serverResponse(data = null, isError = false, error = null) {
    return { data, isError, error };
}

export function checkFormatAllowedByFileName(fileName, allowedExtension) {
    let fileNameList = fileName.split(".");
    let extension = fileNameList[fileNameList.length - 1].toLowerCase();
    return allowedExtension.includes(extension);
}

export function generateChartDataAndConfigTop5(serverResponse) {
    const chartData = [
        {
            label: "nomor1",
            jumlah: serverResponse[0]?.jumlah,
            fill: "var(--color-nomor1)",
        },
        {
            label: "nomor2",
            jumlah: serverResponse[1]?.jumlah,
            fill: "var(--color-nomor2)",
        },
        {
            label: "nomor3",
            jumlah: serverResponse[2]?.jumlah,
            fill: "var(--color-nomor3)",
        },
        {
            label: "nomor4",
            jumlah: serverResponse[3]?.jumlah,
            fill: "var(--color-nomor4)",
        },
        {
            label: "nomor5",
            jumlah: serverResponse[4]?.jumlah,
            fill: "var(--color-nomor5)",
        },
    ];

    const chartConfig = {
        jumlah: {
            label: "Jumlah",
        },
        nomor1: {
            label: serverResponse[0]?.label,
            color: "hsl(var(--chart-1))",
        },
        nomor2: {
            label: serverResponse[1]?.label,
            color: "hsl(var(--chart-2))",
        },
        nomor3: {
            label: serverResponse[2]?.label,
            color: "hsl(var(--chart-3))",
        },
        nomor4: {
            label: serverResponse[3]?.label,
            color: "hsl(var(--chart-4))",
        },
        nomor5: {
            label: serverResponse[4]?.label,
            color: "hsl(var(--chart-5))",
        },
    };

    return { chartData, chartConfig };
}

export function generateChartDataAndConfigTrenMonthly(serverResponse) {
    // console.log(serverResponse);
    const chartConfig = {
        jumlah: {
            label: "Jumlah",
            color: "hsl(var(--chart-1))",
        },
    };
    return { chartConfig, chartData: serverResponse };
}
