const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//Used for dynamic content. Setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (reqShevo, resShevo) => {
    resShevo.render('index', {
        title: 'Shevo Weather App',
        name: 'Shevo'
    })
})

app.get('/about', (reqShevo, resShevo) => {
    resShevo.render('about', {
        title: 'About a shevo! :)',
        name: 'Some shevo'
    })
})

app.get('/help', (reqShevo, resShevo) => {
    resShevo.render('help', {
        title: 'Help',
        name: 'A helping shevo',
        helpText: 'Help it!',        
    })
})
//Commented because it's actually never called.
// app.get('', (reqShevo, resShevo) => {
//     resShevo.send('<h1>Hello shevo!</h1>')
// })

// app.get('/help', (reqShevo, resShevo) => {
//     resShevo.send([
//         {
//             name: 'Shevo',
//             age: 29
//         },
//         {
//             name: 'Shevo',
//             age: 29
//             },
//     ])
// })

// app.get('/about', (reqShevo, resShevo) => {
//     resShevo.send('<h1>About a shevo!</h1>')
// })

app.get('/weather', (reqShevo, resShevo) => {
    //When there is no address in the query.
    if (!reqShevo.query.address) {
        return resShevo.send({
            error: "You must provide a location"
        })
    }

    geocode(reqShevo.query.address, (error, {latitude, longitude, location} = {}) => { //We set the {} as a default return value.
        if (error) {
            return resShevo.send({
                error: error // or just error would work as well.
            })
        }

        //Callback function chaining. Used to syncronize steps in the process.
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return resShevo.send({
                    error //error: error would work as well
                })
            }
            resShevo.send({
                forecast: forecastData.description,
                location: location,
                address: reqShevo.query.address
            })
        })
    })

    
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (reqShevo, resShevo) => {
    resShevo.render('404', {
        title: '404 Help',
        errorMessage: 'Help not found',
        name: 'Shevo'
    })
})

//Wildcard for matching anything that wasn't matched before.
app.get('*', (reqShevo, resShevo) => {
    resShevo.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Shevo'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

