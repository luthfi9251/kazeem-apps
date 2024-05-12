import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function withAuth(Component) {
    return async function withAuth(props) {
        const session = await auth();

        if (!session?.user) {
            redirect("/login");
            return null;
        }

        return <Component {...props} session={session} />;
    };
}
