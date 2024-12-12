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
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";

async function getNotificationWhatsapp() {
    let data = await prisma.PageVariable.findUnique({
        where: {
            key: "MAX_KECAKAPAN",
        },
    });
    // console.log({ data });

    return JSON.parse(data.value);
}

export default async function CardSetTotalPoin() {
    let defVal = await getNotificationWhatsapp();
    async function saveMaxKecakapan(formData) {
        "use server";
        let data = {
            max_emosional: formData.get("max_emosional"),
            max_spiritual: formData.get("max_spiritual"),
            max_pengetahuan: formData.get("max_pengetahuan"),
            max_keterampilan: formData.get("max_keterampilan"),
        };
        let session = await auth();
        let upsertMaxKecakapan = await prisma.PageVariable.upsert({
            where: { key: "MAX_KECAKAPAN" },
            update: {
                value: JSON.stringify(data),
                last_update_by: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
            create: {
                key: "MAX_KECAKAPAN",
                value: JSON.stringify(data),
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

        return;
    }

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <form action={saveMaxKecakapan}>
                <CardHeader>
                    <CardTitle>Maksimum Pelanggaran</CardTitle>
                    <CardDescription>
                        Silahkan menentukan maksimum pelanggaran pada setiap
                        kecakapan melalui input dibawah
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="max_emosional">Emosional</Label>
                            <Input
                                id="max_emosional"
                                name="max_emosional"
                                type="number"
                                defaultValue={defVal.max_emosional}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="max_spiritual">Spiritual</Label>
                            <Input
                                id="max_spiritual"
                                name="max_spiritual"
                                type="number"
                                defaultValue={defVal.max_spiritual}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="max_pengetahuan">Pengetahuan</Label>
                            <Input
                                id="max_pengetahuan"
                                name="max_pengetahuan"
                                type="number"
                                defaultValue={defVal.max_pengetahuan}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="max_keterampilan">
                                Keterampilan
                            </Label>
                            <Input
                                id="max_keterampilan"
                                name="max_keterampilan"
                                type="number"
                                defaultValue={defVal.max_keterampilan}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
