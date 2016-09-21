/**
 * Created by ZhaoxinWu on 16/9/21. All rights reserved.
 */
var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var app = http.createServer(function (req,res) {
    file.serve(req,res);
}).listen(2016);
var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
    function log(){
        var array = ["Message From Server:"];
        for (var i = 0;i < arguments.length; i++) {
            array.push(arguments[i]);
        }
        socket.emit('log',array);
    }

    socket.on('message', function (message) {
        log('Got Message:', message);
        socket.broadcast.emit('Message: ',message);
    });

    socket.on('join or create the room', function (room){
        var numClients = io.of('/').in(room).clients.length; 
        log ('Room has' + numClients + 'Members');
        log ('Request to join room', room);

        if (numClients == 0){
            socket.join(room);
            socket.emit('empty',room);

        }
        else if (numClients == 1) {
            io.sockets.in(room).emit('join',room) //向所有人数为1的房间都发送加入的请求，等待客户端回应
            socket.join(room);
            socket.emit('join',room);
        }
        else {
            socket.emit('full', room);
        }

        socket.emit('emit(): client ' + socket.id + 'has joined room' + room); //宣布加入房间
        socket.broadcast.emit('broadcast(): client ' + socket.id + 'has joined room' + room); //向所有人宣布有人加入某房间


    });

});