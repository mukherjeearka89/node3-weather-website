const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

/// in oder to get the path of the file / ofolder we need some strig manupulation
//console.log(path.join(__dirname,'../public'))

/// DEFINE PATH FOR EXPRESS CONFIG
const publicDiretoryPath = path.join(__dirname,'../public') ///DEFAULT LOCATION
const viewsPath = path.join(__dirname,'../templates/views') //CUSTOM LOCATION
const partialsPath = path.join(__dirname,'../templates/partials') //CUSTOM LOCATION




//// SET UP HANDLERS ENGINE AND VIEW LOCATION
app.set('view engine','hbs')
app.set('views',viewsPath) // CUSTOM PATH DECLARATION
hbs.registerPartials(partialsPath) // CUSTOM PATH DECLARATION

app.use(express.static(publicDiretoryPath))

// get the request from the browser
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Arka Mukherjee'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About us',
        about:'Hello world',
        name : 'Arka Mukherjee'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        helptext: 'Hello world'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        projectName:'Windaily',
        errorMessage:'404, Help article not found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            errorMessage:'Address csn not be empty'
        })
    }
    /*geocode(req.query.address, (error, {latitude, longitude, location})=>{
        if(error){
            return res.send({error})
        }
    // console.log('Data', data)
            forcast(latitude, longitude, (error, forcastData)=>{
                if(error){
                    return res.send({error})
                }
                //console.log('error', error)
                return res.send({
                    forcast: forcastData,
                    location,
                    address: req.query.address
                })
                
            })
    })*/
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
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
    
    // console.log(req.query.address)
    // res.render('weather',{
    //     address:req.query.address,

    // })
})

//// QUERY STRING ///
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            errorMessage:'Missing search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

//// END QUERY STRING ///

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        projectName:'Windaily',
        errorMessage:'404, Page not found'
    })
})
// app.get('',(req, res)=>{ // req = request, res = respond
//     res.send('Hello Express')
// })
// app.get('/help',(req, res)=>{ // req = request, res = respond
//     res.send('Help')
// })
// app.get('/about',(req, res)=>{ // req = request, res = respond
//     res.send('<h1>About</h1>')
// })
// app.get('/weather',(req, res)=>{ // req = request, res = respond
//     res.send({
//         forcast:'Snowing',
//         location:'Philadelphia'
//     })
// })

// to start the server
app.listen(3000,()=>{
    console.log('Server is runing on port 3000')
})