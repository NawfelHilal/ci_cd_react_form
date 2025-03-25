"use strict";

var _validation = require("./validation");
describe('Validation Functions', () => {
  test('validateEmail should return true for valid email', () => {
    expect((0, _validation.validateEmail)('test@example.com')).toBe(true);
    expect((0, _validation.validateEmail)('user.name+tag+sorting@example.com')).toBe(true);
  });
  test('validateEmail should return false for invalid email', () => {
    expect((0, _validation.validateEmail)('plainaddress')).toBe(false);
    expect((0, _validation.validateEmail)('@missingusername.com')).toBe(false);
  });
  test('validatePostalCode should return true for valid postal code', () => {
    expect((0, _validation.validatePostalCode)('75001')).toBe(true);
    expect((0, _validation.validatePostalCode)('12345')).toBe(true);
  });
  test('validatePostalCode should return false for invalid postal code', () => {
    expect((0, _validation.validatePostalCode)('7500')).toBe(false);
    expect((0, _validation.validatePostalCode)('ABCDE')).toBe(false);
  });
  test('calculateAge should return correct age', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    expect((0, _validation.calculateAge)(birthDate.toISOString().split('T')[0])).toBe(25);
  });
  test('validateName should return true for valid name', () => {
    expect((0, _validation.validateName)('Jean-Pierre')).toBe(true);
    expect((0, _validation.validateName)('Élise')).toBe(true);
  });
  test('validateName should return false for invalid name', () => {
    expect((0, _validation.validateName)('Jean123')).toBe(false);
    expect((0, _validation.validateName)('John@Doe')).toBe(false);
  });
  test('validateCity should return true for valid city', () => {
    expect((0, _validation.validateCity)('Paris')).toBe(true);
    expect((0, _validation.validateCity)('Saint-Étienne')).toBe(true);
  });
  test('validateCity should return false for invalid city', () => {
    expect((0, _validation.validateCity)('City123')).toBe(false);
    expect((0, _validation.validateCity)('City@Name')).toBe(false);
  });
});