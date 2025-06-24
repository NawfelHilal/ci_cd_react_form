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

  it("affiche une erreur de validation pour un nom invalide", () => {
    cy.get('[data-testid="nom"] input').type("Martin123");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains(
      "Le champ nom ne doit contenir que des lettres et des accents."
    ).should("be.visible");
  });

  it("affiche une erreur de validation pour un prénom invalide", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean456");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains(
      "Le champ prenom ne doit contenir que des lettres et des accents."
    ).should("be.visible");
  });

  it("affiche une erreur de validation pour un email invalide", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("not-an-email");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Invalide champs email.").should("be.visible");
  });

  it("affiche une erreur de validation pour un email sans @", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean.example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Invalide champs email.").should("be.visible");
  });

  it("affiche une erreur de validation pour un email sans domaine", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Invalide champs email.").should("be.visible");
  });

  it("affiche une erreur de validation pour une date de naissance invalide (moins de 18 ans)", () => {
    // Calculer une date qui donne moins de 18 ans
    const currentDate = new Date();
    const under18Date = new Date(
      currentDate.getFullYear() - 17,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const under18DateString = under18Date.toISOString().split("T")[0];

    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type(under18DateString);
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Vous devez avoir plus de 18 ans.").should("be.visible");
  });

  it("affiche une erreur de validation pour une ville invalide", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Paris123");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains(
      "Le champ ville ne doit contenir que des lettres et des accents."
    ).should("be.visible");
  });

  it("affiche une erreur de validation pour un code postal invalide (format incorrect)", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("ABC12");
    cy.get('button[type="submit"]').click();

    cy.contains("Le code postale doit être au format français.").should(
      "be.visible"
    );
  });

  it("affiche une erreur de validation pour un code postal trop court", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("1234");
    cy.get('button[type="submit"]').click();

    cy.contains("Le code postale doit être au format français.").should(
      "be.visible"
    );
  });

  it("affiche une erreur de validation pour un code postal trop long", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("martin.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Nice");
    cy.get('[data-testid="postalCode"] input').type("123456");
    cy.get('button[type="submit"]').click();

    cy.contains("Le code postale doit être au format français.").should(
      "be.visible"
    );
  });

  /* it("affiche une erreur si le backend est indisponible", () => {
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
  });*/

  it("réinitialise le formulaire après succès", () => {
    cy.get('[data-testid="nom"] input').type("Martin");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("mmmmm@example.com");
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

  it("affiche plusieurs erreurs de validation simultanément", () => {
    cy.get('[data-testid="nom"] input').type("Martin123");
    cy.get('[data-testid="prenom"] input').type("Jean456");
    cy.get('[data-testid="email"] input').type("invalid-email");
    cy.get('[data-testid="dob"] input').type("2020-01-01"); // Moins de 18 ans
    cy.get('[data-testid="city"] input').type("Paris123");
    cy.get('[data-testid="postalCode"] input').type("ABC12");
    cy.get('button[type="submit"]').click();

    // Vérifier que toutes les erreurs sont affichées
    cy.contains(
      "Le champ nom ne doit contenir que des lettres et des accents."
    ).should("be.visible");
    cy.contains(
      "Le champ prenom ne doit contenir que des lettres et des accents."
    ).should("be.visible");
    cy.contains("Invalide champs email.").should("be.visible");
    cy.contains("Vous devez avoir plus de 18 ans.").should("be.visible");
    cy.contains(
      "Le champ ville ne doit contenir que des lettres et des accents."
    ).should("be.visible");
    cy.contains("Le code postale doit être au format français.").should(
      "be.visible"
    );
  });

  it("valide les caractères spéciaux autorisés dans les noms", () => {
    cy.get('[data-testid="nom"] input').type("O'Connor");
    cy.get('[data-testid="prenom"] input').type("Jean-Pierre");
    cy.get('[data-testid="email"] input').type("test@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Saint-Étienne");
    cy.get('[data-testid="postalCode"] input').type("06000");
    cy.get('button[type="submit"]').click();

    cy.contains("Enregistrement réussi", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("affiche une erreur si l'utilisateur existe déjà (email en double)", () => {
    // Créer un utilisateur une première fois
    cy.get('[data-testid="nom"] input').type("Dupont");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("dupont.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Paris");
    cy.get('[data-testid="postalCode"] input').type("75000");
    cy.get('button[type="submit"]').click();
    cy.contains("Enregistrement réussi", { timeout: 10000 }).should(
      "be.visible"
    );

    // Tenter de créer le même utilisateur (même email)
    cy.get('[data-testid="nom"] input').type("Dupont");
    cy.get('[data-testid="prenom"] input').type("Jean");
    cy.get('[data-testid="email"] input').type("dupont.jean@example.com");
    cy.get('[data-testid="dob"] input').type("2000-01-01");
    cy.get('[data-testid="city"] input').type("Paris");
    cy.get('[data-testid="postalCode"] input').type("75000");
    cy.get('button[type="submit"]').click();

    cy.contains("Un utilisateur avec cet email existe déjà.").should(
      "be.visible"
    );
  });
});
