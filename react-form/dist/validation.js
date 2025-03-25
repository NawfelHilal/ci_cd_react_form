"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePostalCode = exports.validateName = exports.validateEmail = exports.validateCity = exports.calculateAge = void 0;
/**
 * Valide si une chaîne est au format email correct
 * @function validateEmail
 * @param {string} email - L'email à valider
 * @returns {boolean} - Vrai si l'email est valide, faux sinon
 * @example
 * // Retourne true
 * validateEmail("test@example.com");
 * // Retourne false
 * validateEmail("invalid-email");
 */
var validateEmail = exports.validateEmail = function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Valide si une chaîne est au format code postal français (5 chiffres)
 * @function validatePostalCode
 * @param {string} postalCode - Le code postal à valider
 * @returns {boolean} - Vrai si le code postal est valide, faux sinon
 * @example
 * // Retourne true
 * validatePostalCode("75001");
 * // Retourne false
 * validatePostalCode("ABC12");
 */
var validatePostalCode = exports.validatePostalCode = function validatePostalCode(postalCode) {
  var re = /^[0-9]{5}$/; // French postal code format
  return re.test(postalCode);
};

/**
 * Calcule l'âge en années à partir d'une date de naissance
 * @function calculateAge
 * @param {string|Date} date - La date de naissance au format YYYY-MM-DD ou un objet Date
 * @returns {number} - L'âge en années
 * @example
 * // Si aujourd'hui est 2025-03-24, retourne 25
 * calculateAge("2000-01-01");
 */
var calculateAge = exports.calculateAge = function calculateAge(date) {
  date = new Date(date);
  var dateDiff = new Date(Date.now() - date.getTime());
  var age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
};

/**
 * Valide si une chaîne ne contient que des caractères autorisés pour un nom
 * (lettres, accents, espaces, tirets, apostrophes)
 * @function validateName
 * @param {string} name - Le nom à valider
 * @returns {boolean} - Vrai si le nom est valide, faux sinon
 * @example
 * // Retourne true
 * validateName("Jean-Pierre");
 * // Retourne false
 * validateName("Jean123");
 */
var validateName = exports.validateName = function validateName(name) {
  var re = /^[a-zA-ZÀ-ÿ\s'-]+$/; // Allows letters, accents, spaces, hyphens, and apostrophes
  return re.test(name);
};

/**
 * Valide si une chaîne ne contient que des caractères autorisés pour un nom de ville
 * (lettres, accents, espaces, tirets, apostrophes)
 * @function validateCity
 * @param {string} city - Le nom de ville à valider
 * @returns {boolean} - Vrai si le nom de ville est valide, faux sinon
 * @example
 * // Retourne true
 * validateCity("Saint-Étienne");
 * // Retourne false
 * validateCity("Paris123");
 */
var validateCity = exports.validateCity = function validateCity(city) {
  var re = /^[a-zA-ZÀ-ÿ\s'-]+$/; // Allows letters, accents, spaces, hyphens, and apostrophes
  return re.test(city);
};