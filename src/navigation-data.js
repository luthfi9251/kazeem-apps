import { PAGE_NAME } from "./variables/page-name";
import {
    School,
    User,
    UserRoundCog,
    Users,
    UsersRound,
    CircleAlert,
} from "lucide-react";

export const HREF_URL = {
    USER_HOME: "/dashboard/users",
    USER_GROUP_HOME: "/dashboard/users/groups",
    USER_GROUP_EDIT: (id) => `/dashboard/users/groups/edit/${id}`,
    SANTRI_WALISANTRI_HOME: "/dashboard/santri/wali",
    SANTRI_HOME: `/dashboard/santri`,
    SANTRI_EDIT: (id) => `/dashboard/santri/edit/${id}`,
    SANTRI_DETAIL: (id, back = null) =>
        `/dashboard/santri/detail/${id}${back ? `?back=${back}` : ""}`,
    PEGAWAI_JABATAN_HOME: "/dashboard/pegawai/jabatan",
    PEGAWAI_HOME: `/dashboard/pegawai`,
    PEGAWAI_EDIT: (id) => `/dashboard/pegawai/edit/${id}`,
    PEGAWAI_DETAIL: (id, back = null) =>
        `/dashboard/pegawai/detail/${id}${back ? `?back=${back}` : ""}`,
    KEMADRASAHAN_KELAS_DETAIL: (id) =>
        `/dashboard/kemadrasahan/kelas/detail/${id}`,
    KEMADRASAHAN_KELAS_EDIT: (id) => `/dashboard/kemadrasahan/kelas/edit/${id}`,
    KEMADRASAHAN_KELAS_HOME: `/dashboard/kemadrasahan/kelas`,
    KEMADRASAHAN_TA_HOME: "/dashboard/kemadrasahan/tahunajar",
    KEMADRASAHAN_TA_CREATE: "/dashboard/kemadrasahan/tahunajar/create",
    KEMADRASAHAN_TA_EDIT: (id) =>
        `/dashboard/kemadrasahan/tahunajar/edit/${id}`,
    PELANGGARAN_HOME: "/dashboard/pelanggaran",
    PELANGGARAN_CREATE: "/dashboard/pelanggaran/create",
    PELANGGARAN_EDIT: (id, back = null) =>
        `/dashboard/pelanggaran/edit/${id}${back ? `?back=${back}` : ""}`,
    PELANGGARAN_REKAP: (id) => `/dashboard/pelanggaran/summary/${id}`,
    KATEGORI_PELANGGARAN_HOME: "/dashboard/pelanggaran/kategori",
    KESEHATAN_HOME: "/dashboard/santri/kesehatan",
    KESEHATAN_CREATE: "/dashboard/santri/kesehatan/create",
    KESEHATAN_DETAIL: (id) => `/dashboard/santri/kesehatan/detail/${id}`,
    KESEHATAN_EDIT: (id) => `/dashboard/santri/kesehatan/edit/${id}`,
    PRESENSI_HOME: "/dashboard/pegawai/presensi",
    PRESENSI_CREATE: "/dashboard/pegawai/presensi/create",
    PRESENSI_DETAIL: (id) => `/dashboard/pegawai/presensi/detail/${id}`,
    PRESENSI_EDIT: (id) => `/dashboard/pegawai/presensi/edit/${id}`,
    WALISANTRI_VIEW: "/walisantri",
    WALISANTRI_VIEW_LOGIN: "/walisantri/login",
    SETTINGS_AKUN: "/settings",
    SETTINGS_KEPONDOKAN: "/settings/kepondokan",
    SETTINGS_WHATSAPP: "/settings/whatsapp",
};

export const URL_PATH = [
    {
        name: "Users",
        icon: <User className="h-5 w-5" />,
        page_name: "",
        href: "",
        hasChild: true,
        children: [
            {
                name: "User",
                page_name: PAGE_NAME.USER_HOME,
                href: "/dashboard/users",
                suffix: ["/action", "/create", "/detail"],
                icon: <UserRoundCog className="h-5 w-5" />,
            },
            {
                name: "Group",
                page_name: PAGE_NAME.USER_GROUP_HOME,
                href: "/dashboard/users/groups",
                suffix: ["/edit", "/create", "/detail"],
                icon: <Users className="h-5 w-5" />,
            },
        ],
    },
    {
        name: "Santri",
        icon: <UsersRound className="h-5 w-5" />,
        page_name: "",
        href: "",
        hasChild: true,
        children: [
            {
                name: "Kelola Santri",
                page_name: PAGE_NAME.KESANTRIAN_KELOLA_SANTRI,
                href: HREF_URL.SANTRI_HOME,
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
            {
                name: "Wali Santri",
                page_name: PAGE_NAME.KESANTRIAN_WALI_SANTRI,
                href: "/dashboard/santri/wali",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
            {
                name: "Kesehatan",
                page_name: PAGE_NAME.KESANTRIAN_KESEHATAN,
                href: HREF_URL.KESEHATAN_HOME,
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
            {
                name: "Data Pelanggaran",
                href: HREF_URL.PELANGGARAN_HOME,
                page_name: PAGE_NAME.KESANTRIAN_PELANGGARAN,
                suffix: ["/edit", "/create", "/detail", "/summary"],
                icon: "",
            },
            {
                name: "Kategori Pelanggaran",
                page_name: PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN,
                href: HREF_URL.KATEGORI_PELANGGARAN_HOME,
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
        ],
    },
    {
        name: "Kemadrasahan",
        icon: <School className="h-5 w-5" />,
        page_name: "",
        href: "",
        hasChild: true,
        children: [
            {
                name: "Kelola Kelas",
                page_name: PAGE_NAME.KEMADRASAHAN_KELOLA_KELAS,
                href: "/dashboard/kemadrasahan/kelas",
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
            {
                name: "Tahun Ajar",
                page_name: PAGE_NAME.KEMADRASAHAN_TAHUN_AJAR,
                href: HREF_URL.KEMADRASAHAN_TA_HOME,
                suffix: ["/edit", "/create"],
                icon: "",
            },
        ],
    },
    {
        name: "Pegawai",
        icon: <UsersRound className="h-5 w-5" />,
        page_name: "",
        href: "",
        hasChild: true,
        children: [
            {
                name: "Kelola Pegawai",
                page_name: PAGE_NAME.KEPEGAWAIAN_KELOLA_PEGAWAI,
                href: HREF_URL.PEGAWAI_HOME,
                suffix: ["/edit", "/create", "/detail"],
                icon: "",
            },
        ],
    }
    // {
    //     name: "Pelanggaran",
    //     icon: <CircleAlert className="h-5 w-5" />,
    //     page_name: PAGE_NAME.MANAGE_SANTRI_PAGE,
    //     href: "",
    //     hasChild: true,
    //     children: [
    //         {
    //             name: "Data Pelanggaran",
    //             href: "/dashboard/pelanggaran",
    //             suffix: ["/edit", "/create", "/detail", "/summary"],
    //             icon: "",
    //         },
    //         {
    //             name: "Kategori Pelanggaran",
    //             href: "/dashboard/pelanggaran/kategori",
    //             suffix: ["/edit", "/create", "/detail"],
    //             icon: "",
    //         },
    //     ],
    // },
];
