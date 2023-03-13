
const express = require('express')
//import socket from 'client/'

const app = express()
const server = require('http').createServer(app)

//definimos elpuerto
const port = process.env.PORT || 4000

server.listen(port);
const io = require("socket.io")(server);

app.use(express.static('public'))

io.on('connect', function (socket){
    console.log(`se creo nueva conexion: ${socket.id}`);
    socket.on('datos_usuario', function(datos){
        console.log(`correo de usuario: ${datos.correo} Usuario: ${datos.usuario} id: ${socket.id}`);
        io.emit('nuevo_usuario', {user: datos.usuario})
    })
    socket.on('send_mensaje', function({mensaje,usuario}){
        console.log(`Mensaje: ${mensaje} User: ${usuario}`);
        io.emit('new_message', {
            mensaje:mensaje,
            usuario: usuario})
    })
})

