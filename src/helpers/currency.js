const currency = currencyString => {
  switch (currencyString) {
    case "USD":
      return "$";

    default:
      return null;
  }
};

export default currency;
