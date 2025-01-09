import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { Page, chromium, Browser, expect } from "@playwright/test";
import { pageFixure } from "../../hooks/pageFixture";
import { loginPage } from "../pages/loginPage";

setDefaultTimeout(60 * 1000 * 2);
let LoginPage = new loginPage(pageFixure.page);

Given(/^User navigates to the application$/, async () => {
  // browser= await chromium.launch({headless:false});
  // page=await browser.newPage();
  //await pageFixure.page.goto("https:/bookcart.azurewebsites.net/");
  //without POM the following steps will work. no need to define pages
  //const baseUrl: string = process.env.BASEURL as string;
  //await pageFixure.page.goto(baseUrl);
  //await pageFixure.logger.info("user navigate to application");

  await LoginPage.navigateToLoginPage();
});

When(/^User click on the login link$/, async () => {
  //without POM the following steps will work. no need to define pages
  //await pageFixure.page.getByRole('button', { name: 'Login' }).click();
  await LoginPage.clickLoginlnk();
});

Then(/^Login should be success$/, async () => {
  //without POM the following steps will work. no need to define pages
  // await pageFixure.page.getByText('account_circlearrow_drop_down').isVisible();
  // const login=await pageFixure.page.getByText('Username or Password is');
  // await expect(login).toBeHidden();
  // await pageFixure.logger.info("user logged in to application");
  await LoginPage.verifySuccessLogin();
});

Given(/^User enter the username as "([^"]*)"$/, async (username) => {
  //without POM the following steps will work. no need to define pages
  //await pageFixure.page.getByPlaceholder('Username').fill(username);
  await LoginPage.enterUserName(username);
  await pageFixure.logger.info("username:" + username);
});

Given(/^User enter the password as "([^"]*)"$/, async (password) => {
  //without POM the following steps will work. no need to define pages
  //await pageFixure.page.getByText('Password').fill(password);
  await LoginPage.enterPassword(password);
});

When(/^User click on the login button$/, async () => {
  //without POM the following steps will work. no need to define pages
  //await pageFixure.page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
  await LoginPage.clickLoginButton();

  await pageFixure.page.waitForTimeout(1000);
});

When("Login should fail", async () => {
  //without POM the following steps will work. no need to define pages
  //await pageFixure.page.getByText('Username or Password is').isVisible();
  await LoginPage.verifyFailLogin();
});
