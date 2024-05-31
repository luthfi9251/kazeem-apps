Cypress.Commands.add("login", (username, password) => {
    cy.session([username, password], () => {
        cy.visit("/login");
        cy.get('input[name="email"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should("contain", "/dashboard");
    });
});

let HREF = {
    KELAS_HOME: "/dashboard/kemadrasahan/kelas",
    KELAS_CREATE: "/dashboard/kemadrasahan/kelas/create",
    KELAS_DETAIL: "/dashboard/kemadrasahan/kelas/detail",
    KELAS_EDIT: "/dashboard/kemadrasahan/kelas/edit",
    TA_HOME: "/dashboard/kemadrasahan/tahunajar",
    TA_EDIT: "/dashboard/kemadrasahan/tahunajar/edit",
};

let dataKelas = {
    tingkatan: "1",
    paralel: "A,B",
    nama_kelas1: "1-A",
    nama_kelas2: "1-B",
    should_contain1_generated: "1 - A",
    should_contain2_generated: "1 - B",
    kode_ta: "2024/2025",
};

describe("Kelas page CRUD", () => {
    beforeEach(() => {
        //login dulu dengan role admin
        cy.login("admin@admin.com", "passwordadmin");
    });

    it("should render kelas Homepage", () => {
        cy.visit(HREF.KELAS_HOME);
        cy.get("h3").contains("Data Kelas");
        cy.get("table").should("contain", "Nama Kelas");
    });

    it("should automatically add tahun ajar when there is tahun ajar active", () => {
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

    let siswa_to_add_name = "Travis Chan";

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
