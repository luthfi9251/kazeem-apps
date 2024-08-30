import Image from "next/image";

export default function Navbar() {
    return (
        <div className="w-screen h-[70px] bg-kazeem-primary p-2 flex items-center gap-3">
            <Image
                width={36}
                height={36}
                src="/kazeem-logo.png"
                alt="Logo Kazeem"
                className="w-auto h-full bg-white p-1 aspect-square object-contain rounded"
            />
            <h1 className="text-white text-xl">Kazeem</h1>
        </div>
    );
}
