function dateToInput(date) {
  return new Date(date).toISOString().split('T')[0];
}

function dateToUnixtimestamp(date) {
  // add 3 hours to date to make sure we get time close to midnight utc
  return (new Date(date).getTime() + 86400 * 3) / 1000;
}

function unixtimestampToDate(date) {
  return new Date(date).toUTCString();
}

function getLongestBearish(prices) {
  const realPrices = prices.filter(checkTimeUTC);
  let currentDays = 0;
  let maxDays = 0;
  for (let i = 1; i < realPrices.length; i++) {
    if (realPrices[i][1] < realPrices[i - 1][1]) {
      currentDays = currentDays + 1;
    } else {
      if (currentDays > maxDays) {
        maxDays = currentDays;
      }
      currentDays = 0;
    }
  }
  return maxDays;
}


// check if time close to midnight
function checkTimeUTC(time) {
  const date = new Date(time[0]);
  if (date.getUTCHours() === 0 && date.getUTCMinutes() < 10) {
    return true;
  }
  return false; 
}


module.exports = {
  dateToInput,
  dateToUnixtimestamp,
  unixtimestampToDate,
  getLongestBearish,
}