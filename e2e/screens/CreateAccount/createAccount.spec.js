import { reloadApp } from "detox-expo-helpers";

describe("Create account", () => {
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToCreateAccount")).tap();
  });

  it("should display text Sign Up", async () => {
    await expect(element(by.id("createAccountTitle"))).toBeVisible();
  });

  describe("Signup form", () => {
    it("should display the signup form", async () => {
      await expect(element(by.id("signupForm"))).toBeVisible();
    });

    it("should display a username label", async () => {
      await expect(element(by.label("Username"))).toBeVisible();
    });

    it("should display a username input", async () => {
      await expect(element(by.id("signupUsername"))).toBeVisible();
    });

    it("should display a email label", async () => {
      await expect(element(by.label("Email"))).toBeVisible();
    });

    it("should display an email input", async () => {
      await expect(element(by.id("signupEmail"))).toBeVisible();
    });

    it("should display a Password label", async () => {
      await expect(element(by.label("Password"))).toBeVisible();
    });

    it("should display a password input", async () => {
      await expect(element(by.id("signupPassword"))).toBeVisible();
    });

    it("should display a Confirm Password label", async () => {
      await expect(element(by.label("Confirm Password"))).toBeVisible();
    });

    it("should display a confirmPassword input", async () => {
      await expect(element(by.id("signupConfirmPassword"))).toBeVisible();
    });

    it("should display button", async () => {
      await expect(element(by.id("signupFormButton"))).toBeVisible();
    });
  });
});
