"use client";
import { useState, useEffect, createContext } from "react";
export const KelasContext = createContext();

export default function KelasDataProvider({ children, data = [] }) {
    let [kelas, setKelas] = useState(data);

    return (
        <KelasContext.Provider value={[kelas, setKelas]}>
            {children}
        </KelasContext.Provider>
    );
}
