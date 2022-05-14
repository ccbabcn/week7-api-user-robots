const { notFoundError, generalError } = require("./errors");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
describe("Given a notFoundError function", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with a 404", () => {
      const expectedResult = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedResult);
    });

    test("Then it should call the response json method with a msg '404 Page Not Found'", () => {
      const expectedMsg = { msg: "404 endpoint Not Found" };

      notFoundError(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedMsg);
    });
  });
});

describe("Given a genralError function", () => {
  const error = {
    message: "error text",
  };

  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with 500", () => {
      const expectedStatus = 500;

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response msg method with 'Internal server error'", () => {
      const expectedMsg = { msg: "Internal server error" };

      generalError(error, null, res);

      expect(res.json).toHaveBeenCalledWith(expectedMsg);
    });
  });
});
