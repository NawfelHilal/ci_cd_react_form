/*describe("Form E2E Tests", () => {
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
    cy.contains("Enregistrement réussi").should("be.visible");

    // Vérifier que le formulaire est réinitialisé
    cy.get('[data-testid="nom"]').should("have.value", "");
  });

  it("should show validation errors with invalid data", () => {
    // Remplir le formulaire avec des données invalides
    cy.get('[data-testid="nom"]').type("123");
    cy.get('[data-testid="prenom"]').type("Jean");
    cy.get('[data-testid="email"]').type("invalid-email");
    cy.get('[data-testid="dob"]').type("2020-01-01"); // Date future
    cy.get('[data-testid="city"]').type("Paris123");
    cy.get('[data-testid="postalCode"]').type("123");

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier les messages d'erreur
    cy.contains("Le champ nom ne doit contenir que des lettres").should(
      "be.visible"
    );
    cy.contains("Invalide champs email").should("be.visible");
    cy.contains("Vous devez avoir plus de 18 ans").should("be.visible");
    cy.contains("Le champ ville ne doit contenir que des lettres").should(
      "be.visible"
    );
    cy.contains("Le code postale doit être au format français").should(
      "be.visible"
    );
  });

  it("should handle network errors gracefully", () => {
    // Simuler une erreur réseau
    cy.intercept("POST", "**/ /*api/users", {
      statusCode: 500,
      body: { message: "Network error" },
    });

    // Remplir le formulaire avec des données valides
    cy.get('[data-testid="nom"]').type("Martin");
    cy.get('[data-testid="prenom"]').type("Jean");
    cy.get('[data-testid="email"]').type("test@test.com");
    cy.get('[data-testid="dob"]').type("2000-01-01");
    cy.get('[data-testid="city"]').type("Nice");
    cy.get('[data-testid="postalCode"]').type("06200");

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier le message d'erreur avec le point à la fin
    cy.contains("Erreur lors de l'enregistrement de l'utilisateur.").should(
      "be.visible"
    );
  });
});*/
