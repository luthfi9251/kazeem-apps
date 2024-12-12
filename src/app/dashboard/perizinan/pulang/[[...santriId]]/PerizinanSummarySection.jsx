import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DetailSantriComponent from "./DetailSantriComponent";
import DataTable from "./data-table";
import { Separator } from "@/components/ui/separator";
import { getAllIzinPulangSantri } from "@/actions/izin";

export default async function PerizinanSummarySection({ santriId }) {
    const responseAllIzinPulangSantri = await getAllIzinPulangSantri(santriId);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-lg">
                    Rekap Izin Pulang Santri
                </CardTitle>
            </CardHeader>
            <CardContent>
                {santriId && (
                    <>
                        <DetailSantriComponent santriId={santriId} />
                        <Separator className="my-5" />
                        <DataTable
                            data={responseAllIzinPulangSantri.data ?? []}
                            santriId={santriId}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
