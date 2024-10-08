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
import { getAllJenisHafalan } from "@/actions/hafalan";

export default async function HafalanSummarySection({ santriId }) {
    const responseListJenisHafalan = await getAllJenisHafalan();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-lg">
                    Rekap Hafalan Santri
                </CardTitle>
            </CardHeader>
            <CardContent>
                {santriId && (
                    <>
                        <DetailSantriComponent santriId={santriId} />
                        <Separator className="my-5" />
                        <DataTable
                            data={[]}
                            listJenisHafalan={
                                responseListJenisHafalan.data ?? []
                            }
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
