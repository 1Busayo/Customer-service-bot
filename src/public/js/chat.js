
const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const botTemplate = document.querySelector('#bot-template').innerHTML


socket.on('message', (message) => {
  console.log(message)
  const html = Mustache.render(botTemplate, {
    message
})
  $messages.insertAdjacentHTML('beforeend', html)

  //document.querySelector('#messages').insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  $messageFormButton.setAttribute('disabled', 'disabled')

  const message = e.target.elements.message.value
 //const message =  document.getElementById("usersays").value
  socket.emit('botMessage',message);



  socket.emit('sendMessage', message, (error) => {
      //$messageFormButton.removeAttribute('disabled')
      $messageFormInput.value = ''
      $messageFormInput.focus()

      if (error) {
          return console.log(error)
      }
    // console.log(message)
    const tim = new Date().getTime();
    const html = Mustache.render(messageTemplate, {
      
     message: message,
     CreatedAt: moment(tim).format('hh:mm:ss a')
     
  })
    $messages.insertAdjacentHTML('beforeend', html)
    console.log('Message delivered!')
  })
})


// document.querySelector('#message-form').addEventListener('submit',(e)=>{
//     e.preventDefault()
//     const message = document.querySelector('input').value

//     socket.emit('sendMessage',message);
//     socket.emit('botMessage',message);

// })



socket.on('botMessage',(message)=>{

  const tim = new Date().getTime();
console.log(message);
const html = Mustache.render(botTemplate, {
  message: message,
     CreatedAt: moment(tim).format('hh:mm:ss a')
})
$messages.insertAdjacentHTML('beforeend', html)
console.log('bot delivered!')

})


