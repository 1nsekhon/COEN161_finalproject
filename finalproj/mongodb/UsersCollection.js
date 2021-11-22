const mongodb = require("mongodb");
const user = require("./models/user");

const FIND_LIMIT = 10;

const UsersCollection = (client) => {
  const collection = client.db("finalproj").collection("users");
  return {
    createUser: ({ name, emailId }) => { //post
      const document = user({
        name,
        emailId,
      });
      return collection.insertOne(document).then(() => {
        document;
      });
    },
    getUserByName: (userName) => {
      return collection.findOne({
        name: userName,
      });
    },
    getUserByEmailId: (userEmailId) => {
     return collection.findOne({
       emailId: userEmailId,
     })
    },
    /*updateTermByWord: (word) => {
      /**
       * code this one too :D
       
    },
    dropAll: () => {
      return collection.deleteMany();
    },
    updat,*/
  };
};

module.exports = TermsCollection;