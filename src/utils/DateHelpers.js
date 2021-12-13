function dateToInput(date) {
  return new Date(date).toISOString().split('T')[0];
}

function dateToUnixtimestamp(date) {
  // add 3 hours to date to make sure we get time close to midnight utc
  return (new Date(date).getTime() + 86400 * 3) / 1000;
}

function unixtimestampToDate(date) {
  return new Date(date).toLocaleDateString();
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

function getHightestTradeVolume(volumes) {
  const realVolumes = volumes.filter(checkTimeUTC);
  let highestVolume = {
    amount: 0,
    date: 0
  };
  realVolumes.forEach(volume => {
    if (highestVolume.amount < volume[1]) {
      highestVolume.amount = volume[1];
      highestVolume.date = volume[0];
    }
  });
  return highestVolume;
}


// doesn't check if dates are correct
function getOptimalTradeDays(prices) {
  const realPrices = prices.filter(checkTimeUTC);

  let optimalPrices = {
    buy: {
      price: 0,
      date: 0
    },
    sell: {
      price: 0,
      date: 0
    }
  }

  realPrices.forEach(price => {
    if (optimalPrices.buy.price > price[1] || optimalPrices.buy.price === 0) {
      optimalPrices.buy.price = price[1];
      optimalPrices.buy.date = price[0];
    } else if (optimalPrices.sell.price < price[1] && price[1] > optimalPrices.buy.price) {
      optimalPrices.sell.price = price[1];
      optimalPrices.sell.date = price[0];
    }
  });

  return optimalPrices;
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
  getHightestTradeVolume,
  getOptimalTradeDays
}