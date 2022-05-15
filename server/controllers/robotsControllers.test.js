const { mockRobots, mockRobot } = require("../mocks/robots");
const { getRobots, deleteRobot } = require("./robotsControllers");

jest.mock("../../database/models/Robot", () => ({
  ...jest.requireActual("../../database/models/Robot"),
  find: jest.fn().mockResolvedValue(mockRobots),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockRobot),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a getRobot function", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with a 200", async () => {
      const expectedResult = 200;

      await getRobots(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("When it's invoked with a response", () => {
    test("Then it should call the response json method with a list of robots", async () => {
      await getRobots(null, res);

      expect(res.json).toHaveBeenCalledWith({ robots: mockRobots });
    });
  });
});

describe("Given a deleteRobot function", () => {
  describe("When it's invoked with a response and  request that contains an Id of an existing robot", () => {
    const req = {
      params: { idRobot: "6280e28666fdd6e9d550ccd8" },
    };

    test("Then it should call the response status method with a 200", async () => {
      const expectedResult = 200;

      await deleteRobot(req, res);

      expect(res.status).toBeCalledWith(expectedResult);
    });

    test("Then it should call the response json method with a msg 'robot deleted'", async () => {
      const expectedMesage = "robot deleted";

      await deleteRobot(req, res);

      expect(res.json).toBeCalledWith({ msg: expectedMesage });
    });
  });
});
