import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FormPengumuman from "./FormPengumuman";
import RecipientListSection from "./RecipientListSection";
import { RecipientStoreProvider } from "@/providers/pengumumanRecipientProviders";

export default function Page() {
    return (
        <RecipientStoreProvider>
            <div className="md:p-5 p-2 grid grid-cols-1 gap-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Buat Pengumuman Santri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormPengumuman />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Penerima</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecipientListSection />
                    </CardContent>
                </Card>
            </div>
        </RecipientStoreProvider>
    );
}
