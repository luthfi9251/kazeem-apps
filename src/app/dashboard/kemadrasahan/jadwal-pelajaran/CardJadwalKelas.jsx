import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DataTableJadwal from "./DataTableJadwal";

export default function CardJadwalKelas() {
    return (
        <Card className="">
            <CardContent className="">
                <DataTableJadwal data={[]} />
            </CardContent>
        </Card>
    );
}
