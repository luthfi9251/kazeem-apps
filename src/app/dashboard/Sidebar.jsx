"use client";
import Link from "next/link";
import {
    Bell,
    FileText,
    Home,
    Menu,
    Package2,
    University,
    User,
    UserRoundCog,
    Users,
} from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { URL_PATH } from "@/navigation-data";
import { PAGE_ACCESS_CONFIG } from "@/security-config";

export default function Sidebar(props) {
    let pathname = usePathname();
    let router = useRouter();
    let { children, session } = props;

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
                allowed = pageConfig.allowedGroup.every((role) =>
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
                                                                        ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-3 text-kazeem-primary transition-all hover:text-primary"
                                                                        : "flex items-center gap-3 rounded-lg bg-kazeem-middle px-3 py-3 text-white transition-all hover:bg-kazeem-darker"
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
                                                                        ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-kazeem-primary hover:text-primary"
                                                                        : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white transition-all hover:bg-kazeem-darker"
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
