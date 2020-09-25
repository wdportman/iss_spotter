const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (let time of passTimes) {
    let duration = time["duration"];
    let risetime = new Date(0);
    risetime.setUTCSeconds(time["risetime"]);
    console.log(`Next pass at ${risetime} for ${duration} seconds!`)
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});