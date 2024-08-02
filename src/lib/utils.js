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
