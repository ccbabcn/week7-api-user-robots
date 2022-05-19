const { loginUser } = require("./usersControllers");

jest.mock("../../database/models/User", () => ({
  // ...jest.requireActual("../../database/models/User"),
  findOne: jest.fn().mockResolvedValue(true),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

const expectedToken = "mitoquencito";

jest.mock("jsonwebtoken", () => ({
  // sign: jest.fn().mockReturnValue(token),
  sign: () => expectedToken,
}));

describe("Given a loginUser function", () => {
  describe("When invoked with a req object with a correct user and password", () => {
    test("Then it should call the res status method with 200", async () => {
      const req = {
        body: {
          username: "user",
          pasword: "userpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expedtecStatus = 200;

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expedtecStatus);
      expect(res.json).toHaveBeenCalledWith({ token: expedtecStatus });
    });
  });
});
