const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs/promises");
const http = require("http");

const routeRequest = require("./route-request");
const sendResponse = require("./scripts/utils/sendResponse");
const UsersCollection = require("./mongodb/UsersCollection");

fs.readFile(path.join(__dirname, "mongo.config.json"), "utf-8")
  .then((contents) => {
    const mongoConfig = JSON.parse(contents);
    const uri = "mongodb+srv://dbUser:Goo92pre@cluster0.i5fcw.mongodb.net/profsDB?retryWrites=true&w=majority";
   /* const uri = [
      mongoConfig.scheme,
      `${mongoConfig.username}:${mongoConfig.password}`,
      `@${mongoConfig.address}/${mongoConfig.defaultDatabase}`,
      "?retryWrites=true&w=majority",
    ].join("");*/

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return client.connect().then(() => {
      return {
        db: UsersCollection(client),
      };
    });
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      return {
        glossary: {},
        file: "dictionary.json",
      };
    }

    if (err instanceof SyntaxError) {
      console.error("DB is corrupted, cannot read as JSON");
      process.exit(1);
    }

    console.error(err);
    process.exit(1);
  })
  .then((appState) => {
    const server = http.createServer(function (req, res) {
      req.params = {};
      req.app = appState;

      const handler = routeRequest(req);
      if (handler === null) {
        return sendResponse(res, 404);
      } else {
        return handler(req, res);
      }
    });

    server.listen(8080);
  });
