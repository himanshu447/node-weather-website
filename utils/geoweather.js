const request = require('request');

const getWeater = (city, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=abf9e5bdf128cebcd0aef448133055e9';

    request({
        url,
        json: true,
    }, (error, response) => {
        if(error){
            callback('Unable to connect to Weather service!', undefined);
        }else if(response.statusCode != 200){
            callback('Unable to load weather from weather service!', undefined);
        }else{
            callback(undefined,JSON.stringify(response.body.weather[0]));
        }
    });
}

module.exports = getWeater;