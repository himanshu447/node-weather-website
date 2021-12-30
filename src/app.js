const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const geoWeather = require('../utils/geoweather');

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//set static directory to serve for server (assign static files or images or CSS to server)
app.use(express.static(publicDirectoryPath));

//setup(new Setting assign to server) handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewPath);

//setup partial to handle dynamic content to all of pages(header and footer) for reduce code (resuable code)  
hbs.registerPartials(partialPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Himanshu',
        body: 'Hello how are you'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jenil',
        body: 'Hello how are you'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Raj',
        body: 'Hello how are you'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Himanshu',
        errorMessage: 'Help article not found. '
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a Address'
        });
    }

    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error,
            });
        }

        geoWeather(req.query.address, (error, weatherData) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            res.send({
                data,
                weatherData,
            });
        });
    });
});

///Handle 404 page
app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Himanshu',
        errorMessage: '404 page not found',
    });
});

app.listen(port, () => {
    console.log('Server Start in ' + port);
})