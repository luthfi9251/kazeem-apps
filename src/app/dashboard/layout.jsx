import Sidebar from "./Sidebar";
import { auth } from "@/auth";

export default async function DashboardLayout(props) {
    let session = await auth();
    const { children } = props;
    return (
        <div>
            <Sidebar session={session}>{children}</Sidebar>
        </div>
    );
}
