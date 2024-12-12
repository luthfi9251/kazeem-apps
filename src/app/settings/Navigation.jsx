"use client";
import { cn } from "@/lib/utils";
import { HREF_URL } from "@/navigation-data";
import { PAGE_NAME } from "@/variables/page-name";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NAV_LIST = [
    {
        text: "Akun",
        href: HREF_URL.SETTINGS_AKUN,
        page_name: PAGE_NAME.SETTING_AKUN_USER,
    },
    {
        text: "Kepondokan",
        href: HREF_URL.SETTINGS_KEPONDOKAN,
        page_name: PAGE_NAME.SETTING_KEPONDOKAN,
    },
    {
        text: "Whatsapp API",
        href: HREF_URL.SETTINGS_WHATSAPP,
        page_name: PAGE_NAME.SETTING_WHATSAPP_API,
    },
    {
        text: "Pelanggaran",
        href: HREF_URL.SETTINGS_PELANGGARAN,
        page_name: PAGE_NAME.SETTING_WHATSAPP_API,
    },
];

export default function SettingNavigation({ session, enabledWAAPI }) {
    let pathname = usePathname();
    let allowedLink = useMemo(() => {
        let nav = [];
        NAV_LIST.forEach((item) => {
            session.user.accessPage.includes(item.page_name);
            if (item.page_name === PAGE_NAME.SETTING_WHATSAPP_API) {
                if (enabledWAAPI) {
                    nav.push(item);
                }
            } else {
                nav.push(item);
            }
        });
        return nav;
    }, []);
    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
        >
            {allowedLink.map((item, i) => (
                <Link
                    key={i}
                    href={item.href}
                    className={cn(
                        pathname === item.href
                            ? "font-semibold text-primary"
                            : ""
                    )}
                >
                    {item.text}
                </Link>
            ))}
            <div className="h-3 border-b-2"></div>
            <Link
                href="/dashboard"
                className={cn(
                    pathname === "/dashboard"
                        ? "font-semibold text-primary"
                        : ""
                )}
            >
                Kembali ke Dashboard
            </Link>
        </nav>
    );
}
