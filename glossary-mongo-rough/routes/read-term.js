const sendResponse = require("./utils/sendResponse");

const getTerm = (req, res) => {
  const term = req.params.term;

  /*if (!req.app.glossary[term.toLowerCase()]) {
    return sendResponse(res, 404, {
      error: `${term} is not in the glossary yet`,
    });
  }

  const definition = req.app.glossary[term.toLowerCase()];*/
  
  return req.app.db.getTermByWord(term).then(newTerm => {
    return sendResponse(res, 200, newTerm.word);
  });
};

module.exports = getTerm;
