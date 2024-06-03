"use client";
import { useState, useEffect, createContext } from "react";
export const WaliContext = createContext();

export default function WaliDataProvider({ children, data = [] }) {
    let [dataWali, setWaliGroup] = useState(data);

    return (
        <WaliContext.Provider value={[dataWali, setWaliGroup]}>
            {children}
        </WaliContext.Provider>
    );
}
