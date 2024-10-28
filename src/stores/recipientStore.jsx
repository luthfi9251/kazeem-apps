"use client";

import { createStore } from "zustand/vanilla";

export function createPengumumanRecipientStore() {
    return createStore()((set) => ({
        recipient: [],
        addRecipient: (item) =>
            set((state) => ({ recipient: [...state.recipient, ...item] })),
        removeRecipient: (id) =>
            set((state) => ({
                recipient: state.recipient.filter(
                    (item2) => parseInt(item2.id) !== parseInt(id)
                ),
            })),
        clearRecipient: () =>
            set((state) => ({
                recipient: [],
            })),
    }));
}
