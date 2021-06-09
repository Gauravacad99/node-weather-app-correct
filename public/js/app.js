console.log('client side javascript is here')
// fetch('http://localhost:3000/weather?address=jaipur').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log("error")
//         }
//         console.log(data.location)
//         console.log(data.forecast)



//     })
// })

const element = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
element.addEventListener('submit', (e) => {
    //handle the form data
    e.preventDefault() // stop the form being submitted
    message1.textContent = 'loading message'
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message1.textContent = 'Unable to find location. try another search'
            }
            console.log(data.location)
            console.log(data.forecast)
            message1.textContent = data.forecast
            message2.textContent = data.location



        })
    })
})
