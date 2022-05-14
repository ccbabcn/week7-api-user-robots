const { mockRobots } = require("../mocks/robots");
const { getRobots } = require("./robotsControllers");

jest.mock("../../database/models/Robot", () => ({
  ...jest.requireActual("../../database/models/Robot"),
  find: jest.fn().mockResolvedValue(mockRobots),
}));

describe("Given a getRobot function", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with a 200", async () => {
      const expectedResult = 200;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedResult);
    });
  });
});
