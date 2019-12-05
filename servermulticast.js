var net = require('net')
var port = 8000;

var clients = [];

var server = net.createServer(function(socket){
    socket.write('Echo server:\n');

    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    clients.push(socket);

    // Send a nice welcome message and announce
    socket.write("Welcome " + socket.name + "\n");
    broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on('data', function(data){
        broadcast(socket.name + "> " + data, socket);
    });

    // Remove the client from the list when it leaves
    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        broadcast(socket.name + " left the chat.\n");
      });

    function broadcast(message, sender) {
        clients.forEach(function (client) {
          client.write(message);
        });
        // Log it to the server output too
        // process.stdout.write(message)
      }


});

server.listen(port);