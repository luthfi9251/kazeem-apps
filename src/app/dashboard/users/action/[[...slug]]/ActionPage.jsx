"use client";

import { useRef, createContext, useState } from "react";
import UserForm from "../UserForm";
import UserGroupForm from "../UserGroupForm";
import ActionButton from "../ActionButton";

export const GroupContext = createContext();

export default function ActionPage({ data }) {
    const formRef = useRef();
    const userId = data[0]?.id || null;

    let [groupSelected, setGroupSelected] = useState(
        data[0]?.UserGroup ? data[0]?.UserGroup : []
    );

    return (
        <GroupContext.Provider
            value={[groupSelected, setGroupSelected, userId]}
        >
            <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
                <ActionButton form={formRef} />
                <UserForm reference={formRef} user={data[0]} />
                <UserGroupForm
                    groups={data[1]}
                    userGroups={data[0]?.UserGroup}
                />
            </div>
        </GroupContext.Provider>
    );
}
