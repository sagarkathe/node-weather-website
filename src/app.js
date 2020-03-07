const express = require('express');
const path = require('path')
const app = express();
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');

// define pathf for express config
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set('views', viewPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "sagar"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Sagar"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Help text from node",
        title: "Help page",
        name: "Sagar"
    })
})
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address"
        });
    }
    geocode(req.query.address, (err, {
        longitude,
        lattitude,
        location
    }={}) => {
        if (err) {
            return res.send({
                err
            });
        } else {
            forecast(longitude, lattitude, (err, result) => {
                if (err) {
                    return res.send({
                        err
                    });
                }
                res.send({
                    forecast: result,
                    location,
                    "address": req.query.address
                });
            });
        }
    });
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Sagar",
        error: "Help Article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: "My 404 page",
        title: 404,
        error: "Page not found"

    })
})

app.listen(3000, () => {
    console.log("------- Server started on port 30000")
})