const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (passTimes) => {
  for (let time of passTimes) {
    let duration = time["duration"];
    let risetime = new Date(0);
    risetime.setUTCSeconds(time["risetime"]);
    console.log(`Next pass at ${risetime} for ${duration} seconds!`)
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });