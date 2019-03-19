import { reloadApp } from "detox-expo-helpers";
import { startServer, stopServer } from "../../mocks/GraphQLServer";
const NETWORK_ERROR = "There was a problem with the network! Try again.";

describe("Home", () => {
  beforeAll(async () => {
    await startServer();
  });
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToLogin")).tap();
  });
  afterAll(async () => {
    await stopServer();
  });
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
