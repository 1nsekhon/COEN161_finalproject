const User = require("./user");
const normalizeTerm = require("./normalizeTerm");

/*const userDocument = ({ name, emailID}) => {
  let __emails = [];

  for (const em of ) {
    if (typeof em === "string") {
      __emails.push(User[em].emailId);
    } else if (typeof em === "object" && em.type === "User.email") {
      __emails.push(em);
    }
  }*/
const userDocument = (name) => {

return {
    normalizedName: normalizeTerm(name),
    name
    //emailID: __emails
  };
};

module.exports = userDocument;
