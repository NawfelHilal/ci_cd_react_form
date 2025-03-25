"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom");
var _Form = _interopRequireDefault(require("./Form"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
describe('Form Integration Tests', function () {
  beforeEach(function () {
    // Nettoyer le localStorage avant chaque test
    localStorage.clear();
  });
  test('should complete full registration flow successfully', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var user, nomInput, prenomInput, emailInput, dobInput, cityInput, postalCodeInput, pastDate, formattedDate, submitButton, storedData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          user = _userEvent["default"].setup();
          (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Simulation de la saisie utilisateur complète
          nomInput = _react.screen.getByTestId('nom').querySelector('input');
          prenomInput = _react.screen.getByTestId('prenom').querySelector('input');
          emailInput = _react.screen.getByTestId('email').querySelector('input');
          dobInput = _react.screen.getByTestId('dob').querySelector('input');
          cityInput = _react.screen.getByTestId('city').querySelector('input');
          postalCodeInput = _react.screen.getByTestId('postalCode').querySelector('input');
          _context.next = 10;
          return user.type(nomInput, 'Martin');
        case 10:
          _context.next = 12;
          return user.type(prenomInput, 'Jean');
        case 12:
          _context.next = 14;
          return user.type(emailInput, 'jean.martin@email.com');
        case 14:
          // Définir une date de naissance valide (plus de 18 ans)
          pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - 20);
          formattedDate = pastDate.toISOString().split('T')[0];
          _context.next = 19;
          return user.type(dobInput, formattedDate);
        case 19:
          _context.next = 21;
          return user.type(cityInput, 'Paris');
        case 21:
          _context.next = 23;
          return user.type(postalCodeInput, '75001');
        case 23:
          // Soumettre le formulaire
          submitButton = _react.screen.getByText('Submit');
          _context.next = 26;
          return user.click(submitButton);
        case 26:
          _context.next = 28;
          return (0, _react.waitFor)(function () {
            expect(_react.screen.getByText('Enregistrement réussi')).toBeInTheDocument();
          });
        case 28:
          // Vérifier les données dans le localStorage
          storedData = JSON.parse(localStorage.getItem('registrationData'));
          expect(storedData).toEqual({
            firstName: 'Martin',
            lastName: 'Jean',
            email: 'jean.martin@email.com',
            dob: formattedDate,
            city: 'Paris',
            postalCode: '75001'
          });

          // Vérifier que le formulaire a été réinitialisé
          expect(nomInput.value).toBe('');
          expect(prenomInput.value).toBe('');
        case 32:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  test('should handle validation errors and recovery', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var user, nomInput, prenomInput, emailInput, dobInput, cityInput, postalCodeInput, date, submitButton, validDate;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          user = _userEvent["default"].setup();
          (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
          nomInput = _react.screen.getByTestId('nom').querySelector('input');
          prenomInput = _react.screen.getByTestId('prenom').querySelector('input');
          emailInput = _react.screen.getByTestId('email').querySelector('input');
          dobInput = _react.screen.getByTestId('dob').querySelector('input');
          cityInput = _react.screen.getByTestId('city').querySelector('input');
          postalCodeInput = _react.screen.getByTestId('postalCode').querySelector('input'); // Saisir des données invalides
          _context2.next = 10;
          return user.type(nomInput, '123');
        case 10:
          _context2.next = 12;
          return user.type(emailInput, 'invalid-email');
        case 12:
          _context2.next = 14;
          return user.type(cityInput, 'Paris123');
        case 14:
          _context2.next = 16;
          return user.type(postalCodeInput, 'ABC');
        case 16:
          _context2.next = 18;
          return user.type(prenomInput, 'Jean');
        case 18:
          date = new Date();
          date.setFullYear(date.getFullYear() - 10); // Âge invalide
          _context2.next = 22;
          return user.type(dobInput, date.toISOString().split('T')[0]);
        case 22:
          // Soumettre avec des erreurs
          submitButton = _react.screen.getByText('Submit');
          _context2.next = 25;
          return user.click(submitButton);
        case 25:
          _context2.next = 27;
          return (0, _react.waitFor)(function () {
            expect(_react.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
            expect(_react.screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
            expect(_react.screen.getByText(/Le champ ville ne doit contenir que des lettres/i)).toBeInTheDocument();
            expect(_react.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
            expect(_react.screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
          });
        case 27:
          _context2.next = 29;
          return user.clear(nomInput);
        case 29:
          _context2.next = 31;
          return user.type(nomInput, 'Martin');
        case 31:
          _context2.next = 33;
          return user.clear(emailInput);
        case 33:
          _context2.next = 35;
          return user.type(emailInput, 'martin@email.com');
        case 35:
          _context2.next = 37;
          return user.clear(cityInput);
        case 37:
          _context2.next = 39;
          return user.type(cityInput, 'Paris');
        case 39:
          _context2.next = 41;
          return user.clear(postalCodeInput);
        case 41:
          _context2.next = 43;
          return user.type(postalCodeInput, '75001');
        case 43:
          // Corriger la date de naissance
          validDate = new Date();
          validDate.setFullYear(validDate.getFullYear() - 20);
          _context2.next = 47;
          return user.clear(dobInput);
        case 47:
          _context2.next = 49;
          return user.type(dobInput, validDate.toISOString().split('T')[0]);
        case 49:
          _context2.next = 51;
          return user.click(submitButton);
        case 51:
          _context2.next = 53;
          return (0, _react.waitFor)(function () {
            expect(_react.screen.getByText('Enregistrement réussi')).toBeInTheDocument();
          });
        case 53:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  test('should handle form state persistence correctly', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var user, nomInput, prenomInput, emailInput, dobInput, cityInput, postalCodeInput, submitButton, date;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          user = _userEvent["default"].setup();
          (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
          nomInput = _react.screen.getByTestId('nom').querySelector('input');
          prenomInput = _react.screen.getByTestId('prenom').querySelector('input');
          emailInput = _react.screen.getByTestId('email').querySelector('input');
          dobInput = _react.screen.getByTestId('dob').querySelector('input');
          cityInput = _react.screen.getByTestId('city').querySelector('input');
          postalCodeInput = _react.screen.getByTestId('postalCode').querySelector('input'); // Remplir partiellement le formulaire
          _context3.next = 10;
          return user.type(nomInput, 'Martin');
        case 10:
          _context3.next = 12;
          return user.type(prenomInput, 'Jean');
        case 12:
          // Vérifier que le bouton est désactivé
          submitButton = _react.screen.getByText('Submit');
          expect(submitButton).toBeDisabled();

          // Compléter le formulaire
          _context3.next = 16;
          return user.type(emailInput, 'martin@email.com');
        case 16:
          date = new Date();
          date.setFullYear(date.getFullYear() - 20);
          _context3.next = 20;
          return user.type(dobInput, date.toISOString().split('T')[0]);
        case 20:
          _context3.next = 22;
          return user.type(cityInput, 'Paris');
        case 22:
          _context3.next = 24;
          return user.type(postalCodeInput, '75001');
        case 24:
          // Vérifier que le bouton est activé
          expect(submitButton).not.toBeDisabled();
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});