const socket = io('http://localhost:8000', { transports : ['websocket'] });

// Get DOM elements in respective JS variables
const form  = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

//Audio that will play on receving message
var audio = new Audio('ting_ting_cool_message.mp3');


//Function that will append event info to the container
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position == 'left'){
        audio.play();
    }
}


// If forms gets submitted send server the message 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})



const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name );

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

// If a server sends a message recieve it
socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves a chat append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
})
