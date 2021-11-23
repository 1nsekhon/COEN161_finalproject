const { MongoClient } = require('mongodb');
const http = require("http");
const pathToRegexp = require("path-to-regexp");
const Routes = require("./scripts");
const fs = require("fs/promises");
const path = require("path");
const UsersCollection = require("./mongodb/UsersCollection");
//const Images = require("./images");
// const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
async function connect(){
  const uri = "mongodb+srv://dbUser:Goo92pre@cluster0.i5fcw.mongodb.net/finalproj?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    let server = http.createServer(requestListener);
    server.listen(8080);

    console.log("connect");
  }catch(err){
    console.error(err);
  }finally{
    await client.close();
  }

    /*client.connect(err => {
      if (err){
        console.log("error");
      // throw err;
      }
      else {
        console.log("connect");
      }*/

}


  //let db = client.db("finalproj");
  //console.log("db: ", db);
  
  //const collection = client.db("finalproj").collection("users");
  //collection.insertOne({name: "test", emailID: "test@gmail.com"});
  
  
  // perform actions on the collection object
  //client.close();
/*});.then(() =>{
  
}).catch((err)=>{
  console.log("error: " , err);
});*/

let cache = {};


 let routingTable = {
   "/": Routes.home,
   "/public": Routes.public,
   "/puzzle1": Routes.puzzle1,
   "/puzzle2": Routes.puzzle2,
 
 }


const routeRequest = function (req) {

  let path = req.url;
  
  let keys = Object.keys(routingTable);
  console.log(path);


  for (let key of keys){
    //use pathToRegxp to match key of routingTable with url 
    const urlmatch = pathToRegexp.match(key, {decode: decodeURIComponent});
    console.log(urlmatch(path));
    if (urlmatch(path) == false){
      continue; //move on to the next key
    }
    else {
      return routingTable[key]; //return the value of the associated key in routingTable 
    }
  }
  // return null;
  return routingTable["/public"];
};

 
const requestListener = function (req, res) { 
  console.log("Listening");
  
    const staticFilesDirectory = process.argv[2]; //will be passed in as a command line argument
    
    //create object that stores contents for staticFilesDir and cache
    req.app = {
      "staticFilesDirectory": staticFilesDirectory,
      "cache": cache,
      //"db": UsersCollection(client),
    };

   

    //contents of cache
    cachedBody = req.app.cache[req.url];
    console.log("Test 1");
    //if the cachedBody has contents and is accessed within 5 seconds of it being cached
    if((cachedBody) && ((Date.now() - cachedBody.cachedAtMs)<= 5000)) { //amount of time since cached
      return cachedBody.result;
    } 
    else { //go through route req and match url from there 
      console.log("Test 2");
      let routereq = routeRequest(req);

      //send 404 if error 
      if (routereq == null){
        console.log("Test 3");
        res.statusCode = 404;
        res.end();
      }
      else {
        console.log("Req url=", req.url)
        routereq(req,res);
      }
      
    }
  
};
fs.readFile(path.join(__dirname, "mongo.config.json"), "utf-8")
  .then((contents) => {
    const mongoConfig = JSON.parse(contents);
    console.log("parsed");
    const uri = "mongodb+srv://dbUser:Goo92pre@cluster0.i5fcw.mongodb.net/finalproj?retryWrites=true&w=majority";
    console.log("success obtaining uri");
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("client defined");
    return client.connect().then(() => {
      console.log("connect");
      return {
        db: UsersCollection(client),
      };
    });
  })
  .catch((err) => {
    console.log("error");
    if (err.code === "ENOENT") {
      console.log("ENOENT");
      return {
        userInfo: {},
        file: "userInformation.json",
      };
    }

    if (err instanceof SyntaxError) {
      console.error("DB is corrupted, cannot read as JSON");
      process.exit(1);
    }

    console.error(err);
    process.exit(1);
  })
  .then(() => {
    const server = http.createServer(requestListener);
    server.listen(8080);
});
// This block only gets run when you invoke this as "node server.js <args>"
// This block will NOT be run when you use "npm run grade".
if (require.main === module) {

  if (process.argv.length < 3){
    console.error("need more arguments");
    process.exit(1);
  } 
  //connect().catch(console.error);

 /*let server = http.createServer(requestListener);
  server.listen(8080);*/
}

module.exports = { requestListener };
