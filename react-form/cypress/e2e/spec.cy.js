describe("Home page spec", () => {
  it("deployed react app to localhost", () => {
    cy.visit("https://ci-cd-react-form.vercel.app/");
    cy.wait(3000);
    cy.contains("Nombre d'utilisateurs : 2");
  });
});
