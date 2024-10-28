import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";

export default function Page() {
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Penguman Santri</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={[
                            {
                                judul: "TEST",
                                text: "afija afifioaf awfijaf afaiwpf",
                            },
                        ]}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
