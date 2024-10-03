import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { getAllKamarSantri } from "@/actions/kamar";

export default async function Page() {
    const dataKamar = await getAllKamarSantri();
    if (dataKamar.isError) throw dataKamar.error;
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Kamar</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={dataKamar.data} />
                </CardContent>
            </Card>
        </div>
    );
}
