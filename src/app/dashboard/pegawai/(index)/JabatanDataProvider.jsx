"use client";
import { useState, useEffect, createContext } from "react";
export const JabatanContext = createContext();

export default function JabatanDataProvider({ children, data = [] }) {
    let [dataJabatan, setJabatanGroup] = useState(data);

    return (
        <JabatanContext.Provider value={[dataJabatan, setJabatanGroup]}>
            {children}
        </JabatanContext.Provider>
    );
}
