import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageObjects/LoginPage";

test("purchase an item", async ({ page }) => {
  await page.goto(process.env.URL);

  const loginPage = new LoginPage(page);

  await loginPage.loginWithCredentials("standard_user", "secret_sauce");

  const items = await page
    .locator("#inventory_container  .inventory_item")
    .all();
  const randomindex = Math.floor(Math.random() * items.length);
  const index = items[randomindex];
  const expectDecription = await index
    .locator(".inventory_item_desc")
    .innerText();
  const expectName = await index.locator(".inventory_item_name").innerText();
  const expectPrice = await index.locator(".inventory_item_price").innerText();
  const expectPriceC = expectPrice.replace("$", "");
  await index.getByRole("button", { name: "ADD TO CART" }).click();

  await page.locator("a.shopping_cart_link").click();
  const button_checkout = await page.getByRole("link", { name: "CHECKOUT" });
  expect(button_checkout).toBeVisible();

  const actualname = await page.locator(".inventory_item_name").innerText();
  const description = await page.locator(".inventory_item_desc").innerText();
  const price = await page.locator(".inventory_item_price").innerText();

  expect(actualname).toEqual(expectName);
  expect(description).toEqual(expectDecription);
  expect(price).toEqual(expectPriceC);

  button_checkout.click();

  await page
    .getByRole("textbox", { name: "First Name" })
    .fill("Jhoan Sebastian");

  await page.getByRole("textbox", { name: "Last Name" }).fill("Duque Zapata");

  await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("12345");

  await page.getByRole("button", { name: "CONTINUE" }).click();

  await page.getByRole("link", { name: "FINISH" }).click();

  const header = page.locator(".complete-header");

  await expect(header).toBeVisible();

  const textToCompare = await header.innerText();
  await expect(textToCompare).toEqual("THANK YOU FOR YOUR ORDER");
});
