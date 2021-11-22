/*const button = document.querySelector('.puzzle1 button');
button.addEventListener('click', () => {

})*/
const path = require("path");
const fs = require("fs/promises");


const servePuzzle1 = function (req, res) {
    if (req.method !== "GET") {
        res.writeHead(405);
        res.end();
    }
     
    let path = req.app.staticFilesDirectory;
    
    return fs.readFile(path + '/puzzle1.html')
    //send 200 response and write in data 
    .then(function(data){
        res.writeHead(200);
        res.write(data);
        res.end();
        //add to cache
        req.app.cache[req.url] = {
          result: data,
          cachedAtMs: Date.now()
        }
    })
    //error -> send 500 response code 
    .catch(function(e) {
      console.log(e)
      res.writeHead(500);
      res.end();
    })
      
};

module.exports = servePuzzle1;