# 📘 REM-NE

> Site do projeto REM-NE

---

## 📑 Sumário

- [Sobre](#sobre)
- [Mockups](#mockups)
- [Nossa Equipe](#nossa-equipe)
- [Tecnologias](#tecnologias)
- [Desenvolvimento Local](#desenvolvimento-local)
  - [Repositório](#repositório)
    - [Clonar uma branch específica](#clonar-uma-branch-específica)
  - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Como utilizar suas próprias chaves secretas](#como-utilizar-suas-próprias-chaves-secretas)
  - [Instalando pacotes](#instalando-pacotes)
  - [Desenvolvendo](#desenvolvendo)
- [Testes](#testes)
  - [Testes unitários](#testes-unitários)
  - [Testes E2E e de segurança](#testes-e2e-e-de-segurança)
- [Requisitos Funcionais e Não-Funcionais](#requisitos-funcionais-e-não-funcionais)

---

## Sobre

> O projeto visa criar uma plataforma de referência para quem deseja informações relacionadas a ensino de matemática na região Nordeste do Brasil, reunindo eventos, notícias e publicações em um único ambiente virtual.

---

## Mockups
---

## Nossa Equipe

| Nome         | Cargo         | 
|--------------|---------------|
| Paulo Magalhães   | Líder do projeto |
| Dênis Rocha  | Desenvolvedor |
| Samuel Anderson  | Desenvolvedor |
| Lucas Toshio  | Designer |

---

## Tecnologias

- Node.js
- React.js
- Typescript
- Firebase
---

## Desenvolvimento Local

> Tenha certeza de ter o Node.js instalado.

### Repositório

Clone esse repositório localmente (ou crie seu próprio fork):

```bash
git clone https://github.com/REM-NE/remNE.git
```

> **OBS:** A branch mais atualizada do repositório é a [dev](https://github.com/REM-NE/remNE/tree/dev). Porém, a [main](https://github.com/REM-NE/remNE/tree/main) terá sempre a versão mais estável do projeto e será sempre a versão de produção.

### Variáveis de ambiente

Projeto no firebase ainda não foi criado.

### Instalando pacotes

Em seguida instale os pacotes do projeto:

```bash
npm i
```

### Desenvolvendo
Nosso projeto utiliza React.js e foi inicializado com create-react-app

Agora, inicialize o servidor:

```bash
npm start
```

Abra http://localhost:3000 no seu navegador e veja o resultado.
Você pode editar as páginas na pasta src/. As páginas atualizam conforme as edita.

## Testes

O projeto tem dois tipos de teste: **unitários** (testam funções isoladas) e **E2E** (simulam um usuário no navegador).

### Testes unitários

Testam as funções do controller (`src/cotrollers/firebaseCollections.js`) sem precisar do Firebase real.

Pra executar basta:

```bash
npm test
```

Só isso. Não precisa de nenhum serviço rodando.

### Testes E2E e de segurança

Simulam um usuário navegando pelo site. Precisam de 3 coisas rodando ao mesmo tempo:

**1. Instalar o Firebase CLI** (só na primeira vez):

```bash
npm install -g firebase-tools
```

> Precisa ter o Java 21+ instalado.

**2. Subir os emuladores do Firebase:**

```bash
firebase emulators:start --only auth,firestore
```

Isso cria um banco de dados e autenticação temporários nas nossas máquinas pra executarmos os testes.

**3. Em outro terminal, subir o app conectado aos emuladores:**

> No Windows (CMD): `set REACT_APP_USE_EMULATORS=true && npm start`
> No Windows (PowerShell): `$env:REACT_APP_USE_EMULATORS="true"; npm start`

**4. Em outro terminal, rodar os testes:**

```bash
npx cypress run
```

Para ver os testes rodando no navegador (modo interativo):

```bash
npx cypress open
```

Depois selecione **E2E Testing** > escolha o navegador > clique em **admin.cy.js**.

---

## Requisitos Funcionais e Não-Funcionais
Acesse a tabela nesse link: [Tabela de Requisitos](https://app.clickup.com/90131889362/v/l/li/901315745808?pr=90137960275)
