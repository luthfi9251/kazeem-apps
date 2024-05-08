import { auth } from "@/auth";

export default async function Dashboard() {
    let session = await auth();
    console.log(session);
    return <div className="w-ful min-h-screen">Hallo</div>;
}
