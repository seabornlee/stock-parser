const request = require("supertest");
const app = require("../src/server.js");

describe("Api", () => {
  describe("/kpl/code/xml", () => {
    it("responds with 200", () => {
      return request(app)
        .get("/kpl/code/xml/7/5/5")
        .expect(200)
        .expect("Content-Type", /xml/)
        .then((res) => {
          expect(res.text.includes("stk setcode=")).toBeTruthy();
        });
    });
  });

  describe("/others", () => {
    it("responds 404", (done) => {
      request(app).get("/others").expect(404, done);
    });
  });
});
