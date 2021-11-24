
const readBody = require("./utils/readBody");
const sendResponse = require("./utils/sendResponse");

const createTerm = (req, res) => {
  return readBody(req).then((requestBody) => {
    const body = JSON.parse(requestBody);

    if (!body.name || !body.emailID) {
      return sendResponse(
        res,
        400,
        `Must include both a name and emailID field in Create request`
      );
    }

    const user = {
      name: body.name,
      emailIDs: [body.emailID],
    };


    return req.app.db.createTerm(user).then((newUser) => {
      return sendResponse(res, 201, JSON.stringify(newUser));
    });
  });
};

module.exports = createTerm;
