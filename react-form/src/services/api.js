const API_URL = process.env.REACT_APP_API_URL;

export const userService = {
  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  createUser: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          dob: userData.dob,
          city: userData.city,
          postalCode: userData.postalCode,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  async getUsers() {
    const response = await fetch("http://localhost:8000/users");
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des utilisateurs");
    return response.json();
  },
};
