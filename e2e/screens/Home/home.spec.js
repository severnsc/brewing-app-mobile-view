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
  });
});
