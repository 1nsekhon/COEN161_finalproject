const path = require("path");
const fs = require("fs/promises");
const { basename } = require("path");
const { puzzle1 } = require(".");

/**
 * @function serveFolder
 * @description Retrieves any file in the staticFilesDirectory. If it
 *              doesn't exist, returns a NOT_FOUND or else it returns an
 *              INTERNAL_ERROR
 */
const serveFolder = function (req, res) {
    console.log("Test 1");
    //wrong method -->send 404
    if (req.method != "GET") {
        res.writeHead(404);
        res.end();
      }
      const pathElements = req.url.split("/");
      const requestedFile = path.join(
        ...pathElements.slice(pathElements.indexOf("public")+1)
      );
  
      console.log(requestedFile);
      if(!requestedFile){
        console.log("Could not find file")
        res.writeHead(404);
        res.end();
        return;
      }
  
      // let path = req.app.staticFilesDirectory;
      console.log("Url=", req.url);
     
      //concatenate path with req.pathname to get correct path
      return fs.readFile(path.resolve(req.app.staticFilesDirectory, requestedFile))
      
    
    .then(function(data){
      //send 200 response and write data (file contents)
      console.log(data);
      res.writeHead(200);
      res.write(data);
      res.end();
      //add to cache
      req.app.cache[req.url] = {
        result: data,
        cachedAtMs: Date.now()
      }

   })
   //error reading file -> send 500 response code 
 
    .catch(function(e) {
    console.log(e.code);
        if(e.code === "ENOENT") res.writeHead(404);
        else res.writeHead(500);
        res.end();
    })
  

};

module.exports = serveFolder;