describe("DbVastgoedTests", function () {
  it("Controleren of website start", function () {
    cy.visit("http://localhost:4200");
  });

  it("GET projecten", function () {
    cy.server({ delay: 1000 });
    cy.route({
      method: "GET",
      url: "http://localhost:4200/api/Projects",
      status: 200,
      response: "fixture:projecten.json",
    });

    cy.visit("http://localhost:4200/projecten");
    cy.get("[data-cy=projectCard]").should("have.length", 3);
  });

  it("GET producten van project 1", function () {
    cy.server({ delay: 1000 });
    cy.route({
      method: "GET",
      url: "/api/Projects",
      status: 200,
      response: "fixture:projecten.json",
    });

    cy.visit("/projecten/projectproduct/1");
    cy.get("[data-cy=productCard]").should("have.length", 2);
  });

  it("Label verkocht aanwezig", function () {
    cy.server({ delay: 1000 });
    cy.route({
      method: "GET",
      url: "/api/Projects",
      status: 200,
      response: "fixture:projecten.json",
    });

    cy.visit("/projecten/projectproduct/1");
    cy.get("[data-cy=verkochtLabel]").should("have.length", 1);
  });
});

