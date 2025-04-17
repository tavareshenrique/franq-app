<h1 align="center">
  <img alt="Daily Diet API" title="Daily Diet API" src="https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/franq-app.png" width="350px" />
</h1>

<div align="center">
  <a href="/README.md">🇺🇸 English</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/README-ptBR.md">🇧🇷 Portuguese</a>
</div>

# 📈 Franq App

Franq App é uma aplicação desenvolvida usando NextJS que consome a API da [HG Brasil](https://hgbrasil.com/status/finance/) para exibir informações sobre o mercado financeiro, como cotações de ações e moedas.

> ⚠️ É importante destacar que a API da HG Brasil é paga e possui limitações na versão gratuita, portanto, os dados de rastreamento são simulados.


## 👨‍💻 Como rodar o projeto?

### Passos Iniciais

Clone o repositório e instale as dependências:

```shell
git clone https://github.com/tavareshenrique/franq-app.git

cd franq-app
```

```shell
pnpm install
```

> Se você não tiver o pnpm instalado, pode instalá-lo globalmente com o comando abaixo:

```bash
npm install -g pnpm
```

### Usando Docker

```shell
docker-compose up --build
```

> A flag `--build` é usada apenas na primeira execução, depois disso, você pode usar apenas `docker-compose up`.

### Execução Manualmente

Execute a aplicação com o comando abaixo:

```shell
pnpm dev
```

### Acesse

Se tudo correu bem, a aplicação estará disponível em:

> Aplicação: http://localhost:3000

## 🚀 Features

Abaixo estão algumas funcionalidades implementadas no projeto.

> Os GIFs de demonstração podem reduzir a qualidade da tela e não refletem a qualidade real do projeto.

### Login/Cadastro

#### Criando Conta e Logando

![Login-Register](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/02.gif)

### Dashboard

#### Visualizar Cotações de Ações e Moedas e Favoritá-las

![Dash](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/01.gif)

### Admin

#### Visualizar e Editar Informações do Usuário

![Admin](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/03.gif)

### Responsividade

O layout se adapta a diferentes tamanhos de tela.

<table>
  <tr>
    <td><img alt="Dashboard" title="Dashboard" src="https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/mob-auth.gif" width="300px"  /></td>
    <td><img alt="Dashboard" title="Dashboard" src="https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/mob-dash.gif" width="300px" /></td>
  </tr>
</table>

### Docker

Adicionado suporte ao Docker para simplificar a execução.

### PNPM

PNPM utilizado para gerenciamento eficiente de dependências.

## 🧪 Testes

### Testes Unitários

Usando [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/) para garantir a qualidade do código.

![Unit Tests](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/e2e.png)

### Testes E2E

Usando [Playwright](https://playwright.dev/) para testes de ponta a ponta.

![E2E Tests](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/unit-test.png)

### Executando Testes Localmente

Testes Unitários:

```shell
pnpm test
```

Testes E2E GUI:

```shell
pnpm test:e2e:ui
```

E2E via CLI:

```shell
pnpm test:e2e
```

## 🔄 CI/CD

### CI
Implementado CI com GitHub Actions para garantir a qualidade do código usando [Vitest](https://vitest.dev/) e [Playwright](https://playwright.dev/).

> Veja um exemplo [aqui](https://github.com/tavareshenrique/franq-app/actions/runs/14505494415).

### CD

Implementado CD usando [Vercel](https://vercel.com/) para implantar a aplicação após qualquer commit na branch `main`.

> Link da Aplicação: https://franq-app.vercel.app

## ⚙️ Tecnologias Usadas

* [Typescript](https://www.typescriptlang.org/) – v5
* [React](https://react.dev/) – v19
* [Next.js](https://nextjs.org/) – v15.2.4
* [Axios](https://github.com/axios/axios)
* [Tailwind CSS](https://tailwindcss.com/) – v3.4.17
* [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate) – v1.0.7
* [Tailwind Variants](https://tailwindvariants.org/)
* [Tailwind Merge](https://github.com/dcastil/tailwind-merge) – v2.5.5
* [Radix UI](https://www.radix-ui.com/)
  * [@radix-ui/react-label](https://www.radix-ui.com/docs/primitives/components/label) – v2.1.1  
  * [@radix-ui/react-slot](https://www.radix-ui.com/docs/primitives/components/slot) – v1.1.1  
  * [@radix-ui/react-tabs](https://www.radix-ui.com/docs/primitives/components/tabs) – v1.1.2  
  * [@radix-ui/react-toast](https://www.radix-ui.com/docs/primitives/components/toast) – v1.2.4
* [React Hook Form](https://react-hook-form.com/)
* [Zod](https://github.com/colinhacks/zod)
* [TanStack Query](https://tanstack.com/query/latest)
* [Lucide React](https://lucide.dev/) – v0.454.0
* [React Lottie Player](https://github.com/mifi/react-lottie-player)
* [React Modal Sheet](https://github.com/gerhardberger/react-modal-sheet)
* [Next.js Top Loader](https://github.com/JoseRFelix/nextjs-toploader)
* [Class Variance Authority (CVA)](https://cva.style/) – v0.7.1
* [Clsx](https://github.com/lukeed/clsx) – v2.1.1
* [Crypto-JS](https://github.com/brix/crypto-js)
* [Chart.js](https://www.chartjs.org/) – v4.4.9
* [React Chart.js 2](https://react-chartjs-2.js.org/) – v5.3.0
* [Testing Library DOM](https://github.com/testing-library/dom-testing-library) – v10.4.0
* [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/) – v16.3.0
* [Jest DOM](https://github.com/testing-library/jest-dom) – v6.6.3
* [Vitest](https://vitest.dev/) – v3.1.1
* [Playwright](https://playwright.dev/) – v1.51.1
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Vite](https://vitejs.dev/) – v6.3.0
* [Vite TSConfig Paths](https://github.com/aleclarson/vite-tsconfig-paths)
* [@vitejs/plugin-react](https://vitejs.dev/plugins/) – v4.4.0
* [JSdom](https://github.com/jsdom/jsdom) – v26.1.0
* [Faker](https://fakerjs.dev/)

## 📝 Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙋‍♂️ Autor


<table>
  <tr>
    <td align="center">
      <a href="http://github.com/tavareshenrique/">
        <img src="https://avatars1.githubusercontent.com/u/27022914?v=4" width="100px;" alt="Henrique Tavares"/>
        <br />
        <sub>
          <b>Henrique Tavares</b>
        </sub>
       </a>
       <br />
       <a href="https://www.linkedin.com/in/tavareshenrique/" title="Linkedin">@tavareshenrique</a>
       <br />
       <a href="https://github.com/tavareshenrique/magalu-heroes/commits?author=tavareshenrique" title="Code">
        💻
       </a>
    </td>
  </tr>
</table>