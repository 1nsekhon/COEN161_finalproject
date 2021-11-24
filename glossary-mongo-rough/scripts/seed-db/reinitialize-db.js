const fs = require("fs").promises;
const path = require("path");

const { MongoClient } = require("mongodb");
const TermsCollection = require("../../mongodb/TermsCollection");

const mongoConfigPath = path.join(__dirname, "../", "../", "mongo.config.json");
const seedDataPath = path.join(__dirname, "data.json");

const mongoSetup = fs.readFile(mongoConfigPath, "utf-8").then((contents) => {
  const mongoConfig = JSON.parse(contents);

  const uri = [
    mongoConfig.scheme,
    `${mongoConfig.username}:${mongoConfig.password}`,
    `@${mongoConfig.address}/${mongoConfig.defaultDatabase}`,
    "?retryWrites=true&w=majority",
  ].join("");

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.connect().then(() => {
    return {
      db: TermsCollection(client),
    };
  });
});

const seedData = fs.readFile(seedDataPath).then((contents) => {
  const data = JSON.parse(contents);
  return data;
});

return Promise.all([mongoSetup, seedData]).then((promises) => {
  const mongoClient = promises[0];
  const initialData = promises[1];

  return mongoClient.db
    .dropAll()
    .then(() => {
      const wordsInserted = [];

      for (const data of initialData) {
        const createTermPromise = mongoClient.db.createTerm({
          word: data.word,
          definitions: data.definitions,
          tags: data.tags,
          acronym: data.acronym,
        });

        wordsInserted.push(createTermPromise);
      }

      return Promise.all(wordsInserted);
    })
    .then(() => {
      return mongoClient.db.getAllTerms();
    });
});
