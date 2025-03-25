"use strict";

var _validation = require("./validation");
describe('Validation Functions', function () {
  test('validateEmail should return true for valid email', function () {
    expect((0, _validation.validateEmail)('test@example.com')).toBe(true);
    expect((0, _validation.validateEmail)('user.name+tag+sorting@example.com')).toBe(true);
  });
  test('validateEmail should return false for invalid email', function () {
    expect((0, _validation.validateEmail)('plainaddress')).toBe(false);
    expect((0, _validation.validateEmail)('@missingusername.com')).toBe(false);
  });
  test('validatePostalCode should return true for valid postal code', function () {
    expect((0, _validation.validatePostalCode)('75001')).toBe(true);
    expect((0, _validation.validatePostalCode)('12345')).toBe(true);
  });
  test('validatePostalCode should return false for invalid postal code', function () {
    expect((0, _validation.validatePostalCode)('7500')).toBe(false);
    expect((0, _validation.validatePostalCode)('ABCDE')).toBe(false);
  });
  test('calculateAge should return correct age', function () {
    var today = new Date();
    var birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    expect((0, _validation.calculateAge)(birthDate.toISOString().split('T')[0])).toBe(25);
  });
  test('validateName should return true for valid name', function () {
    expect((0, _validation.validateName)('Jean-Pierre')).toBe(true);
    expect((0, _validation.validateName)('Élise')).toBe(true);
  });
  test('validateName should return false for invalid name', function () {
    expect((0, _validation.validateName)('Jean123')).toBe(false);
    expect((0, _validation.validateName)('John@Doe')).toBe(false);
  });
  test('validateCity should return true for valid city', function () {
    expect((0, _validation.validateCity)('Paris')).toBe(true);
    expect((0, _validation.validateCity)('Saint-Étienne')).toBe(true);
  });
  test('validateCity should return false for invalid city', function () {
    expect((0, _validation.validateCity)('City123')).toBe(false);
    expect((0, _validation.validateCity)('City@Name')).toBe(false);
  });
});