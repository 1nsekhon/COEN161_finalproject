const url = require("url");
const sendResponse = require("./utils/sendResponse");

const DEFAULT_LIMIT = 10;

const getTerms = (req, res) => {
  const query = url.parse(req.url, true).query;
  const lowerBound = parseInt(query.offset, 10) || 0;
  const upperBound = lowerBound + (parseInt(query.limit, 10) || DEFAULT_LIMIT);

  const terms = [];
  console.log(req.app.db);
  console.log("HELLO")
  const allTerms = Object.values(req.app.db.getTerms());
 
  
  /*for (let i = lowerBound; i < upperBound; i++) {
    if (i >= allTerms.length) {
      break;
    }
    terms.push(allTerms[i]);
  }*/

  console.log(allTerms);
  console.log(terms);

 return req.app.db.getTerms().then((allTerms)=> {
    return sendResponse(res, 200, {
    allTerms,
  
  });
  })

};

module.exports = getTerms;
