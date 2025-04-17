import { test, expect, } from '@playwright/test';

import { faker } from "@faker-js/faker"

import { makeUser } from "./helpers/make-user";

test('should login a user', async ({ page }) => {
  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  await makeUser(page, user);

  await expect(page.locator('span').filter({ hasText: `Olá, ${user.name}!`})).toBeVisible();

  await page.getByRole('button', { name: 'Sair' }).click();

  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Senha' }).fill(user.password);

  await page.getByRole('button', { name: 'Entrar' }).click();

  await page.waitForURL('**/dashboard', { timeout: 5000 }),

  await expect(page.locator('span').filter({ hasText: `Olá, ${user.name}!`})).toBeVisible();
});