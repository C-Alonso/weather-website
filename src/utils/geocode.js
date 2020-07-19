const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY2FybG9zYWxvbnNvZ3R6IiwiYSI6ImNrY294NnhqejAzYWEzMGxncjcwZDc4MXoifQ.uyuMHTH1pS1pF-yN1BSNCQ"

    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined) //No data
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode