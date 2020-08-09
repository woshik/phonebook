exports.addCountryCode = (number) => {
  if (number.match(/^1/)) {
    number = number.replace('1', '+8801');
  } else if (number.match(/^0/)) {
    number = number.replace('0', '+880');
  } else {
    number;
  }

  return number;
};
