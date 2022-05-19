const auth = require("./auth");

// jest.mock("jwt");
// jwt.verify.mockReturnValue({
//   id: "3",
// });

// jest.mock("jsonwebtoken", ()=>({
//   ...jest.requireActual("jsonwebtoken"), veriy: ()=>

// }));
const mockId = { id: 3 };
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"), // import and retain the original functionalities
  verify: () => mockId, // overwrite verify
}));

describe("Given an Auth function", () => {
  describe("When it receives a request with a valid token", () => {
    const req = {
      headers: { authorization: "Bearer " },
    };
    const next = jest.fn();

    test("Then it should call the next", () => {
      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });

    test("The it should add to the received request the user Id provided by the token", () => {});
    auth(req, null, next);

    expect(req).toHavePropert("userId", mockId);
  });
});
