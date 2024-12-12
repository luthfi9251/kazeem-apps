import { getSantriInformationPerizinan } from "@/actions/izin";
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

export default async function DetailSantriComponent({ santriId }) {
    const santriDetail = await getSantriInformationPerizinan(santriId);
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className=" font-medium">Nama Santri</TableCell>
                    <TableCell>{santriDetail.data?.nama_lengkap}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className=" w-[200px] font-medium">
                        NIS
                    </TableCell>
                    <TableCell>{santriDetail.data?.nis}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className=" font-medium">Kelas</TableCell>
                    <TableCell>{santriDetail.data?.KelasSantri.map((item) => item.Kelas.nama_kelas)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
