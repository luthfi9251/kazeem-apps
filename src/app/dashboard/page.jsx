import { auth } from "@/auth";
import withAuth from "@/hoc/withAuth";

async function Dashboard(props) {
    // console.log(props);
    return (
        <div className="w-ful min-h-screen grid place-items-center">
            <h1 className=" font-bold text-3xl text-kazeem-primary">
                Selamat Datang,{" "}
                <span className=" font-black">
                    {props.session.user.nama_lengkap}
                </span>
            </h1>
        </div>
    );
}

export default withAuth(Dashboard);
