"use client";
import GroupForm from "../GroupForm";
import { toast } from "react-toastify";
import { addGroup } from "@/actions/group";
import { HREF_URL } from "@/navigation-data";
import { useRouter } from "next/navigation";

export default function CreatePage({ pagesData }) {
    let router = useRouter();
    let handleSubmit = (data) => {
        toast.promise(
            () => addGroup(data),
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
    return <GroupForm pages={pagesData} handleSubmit={handleSubmit} />;
}
