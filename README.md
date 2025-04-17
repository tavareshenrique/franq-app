<h1 align="center">
  <img alt="Daily Diet API" title="Daily Diet API" src="https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/franq-app.png" width="350px" />
</h1>

<div align="center">
  <a href="/README.md">🇺🇸 English</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/README-ptBR.md">🇧🇷 Portuguese</a>
</div>

# 📈 Franq App

Franq App is an application developed using NextJS that consumes the [HG Brasil](https://hgbrasil.com/status/finance/) API to display information about the financial market, such as stock and currency quotes.

> ⚠️ It is important to highlight that the HG Brasil API is paid, and has limitations in the free version, therefore, the tracking data is mocked.

## 👨‍💻 How to Run the Project

### Initial Steps

Clone the repository and install the dependencies:

```shell
git clone https://github.com/tavareshenrique/franq-app.git

cd franq-app
```

```shell
pnpm install
```

> If you don't have pnpm installed, you can install it globally with the command below:

```bash
npm install -g pnpm
```

### Using Docker

```shell
docker-compose up --build
```

> The `--build` flag is used only for the first execution, afterwards, you can just use `docker-compose up`.

### Manual Execution

Run the application with the command below:

```shell
pnpm dev
```

### Access

If everything went well, the application will be available at:

> Application: http://localhost:3000

## 🚀 Features

Below are some features implemented in the project.

> The demonstration GIFs may reduce the screen quality and do not reflect the actual project quality.

### Login/Register

#### Create Account and Login

![Login-Register](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/02.gif)

### Dashboard

#### View Stock and Currency Quotes and Favorite Them

![Dash](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/01.gif)

### Admin

#### View and Edit User Information

![Admin](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/03.gif)

### Responsiveness

The layout adapts to different screen sizes.

<table>
  <tr>
    <td><img alt="Dashboard" title="Dashboard" src="https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/mob-auth.gif" width="300px"  /></td>
    <td><img alt="Dashboard" title="Dashboard" src="https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/mob-dash.gif" width="300px" /></td>
  </tr>
</table>

### Docker

Added Docker support to simplify execution.

### PNPM

PNPM used for efficient dependency management.

## 🧪 Tests

### Unit Tests

Using [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) to ensure code quality.

![Unit Tests](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/e2e.png)

### E2E Tests

Using [Playwright](https://playwright.dev/) for end-to-end testing.

![E2E Tests](https://raw.githubusercontent.com/tavareshenrique/franq-app/refs/heads/main/public/previews/unit-test.png)

### Running Tests Locally

Unit Tests:

```shell
pnpm test
```

E2E Tests via GUI:

```shell
pnpm test:e2e:ui
```

E2E Tests via CLI:

```shell
pnpm test:e2e
```

## 🔄 CI/CD

### CI

Implemented CI with GitHub Actions to ensure code quality using [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/).

> See an example [here](https://github.com/tavareshenrique/franq-app/actions/runs/14505494415).

### CD

Implemented CD using [Vercel](https://vercel.com/) to deploy the application after any commit to the `main` branch.

> Application link: https://franq-app.vercel.app

## ⚙️ Technologies Used

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Author


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