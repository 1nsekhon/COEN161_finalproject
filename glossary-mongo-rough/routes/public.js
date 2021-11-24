const fs = require("fs/promises");
const path = require("path");

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/js",
  svg: "image/svg+xml",
};

const getPublicFolder = (req, res) => {
  let requestedFile = req.url;

  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end();
  }

  if (!requestedFile.endsWith(".html")) {
    requestedFile += ".html";
  }

  const filePath = path.join(__dirname, "..", ...req.url.split("/"));

  fs.readFile(filePath)
    .then((fileContents) => {
      res.statusCode = 200;

      res.setHeader(
        "Content-Type",
        mimeTypes[path.extname(filePath).substring(1)]
      );
      res.write(fileContents);
      res.end();
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        console.log(`ERROR: Did not find ${requestedFile} in public directory`);
        res.statusCode = 404;
      } else {
        console.log(`ERROR: ${err}`);
        res.statusCode = 500;
      }
      res.end();
    });
};

module.exports = getPublicFolder;
