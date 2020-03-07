const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2FnYXJrYXRoZSIsImEiOiJjazczbHV1aHMwZDlwM2lqdDdwM2lxYjJzIn0.2CI9oUdPqaA3-PNP4-5V8w&limit=1"
    request.get({
        url,
        json: true
    }, (error, {body}) => {
        console.log("&&&&&&&&&&&&&&&&&&&", body)
        if (error) {
            callback(error, undefined);
        } else if (body.features.length === 0) {
            callback("Location not found!! try other location", undefined);
        } else {
            callback(undefined, {
                lattitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;