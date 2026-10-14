import { describe, expect, it } from "vite-plus/test";

import { calculateUnitPrice } from "./unitPrice";

describe("calculateUnitPrice", () => {
  it("divides price by quantity", () => {
    expect(calculateUnitPrice("300", "10")).toBe(30);
    expect(calculateUnitPrice("150", "0.5")).toBe(300);
  });

  it("allows a zero price", () => {
    expect(calculateUnitPrice("0", "10")).toBe(0);
  });

  it("rejects missing or invalid inputs", () => {
    for (const [price, quantity] of [
      ["", "10"],
      ["300", ""],
      ["-1", "10"],
      ["300", "0"],
      ["300", "-1"],
      ["Infinity", "10"],
      ["300", "Infinity"],
      ["invalid", "10"],
    ]) {
      expect(calculateUnitPrice(price, quantity)).toBeNull();
    }
  });
});
