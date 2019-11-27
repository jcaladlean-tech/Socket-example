
/****************************************************************************************/
/*****************                            CLIENTE             ***********************/
var net = require('net')
var port = 8000;
var host = "localhost";


var client = new net.Socket();


client.connect(port, host);

process.stdin.on('data', function(data){
    client.write(data);
});

client.on('data', function(data){
    process.stdout.write(data);
});

client.on('error', function(){
    console.log("Sin servidor en puerto " + port + " de " + host);
    client.destroy();
    process.exit();
})

process.stdin.resume();

/****************************************************************************************/
/*****************                            SERVER              ***********************/


var server = net.createServer(function(socket){
    socket.write('Echo server:\n');

    socket.on('data', function(data){
        buf1 = Buffer.from('juan\r\n')
        x = Buffer.compare(buf1, data);
        if(x === 0){
            socket.write(`Hi ${data}`);    
        }else{
            socket.write(`I dont know what is ${data}, I expected your name`);
        }
        
        
    });
});

server.listen(port);