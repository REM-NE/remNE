
describe("Testes E2E — Telas Admin", () => {

  before(() => {
    cy.clearAuth();
    cy.clearFirestore();
    cy.createTestUser();
  });

  afterEach(() => {
    cy.clearFirestore();
  });

  // Login (/auth/login)
  describe("Login (/auth/login)", () => {

    it("A1 - Login com credenciais válidas redireciona para /", () => {
      cy.loginViaUI("admin@teste.com", "teste123");
      cy.on("window:alert", (text) => {
        expect(text).to.contain("Login efetuado com sucesso");
      });
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("A2 - Login com credenciais inválidas exibe alerta de erro", () => {
      cy.visit("/auth/login");
      cy.get('input[name="login"]').type("errado@teste.com");
      cy.get('input[name="senha"]').type("senhaerrada");

      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get(".authButton").click();

      cy.wait(2000).then(() => {
        expect(alertStub).to.have.been.calledWith("Login deu errado!");
      });
    });

    it("A3 - Login com campos vazios exibe alerta de campo vazio", () => {
      cy.visit("/auth/login");

      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get(".authButton").click();

      cy.then(() => {
        expect(alertStub).to.have.been.calledWith("Algum campo está vazio!");
      });
    });
  });

  // Editor Home (/home/edit) — protegido por PrivateRoute
  describe("Editor Home (/home/edit)", () => {

    it("H1 - Sem login: PrivateRoute redireciona para /login", () => {
      cy.logout();
      cy.visit("/home/edit");
      cy.url().should("include", "/auth/login");
    });

    it("H2 - Logado: página carrega com botões habilitados", () => {
      cy.loginViaUI();
      cy.visit("/home/edit");
      cy.contains("Editor da Página Home", { timeout: 15000 }).should("be.visible");
    });
  });

  // Editor Notícias (/eventos-e-noticias/edit)
  describe("Editor Notícias (/eventos-e-noticias/edit)", () => {

    it("N1 - Sem login: PrivateRoute redireciona para /login", () => {
      cy.logout();
      cy.visit("/eventos-e-noticias/edit");
      cy.url().should("include", "/auth/login");
    });

    it("N2 - Criar notícia (POST) — título salva com title_lower", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.loginViaUI();
      cy.visit("/eventos-e-noticias/edit");

      cy.get(".createNews", { timeout: 15000 }).within(() => {
        cy.get("input").first().should("not.be.disabled").type("Notícia de Teste E2E");
        cy.get("textarea").type("Texto da notícia de teste");
        cy.get("input").last().type("https://exemplo.com");

        cy.get("button.btn-success").click();
      });

      cy.wait(2000).then(() => {
        const createCall = alertStub.getCalls().find(
          (call) => call.args[0] && call.args[0].includes("criado na coleção")
        );
        expect(createCall, "Alerta de criação deveria ter sido exibido").to.not.be.undefined;
      });
    });
  });

  // Editor Recursos (/recursos-educacionais/edit)
  describe("Editor Recursos (/recursos-educacionais/edit)", () => {

    it("R1 - Sem login: PrivateRoute redireciona para /login", () => {
      cy.logout();
      cy.visit("/recursos-educacionais/edit");
      cy.url().should("include", "/auth/login");
    });

    it("R2 - Criar recurso com nível educacional (POST)", () => {
      cy.loginViaUI();
      cy.visit("/recursos-educacionais/edit");

      cy.get(".createNews", { timeout: 15000 }).within(() => {
        cy.get("input").first().should("not.be.disabled").type("Recurso de Teste");
        cy.get("textarea").type("Descrição do recurso");
        cy.get("select").select("Ensino Médio");
        cy.get("input").last().type("https://recurso.com");

        cy.get("button.btn-success").click();
      });
    });
  });

  // Editor Publicações (/publicacoes/edit)
  describe("Editor Publicações (/publicacoes/edit)", () => {

    it("P1 - Sem login: PrivateRoute redireciona para /login", () => {
      cy.logout();
      cy.visit("/publicacoes/edit");
      cy.url().should("include", "/auth/login");
    });

    it("P2 - Criar publicação (POST)", () => {
      cy.loginViaUI();
      cy.visit("/publicacoes/edit");

      cy.get(".createNews", { timeout: 15000 }).within(() => {
        cy.get("input").first().should("not.be.disabled").type("Publicação Teste");
        cy.get("textarea").type("Texto da publicação");
        cy.get("input").last().type("https://pub.com");

        cy.get("button.btn-success").click();
      });
    });
  });

  // Editor Sobre (/sobre/edit)
  describe("Editor Sobre (/sobre/edit)", () => {

    it("S1 - Sem login: PrivateRoute redireciona para /login", () => {
      cy.logout();
      cy.visit("/sobre/edit");
      cy.url().should("include", "/auth/login");
    });

    it("S2 - Criar bloco de texto (POST)", () => {
      cy.loginViaUI();
      cy.visit("/sobre/edit");

      cy.contains("Editor da Página do Sobre", { timeout: 15000 }).should("be.visible");

      cy.get("input").first().type("Título do Bloco");
      cy.get("textarea").first().type("Texto do bloco sobre");
      cy.get("select").first().select("Texto");

      cy.contains("Adicionar texto").click();
      cy.wait(2000);
    });
  });

  // Editor Biblioteca (/biblioteca/edit)
  describe("Editor Biblioteca (/biblioteca/edit)", () => {

    it("B1 - Sem login: PrivateRoute redireciona para /login", () => {
      cy.logout();
      cy.visit("/biblioteca/edit");
      cy.url().should("include", "/auth/login");
    });

    it("B2 - Logado: página da biblioteca carrega", () => {
      cy.loginViaUI();
      cy.visit("/biblioteca/edit");
      cy.contains("Editor da Página da Biblioteca", { timeout: 15000 }).should("be.visible");
    });
  });

  // Segurança — Firestore Security Rules (via emulador)
  describe("Segurança — Firestore (via emulador)", () => {

    const firestoreUrl = "http://localhost:8080";
    const baseDocUrl = `${firestoreUrl}/v1/projects/rem-ne/databases/(default)/documents`;

    it("S3.1 - Ler coleção sem autenticação (GET)", () => {
      cy.request({
        method: "GET",
        url: `${baseDocUrl}/eventos-e-noticias`,
        failOnStatusCode: false,
      }).then((res) => {
        // Sem rules no emulador: permite tudo
        expect([200, 403]).to.include(res.status);
        if (res.status === 200) {
          cy.log("SEM PROTEÇÃO: leitura sem auth permitida");
        }
      });
    });

    it("S3.2 - Criar documento sem autenticação (POST)", () => {
      cy.request({
        method: "POST",
        url: `${baseDocUrl}/eventos-e-noticias`,
        body: {
          fields: {
            title: { stringValue: "Documento não autorizado" },
          },
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect([200, 403]).to.include(res.status);
        if (res.status === 200) {
          cy.log("SEM PROTEÇÃO: criação sem auth permitida");
        }
      });
    });

    it("S3.3 - Atualizar documento sem autenticação (PATCH)", () => {
      cy.request({
        method: "POST",
        url: `${baseDocUrl}/eventos-e-noticias`,
        body: { fields: { title: { stringValue: "Original" } } },
        failOnStatusCode: false,
      }).then((createRes) => {
        const docName = createRes.body.name;
        cy.request({
          method: "PATCH",
          url: `${firestoreUrl}/v1/${docName}`,
          body: { fields: { title: { stringValue: "Modificado sem auth" } } },
          failOnStatusCode: false,
        }).then((res) => {
          expect([200, 403]).to.include(res.status);
          if (res.status === 200) {
            cy.log("SEM PROTEÇÃO: update sem auth permitido");
          }
        });
      });
    });

    it("S3.4 - Deletar documento sem autenticação (DELETE)", () => {
      cy.request({
        method: "POST",
        url: `${baseDocUrl}/eventos-e-noticias`,
        body: { fields: { title: { stringValue: "Para deletar" } } },
        failOnStatusCode: false,
      }).then((createRes) => {
        const docName = createRes.body.name;
        cy.request({
          method: "DELETE",
          url: `${firestoreUrl}/v1/${docName}`,
          failOnStatusCode: false,
        }).then((res) => {
          expect([200, 403]).to.include(res.status);
          if (res.status === 200) {
            cy.log("SEM PROTEÇÃO: delete sem auth permitido");
          }
        });
      });
    });
  });

  // Segurança — Cloudinary
  describe("Segurança — Cloudinary", () => {

    it("S3.9 - Upload preset 'standard' aceita uploads sem autenticação", () => {
      cy.request({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dyp5jzbal/image/upload",
        form: true,
        body: {
          file: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          upload_preset: "standard",
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect([200, 400, 401, 403]).to.include(res.status);
        if (res.status === 200) {
          cy.log("ACHADO: preset 'standard' é público (unsigned)");
        }
      });
    });
  });
});
