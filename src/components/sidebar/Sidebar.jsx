"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import NAV_DATA from "./NAV_DATA";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Settings, ChartColumnDecreasing } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateActiveNavLink, cn, getAllowedNavLink } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import signOutFunc from "../../app/dashboard/_action.js/signOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlertDialogLogout = ({ open, onOpenChange }) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-2/3 rounded">
                <form
                    action={async () => {
                        await signOutFunc();
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
};

const NavIconItem = ({ icon: Icon, label, onClick, isActive = false }) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onClick}
                        className={cn(
                            "m-1 transition-all hover:bg-kazeem-middle hover:text-white flex items-center justify-center aspect-square rounded cursor-pointer",
                            isActive && "bg-kazeem-primary text-white"
                        )}
                    >
                        <Icon className="w-[80%]" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const NavLinkGroup = ({ groupData, pathname }) => {
    return (
        <div className="flex flex-col">
            <nav className="text-white flex flex-col gap-1 my-2">
                <h4 className="p-2 rounded capitalize font-medium text-xs text-slate-400 cursor-default">
                    {groupData.group_name.toUpperCase()}
                </h4>
                {groupData.child?.map((item, key) => (
                    <Link
                        key={key}
                        href={item.href}
                        className={cn(
                            "p-2 rounded text-sm hover:bg-white hover:text-kazeem-primary hover:font-medium cursor-pointer",
                            calculateActiveNavLink(item, pathname) &&
                                "bg-white text-kazeem-primary font-medium"
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

const SidebarContent = ({
    navData,
    defaultOpenedGroup,
    pathname,
    fallbackAvatar,
}) => {
    const [activeGroup, setActiveGroup] = useState(defaultOpenedGroup);
    const [isAlertLogoutOpen, setIsAlertLogoutOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="w-full md:w-[300px] h-screen flex bg-kazeem-primary">
                <div className="w-[80px] py-4 flex flex-col gap-4 border-r-2 border-white bg-white">
                    <div className=" w-full px-4">
                        <Link href="/dashboard">
                            <Image
                                src="/kazeem-logo.png"
                                alt="Logo Kazeem"
                                width={40}
                                height={40}
                                className="w-full object-contain"
                            />
                        </Link>
                    </div>
                    <div className=" w-full grow flex flex-col overflow-y-auto gap-1 px-4">
                        {navData.map((item, idx) => (
                            <NavIconItem
                                key={idx}
                                icon={item.icon}
                                label={item.label}
                                onClick={() => setActiveGroup(item)}
                                isActive={item.label === activeGroup.label}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full px-4 gap-3">
                        <div className="w-full flex flex-col gap-1">
                            <NavIconItem
                                icon={Settings}
                                label="Setting"
                                onClick={() => router.push("/settings")}
                            />
                            <NavIconItem
                                icon={LogOut}
                                label="Log Out"
                                onClick={() => setIsAlertLogoutOpen(true)}
                            />
                        </div>
                        <Avatar className="h-[55px] w-[55px]">
                            {/* <AvatarImage
                                className="w-full h-full"
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            /> */}
                            <AvatarFallback className="w-full h-full">
                                {fallbackAvatar}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="grow p-4">
                    <h2 className="text-white font-semibold text-lg p-2">
                        {activeGroup.label}
                    </h2>
                    <div className="flex flex-col transition-all">
                        {activeGroup.child?.map((item, idx) => (
                            <NavLinkGroup
                                groupData={item}
                                key={idx}
                                pathname={pathname}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <AlertDialogLogout
                open={isAlertLogoutOpen}
                onOpenChange={setIsAlertLogoutOpen}
            />
        </>
    );
};

export default function Sidebar({ session }) {
    let calculateAllowedNav = getAllowedNavLink(session.user?.accessPage);
    let pathname = usePathname();

    let defaultOpenedGroup = useMemo(() => {
        let summarizeNavlink = calculateAllowedNav.map((item) => ({
            ...item,
            child: item.child
                .map((item2) => item2.child.map((item3) => item3.href))
                .flat(),
        }));
        let findActiveGroupLabel = summarizeNavlink.find((item) =>
            item.child.find((item2) => pathname.includes(item2))
        )?.label;

        if (findActiveGroupLabel) {
            return calculateAllowedNav.find(
                (item) => item.label === findActiveGroupLabel
            );
        } else {
            return calculateAllowedNav[0];
        }
    }, []);

    let fallbackAvatar = useMemo(() => {
        if (session) {
            let name = session.user.nama_lengkap;
            let list = name.split(" ");
            if (list.length > 1) {
                return list[0].charAt(0) + list[list.length - 1].charAt(0);
            } else {
                return list[0].charAt(0);
            }
        }
    }, [session.user]);

    return (
        <>
            <div className="hidden md:block">
                <SidebarContent
                    navData={calculateAllowedNav}
                    defaultOpenedGroup={defaultOpenedGroup}
                    pathname={pathname}
                    fallbackAvatar={fallbackAvatar}
                />
            </div>
            <div className="md:hidden">
                <Sheet>
                    <div className="bg-white relative flex items-center justify-between p-2 border-b-2">
                        <div className="px-4">
                            <Image
                                src="/kazeem-logo.png"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
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
                    </div>
                    <SheetContent side="left" className="p-0">
                        <SidebarContent
                            navData={calculateAllowedNav}
                            defaultOpenedGroup={defaultOpenedGroup}
                            pathname={pathname}
                            fallbackAvatar={fallbackAvatar}
                        />
                    </SheetContent>
                </Sheet>
            </div>
            <ToastContainer />
        </>
    );
}
