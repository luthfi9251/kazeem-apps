"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import PegawaiListView from "./PegawaiListView";

export default function PegawaiListForm({
    disabled = false,
    allowDetail = true,
}) {

    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                    <CardDescription> </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <PegawaiListView
                        disabled={disabled}
                        allowDetail={allowDetail}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
