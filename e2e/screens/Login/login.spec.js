import { reloadApp } from "detox-expo-helpers";
import { startServer, stopServer } from "../../mocks/GraphQLServer";
const NETWORK_ERROR = "There was a problem with the network! Try again.";

describe("Login", () => {
  beforeEach(async () => {
    await reloadApp();
    await startServer();
    await element(by.id("ToLogin")).tap();
  });
  afterEach(async () => {
    await stopServer();
  });
  describe("tapping forgot password", () => {
    it("should navigate to forgot password", async () => {
      await element(by.id("ToForgotPassword")).tap();
      await expect(element(by.id("forgotPasswordTitle"))).toBeVisible();
    });
  });
  describe("valid login & network error", () => {
    describe("valid login", () => {
      it("should navigate to dashboard", async () => {
        await element(by.id("usernameInput")).tap();
        await element(by.id("usernameInput")).typeText("username");
        await element(by.id("passwordInput")).tap();
        await element(by.id("passwordInput")).typeText("password");
        await element(by.id("submitButton")).tap();
        await expect(element(by.id("dashboardTitle"))).toBeVisible();
      });
    });
    describe("network error", () => {
      it("should display NETWORK_ERROR alert", async () => {
        await stopServer();
        await element(by.id("submitButton")).tap();
        await expect(element(by.text(NETWORK_ERROR))).toBeVisible();
      });
    });
  });
});
describe("invalid login", () => {
  beforeEach(async () => {
    await reloadApp();
    await startServer({ valid: false });
    await element(by.id("ToLogin")).tap();
  });
  afterEach(async () => {
    await stopServer();
  });
  it("should display INVALID_LOGIN error message", async () => {
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("loginErrorText"))).toBeVisible();
  });
});
