const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      let message = `Status code: ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(message), null);
    } else {
      let data = JSON.parse(body);
      let IP = data["ip"];
      return callback(null, IP);
    }
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request('https://ipvigilante.com/' + IP, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      let message = `Status code: ${response.statusCode} when fetching coordinates by IP. Response: ${body}`;
      return callback(Error(message), null);
    } else {
      let data = JSON.parse(body);
      return callback(null, {latitude: data["data"]["latitude"], longitude: data["data"]["longitude"]});
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=${coords["longitude"]}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      let message = `Status code: ${response.statusCode} when fetching coordinates by IP. Response: ${body}`;
      return callback(Error(message), null);
    } else {
      let data = JSON.parse(body);
      let passTimes = data["response"];
      return callback(null, passTimes);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, IP) => {
    if (request.error) {
      return callback(error, null);
    } else {
      fetchCoordsByIP(IP, (error, coords) => {
        if (request.error) {
          return callback(error, null);
        } else {
          fetchISSFlyOverTimes(coords, (error, passTimes) => {
            if (request.error) {
              return callback(error, null);
            } else {
              return callback(null, passTimes);
            }
          })
        }
      })
    }
  })
};

module.exports = { nextISSTimesForMyLocation };