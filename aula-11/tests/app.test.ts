import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";
import { UserInput } from "../src/repository";
import { createUser } from "./factories/user.factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user: UserInput = {
      email: "teste@teste.com.br",
      password: "teste"
    };

    const { status } = await api.post("/users").send(user);
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await createUser("teste@teste.com.br");

    const { status } = await api.post("/users").send({
      email: "teste@teste.com.br",
      password: "teste"
    });
    expect(status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = await createUser("teste@teste.com.br");

    const { status, body } = await api.get(`/users/${user.id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      ...user
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get("/users/1234");
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await createUser("teste@teste.com.br");
    await createUser("teste2@teste.com.br");

    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String)
      })
    ]))
  });

})