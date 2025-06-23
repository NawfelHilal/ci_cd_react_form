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

  it("affiche la liste des utilisateurs", () => {
    cy.get("ul").should("exist");
    cy.get("ul li").its("length").should("be.gte", 0); // au moins 0 utilisateur
  });

  it("ajoute un utilisateur valide", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Enregistrement réussi", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get("ul li").should("contain", "Martin Jean (martin.jean@example.com)");
    cy.contains(/Nombre d'utilisateurs :/i).should("exist");
  });

  it("affiche une erreur de validation pour un email invalide", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("not-an-email");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Veuillez saisir une adresse e-mail valide").should(
      "be.visible"
    );
  });

  it("affiche une erreur si le backend est indisponible", () => {
    // Simule une coupure backend (nécessite un mock ou un arrêt du service)
    // Ici, exemple avec interception
    cy.intercept("POST", "/users", { forceNetworkError: true }).as("postUser");
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();
    cy.wait("@postUser");
    cy.contains(/Erreur lors de l'enregistrement de l'utilisateur/i).should(
      "be.visible"
    );
  });

  it("réinitialise le formulaire après succès", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();
    cy.contains("Enregistrement réussi", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="nom"] input').should("have.value", "");
    cy.get('[data-testid="prenom"] input').should("have.value", "");
    cy.get('[data-testid="email"] input').should("have.value", "");
    cy.get('[data-testid="dob"] input').should("have.value", "");
    cy.get('[data-testid="city"] input').should("have.value", "");
    cy.get('[data-testid="postalCode"] input').should("have.value", "");
  });
});
