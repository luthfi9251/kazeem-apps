"use client";
import { useState, useEffect, createContext } from "react";
export const GroupContext = createContext();

export default function GroupDataProvider({ children, data }) {
    let [dataGroup, setDataGroup] = useState(data);

    return (
        <GroupContext.Provider value={[dataGroup, setDataGroup]}>
            {children}
        </GroupContext.Provider>
    );
}
