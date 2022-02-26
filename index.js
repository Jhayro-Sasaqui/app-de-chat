const express = require('express');
const app = express();
const http = require('http');
const { disconnect } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('mensajito: ' + msg);
        io.emit('chat messsage', msg);
    });
    console.log('una estudiante conectada');
    socket.on('disconnect', () => {
        console.log('la estudiante se desconecto');
    });
});
//https://www.tutorialspoint.com/socket.io/socket.io_broadcasting.htm#:~:text=Broadcasting%20means%20sending%20a%20message%20to%20all%20connected,the%20clients%2C%20we%20can%20use%20the%20io.sockets.emit%20method.
/*var clients = 0;

io.on('connection', function(socket){
    clients++;
    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
    socket.on('disconnect', function () {
       clients--;
       io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
    });
 });*/

server.listen(3333, () => {
    console.log('servidor corriendo en el puerto *:3333');
});