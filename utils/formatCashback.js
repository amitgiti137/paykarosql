// utils/formatCashback.js
function formatCashback({ value, type }, maxCashback) {
    if (type === 'percent') {
      return maxCashback ? `Up to ${value}% Cashback` : `Flat ${value}% Cashback`;
    } else {
      return maxCashback ? `Up to ₹${value} Cashback` : `Flat ₹${value} Cashback`;
    }
  }
  
  module.exports = formatCashback;
  