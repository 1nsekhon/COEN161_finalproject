const pathToRegexp = require("path-to-regexp");

const createTerm = require("./routes/create-term");
const readTerm = require("./routes/read-term");
const updateTerm = require("./routes/update-term");
const deleteTerm = require("./routes/delete-term");
const listTerms = require("./routes/list-terms");
const public = require("./routes/public");

const sendResponse = require("./routes/utils/sendResponse");

const routes = {
  "/public/(.*)": public,
  "/term": {
    POST: createTerm,
  },
  "/term/:term": {
    GET: readTerm,
    PUT: updateTerm,
    DELETE: deleteTerm,
  },
  "/terms(.*)?": {
    GET: listTerms,
  },
};

const routeRequest = function (req) {
  const path = req.url;

  const bestMatch = { matchedRoute: "", params: {}, handler: null };

  for (const [route, handler] of Object.entries(routes)) {
    const match = pathToRegexp.match(route)(path);

    if (match) {
      const hasMorePaths =
        bestMatch.matchedRoute.split("/").length < match.path.split("/").length;

      const hasMoreParams =
        Object.keys(bestMatch.params).length < Object.keys(match.params).length;

      const isNewMatchMoreSpecific = hasMorePaths || hasMoreParams;

      if (isNewMatchMoreSpecific || bestMatch.handler === null) {
        if (typeof handler === "object") {
          if (!handler[req.method]) {
            // match the signature of (req, res) but ignore the caller's req variable
            return (_, res) => sendResponse(res, 405);
          } else {
            bestMatch.handler = handler[req.method];
          }
        } else if (typeof handler === "function") {
          bestMatch.handler = handler;
        }

        bestMatch.params = match.params;
        bestMatch.matchedRoute = route;
      }
    }
  }

  for (const [param, value] of Object.entries(bestMatch.params)) {
    req.params[param] = value;
  }

  return bestMatch.handler;
};

module.exports = routeRequest;
