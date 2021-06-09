const express = require('express')
const path = require('path')
const app = express()
const geocode = require('./geocode.js')
const forecast = require('./forecast.js')
const publicDirectoryPath = path.join(__dirname, '../public')

const port = process.env.PORT || 3000
app.use(express.static(publicDirectoryPath))





app.set('view engine', 'hbs') // integration of handle bar and express
// render dynamic content using handlebars
// we have to create a folder named as views



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ABC'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "this is about section"
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        content: "this is the help section"
    })
})
// query string - these are values which are provided as a key value pairs in the url
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// we are using destructuring when providing parameters to geocode callback
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error }) // use of shorthand
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    /*console.log(req.query.address)
    res.send(
        {
            current: "cloudy",
            //location: "Jaipur",
            address: req.query.address
        }
    )*/
})
// error 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})
// error 404 end


app.listen(port, () => {


    console.log('Server is up on port 3000.')
})
