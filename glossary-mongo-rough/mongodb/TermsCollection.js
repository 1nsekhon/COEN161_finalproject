const mongodb = require("mongodb");
const normalizeTerm = require("./utils/normalizeTerm");
const TermDocument = require("./models/termDocument");

const FIND_LIMIT = 10;

const TermsCollection = (client) => {
  const collection = client.db("profsDB").collection("glossary");
  return {
    createTerm: ({ word, definitions, tags, acronym, lecture }) => {
      const document = TermDocument({
        word,
        definitions,
        tags,
        acronym,
        lecture,
      });
      return collection.insertOne(document).then(() => {
        return document;
      });
    },
    getTermByWord: (word) => {
      //console.log("GET TERMS BY: " + word);
      return collection.findOne({
        normalizedWord: normalizeTerm(word),
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

module.exports = TermsCollection;
