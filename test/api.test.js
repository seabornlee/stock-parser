const request = require("supertest");
const app = require("../src/server.js");
const Service = require("../src/service");

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

  describe("/code/xml", () => {
    it("responds with 200", () => {
      return request(app)
          .get("/code/xml")
          .expect(200)
          .expect("Content-Type", /xml/)
          .then(res => {
            expect(res.text.includes("stk setcode=")).toBeTruthy()
          })
    });
  });

  describe("/kpl/code/xml", () => {
    it("responds with 200", () => {
      return request(app)
        .get("/kpl/code/xml")
        .expect(200)
        .expect("Content-Type", /xml/)
        .then(res => {
          expect(res.text.includes("stk setcode=")).toBeTruthy()
        })
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
