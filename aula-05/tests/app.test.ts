import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });

  it("should return 400 when has not received a number as query string or query string is a number, though it is less than one", async () => {
    const noQueryString = await api.get("/fibonacci");
    expect(noQueryString.statusCode).toBe(400);

    const queryStringIsNaN = await api.get("/fibonacci?elements=teste");
    expect(queryStringIsNaN.statusCode).toBe(400);

    const queryStringIsLessThanOne = await api.get("/fibonacci?elements=0");
    expect(queryStringIsLessThanOne.statusCode).toBe(400);
  });

  it("should return an array which length match elements value passed through query string", async () => {
    const result = await api.get("/fibonacci?elements=73");
    expect(result.body).toHaveLength(73);
    expect(result.body).not.toHaveLength(72);
    expect(result.body).not.toHaveLength(74);
  });

  it("should return an array containing the exact elements of fibonacci sequence to the value especified at elements query string", async () => {
    const result = await api.get("/fibonacci?elements=7");
    expect(result.body).toEqual([0, 1, 1, 2, 3, 5, 8]);
    expect(result.body).not.toEqual([0, 1, 1, 2, 3, 5]);
    expect(result.body).not.toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("should return 200 when elements query string is valid", async () => {
    const result = await api.get("/fibonacci?elements=1");
    expect(result.statusCode).toBe(200);
  });
});