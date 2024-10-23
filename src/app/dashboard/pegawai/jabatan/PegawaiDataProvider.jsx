"use client";
import { useState, useEffect, createContext } from "react";
export const PegawaiContext = createContext();

export default function PegawaiDataProvider({ children, data = [] }) {
    let [dataPegawai, setDataPegawai] = useState(data);

    return (
        <PegawaiContext.Provider value={[dataPegawai, setDataPegawai]}>
            {children}
        </PegawaiContext.Provider>
    );
}
