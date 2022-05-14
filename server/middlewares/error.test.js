const { notFoundError } = require("./errors");

describe("Given a notFoundError function", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with a 404", () => {
      const expectedResult = 404;

      const res = {
        status: jest.fn(),
      };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedResult);
    });
  });
});
