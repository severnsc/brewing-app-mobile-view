import { reloadApp } from "detox-expo-helpers";

describe("Home", () => {
	beforeEach(async () => {
		await reloadApp();
	});
	it("should display text Home", async () => {
		await expect(element(by.id("HomeText"))).toBeVisible();
	});
});
