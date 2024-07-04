import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";
import { auth } from "@/auth";

export default async function DashboardLayout(props) {
    let session = await auth();
    const { children } = props;

    if (session?.user) {
        return (
            <div>
                <Sidebar session={session}>{children}</Sidebar>
            </div>
        );
    } else {
        redirect("/login");
    }
}
