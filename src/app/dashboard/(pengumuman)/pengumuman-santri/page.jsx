import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { getAllPengumuman } from "@/actions/pengumuman";

export default async function Page() {
    let serverResponse = await getAllPengumuman();

    if (serverResponse.isError) throw serverResponse.error;

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Penguman Santri</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={serverResponse.data ?? []} />
                </CardContent>
            </Card>
        </div>
    );
}
