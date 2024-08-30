"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const TAB_LIST = [
    {
        value: "umum",
        text: "Umum",
    },
    {
        value: "kesehatan",
        text: "Kesehatan",
    },
    {
        value: "pelanggaran",
        text: "Pelanggaran",
    },
];

export default function TabSection() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const defaultValueTab = searchParams.get("tab") || TAB_LIST[0].value;
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const handleChangeTab = (value) =>
        router.push(pathname + "?" + createQueryString("tab", value));

    return (
        <div className="">
            <Tabs
                onValueChange={handleChangeTab}
                defaultValue={defaultValueTab}
            >
                <TabsList className="bg-gray-200 ">
                    {TAB_LIST.map((item, key) => {
                        return (
                            <TabsTrigger value={item.value} key={item.value}>
                                {item.text}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </Tabs>
        </div>
    );
}
