import express from 'express'
import hbs from 'hbs'
import request from 'postman-request'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'
import {fileURLToPath} from 'url'
import path from 'path'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url) // Path to current file (web-server/src/app.js)
const __dirname = path.dirname(__filename) // Path to current directory (web-server/src/)

// Get the path to where the public directory and the views are located
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Prakash Acharya',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Prakash Acharya',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Prakash Acharya',
    helpText: 'This is a helpful text',
  })
})

app.get('/weather', (req, res) => {
  const {address} = req.query

  if (!address) {
    return res.send({error: 'You must provide an address.'})
  }
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      return res.send({
        location,
        address,
        forecast: forecastData,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    })
  }
  res.send({
    products: [],
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Prakash Acharya',
    errorMessage: 'Page not found.',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
