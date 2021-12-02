const mongodb = require("mongodb");
const normalizeTerm = require("./models/normalizeTerm");
const UserDocument = require("./models/userDocument");

const FIND_LIMIT = 10;

const UsersCollection = (client) => {
  const collection = client.db("finalproj").collection("users");
  return {
    createUser: ({ name, email }) => {
      const document = UserDocument({
        name,
        email,
      });
      return collection.insertOne(document).then(() => {
        return document;
      });
    },
    getUserByName: (name) => {
      console.log("GET TERMS BY: " + name);
      return collection.findOne({
        normalizeTerm: normalizeTerm(name)
      }).then((result)=> {
        console.log(result);
        return result;
      });
    },
    
    
  };
};

module.exports = UsersCollection;