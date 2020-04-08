const request = require("request")
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibXVraGVyamVlYXJrYTg5IiwiYSI6ImNrNnJ3eXE3cDA3OXAzZWxnaW80anliZ3MifQ.BxRTW-vHtPe9b6iPcM5htQ&limit=1"
    //return console.log(url)
    request({url : url, json: true},(error, Response)=>{
         if(error){
                callback('Unable to connect the locatioon services.!!!', undefined)
            }else if(Response.body.features.length === 0){
                callback('Unable to find the location. Please provide some valid address', undefined)

            }else{
                 callback(undefined,{
                    latitude: Response.body.features[0].center[1],
                    longitude: Response.body.features[0].center[0],
                    location : Response.body.features[0].place_name
                })
            }
    })
}
module.exports = geocode