console.log('This is client side')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', event => {
  event.preventDefault()
  const address = search.value
  messageOne.textContent = 'Loading weather forecast now.....'
  messageTwo.textContent = ' '

  fetch(`/weather?address=${address}`).then(response => {
    response.json().then(data => {
      const {error, location, forecast} = data
      if (error) {
        messageOne.textContent = error
      } else {
        messageOne.textContent = location
        messageTwo.textContent = forecast
      }
    })
  })
})
