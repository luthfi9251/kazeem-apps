import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DataTable from "./data-table";
import { getDetailPengumuman } from "@/actions/pengumuman";
import dayjs from "dayjs";
import "dayjs/locale/id";

const DUMMY_DATA = [
    {
        title: "Judul Pengumuman",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fuga quam pariatur! Amet atque veritatis nesciun",
    },
    {
        title: "Teks",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fuga quam pariatur! Amet atque veritatis nesciun",
    },
];

export default async function Page(props) {
    let serverResponse = await getDetailPengumuman(props.params.pengumumanId);

    if (serverResponse.isError) throw serverResponse.error;

    const dataRes = serverResponse.data;

    return (
        <div className="md:p-5 p-2 grid grid-cols-1 gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Detail Pengumuman Santri</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3">
                    <div className="text-sm">
                        <p className="font-semibold">Judul Pengumuman</p>
                        <p className="">{dataRes.judul}</p>
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold">Dibuat pada</p>
                        <p className="">
                            {dayjs(dataRes.created_at)
                                .locale("id")
                                .format("DD MMMM YYYY")}
                        </p>
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold">Teks</p>
                        <p className="">{dataRes.teks}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Penerima</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable data={dataRes.PengumumanRecipient} />
                </CardContent>
            </Card>
        </div>
    );
}
