const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...
console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/lauraSecordPlayer', function( req, res ){ 
    res.sendFile( __dirname + '/public/lauraSecordPlayer.html' );
});

app.get( '/soldierPlayer', function( req, res ){ 
    res.sendFile( __dirname + '/public/soldierPlayer.html' );
});

//websockets
io.on('connection', (socket) => {
//arrow is function (socket)
    console.log(socket.id + ' is connected');

    socket.on('disconnect', () => {
        console.log(socket.id + ' is disconnected');
    });

    //custom events


    //setIntervalFunc
});