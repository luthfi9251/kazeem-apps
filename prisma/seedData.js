const GROUPS = [
    {
        nama_group: "ADMIN",
        deskripsi: "Grup Admin",
    },
    {
        nama_group: "KEMADRASAHAN",
        deskripsi: "Grup Kemadrasahan",
    },
    {
        nama_group: "KESANTRIAN",
        deskripsi: "Grup Kesantrian",
    },
];

const SANTRI = [
    {
        nama_lengkap: "Travis Chan",
        nis: "33210",
        jenis_kel: "LAKI_LAKI",
        alamat: "745-1464 Ultricies St.",
        email: "morbi.quis@yahoo.com",
        hp: "1-355-758-7364",
        tempat_lahir: "Lampung",
        tgl_lhr: "2018-06-06",
    },
    {
        nama_lengkap: "Jescie Ding",
        nis: "33211",
        jenis_kel: "PEREMPUAN",
        alamat: "P.O. Box 816, 1254 Leo Av.",
        email: "rutrum.urna@outlook.com",
        hp: "1-575-231-2312",
        tempat_lahir: "Special Capital Region of Jakarta",
        tgl_lhr: "2004-08-03",
    },
    {
        nama_lengkap: "Oprah Mo",
        nis: "33212",
        jenis_kel: "PEREMPUAN",
        alamat: "Ap #806-5865 Cras Rd.",
        email: "eros.non.enim@aol.net",
        hp: "376-5804",
        tempat_lahir: "West Java",
        tgl_lhr: "2014-04-10",
    },
    {
        nama_lengkap: "Charles Guan",
        nis: "33213",
        jenis_kel: "LAKI_LAKI",
        alamat: "Ap #132-4594 Aliquam Street",
        email: "ligula.eu@aol.com",
        hp: "1-955-255-6196",
        tempat_lahir: "West Nusa Tenggara",
        tgl_lhr: "2011-02-01",
    },
    {
        nama_lengkap: "Thaddeus Ban",
        nis: "33214",
        jenis_kel: "LAKI_LAKI",
        alamat: "P.O. Box 573, 5005 Dictum Street",
        email: "faucibus.lectus@google.org",
        hp: "1-257-234-9437",
        tempat_lahir: "East Nusa Tenggara",
        tgl_lhr: "2021-06-03",
    },
    {
        nama_lengkap: "Porter Cheang",
        nis: "33215",
        jenis_kel: "LAKI_LAKI",
        alamat: "Ap #506-4325 Integer Rd.",
        email: "posuere.vulputate.lacus@aol.org",
        hp: "510-7828",
        tempat_lahir: "West Nusa Tenggara",
        tgl_lhr: "2016-03-24",
    },
    {
        nama_lengkap: "Barclay Liu",
        nis: "33216",
        jenis_kel: "LAKI_LAKI",
        alamat: "3914 Dictum Rd.",
        email: "vitae.aliquam@yahoo.com",
        hp: "221-5775",
        tempat_lahir: "North Kalimantan",
        tgl_lhr: "2015-09-23",
    },
    {
        nama_lengkap: "Louis Choong",
        nis: "33217",
        jenis_kel: "LAKI_LAKI",
        alamat: "420-9225 Ridiculus Rd.",
        email: "placerat.orci@hotmail.couk",
        hp: "1-412-635-2931",
        tempat_lahir: "Central Kalimantan",
        tgl_lhr: "2013-03-21",
    },
    {
        nama_lengkap: "Lana Lew",
        nis: "33218",
        jenis_kel: "PEREMPUAN",
        alamat: "373-4284 In Avenue",
        email: "lectus.justo@icloud.couk",
        hp: "620-1878",
        tempat_lahir: "Bangka Belitung Islands",
        tgl_lhr: "2012-12-12",
    },
    {
        nama_lengkap: "Nina Zhong",
        nis: "33219",
        jenis_kel: "PEREMPUAN",
        alamat: "Ap #361-6852 Mi Av.",
        email: "vitae.erat@outlook.edu",
        hp: "135-2165",
        tempat_lahir: "West Java",
        tgl_lhr: "2018-05-29",
    },
];

