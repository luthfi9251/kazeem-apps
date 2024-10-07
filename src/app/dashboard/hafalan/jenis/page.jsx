import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DataTable from "./data-table";
import { getAllJenisHafalan } from "@/actions/hafalan";

export default async function Page() {
    let response = await getAllJenisHafalan();

    if (response.isError) throw response.error;

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Jenis Hafalan</CardTitle>
                    <CardDescription>Jenis Hafalan santri</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={response.data ?? []} />
                </CardContent>
            </Card>
        </div>
    );
}
