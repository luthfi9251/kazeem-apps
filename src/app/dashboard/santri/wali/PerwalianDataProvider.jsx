"use client";
import { useState, useEffect, createContext } from "react";
export const PerwalianContext = createContext();

export default function PerwalianDataProvider({ children, data = [] }) {
    let [dataPerwalian, setDataPerwalian] = useState(data);

    return (
        <PerwalianContext.Provider value={[dataPerwalian, setDataPerwalian]}>
            {children}
        </PerwalianContext.Provider>
    );
}
