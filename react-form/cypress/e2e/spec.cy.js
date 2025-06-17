describe("Home page spec", () => {
  it("deployed react app to localhost", () => {
    cy.visit("http://localhost:3000");
    cy.wait(3000);
    cy.contains("Nombre d'utilisateurs : 2");
  });
});
