import { expect, Page } from "@playwright/test";
import { pageFixure } from "../../hooks/pageFixture";

export class addToCartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = pageFixure.page;
  }

  private Elements = {
    searchInput: "input[type='search']",
    seatchSelect: "mdc-list-item__primary-text",
    addToCartBtn: "//span[normalize-space(text())='Add to Cart']",
    badgeCount: "#mat-badge-content-0",
  };

  async searchBook(book: string) {
    await pageFixure.page.locator(this.Elements.searchInput).fill(book);
    await pageFixure.page.waitForTimeout(1000);
    await pageFixure.page
      .getByRole("option", { name: book })
      .locator("span")
      .click();
  }
  async addToCart() {
    await pageFixure.page.locator(this.Elements.addToCartBtn).click();
    await pageFixure.logger.info("add to cart success");
  }
  async badgeUpdate() {
    await pageFixure.page.waitForTimeout(2000);
    const badgeCount = await pageFixure.page
      .locator("#mat-badge-content-0")
      .textContent();
    await pageFixure.page.waitForTimeout(1000);
    expect(Number(badgeCount)).toBeGreaterThan(0);
  }
}
