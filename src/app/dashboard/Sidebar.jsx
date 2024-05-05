"use client";
import Link from "next/link";
import { Bell, FileText, Home, Menu, Package2, University } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const linkData = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
        onlyAdmin: false,
    },
    {
        name: "Absensi",
        href: "/dashboard/absensi",
        icon: <FileText className="h-5 w-5" />,
        onlyAdmin: false,
    },
];
export default function Sidebar({ children }) {
    let pathname = usePathname();

    return (
        <div className="grid h-screen overflow-hidden w-full md:w-auto md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r md:block md:h-screen bg-kazeem-primary text-white">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-white text-kazeem-primary">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Image
                                src={"/kazeem-logo.png"}
                                className=""
                                width="36"
                                height="36"
                            />
                            <span className="">Kazeem</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-md font-medium lg:px-4 gap-1 text-kazeem-primary">
                            {linkData.map((item, key) => {
                                return (
                                    <Link
                                        key={key}
                                        href={item.href}
                                        className={
                                            pathname === item.href
                                                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-3 text-kazeem-primary transition-all hover:text-primary"
                                                : "flex items-center gap-3 rounded-lg px-3 py-3 text-white transition-all hover:bg-kazeem-darker"
                                        }
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="md:hidden flex h-14 items-center gap-4 border-b bg-kazeem-primary text-white px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden border-white bg-kazeem-primary hover:bg-kazeem-darker"
                        >
                            <Menu className="h-5 w-5 text-white" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="flex flex-col bg-kazeem-primary text-white"
                    >
                        <nav className="grid gap-2 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Image
                                    src={"/kazeem-logo.png"}
                                    className=" bg-white p-1 rounded-sm"
                                    width="48"
                                    height="48"
                                />
                                <span className="sr-only">Kazeem</span>
                            </Link>
                            <Separator className="bg-white text-white" />
                            {linkData.map((item, key) => {
                                return (
                                    <Link
                                        key={key}
                                        href={item.href}
                                        className={
                                            pathname === item.href
                                                ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-kazeem-primary hover:text-primary"
                                                : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white transition-all hover:bg-kazeem-darker"
                                        }
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="self-start overflow-y-scroll max-h-screen md:pb-0 pb-16">
                {children}
            </div>
            <ToastContainer />
        </div>
    );
}
