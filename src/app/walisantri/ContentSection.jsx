"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import ContentUmum from "./_tab_content/Umum/Umum";
import Pelanggaran from "./_tab_content/Pelanggaran/Pelanggaran";
import Kesehatan from "./_tab_content/Kesehatan/Kesehatan";

function ContentWrapper({ title, children }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Harap menghubungi Admin Pondok jika menemukan
                    ketidaksesuaian data
                </CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export default function ContentSection() {
    const searchParams = useSearchParams();
    const tabActive = searchParams.get("tab");

    if (tabActive === "pelanggaran") {
        return (
            <ContentWrapper title="Data Pelanggaran">
                <Pelanggaran />
            </ContentWrapper>
        );
    } else if (tabActive === "kesehatan") {
        return (
            <ContentWrapper title="Data Kesehatan">
                <Kesehatan />
            </ContentWrapper>
        );
    } else {
        return (
            <ContentWrapper title="Dashboard">
                <ContentUmum />
            </ContentWrapper>
        );
    }
}
