//const User = require("./user");
const normalizeTerm = require("./normalizeTerm");

const userDocument = ({ name, email}) => {

return {
    normalizeTerm: normalizeTerm(name),
    name,
    email
  };
};

module.exports = userDocument;
