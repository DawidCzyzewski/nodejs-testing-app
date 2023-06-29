const calc = (first, second, action) => {
  console.log(first, second, action);
  // return 4

  if (action === "add") {
    return first + second;
  }
  if (action === "multi") {
    return first * second;
  }
  return 0;
};

module.exports = { calc };
