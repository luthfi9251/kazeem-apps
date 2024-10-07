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

export default function DetailSantriComponent() {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className=" w-[200px] font-medium">
                        NIS
                    </TableCell>
                    <TableCell>Test</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className=" font-medium">Nama Santri</TableCell>
                    <TableCell>LKL</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
