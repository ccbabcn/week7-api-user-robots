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

// SUPER TEST npm i -D supertest mongodb-memory-server
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("..");
const connectDataBase = require("../../database");
const Robot = require("../../database/models/Robot");
const { mongoose } = require("mongoose");
const User = require("../../database/models/User");

let userToken;
let robots;
let mongoServer;

beforeAll(async () => {
   mongoServer = await MongoMemoryServer.create(); // creamos servidor de pruebas
  // para conectarnos a la base de tados creada
  await connectDataBase(mongoServer.getUri());

  const userCredentials = { userName: "smith", password: "12345" };

  const user = await User.create(userCredentials); // .create es un metodo de modelo de mongoose
  // user tiene el valor al que resuelve la pseudo promesa del metodo .create
  // user viene con la propiedad virtual id (_id no hace falta)
   robots = [
    {
      name: "roboto", // si  nohay mas cosas además del tipe, {} no hace falta
      velocity: 10,
      resistance: 5,
      created: "10/10/201",
      image: "imagen",
      owner: user.id,
    },
    {
      name: "terminator", // si  nohay mas cosas además del tipe, {} no hace falta
      velocity: 10,
      resistance: 5,
      created: "10/10/201",
      image: "imagen",
      owner: user.id,
    },
  ];
  const {
    body: { token },
  } = request(app).post("users/login").send(userCredentials).expect(200);
  userToken = token;

  
  // const robots = await Robot.find
  // const { body } = await request(app).get("/robots/").expect(200); si no hay authentificacion
};)

beforeEach(async()=>{
await Robot.create(robots[0]);

  await Robot.create(robots[1]);
})
afterAll(async()=>{
  await mongoose.connection.close(); // cierra la conexion
      await mongoServer.stop(); // cierr la database

afterEach(async()=>{
  await Robot.deleteMany({}); //borrar todos los objetos de la coleccion, devuelve una promesa
})

})

describe("Give a Get /robots/ endpoint", () => {
  describe("When it receives a reuqest", () => {
    test("Then it should respond wiht 200 and a list of pest", async () => {
      // const mongoServer = await MongoMemoryServer.create(); // creamos servidor de pruebas
      // // para conectarnos a la base de tados creada
      // await connectDataBase(mongoServer.getUri());

      // const userCredentials = { userName: "smith", password: "12345" };

      // const user = await User.create(userCredentials); // .create es un metodo de modelo de mongoose
      // // user tiene el valor al que resuelve la pseudo promesa del metodo .create
      // // user viene con la propiedad virtual id (_id no hace falta)
      // const robots = [
      //   {
      //     name: "roboto", // si  nohay mas cosas además del tipe, {} no hace falta
      //     velocity: 10,
      //     resistance: 5,
      //     created: "10/10/201",
      //     image: "imagen",
      //     owner: user.id,
      //   },
      //   {
      //     name: "terminator", // si  nohay mas cosas además del tipe, {} no hace falta
      //     velocity: 10,
      //     resistance: 5,
      //     created: "10/10/201",
      //     image: "imagen",
      //     owner: user.id,
      //   },
      // ];

      // const {
      //   body: { token },
      // } = request(app).post("users/login").send(userCredentials).expect(200);

      // await Robot.create(robots[0]);

      // await Robot.create(robots[1]);
      // const robots = await Robot.find
      // const { body } = await request(app).get("/robots/").expect(200); si no hay authentificacion
      const { body } = await request(app)
        .get("/robots/")
        .set("Authorization", `Bearer ${token}`)
        .expect(200); // request de verdad hecha por suspertest con authorization incluida

      expect(body.robots).toHaveLength(robots.length); // si el array de pruebas tiene 2
      expect(body.robots[0]).toHaveProperty("name", "roboto");

      
    });
  });
});


describe("Give a POST /robots/ endpoint", () => {
  describe("When it receives a request with a robot", () => {
    test("Then it should respond wiht 201 and the new robot", async () => {
      const robot = [
        {
          name: "roboto", // si  nohay mas cosas además del tipe, {} no hace falta
          velocity: 10,
          resistance: 5,
          created: "10/10/201",
          image: "imagen",
          owner: oid(),
        }];
   
      await request(app).post("/robots").send(robot).set("Authorization", `Bearer ${token}`).expect(200);
      const { body } = await request(app)
        .get("/robots/")
        .set("Authorization", `Bearer ${token}`)
        .expect(200); // request de verdad hecha por suspertest con authorization incluida

      expect(body.robots).toHaveLength(robots.length); // si el array de pruebas tiene 2
      expect(body.robots[0]).toHaveProperty("name", "roboto");

      await mongoose.connection.close(); // cierra la conexion
      await mongoServer.stop(); // cierr la database
    });
  });
});


  describe("peticion sin toke",()=>{
    test("401 y invalid token mssage",()=>{
      await request(app)
    })
  })
