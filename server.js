var express = require('express') //getting express
app = express(); 
var server = require('http').createServer(app)//creating server variable with http
var io = require('socket.io').listen(server)//creating socket io

users = []
connections = []

server.listen(process.env.PORT | 3000)
console.log('Server running...')

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connect',function(socket){
    connections.push(socket)
    console.log('Connected: %s socket connected',connections.length)

    //disconnect

    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1)
        console.log('Disconnected %s sockets connected',connections.length)
    })

    //send message
    socket.on('send message',function(data){
        //emit new message and pass the data
        io.sockets.emit('new message',{msg:data})
    })
})