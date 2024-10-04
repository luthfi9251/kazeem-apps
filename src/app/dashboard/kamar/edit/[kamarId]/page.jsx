import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FormEditKamar from "./FormEditKamar";
import { getKamarById } from "@/actions/kamar";

export default async function Page(props) {
    const kamarId = props.params.kamarId;
    const dataKamar = await getKamarById(kamarId);

    if (dataKamar.isError) throw dataKamar.error;

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Infomasi Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormEditKamar data={dataKamar.data} />
                </CardContent>
            </Card>
        </div>
    );
}
