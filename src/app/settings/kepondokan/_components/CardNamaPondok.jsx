import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { HREF_URL } from "@/navigation-data";
import { revalidatePath } from "next/cache";

async function getNamaPondok() {
    let nama = await prisma.PageVariable.findUnique({
        where: {
            key: "NAMA_PONDOK",
        },
    });

    return nama?.value || "";
}

export default async function CardNamaPondok() {
    let namaPondok = await getNamaPondok();

    async function saveNamaPondok(formData) {
        "use server";
        let session = await auth();
        let namaPondokForm = formData.get("nama_pondok");
        await prisma.PageVariable.upsert({
            where: {
                key: "NAMA_PONDOK",
            },
            update: {
                value: namaPondokForm,
            },
            create: {
                key: "NAMA_PONDOK",
                value: namaPondokForm,
                created_by: {
                    connect: {
                        id: session.user.id,
                    },
                },
                last_update_by: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        revalidatePath(HREF_URL.SETTINGS_KEPONDOKAN);
    }

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <form action={saveNamaPondok}>
                <CardHeader>
                    <CardTitle>Nama Pondok</CardTitle>
                    <CardDescription>
                        Nama Pondok pengguna aplikasi Kazeem
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="Nama Pondok"
                        name="nama_pondok"
                        defaultValue={namaPondok}
                        required
                    />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
