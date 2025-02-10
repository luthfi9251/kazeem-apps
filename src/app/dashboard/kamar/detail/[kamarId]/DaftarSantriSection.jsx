"use client";
import { getAllSantriNotInKamar } from "@/actions/kamar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { severResponseFormatAdapterForUseQuery } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";

export default function DaftarSantriSection({ kamarId, data, infoKamar }) {
    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Data Santri</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={data}
                    kamarId={kamarId}
                    infoKamar={infoKamar}
                />
            </CardContent>
        </Card>
    );
}
