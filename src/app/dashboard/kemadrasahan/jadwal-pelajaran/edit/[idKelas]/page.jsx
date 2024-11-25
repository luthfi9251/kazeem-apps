import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CardInfoKelas from "../../CardInfoKelas";
import CardJadwalKelas from "../../CardJadwalKelas";

function page({ params }) {
    return (
        <div className="md:p-5 p-2 grid md:grid-cols-2 grid-cols-1 gap-5">
            <Card className=" col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Jadwal Kelas</CardTitle>
                    <CardDescription>
                        Hanya dapat mengeditjadwal kelas pada TA Aktif saja
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3">
                    <CardInfoKelas idKelas={params.idKelas} />
                    <CardJadwalKelas />
                </CardContent>
            </Card>
        </div>
    );
}

export default page;
