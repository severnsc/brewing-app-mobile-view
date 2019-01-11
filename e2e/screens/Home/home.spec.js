import { reloadApp } from "detox-expo-helpers";

describe("Home", () => {
	beforeEach(async () => {
		await reloadApp();
	});
	it("should display text Home", async () => {
		await expect(element(by.id("HomeText"))).toBeVisible();
	});
	it("should display image", async () => {
		await expect(element(by.id("Hero"))).toBeVisible();
	});
	it("should have a button to create account", async () => {
		await expect(element(by.id("ToCreateAccount"))).toBeVisible();
	});
	it("should have a button to login", async () => {
		await expect(element(by.id("ToLogin"))).toBeVisible();
	});
	describe("interactions", () => {
		describe("navigating to create account", () => {
			it("should display create account text after navigating", async () => {
				await element(by.id("ToCreateAccount")).tap();
				await expect(element(by.label("Sign Up"))).toBeVisible;
			});
		});
	});
});
