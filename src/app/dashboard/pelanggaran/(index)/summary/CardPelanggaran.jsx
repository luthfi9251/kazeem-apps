import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function CardDetailSiswa({ dataPelanggaran, idSantri }) {
    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className=" text-lg font-semibold">
                    Data Pelanggaran
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns}
                    dataPelanggaran={dataPelanggaran}
                    idSantri={idSantri}
                />
            </CardContent>
        </Card>
    );
}
