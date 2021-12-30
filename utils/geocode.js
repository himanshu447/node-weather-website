const request = require('request');

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGdjcmVzdCIsImEiOiJja3hyNXg1azMzMG5sMnB1YnN3NGR1bXAzIn0.VswsJbQNyv2rOI30FIEdVg';

    request({
        url,
        json: true,
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, body.features[1].place_name);
        }
    });
};

module.exports = geoCode;