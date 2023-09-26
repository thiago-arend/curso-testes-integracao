import app from "../src/app";
import supertest from "supertest";

const server = supertest(app);

describe("GET /health", () => {

    it("expects status code to be 200", async () => {
        const result = await server.get("/health");
        expect(result.statusCode).toBe(200);
    });

    it("expects response message to be 'OK!'", async () => {
        const result = await server.get("/health");
        expect(result.text).toBe("OK!");
    });
});