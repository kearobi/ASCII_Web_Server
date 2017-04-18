let http = require("http")
let fs = require('fs');

// let home = "homepage.html";
// let stuff = "stuff.html";
// let styles = "styles.css"
let pagesArray = ["homepage.html","stuff.html", "styles.css", "inpage.js", "favicon.ico"]


let server = http.createServer(function(request, response){
  console.log("request: " + request.url) // => "/stuff.html" vs 'homepage.html'
  let url = request.url.slice(1, request.url.length)

  if (url === ''){
    url = 'homepage.html';
    console.log("changed url");
  }
  // if (url != home && url !=stuff && url != styles){
  //   url='404.html'
  // }
  if (!pagesArray.includes(url)){
    url='404.html'
  }

  console.log('url is: ', url)

  fs.readFile(url,'ascii', function (err, data){
    if(err){
      console.log('Unable to read file.')
    }else{
      if (url.split(".")[1] === "ico"){
        console.log("in ico if statement: " + url);
        response.writeHead(200, {'Content-Type': 'image/x-icon'})
        response.end(data)
      } else if (url.split(".")[1] === "css"){
        console.log("in css if statement: " + url);
        response.writeHead(200, {'Content-Type': 'text/css'})
        response.end(data)
      } else
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(data)
    }
  });
})

// let htmlVar = 'text/html';


server.listen(3000, '127.0.0.1', function(){
  console.log('HTTP Server Started')
})
