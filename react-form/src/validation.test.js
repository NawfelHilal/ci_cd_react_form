import { validateEmail, validatePostalCode, calculateAge, validateName, validateCity } from './validation';

describe('Validation Functions', () => {
  test('validateEmail should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag+sorting@example.com')).toBe(true);
  });

  test('validateEmail should return false for invalid email', () => {
    expect(validateEmail('plainaddress')).toBe(false);
    expect(validateEmail('@missingusername.com')).toBe(false);
  });

  test('validatePostalCode should return true for valid postal code', () => {
    expect(validatePostalCode('75001')).toBe(true);
    expect(validatePostalCode('12345')).toBe(true);
  });

  test('validatePostalCode should return false for invalid postal code', () => {
    expect(validatePostalCode('7500')).toBe(false);
    expect(validatePostalCode('ABCDE')).toBe(false);
  });

  test('calculateAge should return correct age', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    expect(calculateAge(birthDate.toISOString().split('T')[0])).toBe(25);
  });

  test('validateName should return true for valid name', () => {
    expect(validateName('Jean-Pierre')).toBe(true);
    expect(validateName('Élise')).toBe(true);
  });

  test('validateName should return false for invalid name', () => {
    expect(validateName('Jean123')).toBe(false);
    expect(validateName('John@Doe')).toBe(false);
  });

  test('validateCity should return true for valid city', () => {
    expect(validateCity('Paris')).toBe(true);
    expect(validateCity('Saint-Étienne')).toBe(true);
  });

  test('validateCity should return false for invalid city', () => {
    expect(validateCity('City123')).toBe(false);
    expect(validateCity('City@Name')).toBe(false);
  });
});