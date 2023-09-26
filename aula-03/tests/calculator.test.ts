import calculator from "calculator"

describe("Arithmetic functions", () => {
    it("sum should return 4 for params 2 and 2", () => {
        expect(calculator.sum(2, 2)).toBe(4);
    });

    it("sub should return 16 for params 20 and 4", () => {
        expect(calculator.sub(20, 4)).toBe(16);
    });

    it("mul should return 20 for params 4 and 5", () => {
        expect(calculator.mul(4, 5)).toBe(20);
    });

    it("div should return 8 for params 24 and 3", () => {
        expect(calculator.div(24, 3)).toBe(8);
    });
});