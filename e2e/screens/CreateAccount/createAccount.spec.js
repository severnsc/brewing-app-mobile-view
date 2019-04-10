import { reloadApp } from "detox-expo-helpers";
import { startServer, stopServer } from "../../mocks/GraphQLServer";
const NETWORK_ERROR = "There was a problem with the network! Try again.";

describe("Create account", () => {
  beforeEach(async () => {
    await reloadApp();
    await element(by.id("ToCreateAccount")).tap();
    await startServer();
  });
  afterEach(async () => {
    await stopServer();
  });
  describe("interactions", () => {
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
      describe("when mutate fails", () => {
        it("should render an alert with a NETWORK_ERROR", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupEmail")).tap();
          await element(by.id("signupEmail")).typeText("email@me.com");
          await element(by.id("signupPassword")).tap();
          await element(by.id("signupPassword")).typeText("password");
          await element(by.id("signupConfirmPassword")).tap();
          await element(by.id("signupConfirmPassword")).typeText("password");
          await stopServer();
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.text(NETWORK_ERROR))).toBeVisible();
        });
      });
      describe("when mutate succeeds", () => {
        it("should navigate to the dashboard", async () => {
          await element(by.id("signupUsername")).tap();
          await element(by.id("signupUsername")).typeText("newuser");
          await element(by.id("signupEmail")).tap();
          await element(by.id("signupEmail")).typeText("email@me.com");
          await element(by.id("signupPassword")).tap();
          await element(by.id("signupPassword")).typeText("password");
          await element(by.id("signupConfirmPassword")).tap();
          await element(by.id("signupConfirmPassword")).typeText("password");
          await element(by.id("signupFormButton")).tap();
          await expect(element(by.id("dashboardTitle"))).toBeVisible();
        });
      });
    });
  });
});
