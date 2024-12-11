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

export default function CardKecakapan({ dataKecakapan }) {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className=" text-lg font-semibold">
                    Jumlah Poin per Kecakapan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {Object.keys(dataKecakapan).map((item) => (
                            <TableRow className=" hover:bg-white border-none">
                                <TableCell className="font-medium py-1 w-[200px]">
                                    {item}
                                </TableCell>
                                <TableCell className="font-medium py-1 w-[50px]">
                                    :
                                </TableCell>
                                <TableCell className="text-start py-1">
                                    {dataKecakapan[item]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
