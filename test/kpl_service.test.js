const Service = require("../src/kpl_service");
const unexpectedCodes = [
  "1600696",
  "0002176",
  "1600555",
  "1601399",
  "1600399",
  "0000504",
  "0000673",
  "1600238",
  "0002700",
  "1600416",
  "0000408",
  "0002592",
  "1600698",
  "0002192",
  "0002447",
  "1600157",
  "0002496",
  "0000806",
  "1600781",
  "0002681",
  "0002280",
  "1600652",
  "0000890",
  "1600767",
  "0002684",
  "0002122",
  "1600319",
  "1600290",
  "1600421",
  "0002147",
  "0000982",
  "0002499",
  "1600892",
  "1600470",
  "1600112",
  "0002076",
  "1600836",
  "1600241",
  "0002716",
  "0002336",
  "0000571",
  "0002872",
  "0002188",
  "0002569",
  "1600265",
  "1600898",
  "1600193",
  "0002255",
  "0002501",
  "1600275",
  "1600311",
  "1600725",
  "0300029",
  "1600083",
  "0002089",
  "0002418",
  "1600358",
  "0002426",
  "0002210",
  "0002529",
  "0000707",
  "0000972",
  "1600599",
  "0300367",
  "1600666",
  "0002333",
  "0000752",
  "0002420",
  "0002513",
  "1600215",
  "1600225",
  "1601113",
  "0000536",
  "0002766",
  "1600821",
  "1600234",
  "1600212",
  "0000585",
  "1600671",
  "1600385",
  "0002586",
  "0002445",
  "0000868",
  "0000837",
  "1600595",
  "1600423",
  "0002306",
  "0002692",
  "0002502",
  "1600080",
  "1600530",
  "0000572",
  "0002259",
  "0002121",
  "0002427",
  "0000409",
  "1600608",
  "1600860",
  "1600354",
  "0002650",
];

describe("KplServiceTest", () => {
  describe("getCodes", function () {
    it("过滤掉ST版块", async () => {
      const codes = await new Service().getCodes(7, 5, 5);
      expect(codes.length).toBeGreaterThan(0);
      expect(
        codes.every((code) => !unexpectedCodes.includes(code))
      ).toBeTruthy();
    });

    it("formats the code", async () => {
      const codes = await new Service().getCodes(7, 5, 5);
      codes.forEach((code) => {
        expect(code).toHaveLength(7);
      });
    });
  });
});
