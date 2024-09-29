const { HREF_URL } = require("@/navigation-data");
const { PAGE_NAME } = require("@/variables/page-name");
const {
    User,
    UsersRound,
    School,
    ChartColumnDecreasing,
} = require("lucide-react");

const NAV_DATA = [
    {
        icon: User,
        label: "User",
        child: [
            {
                group_name: "Manajemen User",
                child: [
                    {
                        name: "User",
                        page_name: PAGE_NAME.USER_HOME,
                        href: "/dashboard/users",
                        suffix: ["/action", "/create", "/detail"],
                    },
                    {
                        name: "Group",
                        page_name: PAGE_NAME.USER_GROUP_HOME,
                        href: "/dashboard/users/groups",
                        suffix: ["/edit", "/create", "/detail"],
                    },
                ],
            },
        ],
    },
    {
        icon: UsersRound,
        label: "Kesantrian",
        child: [
            {
                group_name: "Manajemen Data",
                child: [
                    {
                        name: "Santri",
                        page_name: PAGE_NAME.KESANTRIAN_KELOLA_SANTRI,
                        href: HREF_URL.SANTRI_HOME,
                        suffix: ["/edit", "/create", "/detail"],
                    },
                    {
                        name: "Wali Santri",
                        page_name: PAGE_NAME.KESANTRIAN_WALI_SANTRI,
                        href: "/dashboard/santri/wali",
                        suffix: ["/edit", "/create", "/detail"],
                    },
                ],
            },
            {
                group_name: "Pelanggaran",
                child: [
                    {
                        name: "Data Pelanggaran",
                        href: HREF_URL.PELANGGARAN_HOME,
                        page_name: PAGE_NAME.KESANTRIAN_PELANGGARAN,
                        suffix: ["/edit", "/create", "/detail", "/summary"],
                    },
                    {
                        name: "Kategori Pelanggaran",
                        page_name: PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN,
                        href: HREF_URL.KATEGORI_PELANGGARAN_HOME,
                        suffix: ["/edit", "/create", "/detail"],
                    },
                ],
            },
            {
                group_name: "Kesehatan",
                child: [
                    {
                        name: "Kesehatan",
                        page_name: PAGE_NAME.KESANTRIAN_KESEHATAN,
                        href: HREF_URL.KESEHATAN_HOME,
                        suffix: ["/edit", "/create", "/detail"],
                    },
                ],
            },
        ],
    },
    {
        icon: School,
        label: "Kemadrasahan",
        child: [
            {
                group_name: "Manajemen Madrasah",
                child: [
                    {
                        name: "Kelola Kelas",
                        page_name: PAGE_NAME.KEMADRASAHAN_KELOLA_KELAS,
                        href: "/dashboard/kemadrasahan/kelas",
                        suffix: ["/edit", "/create", "/detail"],
                    },
                    {
                        name: "Tahun Ajar",
                        page_name: PAGE_NAME.KEMADRASAHAN_TAHUN_AJAR,
                        href: HREF_URL.KEMADRASAHAN_TA_HOME,
                        suffix: ["/edit", "/create"],
                    },
                ],
            },
        ],
    },
];

export default NAV_DATA;
