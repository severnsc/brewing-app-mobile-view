import { reloadApp } from "detox-expo-helpers";

describe("Create account", () => {
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToCreateAccount")).tap();
  });
  describe("interactions", () => {
    describe("error path", () => {
      describe("only entering username", () => {
        it("should render an error message", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("signupFormError"))).toBeVisible();
        });
      });
    });
  });
});
