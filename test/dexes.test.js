const dx = require("../script/dexes");

test("get connection", () => {
  expect(dx.get_connection()).toBeDefined();
});
