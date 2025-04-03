// src/utils.cjs - Utility functions for expression evaluation and unit conversion

const { create, all } = require('mathjs');

// Configure mathjs instance for performance and simplicity
const math = create(all, {
  matrix: false, // Disable matrix operations to reduce overhead
  number: 'number' // Use native JS numbers for faster computation
});

const scope = {}; // Shared scope for storing variables across calculations

// Language-specific error messages
const errorMessages = {
  en: { undefined: 'Undefined symbol', syntax: 'Syntax error', nan: 'Invalid operation (NaN)', infinity: 'Result is infinite' },
  ar: { undefined: 'رمز غير معرف', syntax: 'خطأ في الصيغة', nan: 'عملية غير صالحة (NaN)', infinity: 'النتيجة لا نهائية' },
  ru: { undefined: 'Неопределенный символ', syntax: 'Синтаксическая ошибка', nan: 'Недопустимая операция (NaN)', infinity: 'Результат бесконечен' },
  fr: { undefined: 'Symbole indéfini', syntax: 'Erreur de syntaxe', nan: 'Opération invalide (NaN)', infinity: 'Résultat infini' },
  es: { undefined: 'Símbolo no definido', syntax: 'Error de sintaxis', nan: 'Operación inválida (NaN)', infinity: 'Resultado infinito' },
  de: { undefined: 'Undefiniertes Symbol', syntax: 'Syntaxfehler', nan: 'Ungültige Operation (NaN)', infinity: 'Ergebnis ist unendlich' },
  pt: { undefined: 'Símbolo indefinido', syntax: 'Erro de sintaxe', nan: 'Operação inválida (NaN)', infinity: 'Resultado infinito' }
};

/**
 * Evaluates a mathematical expression or performs unit conversion.
 * @param {string} expr - The expression or conversion to evaluate
 * @returns {number|string|Unit} - The result of the evaluation or conversion
 * @throws {Error} - Throws an error for invalid input, NaN, or infinite results
 */
function evalExpression(expr) {
  const lang = process.env.LANG || 'en'; // Default to English
  const messages = errorMessages[lang] || errorMessages.en; // Fallback to English messages

  try {
    let result;
    if (expr.includes(' to ')) {
      // Handle unit conversions (e.g., "2 km to meter")
      const [valuePart, unitPart] = expr.split(' to ');
      const fromUnitStr = valuePart.trim();
      const toUnit = unitPart.trim();

      // Parse value and unit from input string
      const fromUnitMatch = fromUnitStr.match(/(\d+\.?\d*)\s*(\w+)/);
      const value = parseFloat(fromUnitMatch[1]);
      const fromUnit = fromUnitMatch[2];

      // Custom conversions for specific cases
      if (fromUnit === 'degC' && toUnit === 'degF') {
        const celsius = value;
        const fahrenheit = (celsius * 9 / 5) + 32;
        return math.unit(fahrenheit, 'degF');
      }
      if (fromUnit === 'liter' && toUnit === 'gallon') {
        const liters = value;
        const gallons = liters * 0.264172;
        return math.unit(gallons, 'gallon');
      }

      // General unit conversion using mathjs
      const parsedValue = math.unit(value, fromUnit);
      return parsedValue.to(toUnit);
    }

    // Evaluate regular mathematical expressions
    result = math.evaluate(expr, scope);

    // Check for NaN or Infinity results
    if (typeof result === 'number') {
      if (isNaN(result)) {
        throw new Error(messages.nan); // Handle NaN (e.g., 0 / 0)
      }
      if (!isFinite(result)) {
        throw new Error(messages.infinity); // Handle Infinity (e.g., 5 / 0)
      }
    }

    return result;
  } catch (e) {
    // Pass through specific NaN or Infinity errors from above checks
    if (e.message === messages.nan || e.message === messages.infinity) {
      throw e;
    }
    // Customize other mathjs error messages for better UX
    let errorMessage = e.message.replace('mathjs:', '').trim();
    if (errorMessage.includes('Undefined symbol')) {
      errorMessage = messages.undefined;
    } else if (errorMessage.includes('Unexpected operator')) {
      errorMessage = messages.syntax;
    } else {
      errorMessage = messages.syntax;
    }
    throw new Error(errorMessage);
  }
}

module.exports = { evalExpression, scope };

// For manual testing during development
if (require.main === module) {
  console.log(evalExpression('25 degC to degF')); // Example: Temperature conversion
  console.log(evalExpression('2 liter to gallon')); // Example: Volume conversion
  console.log(evalExpression('2 km to meter')); // Example: Distance conversion
  console.log(evalExpression('5 / 0')); // Example: Division by zero
  console.log(evalExpression('0 / 0')); // Example: NaN case
}
