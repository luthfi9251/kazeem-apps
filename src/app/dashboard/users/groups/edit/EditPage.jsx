"use client";
import GroupForm from "../GroupForm";
import { toast } from "react-toastify";
import { updateGroup } from "@/actions/group";
import { HREF_URL } from "@/navigation-data";
import { useRouter } from "next/navigation";

export default function EditPage({ pagesData, defaultValue, id }) {
    let router = useRouter();
    let handleSubmit = (data) => {
        toast.promise(
            () => updateGroup(data, id),
            {
                pending: "Menyimpan data",
                success: {
                    render({ data }) {
                        router.push(HREF_URL.USER_GROUP_HOME);
                        return "Data berhasil disimpan";
                    },
                },
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `${data}`;
                    },
                },
            },
            {
                position: "bottom-right",
            }
        );
    };
    return (
        <GroupForm
            pages={pagesData}
            handleSubmit={handleSubmit}
            defaultValue={defaultValue}
        />
    );
}
