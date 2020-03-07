const request = require('request');

const forecast = (longitude, lattitude, callback) => {
    const url = "https://api.darksky.net/forecast/b3baee7667e3d22f17b843d1ef46debe/" + longitude + "," + lattitude;
    request.get({
        url,
        json: true
    }, function (err, {
        body
    }) {
        if (err) {
            callback(err, undefined);
        } else if (!body.currently) {
            callback("Invalid cordinates!! try with other", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature + " degress out. This high today is " + body.daily.data[0].temperatureHigh + " with low of  " + body.daily.data[0].temperatureLow + ". There is a " + body.currently.precipProbability + " chance of rain");
        }
    });
}

module.exports = forecast;