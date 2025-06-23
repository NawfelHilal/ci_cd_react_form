// ... existing code ...
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { firstName: "Jean", lastName: "Dupont", email: "jean@ex.com" },
          { firstName: "Marie", lastName: "Curie", email: "marie@ex.com" },
          { firstName: "Ada", lastName: "Lovelace", email: "ada@ex.com" },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

// Pour les tests d'erreur, override le mock :
// global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));
// ... existing code ...
