const debug = require("debug")("robots:api-initialize:root");
const chalk = require("chalk");
const app = require("./index");

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.greenBright(`server running on port: ${port}`));
      resolve();
    });
    server.on("error", (error) => {
      debug(chalk.redBright("error on server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`${port} in use`));
      }
      reject();
    });
  });

module.exports = initializeServer;
