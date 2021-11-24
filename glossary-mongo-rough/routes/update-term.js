const fs = require("fs/promises");
const readBody = require("./utils/readBody");
const sendResponse = require("./utils/sendResponse");

const updateTerm = (req, res) => {
  const word = req.params.term;
  const term = req.app.glossary[word.toLowerCase()];

  if (!term) {
    return sendResponse(res, 404, {
      error: `${word} is not in the glossary yet`,
    });
  }

  readBody(req).then((body) => {
    const update = JSON.parse(body);

    if (!update.definition) {
      return sendResponse(res, 400, {
        error: "definition field is required for an update request",
      });
    }

    term.definition = update.definition;
    return sendResponse(res, 200, {
      word: term.word,
      definition: update.definition,
    }).then(() => {
      return fs.writeFile(req.app.file, JSON.stringify(req.app.glossary));
    });
  });
};

module.exports = updateTerm;
