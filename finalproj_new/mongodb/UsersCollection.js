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
    getTermByName: (name) => {
      console.log("GET TERMS BY: " + name);
      return collection.findOne({
        normalizeTerm: normalizeTerm(name)
      }).then((result)=> {
        console.log(result);
        return result;
      });
    },
    /*getTerms: () => {
      return collection.findMany({}).then(result => {
        return result;
      });/*.find().then((result)=> {
        return result;
      });*/
   // },
    getTermsByLecture: (lecture) => {
      /**
       * code this one
       */
    },
    updateTermByWord: (word) => {
      /**
       * code this one too :D
       */
    },
    dropAll: () => {
      return collection.deleteMany();
    },
    //updat,
  };
};

module.exports = UsersCollection;