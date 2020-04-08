const request = require('request')
const temperatureConverter = (valNum) =>{
    valNum = parseFloat(valNum)
     valNum = (valNum-32) / 1.8
     return valNum.toFixed(2)

}
const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'https://api.darksky.net/forecast/808beda40c88ee8b365e1489b17635cf/'+latitude+','+longitude // see the darkweb api documentation to pass various parameters
   
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const locationTemp = temperatureConverter(body.currently.temperature)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + locationTemp + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast