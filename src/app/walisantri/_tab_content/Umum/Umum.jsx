import { getDashboardData } from "@/actions/wallisantriview";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import Link from "next/link";

function SummaryItem({ title, value }) {
    return (
        <div className="w-full border p-2 rounded flex flex-col justify-center items-center gap-3">
            <h3 className="font-bold text-md">{title}</h3>
            <p>{value}</p>
        </div>
    );
}

export default function ContentUmum({ dataUmum }) {
    return (
        <div className="space-y-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <SummaryItem title="Kelas" value={dataUmum?.nama_kelas} />
                <SummaryItem
                    title="Pelanggaran"
                    value={dataUmum?.count.pelanggaran}
                />
                <SummaryItem
                    title="Kesehatan"
                    value={dataUmum?.count.kesehatan}
                />
            </div>
            <div className="space-y-3">
                <h2 className="font-semibold text-md">Pelanggaran Terbaru</h2>
                <Table>
                    <TableCaption className="text-xs">
                        Daftar pelanggaran lengkap dapat dilihat
                        <Link
                            href="/walisantri?tab=pelanggaran"
                            className="underline text-blue-600 p"
                        >
                            disini
                        </Link>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Tanggal</TableHead>
                            <TableHead>Nama Pelanggaran</TableHead>
                            <TableHead>Jenis Pelanggaran</TableHead>
                            <TableHead className="text-right">Poin</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataUmum?.pelanggaran.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {dayjs(item.created_at)
                                            .locale("id")
                                            .format("DD MMMM YYYY")}
                                    </TableCell>
                                    <TableCell>
                                        {item.Kategori.nama_pelanggaran}
                                    </TableCell>
                                    <TableCell>{item.Kategori.jenis}</TableCell>
                                    <TableCell className="text-right">
                                        {item.Kategori.poin}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="space-y-3">
                <h2 className="font-semibold text-md">
                    Data Kesehatan Terbaru
                </h2>
                <Table>
                    <TableCaption className="text-xs">
                        Daftar kesehatan lengkap dapat dilihat
                        <Link
                            href="/walisantri?tab=kesehatan"
                            className="underline text-blue-600 p"
                        >
                            disini
                        </Link>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Tanggal</TableHead>
                            <TableHead>Sakit</TableHead>
                            <TableHead>Penanganan</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataUmum?.kesehatan.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {dayjs(item.tgl_masuk)
                                            .locale("id")
                                            .format("DD MMMM YYYY")}
                                    </TableCell>
                                    <TableCell>{item.nama_penyakit}</TableCell>
                                    <TableCell className=" max-w-[350px]">
                                        {item.penanganan}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.status}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
