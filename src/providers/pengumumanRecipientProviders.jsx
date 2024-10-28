// src/providers/counter-store-provider.tsx
"use client";

import { useStore } from "zustand";
import { createPengumumanRecipientStore } from "@/stores/recipientStore";
import { createContext, useContext, useRef } from "react";

export const RecipientStoreContext = createContext();

export function RecipientStoreProvider({ children }) {
    const storeRef = useRef(null);
    if (!storeRef.current) {
        storeRef.current = createPengumumanRecipientStore();
    }

    return (
        <RecipientStoreContext.Provider value={storeRef.current}>
            {children}
        </RecipientStoreContext.Provider>
    );
}

export const useRecipientStore = (selector) => {
    const recipientCounterStore = useContext(RecipientStoreContext);

    if (!recipientCounterStore) {
        throw new Error(
            `useCounterStore must be used within CounterStoreProvider`
        );
    }

    return useStore(recipientCounterStore, selector);
};
