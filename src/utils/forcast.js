const request = require('request');

const forecast = (longitude, lattitude, callback) => {
    console.log("^^^ ", longitude);
    console.log("^^^ ", lattitude);
    const url = "https://api.darksky.net/forecast/b3baee7667e3d22f17b843d1ef46debe/"+longitude+","+lattitude;
    console.log("^^^ ", url);
    request.get({
        url,
        json: true
    }, function (err, {body}) {
        //console.log("^^^ ", body);
        if (err) {
            callback(err, undefined);
        } else if (!body.currently) {
            callback("Invalid cordinates!! try with other", undefined);
        } else {
            callback(undefined, {
                temparature: body.currently.temperature
            });
        }
    });
}

module.exports = forecast;