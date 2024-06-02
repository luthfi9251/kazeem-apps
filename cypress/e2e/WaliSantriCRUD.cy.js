describe("Wali Santri Page CRUD", () => {
    beforeEach(() => {
        //login dulu dengan role admin
        cy.login("admin@admin.com", "passwordadmin");
    });

    it("should render wali santri Homepage", () => {
        cy.visit("/dashboard/santri/wali");
        cy.get("h3").contains("Data Wali Santri");
        cy.get("table").should("contain", "Nama Lengkap");
    });

    let dataSantri = {
        nama_lengkap: "TEST SANTRI1",
        email: "testsantri1@gmail.com",
        alamat: "INI ALAMAT SANTRI 1",
        no_hp: "0888888445421554",
        tempat_lhr: "Demak",
        tgl_lhr: "2003-03-29",
    };

    let dataWali = [
        {
            nama_wali: "Test Wali 1",
            email: "testwali1@gmail.com",
            hp: "03215487444",
            tgl_lhr: "2004-03-29",
        },
        {
            nama_wali: "Test Wali 2",
            email: "testwali2@gmail.com",
            hp: "03215487444",
            tgl_lhr: "2004-05-29",
        },
        {
            nama_wali: "Test Wali 3",
            email: "testwali3@gmail.com",
            hp: "03215487444",
            tgl_lhr: "2001-05-29",
        },
    ];

    it("should add wali santri to database and update the table", () => {
        cy.visit("/dashboard/santri");
        cy.get("button").should("contain", "Tambah Santri");
        cy.get("#tambah-santri").click();
        cy.url().should("contain", "/dashboard/santri/create");

        //isi data santri
        cy.get('input[name="nama_lengkap"]').type(dataSantri.nama_lengkap);
        cy.get('input[name="email"]').type(dataSantri.email);
        cy.get('textarea[name="alamat"]').type(dataSantri.alamat);
        cy.get('input[name="hp"]').type(dataSantri.no_hp);
        cy.get('input[name="tempat_lahir"]').type(dataSantri.tempat_lhr);
        cy.get('input[name="tgl_lhr"]').type(dataSantri.tgl_lhr);

        //isi data wali

        cy.contains("button", "Tambah Wali").click();
        let item1 = dataWali[0];
        cy.get("#form-wali").within(($form) => {
            cy.get('input[name="nama_wali"]').type(item1.nama_wali);
            cy.get('input[name="email"]').type(item1.email);
            cy.get('input[name="hp"]').type(item1.hp);
            cy.get('input[name="tgl_lhr"]').type(item1.tgl_lhr);
            cy.contains("button", "Tambah Wali").click();
        });
        cy.get("table").should("contain", item1.nama_wali);

        //simpan
        cy.contains("button", "Simpan").click();
        cy.contains("button", "Simpan").click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/dashboard/santri");
        });
        cy.get("table").should("contain", dataSantri.nama_lengkap);
        cy.contains("tr", dataSantri.nama_lengkap).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Detail").click();
        cy.url().should("contain", "/dashboard/santri/detail");
        cy.get("table").should("contain", item1.nama_wali);
    });

    it("should update data to database and update the table", () => {
        cy.visit("/dashboard/santri/wali");
        let item1 = dataWali[0];
        cy.contains("tr", item1.nama_wali).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Detail").click();
        cy.url().should("contain", "/dashboard/santri/wali/detail");
        cy.get('input[name="hp"]').should("contain.value", item1.hp);

        cy.visit("/dashboard/santri/wali");
        cy.contains("tr", item1.nama_wali).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Edit").click();
        cy.url().should("contain", "/dashboard/santri/wali/edit");
        let noHpBaru = "123456789";
        item1.hp = noHpBaru;
        cy.get('input[name="hp"]').clear().type(item1.hp);

        cy.contains("button", "Simpan").click();
        cy.contains("button", "Simpan").click();
        cy.url().should("contain", "/dashboard/santri/wali");

        cy.contains("tr", item1.nama_wali).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Detail").click();
        cy.url().should("contain", "/dashboard/santri/wali/detail");
        cy.get('input[name="hp"]').should("contain.value", noHpBaru);
    });

    it("should not delete walisantri that has relation with santri", () => {
        cy.visit("/dashboard/santri/wali");
        let item1 = dataWali[0];
        cy.contains("tr", item1.nama_wali).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Edit").click();
        cy.url().should("contain", "/dashboard/santri/wali/edit");
        cy.get("button").should("contain", "Hapus");
        cy.contains("button", "Hapus").click();
        cy.get('div[role="alertdialog"]').within(($alert) => {
            cy.contains("button", "Continue").click();
        });

        cy.get('div[role="alert"]').should(
            "contain",
            "Kesalahan saat menghapus data, pastikan wali tidak memiliki perwalian!"
        );
    });

    it("should delete wali that has no relation with santri", () => {
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

        // hapus dulu
        cy.contains("tr", dataWali[0].nama_wali).within(($row) => {
            cy.get("button").click();
        });
        cy.get('div[role="menu"]').within(($item) => {
            cy.contains("div", "Hapus").click();
        });
        cy.get("tr").should("not.contain", dataWali[0].nama_wali);

        //tambah kemudian

        let item4 = {
            nama_wali: "Test Wali 4",
            email: "testwali4@gmail.com",
            hp: "03215487444",
            tgl_lhr: "2001-05-29",
        };
        cy.contains("button", "Tambah Wali").click();
        cy.get("#form-wali").within(($form) => {
            cy.get('input[name="nama_wali"]').type(item4.nama_wali);
            cy.get('input[name="email"]').type(item4.email);
            cy.get('input[name="hp"]').type(item4.hp);
            cy.get('input[name="tgl_lhr"]').type(item4.tgl_lhr);
            cy.contains("button", "Tambah Wali").click();
        });
        cy.get("table").should("contain", item4.nama_wali);

        //simpan data
        cy.contains("button", "Simpan").click();
        cy.contains("button", "Simpan").click();
        cy.url().should("contain", "/dashboard/santri");

        cy.visit("/dashboard/santri/wali");
        let item1 = dataWali[0];

        cy.contains("tr", item1.nama_wali).within(($row) => {
            cy.get("button").click();
        });
        cy.contains("a.w-full", "Edit").click();
        cy.url().should("contain", "/dashboard/santri/wali/edit");
        cy.get("button").should("contain", "Hapus");
        cy.contains("button", "Hapus").click();
        cy.get('div[role="alertdialog"]').within(($alert) => {
            cy.contains("button", "Continue").click();
        });

        cy.get('div[role="alert"]').should("contain", "Data berhasil dihapus");

        //hapus santri
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
});
