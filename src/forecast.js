const request = require('request')
const forecast = function (longitude, latitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=ba9b8884862d011963f1612c650b541f&query=' + longitude + ',' + latitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {

            callback('Unable to connect to weather server', undefined)
        }
        else if (response.body.error) {
            callback('Bad coordinates', undefined)
        }
        else {
            callback(undefined, `It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)

        }
    })

}
module.exports = forecast