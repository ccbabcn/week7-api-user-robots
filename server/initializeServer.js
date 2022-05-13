const debug = require("debug");
const chalk = require("chalk");

const app = require(".");

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.greenBright(`server running on port: ${port}`));
  });
  server.on("error", (error) => {
    debug(chalk.redBright("error on server"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`${port} in use`));
    }
  });
};

module.exports = initializeServer;
