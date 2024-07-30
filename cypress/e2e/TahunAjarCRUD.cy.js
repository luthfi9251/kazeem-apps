let HREF = {
    TA_HOME: "/dashboard/kemadrasahan/tahunajar",
    TA_CREATE: "/dashboard/kemadrasahan/tahunajar/create",
    TA_EDIT: "/dashboard/kemadrasahan/tahunajar/edit",
};

describe("Tahun Ajar Page CRUD", () => {
    before(() => {
        cy.exec("npx prisma migrate reset --force");
    });
    beforeEach(() => {
        //login dulu dengan role admin
        cy.login("admin@admin.com", "passwordadmin");
    });

    it("should render Tahun Ajar Homepage", () => {
        cy.visit(HREF.TA_HOME);
        cy.get("h3").contains("Data Tahun Ajar");
        cy.get("table").should("contain", "Kode TA");
    });

    let dataTA = {
        kode_ta: "2024/2025",
        tgl_mulai: "2024-03-01",
        tgl_selesai: "2025-03-01",
        aktif: false,
    };
    let dataTA2 = {
        kode_ta: "2025/2026",
        tgl_mulai: "2024-04-01",
        tgl_selesai: "2025-04-01",
        aktif: true,
    };

    it("should be active TA when added the first TA", () => {
        cy.visit(HREF.TA_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.TA_CREATE);

        cy.get('input[name="tgl_mulai"]').type(dataTA.tgl_mulai);
        cy.get('input[name="tgl_selesai"]').type(dataTA.tgl_selesai);
        cy.get('input[name="kode_ta"]').type(dataTA.kode_ta);
        cy.get('button[type="submit"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.get("table").should("contain", dataTA.kode_ta);
    });

    it("should be only one active TA when create new TA", () => {
        cy.visit(HREF.TA_HOME);
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", HREF.TA_CREATE);

        cy.get('input[name="tgl_mulai"]').type(dataTA2.tgl_mulai);
        cy.get('input[name="tgl_selesai"]').type(dataTA2.tgl_selesai);
        cy.get('input[name="kode_ta"]').type(dataTA2.kode_ta);
        cy.get('button[role="checkbox"]').click();
        cy.get('button[type="submit"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.contains("tr", dataTA.kode_ta).within(($row) => {
            cy.get("td").should("contain", "Non-Aktif");
        });
        cy.contains("tr", dataTA2.kode_ta).within(($row) => {
            cy.get("td").should("contain", "Aktif");
        });
    });

    it("should be only one active TA when update TA and update the table", () => {
        cy.visit(HREF.TA_HOME);
        cy.contains("tr", dataTA.kode_ta).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.TA_EDIT);

        let newData = "2003-08-12";

        cy.get('input[name="tgl_mulai"]').clear();
        cy.get('input[name="tgl_mulai"]').type(newData);
        cy.get('button[role="checkbox"]').click();
        cy.get('button[type="submit"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.contains("tr", dataTA.kode_ta).within(($row) => {
            cy.get("td").should("contain", "Aktif");
        });
        cy.contains("tr", dataTA2.kode_ta).within(($row) => {
            cy.get("td").should("contain", "Non-Aktif");
        });
    });

    it("should delete TA and update the table", () => {
        cy.visit(HREF.TA_HOME);
        cy.contains("tr", dataTA.kode_ta).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.TA_EDIT);

        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.get("td").should("not.contain", dataTA.kode_ta);

        cy.contains("tr", dataTA2.kode_ta).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.url().should("contain", HREF.TA_EDIT);

        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();

        cy.url().should("contain", HREF.TA_HOME);
        cy.get("td").should("not.contain", dataTA2.kode_ta);
    });
});
