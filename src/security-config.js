export const ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
    ALL_USER: "ALL_USER",
};

export const PAGE_NAME = {
    MANAGE_USER_PAGE: "MANAGE_USER_PAGE",
    MANAGE_ROLE_PAGE: "MANAGE_ROLE_PAGE",
    MANAGE_SANTRI_PAGE: "MANAGE_SANTRI_PAGE",
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
        allowedGroup: [ROLE.ADMIN],
    },
];
