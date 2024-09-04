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

async function getNotificationWhatsapp() {
    let data = await prisma.PageVariable.findMany({
        where: {
            key: {
                startsWith: "ENABLE_WHATSAPP_",
            },
        },
    });

    let returned = {
        pelanggaran:
            data.find((item) => item.key === "ENABLE_WHATSAPP_PELANGGARAN")
                ?.value === "true"
                ? true
                : false,
        kesehatan:
            data.find((item) => item.key === "ENABLE_WHATSAPP_KESEHATAN")
                ?.value === "true"
                ? true
                : false,
    };
    console.log(returned);
    return returned;
}

export default async function CardWhatsappAPI() {
    let defVal = await getNotificationWhatsapp();
    async function saveWhatsappSetting(formData) {
        "use server";
        let session = await auth();
        let insertPelanggaran = prisma.PageVariable.upsert({
            where: {
                key: "ENABLE_WHATSAPP_PELANGGARAN",
            },
            update: {
                value:
                    formData.get("enablePelanggaran") == "on"
                        ? "true"
                        : "false",
            },
            create: {
                key: "ENABLE_WHATSAPP_PELANGGARAN",
                value:
                    formData.get("enablePelanggaran") == "on"
                        ? "true"
                        : "false",
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
        let insertKesehatan = prisma.PageVariable.upsert({
            where: {
                key: "ENABLE_WHATSAPP_KESEHATAN",
            },
            update: {
                value:
                    formData.get("enableKesehatan") == "on" ? "true" : "false",
            },
            create: {
                key: "ENABLE_WHATSAPP_KESEHATAN",
                value:
                    formData.get("enableKesehatan") == "on" ? "true" : "false",
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

        await Promise.all([insertKesehatan, insertPelanggaran]);
    }
    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <form action={saveWhatsappSetting}>
                <CardHeader>
                    <CardTitle>Whatsapp API</CardTitle>
                    <CardDescription>
                        Anda dapat mengaktifkan notifikasi wali santri saat
                        santri melakukan pelanggaran atau kesehatan
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="pelanggaran"
                                defaultChecked={defVal.pelanggaran}
                                name="enablePelanggaran"
                            />
                            <label
                                htmlFor="pelanggaran"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Notifikasi Pelanggaran
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="kesehatan"
                                name="enableKesehatan"
                                defaultChecked={defVal.kesehatan}
                            />
                            <label
                                htmlFor="kesehatan"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Notifikasi Kesehatan
                            </label>
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
