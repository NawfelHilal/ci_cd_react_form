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

    // Attendre que le formulaire soit soumis et que les messages d'erreur apparaissent
    cy.get('[data-testid="nom"]').should("have.attr", "aria-invalid", "true");
    cy.get('[data-testid="email"]').should("have.attr", "aria-invalid", "true");
    cy.get('[data-testid="dob"]').should("have.attr", "aria-invalid", "true");
    cy.get('[data-testid="city"]').should("have.attr", "aria-invalid", "true");
    cy.get('[data-testid="postalCode"]').should(
      "have.attr",
      "aria-invalid",
      "true"
    );

    // Vérifier les messages d'erreur avec les textes exacts
    cy.get('[data-testid="nom"]')
      .parent()
      .contains("Le champ nom ne doit contenir que des lettres et des accents.")
      .should("be.visible");
    cy.get('[data-testid="email"]')
      .parent()
      .contains("Invalide champs email.")
      .should("be.visible");
    cy.get('[data-testid="dob"]')
      .parent()
      .contains("Vous devez avoir plus de 18 ans.")
      .should("be.visible");
    cy.get('[data-testid="city"]')
      .parent()
      .contains(
        "Le champ ville ne doit contenir que des lettres et des accents."
      )
      .should("be.visible");
    cy.get('[data-testid="postalCode"]')
      .parent()
      .contains("Le code postale doit être au format français.")
      .should("be.visible");
  });

  it("should handle network errors gracefully", () => {
    // Simuler une erreur réseau
    cy.intercept(
      {
        method: "POST",
        url: "**/api/users",
        hostname: "localhost",
        port: 3000,
      },
      {
        statusCode: 500,
        body: { message: "Network error" },
      }
    ).as("submitForm");

    // Remplir le formulaire avec des données valides
    cy.get('[data-testid="nom"]').type("Martin");
    cy.get('[data-testid="prenom"]').type("Jean");
    cy.get('[data-testid="email"]').type("test@test.com");
    cy.get('[data-testid="dob"]').type("2000-01-01");
    cy.get('[data-testid="city"]').type("Nice");
    cy.get('[data-testid="postalCode"]').type("06200");

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Attendre que la requête soit terminée avec un timeout plus long
    cy.wait("@submitForm", { timeout: 10000 });

    // Vérifier le message d'erreur
    cy.contains("Erreur lors de l'enregistrement de l'utilisateur.", {
      timeout: 10000,
    }).should("be.visible");
  });
});
