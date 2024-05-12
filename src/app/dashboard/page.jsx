import { auth } from "@/auth";
import withAuth from "@/hoc/withAuth";

async function Dashboard(props) {
    console.log(props);
    return <div className="w-ful min-h-screen">Hallo</div>;
}

export default withAuth(Dashboard);
