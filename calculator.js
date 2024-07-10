function calculate(string) {
	// Объект для преобразования римских чисел в арабские
	const romanToInt = {
			'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
			'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
	};

	// Объект для преобразования арабских чисел в римские
	const intToRoman = {
			1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
			6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X'
	};

	// Функция для преобразования римского числа в арабское
	function convertRomanToInt(roman) {
			return romanToInt[roman];
	}

	// Функция для преобразования арабского числа в римское
	function convertIntToRoman(num) {
			let result = '';
			// Проходим по ключам в обратном порядке
			Object.keys(intToRoman).reverse().forEach(key => {
					while (num >= key) {
							// Добавляем соответствующее римское число к результату
							result += intToRoman[key];
							// Уменьшаем num на значение ключа
							num -= key;
					}
			});
			return result;
	}

	// Функция для проверки, является ли число римским
	function isRoman(numeral) {
			return romanToInt.hasOwnProperty(numeral);
	}

	// Используем регулярное выражение для разделения операндов и оператора
	let match = expression.match(/^(\w+)\s*([\+\-\*\/])\s*(\w+)$/);
	if (!match) throw new Error("Invalid format");

	// Извлекаем операнды и оператор
	let a = match[1];
	let operator = match[2];
	let b = match[3];

	// Проверяем, являются ли оба операнда римскими числами
	let aIsRoman = isRoman(a);
	let bIsRoman = isRoman(b);

	// Если один операнд римский, а другой арабский, выбрасываем исключение
	if (aIsRoman !== bIsRoman) throw new Error("Mixed numeral systems");

	// Если оба операнда римские, конвертируем их в арабские
	if (aIsRoman) {
			a = convertRomanToInt(a);
			b = convertRomanToInt(b);
	} else {
			// Если оба операнда арабские, преобразуем их к числам
			a = parseInt(a, 10);
			b = parseInt(b, 10);
	}

	// Проверяем, что операнды находятся в допустимом диапазоне
	if (a < 1 || a > 10 || b < 1 || b > 10) throw new Error("Operands out of range");

	// Переменная для хранения результата
	let result;
	// Выполняем арифметическую операцию в зависимости от оператора
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
					result = Math.floor(a / b); // В делении учитываем только целую часть
					break;
			default:
					throw new Error("Invalid operator");
	}

	// Если операнды были римскими числами, конвертируем результат обратно в римское число
	if (aIsRoman) {
			if (result < 1) return ''; // В римской системе счисления нет нуля и отрицательных чисел
			return convertIntToRoman(result);
	} else {
			// Возвращаем результат в виде строки
			return result.toString();
	}
}

// Примеры использования:
console.log(calculate('1 + 2')); // '3'
console.log(calculate('VI / III')); // 'II'
console.log(calculate('VII / III')); // 'II'
console.log(calculate('I + II')); // 'III'
console.log(calculate('I - II')); // ''
console.log(calculate('I + 1')); // Error
console.log(calculate('I')); // Error
console.log(calculate('1 + 1 + 1')); // Error
