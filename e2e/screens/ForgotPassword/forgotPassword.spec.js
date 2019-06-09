import { reloadApp } from "detox-expo-helpers";
import { startServer, stopServer } from "../../mocks/GraphQLServer";
const NETWORK_ERROR = "There was a problem with the network! Try again.";

describe("Forgot Password", () => {
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToLogin")).tap();
    await element(by.id("ToForgotPassword")).tap();
  });
  describe("when the network is unavailable", () => {
    it("launches an iOS Alert with a NETWORK_ERROR", async () => {
      await element(by.id("forgotPasswordInput")).tap();
      await element(by.id("forgotPasswordInput")).typeText("email@example.com");
      await element(by.id("forgotPasswordButton")).tap();
      await expect(element(by.text(NETWORK_ERROR))).toBeVisible();
    });
  });
  describe("when the email is not valid", () => {
    beforeEach(async () => {
      await startServer();
    });
    afterEach(async () => {
      await stopServer();
    });
    it("displays an INVALID_EMAIL error message", async () => {
      await element(by.id("forgotPasswordInput")).tap();
      await element(by.id("forgotPasswordInput")).typeText("email");
      await element(by.id("forgotPasswordButton")).tap();
      await expect(element(by.id("invalidEmailError"))).toBeVisible();
    });
  });
  describe("when the email is valid", () => {
    beforeEach(async () => {
      await startServer();
    });
    afterEach(async () => {
      await stopServer();
    });
    it("navigates to the forgot password confirm screen", async () => {
      await element(by.id("forgotPasswordInput")).tap();
      await element(by.id("forgotPasswordInput")).typeText("email@example.com");
      await element(by.id("forgotPasswordButton")).tap();
      await expect(element(by.id("forgotPasswordConfirmTitle"))).toBeVisible();
    });
  });
});
