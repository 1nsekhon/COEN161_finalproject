const sendResponse = require("./utils/sendResponse");

const getUser = (req, res) => {
  const name = req.params.user;

  if (!req.app.userData[name.toLowerCase()]) {
    return sendResponse(res, 404, {
      error: `${user} is not in the database yet`,
    });
  }

  const emailID = req.app.userData[name.toLowerCase()];
  return sendResponse(res, 200, emailID);
};

module.exports = getUser;