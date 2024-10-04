import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTable } from "./data-table";
import DaftarSantriSection from "./DaftarSantriSection";
import { getSantriInKamar } from "@/actions/kamar";

export default async function Page(props) {
    const kamarId = props.params.kamarId;
    const dataKamar = await getSantriInKamar(props.params.kamarId);
    if (dataKamar.isError) throw dataKamar.error;
    return (
        <div className="md:p-5 p-2 grid grid-cols-1 gap-3">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Informasi Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className=" w-[150px] font-medium">
                                    Nama Kamar
                                </TableCell>
                                <TableCell>
                                    {dataKamar.data?.nama_kamar}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className=" font-medium">
                                    Kapasitas
                                </TableCell>
                                <TableCell>
                                    {dataKamar.data?.kapasitas}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className=" font-medium">
                                    Deskripsi
                                </TableCell>
                                <TableCell>
                                    {dataKamar.data?.deskripsi ?? "-"}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <DaftarSantriSection
                data={dataKamar.isError ? [] : dataKamar.data.Santri}
                kamarId={kamarId}
            />
        </div>
    );
}
