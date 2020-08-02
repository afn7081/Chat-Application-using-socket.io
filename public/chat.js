// Make connection to server to create the web socket between the two
// the socket in frontend
var socket= io.connect('http://localhost:4000')  // we have access to this coz we have logged it in the index.html
// part 1 over

// Query DOM
//.getElementById because we're getting them by input id i index.html (line 20->)
var message = document.getElementById('message'),   // these all are the variables (message,btn,output,feedback) which is used as an handle in the index.html (line 18-22)
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
// vanilla JS for listening an event and here we are using a click event
btn.addEventListener('click', function(){
  socket.emit('chat', {          // emit a message/message to recive it on client
      //  emit function takes 2 parameters 1st is name of message called chat
      //  2nd will be an object inside '{}' that we'll to server with 2 parameter
      message: message.value,  // takes the value of the input field (message)
      handle: handle.value    // takes the value of the input field (handle)
  });
  message.value = "";
});

message.addEventListener('keypress', function(){  //in the message fiels add the keypress event listenner
    socket.emit('typing', {
      handle: handle.value}); //inside the function we emit an event/message into server and the message to be sent is typing
    // we'll also send some data which is the name of the sender in the handle field which will be displayed on other chat windows
});

// Listen for events
socket.on('chat', function(data){  // fireback the callback function data on client side
    feedback.innerHTML = '';       //we're listening to the chat event after the click send and we'll send a feedback.inn..  with an empty string
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    // .innerHTML to assign the different html to that div
    // '+=' add this string to the html
    // function(data) will be used in data.handle and '+' to add in more message
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing...</em></p>';
    // add on to the existing string here we use <em> to slant the fonts
});
