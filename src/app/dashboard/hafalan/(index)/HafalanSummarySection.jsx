import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DetailSantriComponent from "./DetailSantriComponent";

export default function HafalanSummarySection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-lg">
                    Rekap Hafalan Santri
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DetailSantriComponent />
            </CardContent>
        </Card>
    );
}
