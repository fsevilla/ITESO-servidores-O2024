import express from 'express';
import { config } from 'dotenv';

config();

import path from 'path';
import { Server } from 'socket.io';


const app = express();
const port = process.env.PORT || 3000;

app.use('', express.static(path.join(__dirname, '..', 'public')));

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/chat/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
})

const server = app.listen(port, () => {
    console.log(`App is running in port ${port}`);
})

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Se conecto un cliente');

    socket.on('joinRoom', (roomId) => {
        socket.join('room-' + roomId);
    })

    socket.on('sendNewMessage', (data) => {
        console.log('Recibiste un mensaje: ', data);

        // io.emit()
        socket.to('room-' + data.room).emit('messageReceived', data);
    })
});