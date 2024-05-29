import { PAGE_NAME } from "./security-config";
import {
    School,
    User,
    UserRoundCog,
    Users,
    UsersRound,
    CircleAlert,
} from "lucide-react";

export const URL_PATH = [
    {
        name: "Users",
        icon: <User className="h-5 w-5" />,
        page_name: PAGE_NAME.MANAGE_USER_PAGE,
        href: "",
        hasChild: true,
        children: [
            {
                name: "User",
                href: "/dashboard/users",
                suffix: ["/action", "/create", "/detail"],
                icon: <UserRoundCog className="h-5 w-5" />,
            },
            {
                name: "Group",
                href: "/dashboard/users/groups",
                suffix: ["/edit", "/create", "/detail"],
                icon: <Users className="h-5 w-5" />,
            },
        ],
    },
    {
        name: "Santri",
        icon: <UsersRound className="h-5 w-5" />,
        page_name: PAGE_NAME.MANAGE_SANTRI_PAGE,
        href: "",
        hasChild: true,
        children: [
            {
                name: "Kelola Santri",
                href: "/dashboard/santri",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
            {
                name: "Wali Santri",
                href: "/dashboard/santri/wali",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
        ],
    },
    {
        name: "Kemadrasahan",
        icon: <School className="h-5 w-5" />,
        page_name: PAGE_NAME.MANAGE_MADRASAH_PAGE,
        href: "",
        hasChild: true,
        children: [
            {
                name: "Kelola Kelas",
                href: "/dashboard/kemadrasahan/kelas",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
        ],
    },
    {
        name: "Pelanggaran",
        icon: <CircleAlert className="h-5 w-5" />,
        page_name: PAGE_NAME.MANAGE_SANTRI_PAGE,
        href: "",
        hasChild: true,
        children: [
            {
                name: "Data Pelanggaran",
                href: "/dashboard/pelanggaran",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
            {
                name: "Kategori Pelanggaran",
                href: "/dashboard/pelanggaran/kategori",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
        ],
    },
];

export const HREF_URL = {
    KEMADRASAHAN_KELAS_DETAIL: (id) =>
        `/dashboard/kemadrasahan/kelas/detail/${id}`,
    KEMADRASAHAN_KELAS_EDIT: (id) => `/dashboard/kemadrasahan/kelas/edit/${id}`,
    KEMADRASAHAN_KELAS_HOME: `/dashboard/kemadrasahan/kelas`,
};
