import { reloadApp } from "detox-expo-helpers";

describe("Create account", () => {
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToCreateAccount")).tap();
  });
  describe("interactions", () => {
    describe("when clicking back after filling out the form", () => {
      it("leaves the username and email and clears the password and confirmPassword", async () => {
        await element(by.id("signupUsername")).tap();
        await element(by.id("signupUsername")).typeText("newuser");
        await element(by.id("signupEmail")).tap();
        await element(by.id("signupEmail")).typeText("email@me.com");
        await element(by.id("signupPassword")).tap();
        await element(by.id("signupPassword")).typeText("password");
        await element(by.id("signupConfirmPassword")).tap();
        await element(by.id("signupConfirmPassword")).typeText("password");
        await element(by.id("header-back")).tap();
        await element(by.id("ToCreateAccount")).tap();
        await expect(element(by.id("signupUsername"))).toHaveValue("newuser");
        await expect(element(by.id("signupEmail"))).toHaveValue("email@me.com");
        await expect(element(by.id("signupPassword"))).toHaveValue("");
        await expect(element(by.id("signupConfirmPassword"))).toHaveValue("");
      });
    });
    describe("error path", () => {
      describe("when username is empty", () => {
        it("should render an error message for username", async () => {
          await element(by.id("signupEmail")).tap();
          await element(by.id("signupEmail")).typeText("email@me.com");
          await element(by.id("signupPassword")).tap();
          await element(by.id("signupPassword")).typeText("password");
          await element(by.id("signupConfirmPassword")).tap();
          await element(by.id("signupConfirmPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("usernameInputError"))).toBeVisible();
        });
      });
      describe("when email is empty", () => {
        it("should render an error message for email", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupPassword")).tap();
          await element(by.id("signupPassword")).typeText("password");
          await element(by.id("signupConfirmPassword")).tap();
          await element(by.id("signupConfirmPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("emailInputError"))).toBeVisible();
        });
      });
      describe("when password is empty", () => {
        it("should render an error message for password & confirmPassword", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupEmail")).tap();
          await element(by.id("signupEmail")).typeText("email@me.com");
          await element(by.id("signupConfirmPassword")).tap();
          await element(by.id("signupConfirmPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("passwordInputError"))).toBeVisible();
          await expect(
            element(by.id("confirmPasswordInputError"))
          ).toBeVisible();
        });
      });
      describe("when confirmPassword is empty", () => {
        it("should render an error message for confirmPassword", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupEmail")).tap();
          await element(by.id("signupEmail")).typeText("email@me.com");
          await element(by.id("signupPassword")).tap();
          await element(by.id("signupPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(
            element(by.id("confirmPasswordInputError"))
          ).toBeVisible();
        });
      });
    });
  });
});
