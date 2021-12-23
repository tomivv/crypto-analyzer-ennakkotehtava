function dateToInput(date) {
  return new Date(date).toISOString().split('T')[0];
}

function dateToUnixtimestamp(date, start = false) {
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  if (start) {
    return new Date(Date.UTC(year, month - 1, day, 0)).getTime() / 1000;
  } else {
    return new Date(Date.UTC(year, month - 1, day, 1)).getTime() / 1000;
  }
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


function getLowestPrice(arr) {
  if (arr.length === 0) {
    return;
  }
  return arr.reduce((prev, curr) => {
    return prev.price < curr.price ? prev : curr;
  });
}

function getHighestMargin(arr){
  if (arr.length === 0) {
    return;
  }
  return arr.reduce((prev, curr) => {
    return prev.margin > curr.margin ? prev : curr;
  });
}


function getOptimalTradeDays(prices) {
  const realPrices = prices.filter(checkTimeUTC);

  let optimalPrices = [];

  // get all best buy prices
  realPrices.forEach(price => {
    if (optimalPrices.length === 0) {
      optimalPrices.push({
        price: price[1],
        date: price[0],
        margin: 0,
        sell: 0,
      });
    } else if (getLowestPrice(optimalPrices).price > price[1]) {
      optimalPrices.push({
        price: price[1],
        date: price[0],
        margin: 0,
        sell: 0,
      });
    }
  });

  // calculate margins for every buy date
  optimalPrices.forEach(date => {
    realPrices.forEach(price => {
      // check that price is higher than buy price and date is older
      if (date.price < price[1] && date.date < price[0]) {
        date.margin = price[1] - date.price;
        date.sell = price[0];
      }
    });
  });
  // return optimalPrices;
  return getHighestMargin(optimalPrices);
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