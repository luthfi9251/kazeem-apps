let HREF = {
    KELAS_HOME: "/dashboard/kemadrasahan/kelas",
    KELAS_CREATE: "/dashboard/kemadrasahan/kelas/create",
    KELAS_DETAIL: "/dashboard/kemadrasahan/kelas/detail",
    KELAS_EDIT: "/dashboard/kemadrasahan/kelas/edit",
    TA_HOME: "/dashboard/kemadrasahan/tahunajar",
    TA_CREATE: "/dashboard/kemadrasahan/tahunajar/create",
    TA_EDIT: "/dashboard/kemadrasahan/tahunajar/edit",
};

let dataTA2 = {
    kode_ta: "2025/2026",
    tgl_mulai: "2024-04-01",
    tgl_selesai: "2025-04-01",
    aktif: true,
};

let dataKelas = {
    tingkatan: "1",
    paralel: "A,B",
    nama_kelas1: "1-A",
    nama_kelas2: "1-B",
    should_contain1_generated: "1 - A",
    should_contain2_generated: "1 - B",
    kode_ta: dataTA2.kode_ta,
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

describe("Kelas page CRUD", () => {
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

    it("should render kelas Homepage", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.get("h3").contains("Data Kelas");
        cy.get("table").should("contain", "Nama Kelas");
    });

    it("should automatically add tahun ajar when there is tahun ajar active", () => {
        //create ta
        cy.visit(HREF.TA_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.TA_CREATE);

        cy.get('input[name="tgl_mulai"]').type(dataTA2.tgl_mulai);
        cy.get('input[name="tgl_selesai"]').type(dataTA2.tgl_selesai);
        cy.get('input[name="kode_ta"]').type(dataTA2.kode_ta);
        cy.get('button[role="checkbox"]').click();
        cy.get('button[type="submit"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.contains("tr", dataTA2.kode_ta).within(($row) => {
            cy.get("td").should("contain", "Aktif");
        });

        cy.visit(HREF.KELAS_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.KELAS_CREATE);

        cy.get('textarea[name="tingkatan_kelas"]').type(dataKelas.tingkatan);
        cy.get('textarea[name="paralel_kelas"]').type(dataKelas.paralel);
        cy.get('button[type="submit"]').click();

        cy.get("table").should("contain", dataKelas.should_contain1_generated);
        cy.get("table").should("contain", dataKelas.should_contain2_generated);
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.url().should("contain", HREF.KELAS_HOME);
        cy.get("table").should("contain", dataKelas.nama_kelas1);
        cy.get("table").should("contain", dataKelas.nama_kelas2);

        cy.visit(HREF.TA_HOME);
        cy.contains("tr", dataKelas.kode_ta).within(($row) => {
            cy.get("td").should("contain", "Aktif");
        });
    });

    it("should not add kelas with the same Nama Kelas", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.KELAS_CREATE);

        cy.get('textarea[name="tingkatan_kelas"]').type(dataKelas.tingkatan);
        cy.get('textarea[name="paralel_kelas"]').type(dataKelas.paralel);
        cy.get('button[type="submit"]').click();

        cy.get("table").should("contain", dataKelas.should_contain1_generated);
        cy.get("table").should("contain", dataKelas.should_contain2_generated);
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.url().should("contain", HREF.KELAS_HOME);
        cy.get("table").should("contain", dataKelas.nama_kelas1);
        cy.get("table").should("contain", dataKelas.nama_kelas2);
    });

    let siswa_to_add_name = dataSantri.nama_lengkap;

    it("should add the siswa and update the table and siswa already added not show in select view", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.contains("tr", dataKelas.nama_kelas1).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KELAS_EDIT);

        cy.get('button[data-e2e="btn-add-siswa"]').click();
        cy.contains('button[role="combobox"]', "Pilih Santri").click();
        cy.contains(`div[data-e2e="select-item"]`, siswa_to_add_name).click();
        cy.get('button[type="submit"]').click();
        cy.wait(1500);
        cy.contains("tr", siswa_to_add_name).should("be.visible");

        cy.get('button[data-e2e="btn-add-siswa"]').click();
        cy.contains('button[role="combobox"]', "Pilih Santri").click();
        cy.contains(`div[data-e2e="select-item"]`, siswa_to_add_name).should(
            "not.exist"
        );
    });
    it("should not delete kelas when there is siswa inside", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.contains("tr", dataKelas.nama_kelas1).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KELAS_EDIT);

        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.get("div").should("have.class", "Toastify__toast--error");
    });

    it("should delete the siswa and update the table", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.contains("tr", dataKelas.nama_kelas1).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KELAS_EDIT);

        cy.contains("tr", siswa_to_add_name).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('p[data-e2e="btn-hapus"]').click();
        cy.contains("tr", siswa_to_add_name).should("not.exist");

        cy.get('button[data-e2e="btn-add-siswa"]').click();
        cy.contains('button[role="combobox"]', "Pilih Santri").click();
        cy.contains(`div[data-e2e="select-item"]`, siswa_to_add_name).should(
            "exist"
        );
    });
    it("should delete kelas when there is no siswa inside", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.contains("tr", dataKelas.nama_kelas1).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KELAS_EDIT);

        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.get("div").should("not.have.class", "Toastify__toast--error");
        cy.contains("tr", dataKelas.nama_kelas2).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.KELAS_EDIT);

        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.get("div").should("not.have.class", "Toastify__toast--error");

        cy.visit(HREF.TA_HOME);
        cy.contains("tr", dataKelas.kode_ta).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.TA_EDIT);

        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.get("td").should("not.contain", dataKelas.kode_ta);
    });
});
