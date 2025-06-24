const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const userService = {
  // Récupérer tous les utilisateurs
  async getUsers() {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      return response.json(); // L'API retourne directement un tableau
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  async createUser(userData) {
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
      if (!response.ok) {
        // FastAPI renvoie l'erreur dans data.detail
        throw new Error(
          data.detail || "Erreur lors de la création de l'utilisateur"
        );
      }
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};
