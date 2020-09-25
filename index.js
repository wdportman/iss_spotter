const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, IP) => {
  if (error) {
    console.log('Error with getting IP address:', error);
    return;
  } else {
    console.log('Your IP address is', IP);
    fetchCoordsByIP(IP, (error, coords) => {
      if (error) {
        console.log('Error with getting coordinates:', error);
      } else {
        console.log('Your coordinates are:', coords);
        fetchISSFlyOverTimes(coords, (error, times) =>{
          if (error) {
            console.log('Error with ISS flyover times:', error);
          } else {
            console.log(times);
          }
        });
      }
    });
  }
});