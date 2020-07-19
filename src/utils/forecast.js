const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c8a5ca572606cf85cc9af8e78023f880&query="
                + longitude + "," + latitude + "&units=m"

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined) //No data
        } else if (body.error) {
            callback('Unable to find location. Try another set of coordinates.', undefined)
        } else {
            const weatherDescription = body.current.weather_descriptions[0] + ". Wind speed: " + body.current.wind_speed + "km/h. The current temperature is "
            + body.current.temperature + "°. It feels like " + body.current.feelslike + "° outside..."
            callback(undefined, {
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                weather: body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                description: weatherDescription
            })
        }
    })
}

module.exports = forecast