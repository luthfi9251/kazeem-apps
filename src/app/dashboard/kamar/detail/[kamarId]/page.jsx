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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { HREF_URL } from "@/navigation-data";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function Page(props) {
    const kamarId = props.params.kamarId;
    const dataKamar = await getSantriInKamar(props.params.kamarId);
    if (dataKamar.isError) throw dataKamar.error;

    const infoKamar = {
        nama_kamar: dataKamar.data?.nama_kamar,
        kapasitas: dataKamar.data?.kapasitas,
        lokasi: dataKamar.data?.lokasi ?? "-",
        deskripsi: dataKamar.data?.deskripsi ?? "-",
    };
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
                                    {`${dataKamar.data?._count.Santri} / ${dataKamar.data?.kapasitas}`}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className=" font-medium">
                                    Lokasi
                                </TableCell>
                                <TableCell>
                                    {dataKamar.data?.lokasi ?? "-"}
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
                    <Separator />
                    <Link href={HREF_URL.KAMAR_SANTRI_EDIT(kamarId)}>
                        <Button className="mt-2 w-[100px] bg-kazeem-primary hover:bg-kazeem-darker">
                            Edit
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <DaftarSantriSection
                info={dataKamar.data}
                data={dataKamar.isError ? [] : dataKamar.data.Santri}
                kamarId={kamarId}
                infoKamar={infoKamar}
            />
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_KAMAR_SANTRI);
