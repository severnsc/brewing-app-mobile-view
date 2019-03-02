import typeDefs from ".";

describe("typeDefs", () => {
  it("matches snapshot", () => {
    expect(typeDefs).toMatchSnapshot();
  });
});
