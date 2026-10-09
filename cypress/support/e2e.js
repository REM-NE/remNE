// Comando para criar usuário de teste no Auth Emulator
Cypress.Commands.add("createTestUser", () => {
  const emulatorUrl = "http://localhost:9099";

  return cy.request({
    method: "POST",
    url: `${emulatorUrl}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key`,
    body: {
      email: "admin@teste.com",
      password: "teste123",
      returnSecureToken: true,
    },
    failOnStatusCode: false,
  });
});

// Comando para limpar dados do Firestore Emulator
Cypress.Commands.add("clearFirestore", () => {
  return cy.request({
    method: "DELETE",
    url: "http://localhost:8080/emulator/v1/projects/rem-ne/databases/(default)/documents",
    failOnStatusCode: false,
  });
});

// Comando para limpar usuários do Auth Emulator
Cypress.Commands.add("clearAuth", () => {
  return cy.request({
    method: "DELETE",
    url: "http://localhost:9099/emulator/v1/projects/rem-ne/accounts",
    failOnStatusCode: false,
  });
});

// Comando para fazer login via UI
Cypress.Commands.add("loginViaUI", (email = "admin@teste.com", password = "teste123") => {
  cy.visit("/auth/login");
  cy.get('input[name="login"]', { timeout: 10000 }).should("be.visible").type(email);
  cy.get('input[name="senha"]').type(password);
  cy.get(".authButton").click();
  cy.url({ timeout: 15000 }).should("eq", Cypress.config().baseUrl + "/");
});

// Comando para fazer logout limpando estado do navegador
Cypress.Commands.add("logout", () => {
  cy.window().then((win) => {
    win.sessionStorage.clear();
    win.localStorage.clear();
  });
  cy.window().then((win) => {
    if (win.indexedDB) {
      win.indexedDB.databases().then((dbs) => {
        dbs.forEach((dbInfo) => {
          win.indexedDB.deleteDatabase(dbInfo.name);
        });
      });
    }
  });
});

// Suprimir erros não capturados do app 
Cypress.on("uncaught:exception", () => false);
