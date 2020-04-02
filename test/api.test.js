const request = require("supertest");
const app = require("../src/server.js");

describe("Api", () => {
  describe("/code", () => {
    it("responds with 200", done => {
      request(app)
        .get("/code")
        .expect(200, done);
    });
  });

  describe("/name", () => {
    it("responds with 200", done => {
      request(app)
        .get("/name")
        .expect(200, done);
    });
  });

  describe("/others", () => {
    it("responds 404", done => {
      request(app)
        .get("/others")
        .expect(404, done);
    });
  });
});
