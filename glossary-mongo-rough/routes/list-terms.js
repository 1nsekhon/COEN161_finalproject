const url = require("url");
const sendResponse = require("./utils/sendResponse");

const DEFAULT_LIMIT = 10;

const getTerms = (req, res) => {
  const query = url.parse(req.url, true).query;
  const lowerBound = parseInt(query.offset, 10) || 0;
  const upperBound = lowerBound + (parseInt(query.limit, 10) || DEFAULT_LIMIT);

  const terms = [];
  //const allTerms = Object.values(req.app.glossary);
  //console.log(allTerms);
  //console.log(req.app.glossary)
  /*for (let i = lowerBound; i < upperBound; i++) {
    if (i >= allTerms.length) {
      break;
    }
    terms.push(allTerms[i]);
  }*/

  /*return req.app.db.getTerms().then((newTerm) => {
    return sendResponse(res, 201, JSON.stringify(newTerm));
  });*/
  /*return sendResponse(res, 200, {
    terms,
    pagination: {
      hasNextPage: upperBound < allTerms.length,
      hasPreviousPage: lowerBound > 0,
    },
  });*/
};

module.exports = getTerms;
