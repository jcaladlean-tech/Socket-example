var net = require('net')
var port = 8000;


var server = net.createServer(function(socket){
    socket.write('Echo server:\n');

    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    socket.write("Welcome " + socket.name + "\n");

    socket.on('data', function(data){
        buf1 = Buffer.from('juan\r\n')
        x = Buffer.compare(buf1, data);
        if(x === 0){
            socket.write(`Message to ${socket.name}: Hi ${data}`);    
        }else{
            socket.write(`Message to ${socket.name}: I dont know what is ${data}`);
        }
        
        
    });
});

server.listen(port);