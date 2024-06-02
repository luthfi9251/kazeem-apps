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
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function CardDataSantri({ dataSantri }) {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className=" text-lg font-semibold">
                    Data Santri
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="table-auto">
                    <TableBody className="text-sm">
                        <TableRow className=" hover:bg-white border-none">
                            <TableCell className="font-medium py-1 w-[200px]">
                                Nama Lengkap
                            </TableCell>
                            <TableCell className="font-medium py-1 w-[50px]">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataSantri.nama_lengkap}
                            </TableCell>
                        </TableRow>
                        <TableRow className=" hover:bg-white border-none">
                            <TableCell className="font-medium py-1">
                                Kelas saat ini
                            </TableCell>
                            <TableCell className="font-medium py-1">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataSantri.nama_kelas} ({dataSantri.kode_ta})
                            </TableCell>
                        </TableRow>
                        <TableRow className=" hover:bg-white border-none">
                            <TableCell className="font-medium py-1">
                                Total Poin
                            </TableCell>
                            <TableCell className="font-medium py-1">
                                :
                            </TableCell>
                            <TableCell className="text-start py-1">
                                {dataSantri.total_poin}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
