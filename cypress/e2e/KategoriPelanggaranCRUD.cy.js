describe("Kategori Pelanggaran Page CRUD", () => {
    before(() => {
        cy.exec("npx prisma migrate reset --force");
    });

    beforeEach(() => {
        //login dulu dengan role admin
        cy.login("admin@admin.com", "passwordadmin");
    });

    let dataKategoriPelanggaran = {
        nama_pelanggaran: "Tidak Sholat",
        kategori: "BERAT",
        jenis: "Keagamaan",
        poin: 20,
    };
    let dataKategoriPelanggaran2 = {
        nama_pelanggaran: "Merokok",
        kategori: "BERAT",
        jenis: "Aktifitas",
        poin: 50,
    };

    let dataKategoriPelanggaranUpdated = {
        nama_pelanggaran: "Tidak Sholat Maghrib",
        kategori: "BERAT",
        jenis: "Keagamaan",
        poin: 20,
    };

    it("should add kategori pelanggaran and update the view table", () => {
        cy.visit("/dashboard/pelanggaran/kategori");
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", "/dashboard/pelanggaran/kategori/create");

        //isi data pelanggaran
        cy.get('input[name="nama_pelanggaran"]').type(
            dataKategoriPelanggaran.nama_pelanggaran
        );
        cy.get('select[aria-hidden="true"]').select(
            dataKategoriPelanggaran.kategori,
            { force: true }
        );
        cy.get('input[name="jenis"]').type(dataKategoriPelanggaran.jenis);
        cy.get('input[name="poin"]').clear();
        cy.get('input[name="poin"]').type(dataKategoriPelanggaran.poin);

        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.get('[data-cy="btn-cancel"]').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/dashboard/pelanggaran/kategori");
        });
        cy.get("table").should(
            "contain",
            dataKategoriPelanggaran.nama_pelanggaran
        );
        cy.get('button[data-e2e="btn-tambah"]').click();
        cy.url().should("contain", "/dashboard/pelanggaran/kategori/create");

        //isi data pelanggaran
        cy.get('input[name="nama_pelanggaran"]').type(
            dataKategoriPelanggaran2.nama_pelanggaran
        );
        cy.get('select[aria-hidden="true"]').select(
            dataKategoriPelanggaran2.kategori,
            { force: true }
        );
        cy.get('input[name="jenis"]').type(dataKategoriPelanggaran2.jenis);
        cy.get('input[name="poin"]').clear();
        cy.get('input[name="poin"]').type(dataKategoriPelanggaran2.poin);

        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.get('[data-cy="btn-cancel"]').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/dashboard/pelanggaran/kategori");
        });
        cy.get("table").should(
            "contain",
            dataKategoriPelanggaran2.nama_pelanggaran
        );
    });

    it("should edit kategori pelanggaran and update the view table", () => {
        cy.visit("/dashboard/pelanggaran/kategori");
        cy.contains("tr", dataKategoriPelanggaran.nama_pelanggaran).within(
            ($row) => {
                cy.get('button[data-e2e="btn-dropdown"]').click();
            }
        );
        cy.get('a[data-e2e="btn-detail"]').click();
        cy.url().should("contain", "/dashboard/pelanggaran/kategori/detail");
        //cek data pelanggaran
        cy.get('input[name="nama_pelanggaran"]').should(
            "contain.value",
            dataKategoriPelanggaran.nama_pelanggaran
        );
        cy.get('select[aria-hidden="true"]').should(
            "contain.value",
            dataKategoriPelanggaran.kategori
        );
        cy.get('input[name="jenis"]').should(
            "contain.value",
            dataKategoriPelanggaran.jenis
        );
        cy.get('input[name="poin"]').should(
            "contain.value",
            dataKategoriPelanggaran.poin
        );

        //edit data
        cy.get('button[data-e2e="btn-edit"]').click();
        cy.url().should("contain", "/dashboard/pelanggaran/kategori/edit");
        cy.get('input[name="nama_pelanggaran"]').clear();
        cy.get('input[name="nama_pelanggaran"]').type(
            dataKategoriPelanggaranUpdated.nama_pelanggaran
        );
        cy.get('button[data-e2e="btn-simpan"]').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/dashboard/pelanggaran/kategori");
        });
        cy.get("table").should(
            "contain",
            dataKategoriPelanggaranUpdated.nama_pelanggaran
        );
    });

    it("should delete kategori pelanggaran and update the view table", () => {
        cy.visit("/dashboard/pelanggaran/kategori");
        cy.contains(
            "tr",
            dataKategoriPelanggaranUpdated.nama_pelanggaran
        ).within(($row) => {
            cy.get('button[data-e2e="btn-dropdown"]').click();
        });
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();
        cy.get("table").should(
            "not.contain",
            dataKategoriPelanggaranUpdated.nama_pelanggaran
        );
        cy.contains("tr", dataKategoriPelanggaran2.nama_pelanggaran).within(
            ($row) => {
                cy.get('button[data-e2e="btn-dropdown"]').click();
            }
        );
        cy.get('a[data-e2e="btn-edit"]').click();
        cy.get('button[data-e2e="btn-delete"]').click();
        cy.get('button[data-e2e="btn-confirm"]').click();
        cy.get("table").should(
            "not.contain",
            dataKategoriPelanggaranUpdated.nama_pelanggaran
        );
    });
});
