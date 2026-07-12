import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 60 * 1000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: "html",
  use: {
    trace: "retain-on-failure",

    launchOptions: {
      args: ["--start-maximized"],
    },
    viewport: null,

    baseURL: "https://demo.prestashop.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://demo.prestashop.com",
      },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  // webServer: {
  //   command: "npm run preview",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
