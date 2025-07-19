import request from "supertest";
import app from "../index"; // Adjust path to your Express app

describe("Books API", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
