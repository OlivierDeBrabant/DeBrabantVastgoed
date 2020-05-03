describe("Dashboard Test", () => {
    //beforeEach(() => {});
  
  
  it("logintest"),
    () => {
      cy.login();
    };
  
  it("login page", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[data-cy=login-email]").type("db@db.com");
    cy.get("[data-cy=login-password]").type("P@ssword1111");
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=addProject]").should('be.visible');
  });
  
  it("Add Product button enabled", () =>{
    cy.visit("http://localhost:4200/login");
    cy.get("[data-cy=login-email]").type("db@db.com");
    cy.get("[data-cy=login-password]").type("P@ssword1111");
    cy.get("[data-cy=login-button]").click();

    cy.visit("http://localhost:4200/dashboard/addProject");
    cy.get("[data-cy=naam]").type("Mierepad");
    cy.get("[data-cy=beschrijving]").type("Grote verkaveling");
    cy.get("[data-cy=adres]").type("Wakken");
    cy.get("[data-cy=submitbtn]").should('be.enabled');
  });
});
