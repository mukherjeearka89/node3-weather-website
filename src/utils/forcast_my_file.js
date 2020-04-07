/// APP START/////
// /// darkweb access token : 808beda40c88ee8b365e1489b17635cf
// const url = 'https://api.darksky.net/forecast/808beda40c88ee8b365e1489b17635cf/37.8267,-122.4233' // see the darkweb api documentation to pass various parameters
// /// mapbox access token : pk.eyJ1IjoibXVraGVyamVlYXJrYTg5IiwiYSI6ImNrNnJ3eXE3cDA3OXAzZWxnaW80anliZ3MifQ.BxRTW-vHtPe9b6iPcM5htQ
const request = require("request")
const forcast = (lat, long, callback)=>{
    const url = 'https://api.darksky.net/forecast/808beda40c88ee8b365e1489b17635cf/'+lat+','+long // see the darkweb api documentation to pass various parameters
   // console.log(url)
    request({url : url, json:true},(error, Response)=>{
            if(error){
            callback('Internal Error...!!! Unable to connect the weather APP', undefined)
            
            }else if(Response.body.error){
                callback('Unable to find the location. Please provide some valid address', undefined)
            }else{
                //callback(undefined,Response.body.daily.summary +' Todays summary is '+Response.body.daily.data[0].summary+'. ')
                //callback(undefined,'Current situation : '+Response.body.currently.summary +'. Todays summary is '+Response.body.daily.data[0].summary)//+'. There is, '+Response.body.currently.precipProbability+'% chances of rain.')
                //const temp = ((Response.body.currently.temperature − 32) × 5/9)
                callback(undefined, Response.body.daily.data[0].summary + ' It is currently ' + Response.body.currently.temperature + 'F out. Wind speed : '+Response.body.currently.windSpeed+'mph. There is a ' + Response.body.currently.precipProbability + '%  chances of rain.')

            }
    })
}
module.exports = forcast