export const ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
    KEMADRASAHAN: "KEMADRASAHAN",
    KESANTRIAN: "KESANTRIAN",
    ALL_USER: "ALL_USER",
};

export const PAGE_NAME = {
    MANAGE_USER_PAGE: "MANAGE_USER_PAGE",
    MANAGE_ROLE_PAGE: "MANAGE_ROLE_PAGE",
    MANAGE_SANTRI_PAGE: "MANAGE_SANTRI_PAGE",
    MANAGE_PELANGGARAN_PAGE: "MANAGE_PELANGGARAN_PAGE",
    MANAGE_MADRASAH_PAGE: "MANAGE_MADRASAH_PAGE",
};

export const PAGE_ACCESS_CONFIG = [
    {
        name: PAGE_NAME.MANAGE_USER_PAGE,
        allowedGroup: [ROLE.ADMIN],
    },
    {
        name: PAGE_NAME.MANAGE_ROLE_PAGE,
        allowedGroup: [ROLE.ADMIN],
    },
    {
        name: PAGE_NAME.MANAGE_SANTRI_PAGE,
        allowedGroup: [ROLE.ADMIN, ROLE.KESANTRIAN],
    },
    {
        name: PAGE_NAME.MANAGE_PELANGGARAN_PAGE,
        allowedGroup: [ROLE.ADMIN, ROLE.KESANTRIAN],
    },
    {
        name: PAGE_NAME.MANAGE_MADRASAH_PAGE,
        allowedGroup: [ROLE.ADMIN, ROLE.KEMADRASAHAN],
    },
];
