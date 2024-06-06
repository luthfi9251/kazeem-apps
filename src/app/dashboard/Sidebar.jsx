"use client";
import Link from "next/link";
import signOut from "./_action.js/signOut";
import { Settings, Menu, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { URL_PATH } from "@/navigation-data";
import { PAGE_ACCESS_CONFIG } from "@/security-config";

function AlertDialogLogout() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-10 p-1 text-red-500 bg-slate-100 hover:bg-red-500 hover:text-white"
                >
                    <LogOut className="w-5 h-5" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-2/3 rounded">
                <form
                    action={async () => {
                        await signOut();
                    }}
                    className="w-full"
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure to logging out?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You can log in anytime
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-kazeem-primary hover:bg-kazeem-darker"
                            type="submit"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function Sidebar(props) {
    let pathname = usePathname();
    let router = useRouter();
    let { children, session } = props;

    let generateFallbackAvatar = () => {
        if (session) {
            let name = session.user.nama_lengkap;
            let list = name.split(" ");
            if (list.length > 1) {
                return list[0].charAt(0) + list[list.length - 1].charAt(0);
            } else {
                return list[0].charAt(0);
            }
        }
    };

    let getOpenedAcordion = () => {
        let index = -1;
        dataLink.find((item, i) => {
            if (item.href === pathname) {
                index = i;
                return true;
            } else {
                item.children.findLast((item2) => {
                    if (pathname.includes(item2.href)) {
                        index = i;
                        return true;
                    }
                });
            }
            return false;
        });
        return index;
    };

    let getAllowedNavLink = () => {
        let nav = [];
        URL_PATH.forEach((item) => {
            let pageName = item.page_name;
            let pageConfig = PAGE_ACCESS_CONFIG.find(
                (item) => item.name === pageName
            );

            if (!pageConfig)
                throw Error(
                    "Kesalahan dalam konfigurasi navigation data dan security config!"
                );
            let allowed = false;
            if (session) {
                allowed = pageConfig.allowedGroup.some((role) =>
                    session.user.groups.includes(role)
                );
            }

            if (allowed) {
                nav.push(item);
            }
        });
        return nav;
    };

    let dataLink = getAllowedNavLink();

    let calculateActivePage = (navItem) => {
        if (pathname.includes(navItem.href)) {
            let suffixPathname = pathname.split(navItem.href);
            if (suffixPathname.length > 1) {
                let part = suffixPathname[1].split("/");
                let normalize = `/${part[1]}`;
                if (navItem.suffix.includes(normalize)) {
                    return true;
                } else if (suffixPathname[0] === suffixPathname[1]) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };

    return (
        <div className="flex flex-col md:grid h-screen overflow-hidden w-full md:w-auto md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r md:block md:h-screen bg-kazeem-primary text-white">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-white text-kazeem-primary">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Image
                                src={"/kazeem-logo.png"}
                                className=""
                                width="36"
                                height="36"
                                alt="Logo Kazeem"
                            />
                            <span className="">Kazeem</span>
                        </Link>
                    </div>
                    <div className="grow overflow-y-auto">
                        <nav className="grid items-start px-1 text-md font-medium lg:px-2 gap-1 text-kazeem-primary max-h-full">
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue={getOpenedAcordion() + 1}
                            >
                                {dataLink.map((item, key) => {
                                    return (
                                        <AccordionItem
                                            value={key + 1}
                                            key={key}
                                        >
                                            <AccordionTrigger className="text-white hover:no-underline">
                                                <span className="text-white flex items-center gap-3">
                                                    {item.icon} {item.name}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="py-2 flex flex-col gap-1">
                                                {item.children.map(
                                                    (item, key) => {
                                                        return (
                                                            <Link
                                                                key={key}
                                                                href={item.href}
                                                                className={
                                                                    calculateActivePage(
                                                                        item
                                                                    )
                                                                        ? "flex items-center gap-3 rounded bg-muted px-3 py-3 text-kazeem-primary transition-all hover:text-primary"
                                                                        : "flex items-center gap-3 rounded bg-kazeem-middle px-3 py-3 text-white transition-all hover:bg-kazeem-darker"
                                                                }
                                                            >
                                                                {item.icon}
                                                                {item.name}
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </nav>
                    </div>
                    <div className="h-14 w-full border-t p-1 flex items-center">
                        <Avatar className="">
                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                            <AvatarFallback className="text-black">
                                {generateFallbackAvatar()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grow px-3">
                            <p className="cursor-default text-base font-semibold line-clamp-1">
                                {session?.user.nama_lengkap}
                            </p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <p className="cursor-default text-xs font-light">
                                            {session?.user.groups.length} Groups
                                        </p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="capitalize">
                                            {session?.user.groups
                                                .map((item) =>
                                                    item.toLowerCase()
                                                )
                                                .join(", ")}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <AlertDialogLogout />
                    </div>
                </div>
            </div>
            <div className="md:hidden flex h-14 items-center gap-4 border-b bg-kazeem-primary text-white px-4 py-2 lg:h-[60px] lg:px-6">
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
                        className="flex flex-col bg-kazeem-primary text-white px-3"
                    >
                        <nav className="flex flex-col gap-2 text-lg font-medium h-full">
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
                            <Accordion
                                type="single"
                                collapsible
                                className="grow overflow-y-auto"
                                defaultValue={getOpenedAcordion() + 1}
                            >
                                {dataLink.map((item, key) => {
                                    return (
                                        <AccordionItem
                                            value={key + 1}
                                            key={key}
                                        >
                                            <AccordionTrigger className="text-white hover:no-underline">
                                                <span className="text-white flex items-center gap-3">
                                                    {item.icon} {item.name}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="py-2 flex flex-col gap-1">
                                                {item.children.map(
                                                    (item, key) => {
                                                        return (
                                                            <SheetClose
                                                                asChild
                                                                key={key}
                                                            >
                                                                <Link
                                                                    key={key}
                                                                    href={
                                                                        item.href
                                                                    }
                                                                    className={
                                                                        calculateActivePage(
                                                                            item
                                                                        )
                                                                            ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-5 py-2 text-kazeem-primary hover:text-primary h-14"
                                                                            : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-5 py-2 text-white transition-all hover:bg-kazeem-darker h-14"
                                                                    }
                                                                >
                                                                    {item.icon}
                                                                    {item.name}
                                                                </Link>
                                                            </SheetClose>
                                                        );
                                                    }
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                            <div className="h-14 w-full border-t p-1 flex items-center">
                                <Avatar className="">
                                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                    <AvatarFallback className="text-black">
                                        {generateFallbackAvatar()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grow px-3">
                                    <p className="cursor-default text-base font-semibold line-clamp-1">
                                        {session?.user.nama_lengkap}
                                    </p>
                                    <p className="cursor-default text-xs font-light">
                                        {session?.user.groups.length} Groups
                                    </p>
                                </div>
                                <AlertDialogLogout />
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="self-start w-full max-w-screen overflow-x-hidden overflow-y-auto max-h-screen md:pb-0 pb-16">
                {children}
            </div>
            <ToastContainer />
        </div>
    );
}
