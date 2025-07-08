import { userService } from "./api";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios;

describe("API Integration Tests", () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  beforeEach(() => {
    jest.clearAllMocks();
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

      mockedAxios.get.mockResolvedValueOnce({
        data: mockUsers,
      });

      // Act
      const result = await userService.getUsers();

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/users`);
      expect(result).toEqual(mockUsers);
    });

    test("devrait gérer l'erreur 404 - Aucun utilisateur trouvé", async () => {
      // Arrange
      const error = {
        response: {
          status: 404,
          data: { detail: "Aucun utilisateur trouvé" },
        },
      };
      mockedAxios.get.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow(
        "Erreur lors de la récupération des utilisateurs"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/users`);
    });

    test("devrait gérer l'erreur 500 - Erreur serveur", async () => {
      // Arrange
      const error = {
        response: {
          status: 500,
          data: { detail: "Erreur interne du serveur" },
        },
      };
      mockedAxios.get.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow(
        "Erreur lors de la récupération des utilisateurs"
      );
    });

    test("devrait gérer l'erreur de réseau", async () => {
      // Arrange
      const error = new Error("Network Error");
      mockedAxios.get.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.getUsers()).rejects.toThrow("Network Error");
    });

    test("devrait gérer l'erreur inattendue", async () => {
      // Arrange
      const error = new Error("Erreur inattendue");
      mockedAxios.get.mockRejectedValueOnce(error);

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

      mockedAxios.post.mockResolvedValueOnce({
        data: createdUser,
      });

      // Act
      const result = await userService.createUser(validUserData);

      // Assert
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/users`, validUserData);
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

      const error = {
        response: {
          status: 400,
          data: { detail: "Données invalides" },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.createUser(invalidUserData)).rejects.toThrow(
        "Données invalides"
      );
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/users`, invalidUserData);
    });

    test("devrait gérer l'erreur 409 - Email déjà existant", async () => {
      // Arrange
      const error = {
        response: {
          status: 409,
          data: { detail: "Un utilisateur avec cet email existe déjà" },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "Un utilisateur avec cet email existe déjà"
      );
    });

    test("devrait gérer l'erreur 422 - Validation échouée", async () => {
      // Arrange
      const error = {
        response: {
          status: 422,
          data: { detail: "Erreur de validation des données" },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "Erreur de validation des données"
      );
    });

    test("devrait gérer l'erreur de réseau lors de la création", async () => {
      // Arrange
      const error = new Error("Network Error");
      mockedAxios.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "Network Error"
      );
    });

    test("devrait gérer l'erreur de timeout", async () => {
      // Arrange
      const error = new Error("timeout of 10000ms exceeded");
      mockedAxios.post.mockRejectedValueOnce(error);

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
      mockedAxios.post.mockResolvedValueOnce({
        data: createdUser,
      });

      // Mock récupération
      mockedAxios.get.mockResolvedValueOnce({
        data: [createdUser],
      });

      // Act
      const created = await userService.createUser(userData);
      const users = await userService.getUsers();

      // Assert
      expect(created).toEqual(createdUser);
      expect(users).toContainEqual(createdUser);
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
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
      const createError = {
        response: {
          status: 409,
          data: { detail: "Email déjà utilisé" },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(createError);

      // Mock récupération qui échoue aussi
      const getError = {
        response: {
          status: 500,
          data: { detail: "Erreur serveur" },
        },
      };
      mockedAxios.get.mockRejectedValueOnce(getError);

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
          dob: "2010-01-01",
          city: "Paris",
          postalCode: "75001",
        },
      ];

      // Mock erreurs de validation
      const error1 = {
        response: {
          status: 422,
          data: { detail: "Prénom requis et email invalide" },
        },
      };
      const error2 = {
        response: {
          status: 422,
          data: { detail: "Nom requis et âge insuffisant" },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(error1);
      mockedAxios.post.mockRejectedValueOnce(error2);

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
      mockedAxios.get.mockResolvedValueOnce({
        data: [],
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

      mockedAxios.post.mockResolvedValueOnce({
        data: createdUser,
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

      mockedAxios.post.mockResolvedValueOnce({
        data: createdUser,
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
      const error = new Error("Unexpected token < in JSON at position 0");
      mockedAxios.get.mockRejectedValueOnce(error);

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

      const error = new Error("Invalid JSON response");
      mockedAxios.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        "Invalid JSON response"
      );
    });
  });
});
