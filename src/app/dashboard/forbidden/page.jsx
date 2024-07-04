import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h2 className=" font-bold text-lg">
                    Anda tidak memiliki akses!
                </h2>
                <p className=" font-light text-md">
                    Mohon Maaf, Anda tidak memiliki akses ke halaman ini, Harap
                    Hubungi Administrator anda!
                </p>
                <Link
                    href="/dashboard"
                    className=" underline text-blue-600 font-normal"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
