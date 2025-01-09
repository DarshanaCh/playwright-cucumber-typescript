import {Given, When, Then,setDefaultTimeout} from "@cucumber/cucumber";
import { pageFixure } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";
import { addToCartPage } from "../pages/addToCartPage";

setDefaultTimeout(60 * 1000 * 2)
let AddToCartPage = new addToCartPage(pageFixure.page);
Given('user search for a {string}', async function (book) {
     await AddToCartPage.searchBook(book);
//without POM the following steps will work. no need to define pages
  // await pageFixure.page.locator("input[type='search']").fill(book);
  // await pageFixure.page.waitForTimeout(1000);
  // await pageFixure.page.getByRole('option', { name: book }).locator('span').click();
  
  });

When('user add the book to the cart', async function () {

  await AddToCartPage.addToCart();
  //without POM the following steps will work. no need to define pages
  // await pageFixure.page.getByRole('button', { name: 'Add to Cart' }).click();
  // await pageFixure.logger.info("add to cart success");
    

  });

Then('the cart badge should get updated', async function () {
    //without POM the following steps will work. no need to define pages
    // await pageFixure.page.waitForTimeout(1000);
    // const badgeCount = await pageFixure.page.locator("#mat-badge-content-0").textContent();
    // await pageFixure.page.waitForTimeout(1000);
    // expect(Number(badgeCount)).toBeGreaterThan(0);
    await AddToCartPage.badgeUpdate();
  });

