describe("Form E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should submit form successfully with valid data", () => {
    // Remplir le formulaire avec des données valides
    cy.get('[data-testid="nom"]').type("Martin");
    cy.get('[data-testid="prenom"]').type("Jean");
    cy.get('[data-testid="email"]').type("test@test.com");
    cy.get('[data-testid="dob"]').type("2000-01-01");
    cy.get('[data-testid="city"]').type("Nice");
    cy.get('[data-testid="postalCode"]').type("06200");

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier le message de succès
    cy.contains("Enregistrement réussi", { timeout: 10000 }).should(
      "be.visible"
    );

    // Vérifier que le formulaire est réinitialisé
    cy.get('[data-testid="nom"]').should("have.value", "");
  });
});