const WALI = [
    {
        nama_wali: "Jarrod Yap",
        email: "nullam@protonmail.couk",
        hp: "1-257-855-4542",
        tgl_lhr: "2021-05-10",
        list: "lainnya",
    },
    {
        nama_wali: "Bree So",
        email: "dapibus.id@google.com",
        hp: "1-311-427-4747",
        tgl_lhr: "2019-07-09",
        list: "IBU",
    },
    {
        nama_wali: "Alfonso Mani",
        email: "aenean@outlook.com",
        hp: "748-4419",
        tgl_lhr: "2010-06-20",
        list: "IBU",
    },
    {
        nama_wali: "Byron Cha",
        email: "dignissim.pharetra.nam@yahoo.com",
        hp: "410-7826",
        tgl_lhr: "2015-04-30",
        list: "WALI",
    },
    {
        nama_wali: "Basia Zhao",
        email: "parturient.montes.nascetur@protonmail.couk",
        hp: "126-5455",
        tgl_lhr: "2017-02-02",
        list: "AYAH",
    },
    {
        nama_wali: "Guinevere Xiong",
        email: "erat@outlook.couk",
        hp: "1-556-815-7423",
        tgl_lhr: "2017-01-20",
        list: "IBU",
    },
    {
        nama_wali: "Tashya Ang",
        email: "quam.quis@protonmail.couk",
        hp: "1-281-660-1220",
        tgl_lhr: "2007-12-08",
        list: "lainnya",
    },
    {
        nama_wali: "Kennan Lu",
        email: "sed.dictum.eleifend@protonmail.org",
        hp: "645-8135",
        tgl_lhr: "2006-06-25",
        list: "IBU",
    },
    {
        nama_wali: "Mollie Zhong",
        email: "in.scelerisque.scelerisque@google.net",
        hp: "348-0475",
        tgl_lhr: "2016-03-16",
        list: "lainnya",
    },
    {
        nama_wali: "Hakeem Quan",
        email: "suspendisse.dui@yahoo.couk",
        hp: "1-536-744-5421",
        tgl_lhr: "2016-05-11",
        list: "IBU",
    },
];

const TAHUN_AJAR = [
    {
        id: 91,
        kode_ta: "2000/2001",
        tgl_mulai: new Date("2000-12-01").toISOString(),
        tgl_selesai: new Date("2001-12-01").toISOString(),
        aktif: false,
    },
    {
        id: 92,
        kode_ta: "2001/2002",
        tgl_mulai: new Date("2001-12-01").toISOString(),
        tgl_selesai: new Date("2002-12-01").toISOString(),
        aktif: true,
    },
];

const KELAS = [
    {
        id: 91,
        nama_kelas: "1-TEST",
        tingkat_id: 1,
        keterangan: "1",
    },
    {
        id: 92,
        nama_kelas: "2-TEST",
        tingkat_id: 1,
        keterangan: "2",
    },
];

const TINGKATAN = [
    {
        id: 1,
        nama_tingkatan: "1",
        keterangan: "1",
    },
];

const KELAS_SANTRI = [
    {
        id: 91,
        kelas_id: 91,
        ta_id: 91,
        santri_id: 1,
        status: "BARU",
    },
    {
        id: 92,
        kelas_id: 91,
        ta_id: 91,
        santri_id: 2,
        status: "BARU",
    },
    {
        id: 93,
        kelas_id: 92,
        ta_id: 91,
        santri_id: 3,
        status: "BARU",
    },
    {
        id: 94,
        kelas_id: 92,
        ta_id: 91,
        santri_id: 4,
        status: "BARU",
    },
    {
        id: 95,
        kelas_id: 91,
        ta_id: 92,
        santri_id: 1,
        status: "BARU",
    },
    {
        id: 96,
        kelas_id: 91,
        ta_id: 92,
        santri_id: 2,
        status: "BARU",
    },
    {
        id: 97,
        kelas_id: 92,
        ta_id: 92,
        santri_id: 3,
        status: "BARU",
    },
    {
        id: 98,
        kelas_id: 92,
        ta_id: 92,
        santri_id: 4,
        status: "BARU",
    },
];

module.exports = {
    SANTRI,
    WALI,
    TAHUN_AJAR,
    KELAS,
    KELAS_SANTRI,
    TINGKATAN,
    GROUPS,
};
