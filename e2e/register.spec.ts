import { test, expect, } from '@playwright/test';

import { faker } from "@faker-js/faker"

import { makeUser } from "./helpers/make-user";

test('should register a user', async ({ page }) => {
  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  await makeUser(page, user);

  await expect(page.locator('span').filter({ hasText: `Olá, ${user.name}!`})).toBeVisible();
});