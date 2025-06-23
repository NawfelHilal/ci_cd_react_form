import { userService } from "./api";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("API Service Tests", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    test("successfully fetches all users", async () => {
      const mockUsers = [
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "Jane", lastName: "Smith" },
      ];

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        })
      );

      const result = await userService.getUsers();
      expect(result).toEqual(mockUsers);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/users"));
    });

    test("handles API error when fetching users", async () => {
      const error = new Error("Network error");
      mockFetch.mockImplementationOnce(() => Promise.reject(error));

      await expect(userService.getUsers()).rejects.toThrow("Network error");
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/users"));
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

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await userService.createUser(mockUserData);
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mockUserData),
        })
      );
    });

    test("handles API error when creating user", async () => {
      const error = new Error("Network error");
      mockFetch.mockImplementationOnce(() => Promise.reject(error));

      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        "Network error"
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mockUserData),
        })
      );
    });

    test("handles malformed response data", async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ invalid: "data" }),
        })
      );

      const result = await userService.createUser(mockUserData);
      expect(result).toEqual({ invalid: "data" });
    });
  });
});
