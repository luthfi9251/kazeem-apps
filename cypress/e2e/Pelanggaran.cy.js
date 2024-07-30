let HREF = {
    KATEGORI_HOME: "/dashboard/pelanggaran/kategori",
    PELANGGARAN_HOME: "/dashboard/pelanggaran",
    PELANGGARAN_CREATE: "/dashboard/pelanggaran/create",
    PELANGGARAN_EDIT: `/dashboard/pelanggaran/edit`,
    PELANGGARAN_REKAP: `/dashboard/pelanggaran/summary`,
};

let dataSantri1 = {
    nama_lengkap: "Travis Chan",
    alamat: "745-1464 Ultricies St.",
    email: "morbi.quis@yahoo.com",
    hp: "1-355-758-7364",
    tempat_lahir: "Lampung",
    tgl_lhr: "2018-06-06",
    wali: {
        nama_wali: "Byron Cha",
        email: "dignissim.pharetra.nam@yahoo.com",
        hp: "410-7826",
        tgl_lhr: "2015-04-30",
        list: "WALI",
    },
};

let dataSantri2 = {
    nama_lengkap: "Jescie Ding",
    alamat: "P.O. Box 816, 1254 Leo Av.",
    email: "rutrum.urna@outlook.com",
    hp: "1-575-231-2312",
    tempat_lahir: "Special Capital Region of Jakarta",
    tgl_lhr: "2004-08-03",
    wali: {
        nama_wali: "Jarrod Yap",
        email: "nullam@protonmail.couk",
        hp: "1-257-855-4542",
        tgl_lhr: "2021-05-10",
        list: "lainnya",
    },
};
let dataPelanggaran = {
    nama_santri: "Travis Chan",
    nama_pelanggaran: "Bernyanyi",
    kategori: "Berat",
    jenis: "Perilaku",
    poin: "10",
    keterangan: "suaranya jelek",
    konsekuensi: "mengepel",
    update: {
        keterangan: "suaranya kempresek",
        nama_pelanggaran: "",
        kategori: "",
        jenis: "",
        poin: "",
    },
};
let dataPelanggaran2 = {
    nama_santri: "Jescie Ding",
    nama_pelanggaran: "Nyawer Biduan",
    kategori: "Berat",
    jenis: "Kurangajar",
    poin: "1000",
    keterangan: "nyawer 1000",
    konsekuensi: "denda 100.000k",
    update: {
        nama_pelanggaran: "Nyawer guru",
        kategori: "",
        jenis: "",
        poin: "90",
    },
};
let dataKelas = {
    tingkatan: "1",
    paralel: "A,B",
    nama_kelas1: "1-A",
    nama_kelas2: "1-B",
    should_contain1_generated: "1-A",
    should_contain2_generated: "1-B",
};

