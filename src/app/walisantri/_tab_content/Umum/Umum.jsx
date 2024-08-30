import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

function SummaryItem({ title, value }) {
    return (
        <div className="w-full border p-2 rounded flex flex-col justify-center items-center gap-3">
            <h3 className="font-bold text-md">{title}</h3>
            <p>{value}</p>
        </div>
    );
}

export default function ContentUmum() {
    return (
        <div className="space-y-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <SummaryItem title="Kelas" value="4B" />
                <SummaryItem title="Pelanggaran" value="8" />
                <SummaryItem title="Kesehatan" value="3" />
            </div>
            <div className="space-y-3">
                <h2 className="font-semibold text-md">Pelanggaran Terbaru</h2>
                <Table>
                    <TableCaption>
                        Daftar pelanggaran lengkap dapat dilihat{" "}
                        <Link href="/" className="underline text-blue-600 p">
                            disini
                        </Link>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Tanggal</TableHead>
                            <TableHead>Nama Pelanggaran</TableHead>
                            <TableHead>Kategori Pelanggaran</TableHead>
                            <TableHead className="text-right">Poin</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                INV001
                            </TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="space-y-3">
                <h2 className="font-semibold text-md">
                    Data Kesehatan Terbaru
                </h2>
                <Table>
                    <TableCaption>
                        Daftar kesehatan lengkap dapat dilihat{" "}
                        <Link href="/" className="underline text-blue-600 p">
                            disini
                        </Link>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Tanggal</TableHead>
                            <TableHead>Sakit</TableHead>
                            <TableHead>Penanganan</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                INV001
                            </TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
