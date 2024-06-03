"use client";

export default function Error({ error, reset }) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h2 className=" font-bold text-lg">
                    Mohon Maaf, Terjadi Kesalahan!
                </h2>
                <p className=" font-light text-md">
                    Error:{" "}
                    <span className=" bg-slate-100 p-1">{error.message}</span>
                </p>
            </div>
        </div>
    );
}
