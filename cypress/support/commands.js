// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let HREF = {
    KELAS_HOME: "/dashboard/kemadrasahan/kelas",
    KELAS_CREATE: "/dashboard/kemadrasahan/kelas/create",
    KELAS_DETAIL: "/dashboard/kemadrasahan/kelas/detail",
    KELAS_EDIT: "/dashboard/kemadrasahan/kelas/edit",
    TA_HOME: "/dashboard/kemadrasahan/tahunajar",
    TA_CREATE: "/dashboard/kemadrasahan/tahunajar/create",
    TA_EDIT: "/dashboard/kemadrasahan/tahunajar/edit",
    KATEGORI_HOME: "/dashboard/pelanggaran/kategori",
};

Cypress.Commands.add("login", (username, password) => {
    cy.session([username, password], () => {
        cy.visit("/login");
        cy.get('input[name="email"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should("contain", "/dashboard");
    });
});

Cypress.Commands.add("addSantri", (dataSantri) => {
    cy.visit("/dashboard/santri");

    dataSantri.forEach((item) => {
        cy.get("button").should("contain", "Tambah Santri");
        cy.get("#tambah-santri").click();
        cy.url().should("contain", "/dashboard/santri/create");
        //isi data santri
        cy.get('input[name="nama_lengkap"]').type(item.nama_lengkap);
        cy.get('input[name="email"]').type(item.email);
        cy.get('textarea[name="alamat"]').type(item.alamat);
        cy.get('input[name="hp"]').type(item.hp);
        cy.get('input[name="tempat_lahir"]').type(item.tempat_lahir);
        cy.get('input[name="tgl_lhr"]').type(item.tgl_lhr);

        //isi data wali
        cy.contains("button", "Tambah Wali").click();
        let item1 = item.wali;
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
        cy.get("table").should("contain", item.nama_lengkap);
    });
});

Cypress.Commands.add("deleteSantri", (dataSantri) => {
    cy.visit("/dashboard/santri");
    dataSantri.forEach((item) => {
        cy.contains("tr", item.nama_lengkap).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Detail").click();
        cy.url().should("contain", "/dashboard/santri/detail");
        //check elemen sebelum diupdate
        cy.get('input[name="nama_lengkap"]').should(
            "contain.value",
            item.nama_lengkap
        );

        cy.contains("button", "Edit").click();
        cy.get("button").should("contain", "Hapus");
        cy.contains("button", "Hapus").click();
        cy.get('div[role="alertdialog"]').within(($alert) => {
            cy.contains("button", "Continue").click();
        });
        cy.url().should("contain", "/dashboard/santri");
        cy.get("table").should("not.contain", item.nama_lengkap);
    });
});

Cypress.Commands.add("createKelas", (kelas) => {
    cy.visit(HREF.KELAS_HOME);
    cy.get('button[data-e2e="btn-tambah"]').click();
    cy.url().should("contain", HREF.KELAS_CREATE);

    cy.get('textarea[name="tingkatan_kelas"]').type(kelas.tingkatan);
    cy.get('textarea[name="paralel_kelas"]').type(kelas.paralel);
    cy.get('button[type="submit"]').click();

    cy.get("table").should("contain", kelas.should_contain1_generated);
    cy.get("table").should("contain", kelas.should_contain2_generated);
    cy.get('button[data-e2e="btn-simpan"]').click();
    cy.url().should("contain", HREF.KELAS_HOME);
    cy.get("table").should("contain", kelas.nama_kelas1);
    cy.get("table").should("contain", kelas.nama_kelas2);

    cy.visit(HREF.TA_HOME);
    cy.get("td").should("contain", "Aktif");
});

Cypress.Commands.add("deleteKelas", (namaKelas) => {
    cy.visit(HREF.KELAS_HOME);
    cy.contains("tr", namaKelas).within(($row) => {
        cy.get('button[data-e2e="btn-dropdown"]').click();
    });
    cy.get('a[data-e2e="btn-edit"]').click();
    cy.url().should("contain", HREF.KELAS_EDIT);

    cy.get('button[data-e2e="btn-delete"]').click();
    cy.get('button[data-e2e="btn-confirm"]').click();

    cy.get("div").should("not.have.class", "Toastify__toast--error");
});

Cypress.Commands.add("deleteTA", (kodeTA) => {
    cy.visit(HREF.TA_HOME);
    cy.contains("tr", kodeTA).within(($row) => {
        cy.get('button[data-e2e="btn-dropdown"]').click();
    });
    cy.get('a[data-e2e="btn-edit"]').click();
    cy.url().should("contain", HREF.TA_EDIT);

    cy.get('button[data-e2e="btn-delete"]').click();
    cy.get('button[data-e2e="btn-confirm"]').click();

    cy.url().should("contain", HREF.TA_HOME);
    cy.get("td").should("not.contain", kodeTA);
});

Cypress.Commands.add("addSantriToKelas", (kelas, namaSantri) => {
    cy.visit(HREF.KELAS_HOME);
    cy.contains("tr", kelas).within(($row) => {
        cy.get('button[data-e2e="btn-dropdown"]').click();
    });
    cy.get('a[data-e2e="btn-edit"]').click();
    cy.url().should("contain", HREF.KELAS_EDIT);

    cy.get('button[data-e2e="btn-add-siswa"]').click();
    cy.contains('button[role="combobox"]', "Pilih Santri").click();
    cy.contains(`div[data-e2e="select-item"]`, namaSantri).click();
    cy.get('button[type="submit"]').click();
    cy.wait(1500);
    cy.contains("tr", namaSantri).should("be.visible");

    cy.get('button[data-e2e="btn-add-siswa"]').click();
    cy.contains('button[role="combobox"]', "Pilih Santri").click();
    cy.contains(`div[data-e2e="select-item"]`, namaSantri).should("not.exist");
});

Cypress.Commands.add("removeSantriFromKelas", (kelas, namaSantri) => {
    cy.visit(HREF.KELAS_HOME);
    cy.contains("tr", kelas).within(($row) => {
        cy.get('button[data-e2e="btn-dropdown"]').click();
    });
    cy.get('a[data-e2e="btn-edit"]').click();
    cy.url().should("contain", HREF.KELAS_EDIT);

    cy.contains("tr", namaSantri).within(($row) => {
        cy.get('button[data-e2e="btn-dropdown"]').click();
    });
    cy.get('p[data-e2e="btn-hapus"]').click();
    cy.contains("tr", namaSantri).should("not.exist");
});

Cypress.Commands.add(
    "deleteKategoriPelanggaran",
    ({ nama_pelanggaran, kategori, jenis, poin }) => {
        cy.visit(HREF.KATEGORI_HOME);
        cy.contains("tr", nama_pelanggaran, kategori, jenis, poin).within(
            ($row) => {
                cy.get('button[data-e2e="btn-dropdown"]').click();
            }
        );
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();
    }
);
