import { auth } from "@/auth";
import TopSection from "./TopSection";
import withAuth from "@/hoc/withAuth";
import PelanggaranSection from "./PelanggaranSection";
import KesehatanSection from "./KesehatanSection";
import { Suspense } from "react";
import { getTAAktif } from "@/actions/dashboard";
import prisma from "@/lib/prisma";
import PAGE_VARIABLE from "@/variables/page-variable";

const getNamaPondok = async () => {
    let variable = await prisma.PageVariable.findUnique({
        where: {
            key: PAGE_VARIABLE.NAMA_PONDOK,
        },
    });

    return variable?.value || "-";
};

async function Dashboard(props) {
    // console.log(props);
    const ta = await getTAAktif();
    const namaPondok = await getNamaPondok();
    return (
        <div className="w-full md:p-5 p-2 min-h-screen flex flex-col gap-5">
            <div>
                <p className="text-4xl font-bold">Dashboard</p>
                <h1 className=" font-medium text-lg text-kazeem-primary">
                    Selamat Datang,{" "}
                    <span className=" font-bold">
                        {props.session.user.nama_lengkap}
                    </span>
                </h1>
            </div>
            <div>
                <p className="text-lg font-bold">Pondok {namaPondok}</p>
                <p className="text-base font-medium">
                    Tahun Ajaran Aktif : {ta}
                </p>
            </div>

            <TopSection />
            <Suspense fallback="Loading">
                <PelanggaranSection />
            </Suspense>
            <Suspense fallback="Loading">
                <KesehatanSection />
            </Suspense>
        </div>
    );
}

export default withAuth(Dashboard);
