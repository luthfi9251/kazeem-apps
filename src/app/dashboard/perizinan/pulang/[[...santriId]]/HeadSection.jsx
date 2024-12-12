import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import SearchComponent from "./SearchComponent";

export default function HeadSection({ dataSantri }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Perizinan Pulang Santri</CardTitle>
                <CardDescription>Silahkan pilih santri</CardDescription>
            </CardHeader>
            <CardContent>
                <SearchComponent dataSantri={dataSantri} />
            </CardContent>
        </Card>
    );
}
