import { test, expect, } from '@playwright/test';

import { faker } from "@faker-js/faker"

import { makeUser } from "./helpers/make-user";

test('should select a currency', async ({ page }) => {
  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  await makeUser(page, user);

  await page.getByRole('heading', { name: 'Dollar', exact: true }).click();

  await expect(page.locator('div').filter({ hasText: /^Dollar$/ })).toBeVisible();
});

test('should select a currency and add to favorites', async ({ page }) => {
  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  await makeUser(page, user);

  await page.getByRole('heading', { name: 'Dollar', exact: true }).click();

  await expect(page.locator('div').filter({ hasText: /^Dollar$/ })).toBeVisible();

  await page.getByTestId('favorite-button-USD').click();

  await page.getByRole('button', { name: 'Favoritos', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Dollar' })).toBeVisible();
});