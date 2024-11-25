import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { getMataPelajaran } from "@/actions/pelajaran";

async function page() {
    let data = await getMataPelajaran();

    if (data.isError) throw data.error;

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Mata Pelajaran</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={data.data} />
                </CardContent>
            </Card>
        </div>
    );
}

export default page;
