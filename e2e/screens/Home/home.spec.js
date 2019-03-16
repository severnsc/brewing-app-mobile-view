import { reloadApp } from "detox-expo-helpers";

describe("Home", () => {
  beforeEach(async () => {
    await reloadApp();
  });
  describe("interactions", () => {
    describe("navigating to create account", () => {
      it("should display create account text after navigating", async () => {
        await element(by.id("ToCreateAccount")).tap();
        await expect(element(by.id("createAccountTitle"))).toBeVisible();
      });
    });
    describe("navigating to login", () => {
      it("should display login text", async () => {
        await element(by.id("ToLogin")).tap();
        await expect(element(by.id("loginTitle"))).toBeVisible();
      });
    });
  });
});
