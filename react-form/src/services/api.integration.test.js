import { userService } from "./api";

// Mock fetch globalement
global.fetch = jest.fn();

describe("API Integration Tests", () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Reset fetch mock
    fetch.mockClear();
  });

  describe("getUsers - Récupération des utilisateurs", () => {
    test("devrait récupérer la liste des utilisateurs avec succès", async () => {
      // Arrange
      const mockUsers = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          dob: "1990-01-01",
          city: "Paris",
          postalCode: "75001",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          dob: "1985-05-15",
          city: "Lyon",
          postalCode: "69001",
        },
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      // Act
      const result = await userService.getUsers();

      // Assert
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`);
      expect(result).toEqual(mockUsers);
    });

    test("devrait gérer l'erreur 404 - Aucun utilisateur trouvé", async () => {
      // Arrange
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ detail: "Aucun utilisateur trouvé" }),
      });

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow(
        "Erreur lors de la récupération des utilisateurs"
      );
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`);
    });

    test("devrait gérer l'erreur 500 - Erreur serveur", async () => {
      // Arrange
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ detail: "Erreur interne du serveur" }),
      });

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow(
        "Erreur lors de la récupération des utilisateurs"
      );
    });

    test("devrait gérer l'erreur de réseau", async () => {
      // Arrange
      fetch.mockRejectedValueOnce(new Error("Network Error"));

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow("Network Error");
    });

    test("devrait gérer l'erreur inattendue", async () => {
      // Arrange
      fetch.mockRejectedValueOnce(new Error("Erreur inattendue"));

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow("Erreur inattendue");
    });
  });

  describe("createUser - Création d'utilisateur", () => {
    const validUserData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dob: "1990-01-01",
      city: "Paris",
      postalCode: "75001",
    };

    test("devrait créer un utilisateur avec succès", async () => {
      // Arrange
      const createdUser = {
        id: 1,
        ...validUserData,
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => createdUser,
      });

      // Act
      const result = await userService.createUser(validUserData);

      // Assert
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validUserData),
      });
      expect(result).toEqual(createdUser);
    });

    test("devrait gérer l'erreur 400 - Données invalides", async () => {
      // Arrange
      const invalidUserData = {
        firstName: "",
        lastName: "Doe",
        email: "invalid-email",
        dob: "1990-01-01",
        city: "Paris",
        postalCode: "75001",
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ detail: "Données invalides" }),
      });

      // Act & Assert
      await expect(userService.createUser(invalidUserData)).rejects.toThrow(
        "Données invalides"
      );
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidUserData),
      });
    });

    test("devrait gérer l'erreur 409 - Email déjà existant", async () => {
      // Arrange
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({
          detail: "Un utilisateur avec cet email existe déjà",
        }),
      });

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "Un utilisateur avec cet email existe déjà"
      );
    });

    test("devrait gérer l'erreur 422 - Validation échouée", async () => {
      // Arrange
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => ({ detail: "Erreur de validation des données" }),
      });

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "Erreur de validation des données"
      );
    });

    test("devrait gérer l'erreur de réseau lors de la création", async () => {
      // Arrange
      fetch.mockRejectedValueOnce(new Error("Network Error"));

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "Network Error"
      );
    });

    test("devrait gérer l'erreur de timeout", async () => {
      // Arrange
      fetch.mockRejectedValueOnce(new Error("timeout of 10000ms exceeded"));

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "timeout of 10000ms exceeded"
      );
    });
  });

  describe("Scénarios d'intégration complexes", () => {
    test("devrait gérer un workflow complet: création puis récupération d'utilisateur", async () => {
      // Arrange
      const userData = {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        dob: "1988-03-20",
        city: "Marseille",
        postalCode: "13001",
      };

      const createdUser = { id: 3, ...userData };

      // Mock création
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => createdUser,
      });

      // Mock récupération
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [createdUser],
      });

      // Act
      const created = await userService.createUser(userData);
      const users = await userService.getUsers();

      // Assert
      expect(created).toEqual(createdUser);
      expect(users).toContainEqual(createdUser);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    test("devrait gérer les erreurs en cascade", async () => {
      // Arrange
      const userData = {
        firstName: "Bob",
        lastName: "Wilson",
        email: "bob.wilson@example.com",
        dob: "1992-07-10",
        city: "Toulouse",
        postalCode: "31000",
      };

      // Mock erreur de création
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({ detail: "Email déjà utilisé" }),
      });

      // Mock récupération qui échoue aussi
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ detail: "Erreur serveur" }),
      });

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        "Email déjà utilisé"
      );
      await expect(userService.getUsers()).rejects.toThrow(
        "Erreur lors de la récupération des utilisateurs"
      );
    });

    test("devrait gérer les erreurs de validation multiples", async () => {
      // Arrange
      const invalidUsers = [
        {
          firstName: "",
          lastName: "Doe",
          email: "invalid-email",
          dob: "1990-01-01",
          city: "Paris",
          postalCode: "75001",
        },
        {
          firstName: "John",
          lastName: "",
          email: "john@example.com",
          dob: "2010-01-01", // Trop jeune
          city: "Paris",
          postalCode: "75001",
        },
      ];

      // Mock erreurs de validation
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => ({ detail: "Prénom requis et email invalide" }),
      });

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => ({ detail: "Nom requis et âge insuffisant" }),
      });

      // Act & Assert
      await expect(userService.createUser(invalidUsers[0])).rejects.toThrow(
        "Prénom requis et email invalide"
      );
      await expect(userService.createUser(invalidUsers[1])).rejects.toThrow(
        "Nom requis et âge insuffisant"
      );
    });
  });

  describe("Gestion des cas limites", () => {
    test("devrait gérer une liste vide d'utilisateurs", async () => {
      // Arrange
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      // Act
      const result = await userService.getUsers();

      // Assert
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    test("devrait gérer les caractères spéciaux dans les données", async () => {
      // Arrange
      const userWithSpecialChars = {
        firstName: "José",
        lastName: "García-López",
        email: "jose.garcia-lopez@example.com",
        dob: "1985-12-25",
        city: "Saint-Étienne",
        postalCode: "42000",
      };

      const createdUser = { id: 4, ...userWithSpecialChars };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => createdUser,
      });

      // Act
      const result = await userService.createUser(userWithSpecialChars);

      // Assert
      expect(result).toEqual(createdUser);
      expect(result.firstName).toBe("José");
      expect(result.lastName).toBe("García-López");
      expect(result.city).toBe("Saint-Étienne");
    });

    test("devrait gérer les données très longues", async () => {
      // Arrange
      const longUserData = {
        firstName: "A".repeat(100),
        lastName: "B".repeat(100),
        email: "very.long.email.address@very.long.domain.example.com",
        dob: "1990-01-01",
        city: "C".repeat(100),
        postalCode: "12345",
      };

      const createdUser = { id: 5, ...longUserData };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => createdUser,
      });

      // Act
      const result = await userService.createUser(longUserData);

      // Assert
      expect(result).toEqual(createdUser);
      expect(result.firstName).toHaveLength(100);
      expect(result.email).toContain("@");
    });
  });

  describe("Gestion des erreurs de parsing JSON", () => {
    test("devrait gérer l'erreur de parsing JSON invalide", async () => {
      // Arrange
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Unexpected token < in JSON at position 0");
        },
      });

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow(
        "Unexpected token < in JSON at position 0"
      );
    });

    test("devrait gérer l'erreur de parsing JSON dans la création", async () => {
      // Arrange
      const userData = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        dob: "1990-01-01",
        city: "Paris",
        postalCode: "75001",
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => {
          throw new Error("Invalid JSON response");
        },
      });

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        "Invalid JSON response"
      );
    });
  });
});
