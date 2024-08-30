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

function ContentWrapper({ title }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Harap menghubungi Admin Pondok jika menemukan
                    ketidaksesuaian data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    );
}

export default function ContentSection() {
    const searchParams = useSearchParams();
    const tabActive = searchParams.get("tab");

    if (tabActive === "pelanggaran") {
        return <ContentWrapper title="Data Pelanggaran" />;
    } else if (tabActive === "kesehatan") {
        return <ContentWrapper title="Data Kesehatan" />;
    } else {
        return <ContentWrapper title="Dashboard" />;
    }
}
