// Node server which will handle socket io connection

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {

    // If any new user joins let other users connected to server know
    socket.on('new-user-joined', name => {
        // console.log('New user', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });


    //If someone sends a message let other users connected to server know
    socket.on('send', message => {
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });


    // If somones leave the chat let other users connected to server know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})