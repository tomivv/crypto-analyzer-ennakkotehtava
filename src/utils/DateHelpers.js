function dateToInput(date) {
  return new Date(date).toISOString().split('T')[0];
}

function dateToUnixtimestamp(date) {
  return new Date(date).getTime() / 1000;
}


module.exports = {
  dateToInput,
  dateToUnixtimestamp
}