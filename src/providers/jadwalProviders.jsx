// src/providers/counter-store-provider.tsx
"use client";

import { useStore } from "zustand";
import { createContext, useContext, useRef } from "react";
import { createJadwalStore } from "@/stores/jadwalStore";

export const JadwalPelajaranContext = createContext();

export function JadwalStoreProvider({ children, listMapel, listPengampu }) {
    const storeRef = useRef(null);
    if (!storeRef.current) {
        storeRef.current = createJadwalStore(listMapel, listPengampu);
    }

    return (
        <JadwalPelajaranContext.Provider value={storeRef.current}>
            {children}
        </JadwalPelajaranContext.Provider>
    );
}

export const useJadwalStore = (selector) => {
    const jadwalStore = useContext(JadwalPelajaranContext);

    if (!jadwalStore) {
        throw new Error(
            `useCounterStore must be used within CounterStoreProvider`
        );
    }

    return useStore(jadwalStore, selector);
};
