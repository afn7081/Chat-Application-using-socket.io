// npm install express --save    (cmd)(to save express and save in devDependencies)
// install node js
// node index       (cmd) (to start server once created)
var express = require('express');  //write express in require so we can use it in the project
// the word express here is a var function

// npm install socket.io --save   (cmd)(to install & setup socket.io in project)
var socket = require('socket.io');


// App setup
var app = express();    // invoking the function
const PORT=process.env.PORT;

// .listen to make it lesten to aspecific port number
var server = app.listen(PORT||4000, function(){      // when it starts listening we can call back funtion
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
//this will make the host access the public folder nad the index.html page in it

// Socket setup & pass server
var io = socket(server);    // io is a variable here &socket is a function which is invoked here
// this means we want socket.io to work on this server and will setup the server in backend
io.on('connection', function(socket){  // this will listen for an event called connection with a call back function

    console.log('made socket connection', socket.id);   //  socket will give junks of properties but socket.id will give only the id property

    // Handle chat event    1st listenner
    socket.on('chat', function(data){  //after the input value of message and handle in chat.js(line 19) the data is passed as a parameter to function
      // we want to send the data to all the clients connected to the websocket to see & for that we emit to all
        // console.log(data);
        io.sockets.emit('chat', data);  // io.socket refers to all the socket connected to the server
        // .emit function call to emit a message to each of them
        // .emit has parameters (type of data , send the data back  )
    });

    // Handle typing event       2nd listenner
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);  //we'll not io.socket here , isted we'll broadcast the message to every other client
    });
});
