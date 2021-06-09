const path = require('path') // node module
const express = require('express')

//console.log(path.join(__dirname, '../public')) path can be used to change the directory or if we want to pass the path to a directory to some function
const publicDirectoryPath = path.join(__dirname, '../public')


const app = express()

app.use(express.static(publicDirectoryPath))// This is used to add html file to our server

const about = path.join(__dirname, '../public/about')
app.use(express.static(about))
// sending html as a response
app.get('', (req, res) => {
    res.send('<h1>weather</h1>')
})

//sending object as a response
app.get('/help', (req, res) => {

    res.send({
        name: "Gaurav",
        location: "Jaipur"
    })// res.json - check
})
app.get('/title', (req, res) => {
    res.send('<h2>Web App</h2>')
})
app.get('/current', (req, res) => {
    res.send({
        current: "cloudy",
        location: "Jaipur"
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
