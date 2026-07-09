import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }
}
