const req = require("supertest");
const faker = require("faker");
const { app } = require("../index");

// const api = supertest(app);

describe("Pruebas para la creación de usuarios", () => {
  it("Verificar la creación de un usuario tipo paciente", async () => {
    const res = await req(app).get("/items");
  });
  expect(res.statusCode).toEqual(200);
});
