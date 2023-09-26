import app from "../src/app";
import supertest from "supertest";

const server = supertest(app);

describe("API tests", () => {

    it("should return status 200 and response 'OK!' at GET /health", async () => {
        const result = await server.get("/health");
        expect(result.statusCode).toBe(200);
        expect(result.text).toBe("OK!");
    });
});