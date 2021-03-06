const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function backendDone(msg) {
  console.log("backend said:" + msg);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', { payload: input.value }, backendDone);
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);
