export const HREF_URL = {
    USER_HOME: "/dashboard/users",
    USER_GROUP_HOME: "/dashboard/users/groups",
    USER_GROUP_EDIT: (id) => `/dashboard/users/groups/edit/${id}`,

    SANTRI_WALISANTRI_HOME: "/dashboard/santri/wali",
    SANTRI_HOME: `/dashboard/santri`,
    SANTRI_EDIT: (id) => `/dashboard/santri/edit/${id}`,
    SANTRI_DETAIL: (id, back = null) =>
        `/dashboard/santri/detail/${id}${back ? `?back=${back}` : ""}`,

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

    WALISANTRI_VIEW: "/walisantri",
    WALISANTRI_VIEW_LOGIN: "/walisantri/login",

    SETTINGS_AKUN: "/settings",
    SETTINGS_KEPONDOKAN: "/settings/kepondokan",
    SETTINGS_WHATSAPP: "/settings/whatsapp",

    KAMAR_SANTRI_HOME: "/dashboard/kamar",
    KAMAR_SANTRI_CREATE: "/dashboard/kamar/create",
    KAMAR_SANTRI_DETAIL: (id) => `/dashboard/kamar/detail/${id}`,
    KAMAR_SANTRI_EDIT: (id) => `/dashboard/kamar/edit/${id}`,

    HAFALAN_SANTRI_HOME: "/dashboard/hafalan",
    HAFALAN_SANTRI_DETAIL: (id) => `/dashboard/hafalan/${id}`,
    HAFALAN_JENIS_HAFALAN: "/dashboard/hafalan/jenis",

    PENGUMUMAN_SANTRI: "/dashboard/pengumuman-santri",
    PENGUMUMAN_SANTRI_CREATE: "/dashboard/pengumuman-santri/create",
    PENGUMUMAN_PEGAWAI: "/dashboard/pengumuman-pegawai",
};
