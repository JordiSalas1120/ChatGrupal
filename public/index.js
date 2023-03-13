

const socket = io();



socket.on('nuevo_usuario', function(datos){
   console.log(`nuevo usuario conectado: ${datos.user}`)
   alert(`Se conecto ${datos.usergit }`)
})

socket.on('new_message', function(datos){
    const {usuario, mensaje} = datos;
    const contenedor = document.querySelector('#contenedor-mensajes');
    
    const contenedorMensaje = document.createElement('div')
    contenedorMensaje.classList.add('contenedor-mensaje')
    contenedorMensaje.innerHTML = `<strong>${usuario}: </strong><p>${mensaje}</p>`

    contenedor.appendChild(contenedorMensaje)

})




function login(){
    const emailInput = document.querySelector('#email').value
    const usuario = document.querySelector('#user').value
    if(emailInput=='' || usuario == ''){
        mensajeError('Todos los campos son necesarios', 'error')

    }else{
        
        socket.emit('datos_usuario', {
            correo: emailInput,
            usuario: usuario
        })
        mensajeError(`Bienvenido al chat ${usuario}`, 'succes')
    }
    
  
}
function sendMessage(){
    const mensaje = document.querySelector('#mensaje').value;
    const usuario = document.querySelector('#user').value
    if(mensaje == ''){
        mensajeError('No se puede enviar un mensaje vacio', 'error')
        return
    }
   
    socket.emit('send_mensaje',{mensaje:mensaje, usuario:usuario})
    document.getElementById("mensaje").value = "";
    
}

function mensajeError(mensaje,tipo){
    const divError = document.createElement('div')
    divError.classList.add('text-center', 'd-back', 'col-12', 'alert', 'font-bold','h3')
    if(tipo == 'error'){
        divError.classList.add('alert-danger')
    }else{
        divError.classList.add('alert-success')
    }
    divError.textContent = mensaje;
    document.querySelector('.formulario').insertBefore(divError, document.querySelector('.boton'));
    setTimeout(() => {
        divError.remove()
    }, 2000);
}