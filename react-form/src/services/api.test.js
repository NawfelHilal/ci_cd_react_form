import { userService } from "./api";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios;

describe("API Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    test("successfully fetches all users", async () => {
      const mockUsers = [
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "Jane", lastName: "Smith" },
      ];

      mockedAxios.get.mockResolvedValueOnce({
        data: mockUsers,
      });

      const result = await userService.getUsers();
      expect(result).toEqual(mockUsers);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/users"));
    });

    test("handles API error when fetching users", async () => {
      const error = new Error("Network error");
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(userService.getUsers()).rejects.toThrow("Network error");
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/users"));
    });

    test("throws if response has error status", async () => {
      const error = {
        response: {
          status: 500,
          data: { detail: "Server error" },
        },
      };
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(userService.getUsers()).rejects.toThrow(
        "Erreur lors de la récupération des utilisateurs"
      );
    });
  });

  describe("createUser", () => {
    const mockUserData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dob: "1990-01-01",
      city: "Paris",
      postalCode: "75001",
    };

    test("successfully creates a user", async () => {
      const mockResponse = {
        message: "User created successfully",
        user: mockUserData,
      };

      mockedAxios.post.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await userService.createUser(mockUserData);
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/users"),
        mockUserData
      );
    });

    test("handles API error when creating user", async () => {
      const error = new Error("Network error");
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        "Network error"
      );
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/users"),
        mockUserData
      );
    });

    test("handles malformed response data", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { invalid: "data" },
      });

      const result = await userService.createUser(mockUserData);
      expect(result).toEqual({ invalid: "data" });
    });

    test("throws if response has error status and data.detail is present", async () => {
      const error = {
        response: {
          status: 400,
          data: { detail: "Erreur API" },
        },
      };
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        "Erreur API"
      );
    });

    test("throws if response has error status and data.detail is missing", async () => {
      const error = {
        response: {
          status: 400,
          data: {},
        },
      };
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        "Erreur lors de la création de l'utilisateur"
      );
    });
  });
});
