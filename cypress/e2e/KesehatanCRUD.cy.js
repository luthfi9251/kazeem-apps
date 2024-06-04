let HREF = {
    KESEHATAN_HOME: "/dashboard/santri/kesehatan",
    KESEHATAN_CREATE: "/dashboard/santri/kesehatan/create",
    KESEHATAN_DETAIL: `/dashboard/santri/kesehatan/detail`,
    KESEHATAN_EDIT: `/dashboard/santri/kesehatan/edit`,
};
let dataSantri = {
    nama_lengkap: "Thaddeus Ban",
    alamat: "P.O. Box 573, 5005 Dictum Street",
    email: "faucibus.lectus@google.org",
    hp: "1-257-234-9437",
    tempat_lahir: "East Nusa Tenggara",
    tgl_lhr: "2021-06-03",
};
let WALI_DATA = {
    nama_wali: "Byron Cha",
    email: "dignissim.pharetra.nam@yahoo.com",
    hp: "410-7826",
    tgl_lhr: "2015-04-30",
    list: "WALI",
};

let dataKesehatan = {
    nama_santri: dataSantri.nama_lengkap,
    nama_penyakit: "Demam",
    penanganan: "Obat Paramex sirup",
    kategori: "RINGAN",
    tgl_masuk: "2024-03-12",
    tgl_keluar: "2024-03-18",
    status: "PERAWATAN",
    update: {
        nama_penyakit: "Demam Berdarah",
        penanganan: "rawat inap rumah sakit",
    },
};

describe("Kesehatan page CRUD", () => {
    before(() => {
        cy.login("admin@admin.com", "passwordadmin");
        cy.visit("/dashboard/santri");
        cy.get("button").should("contain", "Tambah Santri");
        cy.get("#tambah-santri").click();
        cy.url().should("contain", "/dashboard/santri/create");

        //isi data santri
        cy.get('input[name="nama_lengkap"]').type(dataSantri.nama_lengkap);
        cy.get('input[name="email"]').type(dataSantri.email);
        cy.get('textarea[name="alamat"]').type(dataSantri.alamat);
        cy.get('input[name="hp"]').type(dataSantri.hp);
        cy.get('input[name="tempat_lahir"]').type(dataSantri.tempat_lahir);
        cy.get('input[name="tgl_lhr"]').type(dataSantri.tgl_lhr);

        //isi data wali
        cy.contains("button", "Tambah Wali").click();
        let item1 = WALI_DATA;
        cy.get("#form-wali").within(($form) => {
            cy.get('input[name="nama_wali"]').type(item1.nama_wali);
            cy.get('input[name="email"]').type(item1.email);
            cy.get('input[name="hp"]').type(item1.hp);
            cy.get('input[name="tgl_lhr"]').type(item1.tgl_lhr);
            cy.contains("button", "Tambah Wali").click();
        });
        cy.get("table").should("contain", item1.nama_wali);
        cy.contains("button", "Simpan").click();
        cy.contains("button", "Simpan").click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/dashboard/santri");
        });
        cy.get("table").should("contain", dataSantri.nama_lengkap);
    });

    beforeEach(() => {
        //login dulu dengan role admin
        cy.login("admin@admin.com", "passwordadmin");
    });

    after(() => {
        cy.visit("/dashboard/santri");
        cy.contains("tr", dataSantri.nama_lengkap).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Detail").click();
        cy.url().should("contain", "/dashboard/santri/detail");
        //check elemen sebelum diupdate
        cy.get('input[name="nama_lengkap"]').should(
            "contain.value",
            dataSantri.nama_lengkap
        );

        cy.contains("button", "Edit").click();
        cy.get("button").should("contain", "Hapus");
        cy.contains("button", "Hapus").click();
        cy.get('div[role="alertdialog"]').within(($alert) => {
            cy.contains("button", "Continue").click();
        });
        cy.url().should("contain", "/dashboard/santri");
        cy.get("table").should("not.contain", dataSantri.nama_lengkap);
    });

    it("should render kesehatan Homepage", () => {
        cy.visit(HREF.KESEHATAN_HOME);
        cy.get("h3").contains("Data Kesahatan");
        cy.get("table").should("contain", "Nama Lengkap");
    });

    it("should add data kesehatan and update the table", () => {
        cy.visit(HREF.KESEHATAN_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.KESEHATAN_CREATE);
        cy.contains('button[role="combobox"]', "Pilih Santri").click();
        cy.contains(
            `div[data-e2e="select-item"]`,
            dataSantri.nama_lengkap
        ).click();
        cy.get('input[name="nama_penyakit"]').type(dataKesehatan.nama_penyakit);
        cy.get('textarea[name="penanganan"]').type(dataKesehatan.penanganan);
        cy.get('input[name="tgl_masuk"]').type(dataKesehatan.tgl_masuk);
        cy.get('input[name="tgl_keluar"]').type(dataKesehatan.tgl_keluar);
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.url().should("contain", HREF.KESEHATAN_HOME);
    });

    it("should edit data kesehatan and update the table", () => {
        cy.visit(HREF.KESEHATAN_HOME);
        cy.contains("tr", dataKesehatan.nama_santri).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KESEHATAN_EDIT);
        cy.get('input[name="nama_penyakit"]').clear();
        cy.get('input[name="nama_penyakit"]').type(
            dataKesehatan.update.nama_penyakit
        );
        cy.get('textarea[name="penanganan"]').clear();
        cy.get('textarea[name="penanganan"]').type(
            dataKesehatan.update.penanganan
        );
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.url().should("contain", HREF.KESEHATAN_HOME);
        cy.get("table").should("contain", dataKesehatan.update.nama_penyakit);
    });

    it("should delete data kesehatan and update the table", () => {
        cy.visit(HREF.KESEHATAN_HOME);
        cy.contains("tr", dataKesehatan.nama_santri).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KESEHATAN_EDIT);
        cy.get('button[data-e2e="btn-hapus"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();
        cy.url().should("contain", HREF.KESEHATAN_HOME);
        cy.get("table").should(
            "not.contain",
            dataKesehatan.update.nama_penyakit
        );
    });
});
