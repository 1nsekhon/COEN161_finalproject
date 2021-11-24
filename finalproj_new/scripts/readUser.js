const sendResponse = require("./utils/sendResponse");

const getUser = (req, res) => {
  const name = req.params.user;

 /* if (!req.app.userData[name.toLowerCase()]) {
    return sendResponse(res, 404, {
      error: `${user} is not in the database yet`,
    });
  }*/

  return req.app.db.getTermByName(name).then(newUser => {
    return sendResponse(res, 200, newUser.name);
  });
};

module.exports = getUser;