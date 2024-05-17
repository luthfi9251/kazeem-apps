import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

async function getData() {
    let santriData = await prisma.Santri.findMany({
        select: {
            id: true,
            nama_lengkap: true,
            hp: true,
            alamat: true,
            WaliSantri: {
                select: {
                    wali: {
                        select: {
                            nama_wali: true,
                        },
                    },
                },
            },
        },
    });

    // let a = {
    //     id: 1,
    //     nama_lengkap: "Muhammad Luthfi Irfan",
    //     hp: "adaada",
    //     alamat: "adadada",
    //     WaliSantri: [{ wali: { nama_wali: "Rohmad Widodo" } }],
    // };
    let data = santriData.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.nama_lengkap,
            hp: item.hp,
            alamat: item.alamat,
            nama_wali: item.WaliSantri[0].wali.nama_wali,
        };
    });
    // console.log(data);
    return data;
}

async function Page() {
    const santri = await getData();
    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Santri</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={santri} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_SANTRI_PAGE);