describe("Pelanggaran Page CRUD", () => {
    beforeEach(() => {
        //login dulu dengan role admin
        cy.login("admin@admin.com", "passwordadmin");
    });
    before(() => {
        cy.exec("npx prisma migrate reset --force");
        cy.login("admin@admin.com", "passwordadmin");
        cy.addSantri([dataSantri1, dataSantri2]);
        cy.createKelas(dataKelas);
        cy.addSantriToKelas(dataKelas.nama_kelas1, dataSantri1.nama_lengkap);
        cy.addSantriToKelas(dataKelas.nama_kelas2, dataSantri2.nama_lengkap);
    });

    after(() => {
        cy.removeSantriFromKelas(
            dataKelas.nama_kelas1,
            dataSantri1.nama_lengkap
        );
        cy.removeSantriFromKelas(
            dataKelas.nama_kelas2,
            dataSantri2.nama_lengkap
        );
        cy.deleteKelas(dataKelas.nama_kelas1);
        cy.deleteKelas(dataKelas.nama_kelas2);
        cy.deleteSantri([dataSantri1, dataSantri2]);
        cy.deleteTA("2024/2025");
        cy.deleteKategoriPelanggaran({
            nama_pelanggaran: dataPelanggaran.nama_pelanggaran,
            kategori: dataPelanggaran.kategori.toUpperCase(),
            jenis: dataPelanggaran.jenis,
            poin: dataPelanggaran.poin,
        });
        cy.deleteKategoriPelanggaran({
            nama_pelanggaran: dataPelanggaran2.nama_pelanggaran,
            kategori: dataPelanggaran2.kategori.toUpperCase(),
            jenis: dataPelanggaran2.jenis,
            poin: dataPelanggaran2.poin,
        });
    });

    it("should render kelas Homepage", () => {
        cy.visit(HREF.PELANGGARAN_HOME);
        cy.get("h3").contains("Data Pelanggaran");
        cy.get("table").should("contain", "Pelanggaran");
    });

    it("should add pelanggaran with existing kategori", () => {
        cy.visit(HREF.KATEGORI_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.KATEGORI_HOME);

        //isi data pelanggaran
        cy.get('input[name="nama_pelanggaran"]').type(
            dataPelanggaran.nama_pelanggaran
        );
        cy.get('select[aria-hidden="true"]').select(dataPelanggaran.kategori, {
            force: true,
        });
        cy.get('input[name="jenis"]').type(dataPelanggaran.jenis);
        cy.get('input[name="poin"]').clear();
        cy.get('input[name="poin"]').type(dataPelanggaran.poin);

        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.get('[data-cy="btn-cancel"]').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/dashboard/pelanggaran/kategori");
        });
        cy.get("table").should("contain", dataPelanggaran.nama_pelanggaran);

        cy.visit(HREF.PELANGGARAN_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_CREATE);

        cy.get('button[data-e2e="btn-tambah-santri"]').click();
        cy.contains(
            `div[data-e2e="select-item"]`,
            dataPelanggaran.nama_santri
        ).click();

        cy.get('button[data-e2e="btn-kategori-option"]').click();
        cy.contains(
            `div[data-e2e="select-item"]`,
            dataPelanggaran.nama_pelanggaran
        ).click();

        cy.get('textarea[name="keterangan"]').type(dataPelanggaran.keterangan);
        cy.get('input[name="konsekuensi"]').type(dataPelanggaran.keterangan);
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.get('[data-cy="btn-cancel"]').click();

        cy.url().should("contain", HREF.PELANGGARAN_HOME);
        cy.get("tr").should("contain", dataPelanggaran.nama_santri);
    });

    it("should add pelanggaran with new kategori", () => {
        cy.visit(HREF.PELANGGARAN_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_CREATE);

        cy.get('button[data-e2e="btn-tambah-santri"]').click();
        cy.contains(
            `div[data-e2e="select-item"]`,
            dataPelanggaran2.nama_santri
        ).click();

        cy.get('textarea[name="keterangan"]').type(dataPelanggaran2.keterangan);
        cy.get('input[name="konsekuensi"]').type(dataPelanggaran2.keterangan);
        cy.get('button[data-e2e="btn-allow-edit"]').click();
        cy.get('input[name="nama_pelanggaran"]').type(
            dataPelanggaran2.nama_pelanggaran
        );
        cy.get("select").select(dataPelanggaran2.kategori, { force: true });
        cy.get('input[name="jenis"]').type(dataPelanggaran2.jenis);
        cy.get('input[name="poin"]').type(dataPelanggaran2.poin);

        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.get('[data-cy="btn-cancel"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_HOME);
        cy.get("tr").should("contain", dataPelanggaran2.nama_santri);
        cy.visit(HREF.KATEGORI_HOME);
        cy.url().should("contain", HREF.KATEGORI_HOME);
        cy.get("tr").should("contain", dataPelanggaran2.nama_pelanggaran);
    });

    it("should update the pelanggaran without change kategori and update the table", () => {
        cy.visit(HREF.PELANGGARAN_HOME);
        cy.get("svg.animate-spin", { timeout: 10000 }).should("not.exist");
        cy.contains(
            "tr",
            dataPelanggaran.nama_santri,
            dataPelanggaran.nama_pelanggaran
        ).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_EDIT);
        cy.get('textarea[name="keterangan"]').clear();
        cy.get('textarea[name="keterangan"]').type(
            dataPelanggaran.update.keterangan
        );
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_HOME);

        cy.contains(
            "tr",
            dataPelanggaran.nama_santri,
            dataPelanggaran.nama_pelanggaran
        ).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-rekap"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_REKAP);
        cy.contains(
            "tr",
            dataPelanggaran.nama_pelanggaran,
            dataPelanggaran.konsekuensi
        ).within(() => {
            cy.get("td").should("contain", dataPelanggaran.update.keterangan);
        });
    });

    it("should delete the pelanggaran and update the table", () => {
        cy.visit(HREF.PELANGGARAN_HOME);
        cy.get("svg.animate-spin", { timeout: 10000 }).should("not.exist");
        cy.contains(
            "tr",
            dataPelanggaran.nama_santri,
            dataPelanggaran.nama_pelanggaran
        ).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_EDIT);
        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.url().should("contain", HREF.PELANGGARAN_HOME);
        cy.get("td").should("not.contain", dataPelanggaran.nama_santri);

        cy.contains(
            "tr",
            dataPelanggaran2.nama_santri,
            dataPelanggaran2.nama_pelanggaran
        ).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.PELANGGARAN_EDIT);
        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.url().should("contain", HREF.PELANGGARAN_HOME);
        cy.get("td").should("not.contain", dataPelanggaran2.nama_santri);
    });
});
