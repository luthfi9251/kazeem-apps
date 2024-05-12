describe("Login test", () => {
    it("should render login page", () => {
        cy.visit("/login");
    });

    it("should show when login error", () => {
        cy.visit("/login");
        cy.get('input[name="email"]').type("admin@admin.com");
        cy.get('input[name="password"]').type("password salah");
        cy.get('button[type="submit"]').click();
        cy.get("#error-msg");
    });

    it("should success login with right creadential", () => {
        cy.visit("/login");
        cy.get('input[name="email"]').type("admin@admin.com");
        cy.get('input[name="password"]').type("passwordadmin");
        cy.get('button[type="submit"]').click();
        cy.url().should("contain", "/dashboard");
        cy.getCookie("authjs.session-token").should("exist");
    });
});
