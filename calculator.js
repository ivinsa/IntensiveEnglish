function calculator(string) {
  const romanToInt = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
  };

  const intToRoman = [
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ];

  function convertRomanToInt(roman) {
    return romanToInt[roman];
  }

  function convertIntToRoman(num) {
    let result = '';
    for (let i = 0; i < intToRoman.length; i++) {
      while (num >= intToRoman[i].value) {
        result += intToRoman[i].symbol;
        num -= intToRoman[i].value;
      }
    }
    return result;
  }

  function isRoman(numeral) {
    return romanToInt.hasOwnProperty(numeral);
  }

  let match = string.match(/^(\w+)\s*([\+\-\*\/])\s*(\w+)$/);
  if (!match) throw new Error("Invalid format");

  let a = match[1];
  let operator = match[2];
  let b = match[3];

  let aIsRoman = isRoman(a);
  let bIsRoman = isRoman(b);

  if (aIsRoman !== bIsRoman) throw new Error("Mixed numeral systems");

  if (aIsRoman) {
    a = convertRomanToInt(a);
    b = convertRomanToInt(b);
  } else {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  if (a < 1 || a > 10 || b < 1 || b > 10) throw new Error("Operands out of range");

  let result;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = Math.floor(a / b);
      break;
    default:
      throw new Error("Invalid operator");
  }

  if (aIsRoman) {
    if (result < 1) return '';
    return convertIntToRoman(result);
  } else {
    return result.toString();
  }
}


module.exports = calculator; // Не трогайте эту строчку