import ContentSection from "./ContentSection";
import Navbar from "./Navbar";
import SantriProfileSection from "./SantriProfileSection";
import TabSection from "./TabSection";

export default function Page() {
    return (
        <div>
            <Navbar />
            <div className="w-full max-w-[1500px] mx-auto grid md:grid-cols-3 gap-5 p-2 md:p-5">
                <div className=" md:col-span-2 flex flex-col gap-5">
                    <TabSection />
                    <ContentSection />
                </div>
                <SantriProfileSection />
            </div>
        </div>
    );
}
