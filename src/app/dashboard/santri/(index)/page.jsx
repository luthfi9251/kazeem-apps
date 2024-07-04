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
import { PAGE_NAME } from "@/variables/page-name";

async function getData() {
    let santriData = await prisma.Santri.findMany({
        orderBy: [
            {
                nama_lengkap: "asc",
            },
        ],
        select: {
            id: true,
            nama_lengkap: true,
            nis: true,
            hp: true,
            alamat: true,
            foto: true,
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

    let data = santriData.map((item) => {
        return {
            id: item.id,
            nis: item.nis,
            nama_lengkap: item.nama_lengkap,
            foto: item.foto,
            hp: item.hp,
            alamat: item.alamat,
            nama_wali: item.WaliSantri[0].wali.nama_wali,
        };
    });

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

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_KELOLA_SANTRI);
