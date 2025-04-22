import { Page } from '@playwright/test';

type UserData = {
  name: string;
  email: string;
  password: string;
};

export async function makeUser(page: Page, user: UserData) {
  await page.goto('http://localhost:3000');

  await page.getByRole('tab', { name: 'Cadastro' }).click();

  await page.getByRole('textbox', { name: 'Nome' }).fill(user.name);
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Senha', exact: true }).fill(user.password);
  await page.getByRole('textbox', { name: 'Confirmar Senha' }).fill(user.password);

  await Promise.all([
    page.waitForURL(/\/dashboard/),
    page.getByRole('button', { name: 'Criar conta' }).click(),
  ]);
}
