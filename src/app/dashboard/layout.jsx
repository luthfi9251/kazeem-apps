import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { auth } from "@/auth";

export default async function DashboardLayout(props) {
    let session = await auth();
    const { children } = props;

    if (session?.user && session.user.accessPage.length > 0) {
        return (
            <div className="flex flex-col md:flex-row w-screen min-h-screen">
                <Sidebar session={session} />
                <div className="grow md:py-5 md:px-5 flex flex-col gap-2 bg-kazeem-primary">
                    {/* <div className="w-[200px] self-center md:block hidden h-10 bg-green-300"></div> */}
                    <div className="relative grow border md:rounded-lg p-0 md:p-2 bg-slate-100">
                        <div className="absolute inset-0 overflow-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        redirect("/login");
    }
}
