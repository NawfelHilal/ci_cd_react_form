import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const userService = {
  // Récupérer tous les utilisateurs
  async getUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  async createUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dob: userData.dob,
        city: userData.city,
        postalCode: userData.postalCode,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.detail || "Erreur lors de la création de l'utilisateur"
        );
      }
      throw error;
    }
  },
};
