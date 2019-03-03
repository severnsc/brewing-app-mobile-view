import { reloadApp } from "detox-expo-helpers";

describe("Create account", () => {
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToCreateAccount")).tap();
  });
  describe("interactions", () => {
    describe("error path", () => {
      describe("only entering username", () => {
        it("should render an error message for email & password", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("emailInputError"))).toBeVisible();
          await expect(element(by.id("passwordInputError"))).toBeVisible();
        });
      });
      describe("only entering email", () => {
        it("should render an error message for username & password", async () => {
          await element(by.id("signupEmail")).tap();
          await element(by.id("signupEmail")).typeText("me@email.com");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("usernameInputError"))).toBeVisible();
          await expect(element(by.id("passwordInputError"))).toBeVisible();
        });
      });
      describe("only entering password", () => {
        it("should render an error message for username & email", async () => {
          await element(by.id("signupPassword")).tap();
          await element(by.id("signupPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("usernameInputError"))).toBeVisible();
          await expect(element(by.id("emailInputError"))).toBeVisible();
        });
      });
      describe("only entering confirm password", () => {
        it("should render error messages for username, email & password", async () => {
          await element(by.id("signupConfirmPassword")).tap();
          await element(by.id("signupConfirmPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("usernameInputError"))).toBeVisible();
          await expect(element(by.id("emailInputError"))).toBeVisible();
          await expect(element(by.id("passwordInputError"))).toBeVisible();
          await expect(
            element(by.id("confirmPasswordInputError"))
          ).toBeVisible();
        });
      });
    });
  });
});
