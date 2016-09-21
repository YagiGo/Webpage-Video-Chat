var isInitiator;

/* basic idea:
1.进入网页的时候要求输入房间名称，创建房间
2.房间名不是空的时候 发送请求：创建或加入房间
3.如果接收到了full，创建函数，记录房间已经满员
4.如果接收到了empty，创建函数，初始化房间，同时记录房间为空
5.如果接收到了join，创建函数记录加入了哪个房间
 */
room = prompt("Enter the Room:");
var socket = io.connect(); //connect the server
 if (room !== " ") {
     console.log('Joining room: ' + room);
     socket.emit('join or create the room', room);

 }
 socket.on('full',function (room){
     console.log('room' + room + 'is full');
 });
socket.on('empty',function (room){
    isInitiator = true;
    console.log('Room' + room + 'is created');
});
socket.on('join',function (room){
    console.log('Requesting to join room' + room);
    console.log('success');
});
socket.on('log',function (array){
    console.log.apply(console,array);
});
