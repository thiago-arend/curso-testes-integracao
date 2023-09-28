import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {

    const { status } = await api.post("/users").send({
      email: "thiago@gmail.com",
      password: "123456"
    });

    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {

    await api.post("/users").send({
      email: "thiago@gmail.com",
      password: "123456"
    });

    const { status } = await api.post("/users").send({
      email: "thiago@gmail.com",
      password: "thiago"
    });

    expect(status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {

    const userData = {
      email: "thiago@gmail.com",
      password: "123456"
    }

    const user = await prisma.user.create({
      data: userData
    });

    const { status, body } = await api.get(`/users/${user.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(user)
  });

  it("should return 404 when can't find a user by id", async () => {

    const { status } = await api.get("/users/1");
    expect(status).toBe(404);
  });

  it("should return all users", async () => {

    await api.post("/users").send({
      email: "thiago@gmail.com",
      password: "123456"
    });

    await api.post("/users").send({
      email: "marina@gmail.com",
      password: "marina"
    });

    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String)
        })
      ])
    )
  });

});
