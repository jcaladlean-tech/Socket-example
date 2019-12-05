
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

// client.on('connect', function(){
//     console.log("server en puerto " + port + " de " + host);
//     client.removeAllListeners('error');
//     client.destroy();
// })

client.on('data', function(data){
    process.stdout.write(data);
});

client.on('error', function(){
    console.log("Sin servidor en puerto " + port + " de " + host);
    client.destroy();
    process.exit();
})

process.stdin.resume();