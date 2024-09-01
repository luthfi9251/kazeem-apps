import {
    getDashboardData,
    getWaliSantriSessionData,
} from "@/actions/wallisantriview";
import ContentSection from "./ContentSection";
import Navbar from "./Navbar";
import SantriProfileSection from "./SantriProfileSection";
import TabSection from "./TabSection";
import { redirect } from "next/navigation";
import { HREF_URL } from "@/navigation-data";

export default async function Page() {
    let getDataSession = await getWaliSantriSessionData();

    if (!getDataSession.santri) redirect(HREF_URL.WALISANTRI_VIEW_LOGIN);
    let data = await getDashboardData(getDataSession.santri.nis);

    return (
        <div>
            <Navbar />
            <div className="w-full max-w-[1500px] mx-auto grid md:grid-cols-3 gap-5 p-2 md:p-5">
                <div className=" md:col-span-2 flex flex-col gap-5">
                    <TabSection />
                    <ContentSection
                        nis={getDataSession.santri.nis}
                        data={data.data}
                    />
                </div>
                <SantriProfileSection santri={getDataSession.santri} />
            </div>
        </div>
    );
}
