export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePostalCode = (postalCode) => {
  const re = /^[0-9]{5}$/; // French postal code format
  return re.test(postalCode);
};

export const calculateAge = (date) => {
  date = new Date(date);
  let dateDiff = new Date(Date.now() - date.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
};

export const validateName = (name) => {
  const re = /^[a-zA-ZÀ-ÿ\s'-]+$/; // Allows letters, accents, spaces, hyphens, and apostrophes
  return re.test(name);
};

export const validateCity = (city) => {
  const re = /^[a-zA-ZÀ-ÿ\s'-]+$/; // Allows letters, accents, spaces, hyphens, and apostrophes
  return re.test(city);
};
