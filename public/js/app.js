console.log('Joe!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => { //'e' stands for event
    e.preventDefault() //Prevent the browser from refreshing
    
    const location = searchElement.value
    
    messageOne.textContent = 'Loading info...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.forecast)
                console.log(data.location)
            }
        })
    })        
})