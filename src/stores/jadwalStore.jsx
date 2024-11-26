"use client";

import { createStore } from "zustand/vanilla";

export function createJadwalStore(listjadwal, listPengampu) {
    return createStore()((set) => ({
        listJadwal: listjadwal ?? [],
        listPengampu: listPengampu ?? [],
        updateJadwal: (item) =>
            set((state) => ({
                ...state,
                listJadwal: item,
            })),
        updatePengampu: (item) =>
            set((state) => ({
                ...state,
                listPengampu: item,
            })),
    }));
}
