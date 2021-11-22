const { MongoClient } = require('mongodb');
const http = require("http");
const pathToRegexp = require("path-to-regexp");
const NodeCache = require("node-cache");
const Routes = require("./scripts");
const fs = require("fs/promises");
const path = require("path");
//const usersCollection = require("UsersCollection");
//const Images = require("./images");
// const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const uri = "mongodb+srv://dbUser:Goo92pre@cluster0.i5fcw.mongodb.net/finalproj?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err){
    console.log("error");
   // throw err;
  }
  else {
    console.log("connect");
  }

  //let db = client.db("finalproj");
  //console.log("db: ", db);
 /* const collection = client.db("finalproj").collection("users");
  console.log("connection: ", collection.find().pretty());*/
  //collection.insertOne({name: "test", emailID: "test@gmail.com"});
  
  
  // perform actions on the collection object
  //client.close();
});/*.then(() =>{
  
}).catch((err)=>{
  console.log("error: " , err);
});*/

let cache = {};


 let routingTable = {
   "/": Routes.home,
   "/public": Routes.public,
   "/puzzle1": Routes.puzzle1,
   "/puzzle2": Routes.puzzle2
 }

/**
 * @function routeRequest
 * @description Given a request object from Node.js, returns
 *              a handler function to call. Also assigns the
 *              req.params object to any parameters in the request.
 *              For parsing parameters in a URL, it should use
 *              the path-to-regexp library - https://github.com/pillarjs/path-to-regexp
 * @param {http.ClientRequest} req - The http.ClientRequest to route
 * @returns {function(http.ClientRequest, httpClientResponse)} a request handler
 */
const routeRequest = function (req) {
  /**
   * Take the routeRequest function from homeework and it should roughly
   * work in here. You might have to change somee things around.
   */
  let path = req.url;
  
  let keys = Object.keys(routingTable);
  console.log(path);

  // if(path.startsWith("/public")){
  //   return routingTable["/public"];
  // }

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

/**
 * @function requestListener
 * @description Routes the http.ClientRequest based on the pathname. This will
 *              be siimilar to classwork we do in Week 5.
 *
 * @param {http.ClientRequest} req - The http.ClientRequest to route
 * @param {http.ServerResponse} res - the http.ServerResponse that will be sent
 *
 * @returns
 */
const requestListener = function (req, res) { 
  console.log("Listening");
  /**
   * Take the body of the anonymous function returned from the requestListener homework
   * and paste it into here. You want the code  that starts with reteurn function(reeq, res)
   */
    const staticFilesDirectory = process.argv[2]; //will be passed in as a command line argument
    
    //create object that stores contents for staticFilesDir and cache
    req.app = {
      "staticFilesDirectory": staticFilesDirectory,
      "cache": cache
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
/*fs.readFile(path.join(__dirname, "mongo.config.json"), "utf-8")
  .then((contents) => {
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
      console.log("connect");
      return {
        db: UsersCollection(client),
      };
    });
  })
  .catch((err) => {
    console.log("error");
    if (err.code === "ENOENT") {
      return {
        glossary: {},
        file: "dictionary.json",
      };
    }

    if (err instanceof SyntaxError) {
      console.error("DB is corrupted, cannot read as JSON");
      process.exit(1);
    }

    console.error(err);
    process.exit(1);
  });
  /*.then(() => {
    const server = http.createServer(requestListener);
    server.listen(8080);
});*/
// This block only gets run when you invoke this as "node server.js <args>"
// This block will NOT be run when you use "npm run grade".
if (require.main === module) {
  /**
   * @task Make sure that you take in 1 command line argument
   * which specifies where all the static files are.
   */
  if (process.argv.length < 3){
    console.error("need more arguments");
    process.exit(1);
  } 

  /**
   * @task Create and start a server using `http.createServer`. If
   * the request has  a url field, route it using the Routing Table
   * created about. If it doesn't exist, send a 404
   */
  let server = http.createServer(requestListener);
  server.listen(8080);

}

module.exports = { requestListener };
