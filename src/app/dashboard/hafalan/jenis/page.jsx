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
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function Page() {
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

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_HAFALAN_SANTRI);
