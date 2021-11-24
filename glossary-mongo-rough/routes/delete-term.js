const fs = require("fs/promises");
const sendResponse = require("./utils/sendResponse");

const deleteTerm = (req, res) => {
  const word = req.params.term.toLowerCase();

  if (!word) {
    return sendResponse(res, 404, {
      error: `${term} was not in the glossary`,
    });
  }

  const deletedTerm = req.app.glossary[word];
  delete req.app.glossary[word];

  return sendResponse(res, 204, deletedTerm).then(() => {
    return fs.writeFile(req.app.file, JSON.stringify(req.app.glossary));
  });
};

module.exports = deleteTerm;
