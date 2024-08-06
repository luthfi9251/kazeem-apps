import { getTotalHeader } from "@/actions/dashboard";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function CardDisplay({ title, value, description }) {
    return (
        <Card>
            <CardHeader>
                <CardDescription className="font-semibold text-base">
                    {title}
                </CardDescription>
                <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs">{description}</p>
            </CardContent>
        </Card>
    );
}

export default async function TopSection() {
    let { totalSantri, totalPelanggaran, totalSantriPerawatan } =
        await getTotalHeader();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            <CardDisplay
                title="Total Santri"
                value={totalSantri}
                description="Total data santri"
            />
            <CardDisplay
                title="Jumlah Pelanggaran"
                value={totalPelanggaran}
                description="Pelanggaran dalam 1 tahun (Januari - Desember)"
            />
            <CardDisplay
                title="Jumlah Santri Sakit"
                value={totalSantriPerawatan}
                description="Santri dalam perawatan"
            />
        </div>
    );
}
