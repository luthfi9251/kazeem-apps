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
import { getAllIzinKeluarSantri } from "@/actions/izin";

export default async function PerizinanSummarySection({ santriId }) {
    const responseAllIzinKeluarSantri = await getAllIzinKeluarSantri(santriId);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-lg">
                    Rekap Izin Non-Pulang Santri
                </CardTitle>
            </CardHeader>
            <CardContent>
                {santriId && (
                    <>
                        <DetailSantriComponent santriId={santriId} />
                        <Separator className="my-5" />
                        <DataTable
                            data={responseAllIzinKeluarSantri.data ?? []}
                            santriId={santriId}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
