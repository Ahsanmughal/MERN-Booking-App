import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "SignIn"}).click();

  await expect(page.getByRole("heading", {name: "Sign-In"})).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");

  await page.locator("[name=password]").fill("apple123");

  await page.getByRole("button", {name: "SignIn"}).click();

  await expect(page.getByText("Sign In Succesful")).toBeVisible();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign-Out"})).toBeVisible();

});


test("should allow user to register", async({page}) => {

  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "SignIn"}).click();

  await page.getByRole("link", {name: "Create an account here"}).click();

  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("Farhan");

  await page.locator("[name=lastName]").fill("Ali");

  await page.locator("[name=email]").fill(testEmail);

  await page.locator("[name=password]").fill("apple123");

  await page.locator("[name=confirmPassword]").fill("apple123");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registeration success")).toBeVisible();
})