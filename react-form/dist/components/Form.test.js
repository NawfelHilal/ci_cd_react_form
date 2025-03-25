"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _Form = _interopRequireDefault(require("./Form"));
var _validation = require("../validation");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
describe("Form Component", function () {
  test("renders form", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var formElement = _react2.screen.getByText(/Form/i);
    expect(formElement).toBeInTheDocument();
  });
  test("verify champs name", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean-Pierre"
      }
    });
    expect(firstName.value).toBe("Jean-Pierre");
    var lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Élise"
      }
    });
    expect(lastName.value).toBe("Élise");
  });
  test("verify validate name", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean-Pierre"
      }
    });
    expect((0, _validation.validateName)(firstName.value)).toBe(true);
    var lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Élise&&&"
      }
    });
    expect((0, _validation.validateName)(lastName.value)).toBe(false);
  });
  test("verify email field", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "test@example.com"
      }
    });
    expect(email.value).toBe("test@example.com");
    expect((0, _validation.validateEmail)(email.value)).toBe(true);
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });
    expect((0, _validation.validateEmail)(email.value)).toBe(false);
  });
  test("verify date of birth field", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    expect(dob.value).toBe("2000-01-01");
    expect((0, _validation.calculateAge)(dob.value)).toBeGreaterThanOrEqual(18);
    _react2.fireEvent.change(dob, {
      target: {
        value: "2020-01-01"
      }
    });
    expect((0, _validation.calculateAge)(dob.value)).toBeLessThan(18);
  });
  test("verify city field", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    expect(city.value).toBe("Paris");
    expect((0, _validation.validateCity)(city.value)).toBe(true);
    _react2.fireEvent.change(city, {
      target: {
        value: "City123"
      }
    });
    expect((0, _validation.validateCity)(city.value)).toBe(false);
  });
  test("verify postal code field", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    expect(postalCode.value).toBe("75001");
    expect((0, _validation.validatePostalCode)(postalCode.value)).toBe(true);
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });
    expect((0, _validation.validatePostalCode)(postalCode.value)).toBe(false);
  });
  test("verify form submission", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    var lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    var email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    var dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    var city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    var postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    var submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).not.toBeDisabled();
    _react2.fireEvent.click(submitButton);
    expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
  });
  test("verify data is stored in localStorage", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    var lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    var email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    var dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    var city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    var postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    var submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    var storedData = JSON.parse(localStorage.getItem("registrationData"));
    expect(storedData).toEqual({
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      dob: "2000-01-01",
      city: "Paris",
      postalCode: "75001"
    });
  });
  test("verify closing Snackbar messages", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var firstName, lastName, email, dob, city, postalCode, submitButton, successSnackbar, closeButton;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);
          successSnackbar = _react2.screen.getByText(/Enregistrement réussi/i);
          expect(successSnackbar).toBeInTheDocument();
          closeButton = _react2.screen.getByRole("button", {
            name: /close/i
          });
          _react2.fireEvent.click(closeButton);
          _context.next = 21;
          return (0, _react2.waitFor)(function () {
            expect(successSnackbar).not.toBeInTheDocument();
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  test("verify submit button is disabled when form is invalid", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: ""
      }
    });
    var lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: ""
      }
    });
    var email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });
    var dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2020-01-01"
      }
    });
    var city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "City123"
      }
    });
    var postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });
    var submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });
  test("verify fields are cleared after successful submission", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });
          expect(firstName.value).toBe("Jean");
          expect(lastName.value).toBe("Dupont");
          expect(email.value).toBe("jean.dupont@example.com");
          expect(dob.value).toBe("2000-01-01");
          expect(city.value).toBe("Paris");
          expect(postalCode.value).toBe("75001");
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);
          _context2.next = 23;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
          });
        case 23:
          expect(firstName.value).toBe("");
          expect(lastName.value).toBe("");
          expect(email.value).toBe("");
          expect(dob.value).toBe("");
          expect(city.value).toBe("");
          expect(postalCode.value).toBe("");
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  test("verify error handling on form submission with invalid data", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont456"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "invalid-email"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          _react2.fireEvent.change(dob, {
            target: {
              value: "2020-01-01"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "City123"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "ABCDE"
            }
          });
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);
          _context3.next = 17;
          return (0, _react2.waitFor)(function () {
            var errorAlert = _react2.screen.getByRole("alert");
            expect(errorAlert).toBeInTheDocument();
            expect(errorAlert).toHaveTextContent(/Corrigez les erreurs/i);
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  test("verify closing error Snackbar message", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var firstName, lastName, email, dob, city, postalCode, submitButton, closeButton;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
          // Remplir le formulaire avec des données invalides
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Soumettre le formulaire pour déclencher l'erreur
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Attendre l'affichage de l'alerte d'erreur
          _context4.next = 17;
          return (0, _react2.waitFor)(function () {
            var errorAlert = _react2.screen.getByRole("alert");
            expect(errorAlert).toBeInTheDocument();
          });
        case 17:
          // Fermer la notification d'erreur
          closeButton = _react2.screen.getAllByRole("button", {
            name: /close/i
          })[0];
          _react2.fireEvent.click(closeButton);

          // Vérifier que la notification d'erreur est fermée
          _context4.next = 21;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByRole("alert")).not.toBeInTheDocument();
          });
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  test("verify field errors are cleared when field value becomes valid", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var firstName, lastName, email, dob, pastDate, formattedPastDate, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir tous les champs avec des valeurs (certaines invalides)
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - 20);
          formattedPastDate = pastDate.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedPastDate
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Soumettre le formulaire pour déclencher l'affichage des erreurs
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Attendre que les erreurs s'affichent
          _context5.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
          });
        case 20:
          // Corriger le champ firstName
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });

          // Vérifier que l'erreur a disparu
          _context5.next = 23;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Le champ nom ne doit contenir que des lettres/i)).not.toBeInTheDocument();
          });
        case 23:
          // Pour tester l'email, d'abord le rendre invalide
          _react2.fireEvent.change(email, {
            target: {
              value: "invalid-email"
            }
          });

          // Soumettre à nouveau pour afficher l'erreur d'email
          _react2.fireEvent.click(submitButton);
          _context5.next = 27;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
          });
        case 27:
          // Corriger l'email
          _react2.fireEvent.change(email, {
            target: {
              value: "valid@example.com"
            }
          });

          // Vérifier que l'erreur d'email a disparu
          _context5.next = 30;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Invalide champs email/i)).not.toBeInTheDocument();
          });
        case 30:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  test("verify age calculation and validation", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var firstName, lastName, email, city, postalCode, dob, futureDate, formattedFutureDate, submitButton, pastDate, formattedPastDate;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir les champs requis pour pouvoir soumettre
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Test avec un âge inférieur à 18 ans
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          futureDate = new Date();
          futureDate.setFullYear(futureDate.getFullYear() - 10); // 10 ans
          formattedFutureDate = futureDate.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedFutureDate
            }
          });

          // Soumettre pour afficher l'erreur
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);
          _context6.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
          });
        case 20:
          // Test avec un âge supérieur à 18 ans
          pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - 20); // 20 ans
          formattedPastDate = pastDate.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedPastDate
            }
          });

          // Vérifier que l'erreur disparaît
          _context6.next = 26;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Vous devez avoir plus de 18 ans/i)).not.toBeInTheDocument();
          });
        case 26:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  test("verify postal code validation", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var firstName, lastName, email, dob, pastDate, formattedPastDate, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir les champs requis pour pouvoir soumettre
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - 20);
          formattedPastDate = pastDate.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedPastDate
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });

          // Test avec un code postal invalide
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "1234"
            }
          }); // trop court

          // Soumettre pour afficher l'erreur
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);
          _context7.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
          });
        case 20:
          // Test avec des lettres
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "ABCDE"
            }
          });
          _react2.fireEvent.click(submitButton);
          _context7.next = 24;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
          });
        case 24:
          // Test avec un code postal valide
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Vérifier que l'erreur disparaît
          _context7.next = 27;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Le code postale doit être au format français/i)).not.toBeInTheDocument();
          });
        case 27:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));

  // Ajoutez ce test pour vérifier la validation de la ville
  test("verify city validation", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var firstName, lastName, email, dob, pastDate, formattedPastDate, postalCode, city, submitButton;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir les champs requis pour pouvoir soumettre
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - 20);
          formattedPastDate = pastDate.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedPastDate
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Test avec une ville invalide
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris123"
            }
          }); // Ville avec chiffres

          // Soumettre pour afficher l'erreur
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);
          _context8.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ ville ne doit contenir que des lettres/i)).toBeInTheDocument();
          });
        case 20:
          // Test avec une ville valide
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });

          // Vérifier que l'erreur disparaît
          _context8.next = 23;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Le champ ville ne doit contenir que des lettres/i)).not.toBeInTheDocument();
          });
        case 23:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));

  // Test pour vérifier le reset du formulaire avec un champ firstName invalide
  test("verify form reset with invalid firstName", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir les champs avec firstName invalide
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Soumettre le formulaire
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Attendre l'erreur
          _context9.next = 17;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByRole("alert")).toBeInTheDocument();
          });
        case 17:
          // Corriger firstName et soumettre à nouveau
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          _react2.fireEvent.click(submitButton);

          // Vérifier succès
          _context9.next = 21;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
          });
        case 21:
          // Vérifier le reset
          expect(firstName.value).toBe("");
          expect(lastName.value).toBe("");
          expect(email.value).toBe("");
          expect(dob.value).toBe("");
          expect(city.value).toBe("");
          expect(postalCode.value).toBe("");
        case 27:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));

  // Test pour vérifier le cas où tous les champs sont vides
  test("verify form with all fields empty", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

    // Vérifier que tous les champs sont vides par défaut
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    var lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    var email = _react2.screen.getByTestId("email").querySelector("input");
    var dob = _react2.screen.getByTestId("dob").querySelector("input");
    var city = _react2.screen.getByTestId("city").querySelector("input");
    var postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(dob.value).toBe("");
    expect(city.value).toBe("");
    expect(postalCode.value).toBe("");

    // Vérifier que le bouton Submit est désactivé
    var submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  // Test pour vérifier le cas où l'utilisateur remplit certains champs puis les vide
  test("verify form with fields filled then emptied", function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

    // Remplir un champ
    var firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    expect(firstName.value).toBe("Jean");

    // Vider le champ
    _react2.fireEvent.change(firstName, {
      target: {
        value: ""
      }
    });
    expect(firstName.value).toBe("");

    // Vérifier que le bouton Submit est désactivé
    var submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  // Test pour vérifier handleFirstNameChange avec validation d'entrée
  test("verify handleFirstNameChange with valid and invalid input", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir tous les champs pour pouvoir soumettre
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          email = _react2.screen.getByTestId("email").querySelector("input");
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          city = _react2.screen.getByTestId("city").querySelector("input");
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input"); // Remplir avec des valeurs valides
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Entrer une valeur invalide pour firstName
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });

          // Soumettre pour déclencher la validation
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Vérifier que l'erreur est affichée
          _context10.next = 17;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
          });
        case 17:
          // Corriger avec une valeur valide
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });

          // Vérifier que l'erreur a disparu
          _context10.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Le champ nom ne doit contenir que des lettres/i)).not.toBeInTheDocument();
          });
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));

  // Test pour vérifier handleLastNameChange avec validation d'entrée
  test("verify handleLastNameChange with valid and invalid input", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir tous les champs pour pouvoir soumettre
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          email = _react2.screen.getByTestId("email").querySelector("input");
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          city = _react2.screen.getByTestId("city").querySelector("input");
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input"); // Remplir avec des valeurs valides
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Entrer une valeur invalide pour lastName
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont123"
            }
          });

          // Soumettre pour déclencher la validation
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Vérifier que l'erreur est affichée
          _context11.next = 17;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ prenom ne doit contenir que des lettres/i)).toBeInTheDocument();
          });
        case 17:
          // Corriger avec une valeur valide
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });

          // Vérifier que l'erreur a disparu
          _context11.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.queryByText(/Le champ prenom ne doit contenir que des lettres/i)).not.toBeInTheDocument();
          });
        case 20:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));

  // Test pour vérifier la gestion des erreurs multiples
  test("verify handling of multiple errors simultaneously", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var firstName, lastName, email, dob, city, postalCode, today, formattedDate, submitButton, pastDate, formattedPastDate;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir tous les champs avec des valeurs invalides
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          email = _react2.screen.getByTestId("email").querySelector("input");
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          city = _react2.screen.getByTestId("city").querySelector("input");
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont456"
            }
          });
          _react2.fireEvent.change(email, {
            target: {
              value: "invalid-email"
            }
          });
          today = new Date();
          today.setFullYear(today.getFullYear() - 10); // 10 ans
          formattedDate = today.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedDate
            }
          });
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris123"
            }
          });
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "ABCDE"
            }
          });

          // Soumettre pour déclencher toutes les validations
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Vérifier que toutes les erreurs sont affichées
          _context12.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
            expect(_react2.screen.getByText(/Le champ prenom ne doit contenir que des lettres/i)).toBeInTheDocument();
            expect(_react2.screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
            expect(_react2.screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
            expect(_react2.screen.getByText(/Le champ ville ne doit contenir que des lettres/i)).toBeInTheDocument();
            expect(_react2.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
          });
        case 20:
          // Corriger tous les champs
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          pastDate = new Date();
          pastDate.setFullYear(pastDate.getFullYear() - 20); // 20 ans
          formattedPastDate = pastDate.toISOString().split("T")[0];
          _react2.fireEvent.change(dob, {
            target: {
              value: formattedPastDate
            }
          });
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Soumettre à nouveau
          _react2.fireEvent.click(submitButton);

          // Vérifier que le message de succès s'affiche
          _context12.next = 32;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
          });
        case 32:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));

  // Test pour vérifier submitted state et error message persistance
  test("verify error message persistence after submission", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir les champs avec une valeur invalide
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean123"
            }
          });
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          email = _react2.screen.getByTestId("email").querySelector("input");
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          city = _react2.screen.getByTestId("city").querySelector("input");
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Soumettre le formulaire
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Vérifier que l'erreur est affichée
          _context13.next = 17;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
          });
        case 17:
          // Ne pas corriger le champ, mais soumettre à nouveau
          _react2.fireEvent.click(submitButton);

          // Vérifier que l'erreur est toujours affichée
          _context13.next = 20;
          return (0, _react2.waitFor)(function () {
            expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
          });
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));

  // Test pour vérifier le comportement des cases vides après reset
  test("verify empty fields after reset", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var firstName, lastName, email, dob, city, postalCode, submitButton;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));

          // Remplir tous les champs
          firstName = _react2.screen.getByTestId("nom").querySelector("input");
          lastName = _react2.screen.getByTestId("prenom").querySelector("input");
          email = _react2.screen.getByTestId("email").querySelector("input");
          dob = _react2.screen.getByTestId("dob").querySelector("input");
          city = _react2.screen.getByTestId("city").querySelector("input");
          postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
          _react2.fireEvent.change(firstName, {
            target: {
              value: "Jean"
            }
          });
          _react2.fireEvent.change(lastName, {
            target: {
              value: "Dupont"
            }
          });
          _react2.fireEvent.change(email, {
            target: {
              value: "jean.dupont@example.com"
            }
          });
          _react2.fireEvent.change(dob, {
            target: {
              value: "2000-01-01"
            }
          });
          _react2.fireEvent.change(city, {
            target: {
              value: "Paris"
            }
          });
          _react2.fireEvent.change(postalCode, {
            target: {
              value: "75001"
            }
          });

          // Soumettre le formulaire
          submitButton = _react2.screen.getByText(/Submit/i);
          _react2.fireEvent.click(submitButton);

          // Vérifier que le formulaire est réinitialisé
          _context14.next = 17;
          return (0, _react2.waitFor)(function () {
            expect(firstName.value).toBe("");
            expect(lastName.value).toBe("");
            expect(email.value).toBe("");
            expect(dob.value).toBe("");
            expect(city.value).toBe("");
            expect(postalCode.value).toBe("");
            expect(submitButton).toBeDisabled(); // Le bouton doit être désactivé après réinitialisation
          });
        case 17:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  })));
});