"use client";
import { useState, useEffect, createContext } from "react";
export const KelasContext = createContext();

export default function KelasDataProvider({
    children,
    allNamaKelas,
    data = [],
}) {
    let [kelas, setKelas] = useState(data);

    return (
        <KelasContext.Provider value={[kelas, setKelas, allNamaKelas]}>
            {children}
        </KelasContext.Provider>
    );
}
