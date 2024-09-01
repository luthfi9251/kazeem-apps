"use client";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    getWaliSantriSessionData,
    waliSantriLogOut,
} from "@/actions/wallisantriview";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

function DisplayText({ title, value }) {
    return (
        <div className="w-full flex flex-col items-center gap-1">
            <h2 className="font-bold text-base">{title}</h2>
            <p className="text-sm">{value}</p>
        </div>
    );
}

export default function SantriProfileSection({ santri }) {
    let dataSantri = { santri };
    const logoutHandler = async () => {
        await waliSantriLogOut();
    };
    return (
        <div>
            <Card className=" col-span-1 flex flex-col items-center p-2 md:p-5 gap-5 rounded">
                <Image
                    width={200}
                    height={200}
                    src={dataSantri.santri.foto || "/empty-profile.png"}
                    alt="Foto Santri"
                    className="aspect-square object-cover object-center rounded-full max-w-[200px] border-2"
                />
                <div className="text-center">
                    <h1 className=" font-bold text-md md:text-lg">
                        {dataSantri.santri?.nama_lengkap}
                    </h1>
                    <span className="text-sm">{dataSantri.santri?.nis}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <DisplayText
                        title="Email"
                        value={dataSantri.santri?.email}
                    />
                    <DisplayText title="No. HP" value={dataSantri.santri?.hp} />
                    <DisplayText
                        title="Alamat"
                        value={dataSantri.santri?.alamat}
                    />
                    <DisplayText
                        title="Tempat & Tanggal Lahir"
                        value={`${dataSantri.santri?.tempat_lahir}, ${dayjs(
                            dataSantri.santri?.tgl_lhr
                        )
                            .locale("id")
                            .format("DD MMMM YYYY")}`}
                    />
                </div>
                <Button className="bg-red-500" onClick={logoutHandler}>
                    Keluar
                </Button>
            </Card>
        </div>
    );
}
