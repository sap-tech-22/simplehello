//Declare the use of standard module http
const http = require('http');
//Declare the use of standard module url
const url = require('url');
//Initiate the server by using createServer method of http module. It takes a callback function as an input
//i.e. whenever someone accesses the server the function is triggered. The function is named as
//input_action in this case.
const server = http.createServer(input_action);
//Enable port on which the server will be accessible in a local machine.
//the listen method takes two inputs: port number and a callback function. When the server is up the callback function is triggered.

let port = process.env.VCAP_APP_PORT || 8888;
server.listen(port, server_status);
//https://port8888-workspaces-ws-jz2rj.us10.trial.applicationstudio.cloud.sap/
//This function is triggered when the server receives any request. It has two parameters: request and response
function input_action(request, response) {
 //The request contains many details. We are now only interested with the path and data entered
 //The parse method of url module can help to distinguish the path and any parameters entered from the request url.
 //Here is a sample link we can pass in browser: http://localhost:8888/home?name=Anupam
 //In this example request.url will contain /home?name=Anupam
 let pathname = url.parse(request.url).pathname; //pathname is extracted from url as /home
 //Parse method needs an extra parameter as true when we process the query part
 let name = url.parse(request.url, true).query.name; //name is extracted as Anupam
 //Print Hello and the name entered in the console.
 console.log('Hello ' + name);
 //Here we can send a response to the source. As it's being called from a browser, a response will be passed, and browser can display it as text
 //In an ideal situation this could be an entire web page or a JSON
 //Setting the status as 200 and specifying type of return as text
 response.writeHead(200, {
 'content-Type': 'text/plain'
 });
 //Passing Hello Anupam in the response. This will be displayed in the browser
 response.write('Hello ' + name);
//Finish response.
 response.end();
}
//This function is triggered from the listen method as soon as the server starts
function server_status() {
 console.log('Server started.');
}