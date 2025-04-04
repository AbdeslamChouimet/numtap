// src/utils.cjs - Utility functions for expression evaluation and unit conversion

const { create, all } = require('mathjs');

// Configure mathjs instance for performance and simplicity
const math = create(all, {
  matrix: false, // Disable matrix operations to reduce overhead
  number: 'number' // Use native JS numbers for faster computation
});

const scope = {}; // Shared scope for storing variables across calculations

// Language-specific messages (unified for quick and interactive modes)
const messages = {
  en: {
    welcome: 'Welcome to Numtap! Type ".help" for commands',
    goodbye: 'Goodbye! Total calculations:',
    help: `
    Commands:
    .help, .h      - Show this help
    .exit, .q      - Quit
    .version, .v   - Show version
    .last, .l      - Show last result
    .history, .his - Show calculation history
    .clear, .cls   - Clear screen
    `,
    last: 'Last result:',
    noResult: 'No results yet.',
    history: 'Calculation History:',
    noHistory: 'History is empty.',
    unknown: 'Unknown command:',
    result: 'Result',
    error: 'Error',
    undefined: 'Undefined symbol',
    syntax: 'Syntax error',
    nan: 'Invalid operation (NaN)',
    infinity: 'Result is infinite'
  },
  ar: {
    welcome: 'مرحبًا بك في Numtap! اكتب ".help" للحصول على الأوامر',
    goodbye: 'وداعًا! إجمالي الحسابات:',
    help: `
    الأوامر:
    .help, .h      - عرض هذه المساعدة
    .exit, .q      - إنهاء الجلسة
    .version, .v   - عرض الإصدار
    .last, .l      - عرض آخر نتيجة
    .history, .his - عرض سجل الحسابات
    .clear, .cls   - مسح الشاشة
    `,
    last: 'آخر نتيجة:',
    noResult: 'لا توجد نتائج بعد.',
    history: 'سجل الحسابات:',
    noHistory: 'السجل فارغ.',
    unknown: 'أمر غير معروف:',
    result: 'النتيجة',
    error: 'خطأ',
    undefined: 'رمز غير معرف',
    syntax: 'خطأ في الصيغة',
    nan: 'عملية غير صالحة (NaN)',
    infinity: 'النتيجة لا نهائية'
  },
  ru: {
    welcome: 'Добро пожаловать в Numtap! Введите ".help" для команд',
    goodbye: 'До свидания! Всего вычислений:',
    help: `
    Команды:
    .help, .h      - Показать эту справку
    .exit, .q      - Выйти
    .version, .v   - Показать версию
    .last, .l      - Показать последний результат
    .history, .his - Показать историю вычислений
    .clear, .cls   - Очистить экран
    `,
    last: 'Последний результат:',
    noResult: 'Результатов пока нет.',
    history: 'История вычислений:',
    noHistory: 'История пуста.',
    unknown: 'Неизвестная команда:',
    result: 'Результат',
    error: 'Ошибка',
    undefined: 'Неопределенный символ',
    syntax: 'Синтаксическая ошибка',
    nan: 'Недопустимая операция (NaN)',
    infinity: 'Результат бесконечен'
  },
  fr: {
    welcome: 'Bienvenue dans Numtap ! Tapez ".help" pour les commandes',
    goodbye: 'Au revoir ! Total des calculs :',
    help: `
    Commandes :
    .help, .h      - Afficher cette aide
    .exit, .q      - Quitter
    .version, .v   - Afficher la version
    .last, .l      - Afficher le dernier résultat
    .history, .his - Afficher l’historique des calculs
    .clear, .cls   - Effacer l’écran
    `,
    last: 'Dernier résultat :',
    noResult: 'Aucun résultat pour l’instant.',
    history: 'Historique des calculs :',
    noHistory: 'L’historique est vide.',
    unknown: 'Commande inconnue :',
    result: 'Résultat',
    error: 'Erreur',
    undefined: 'Symbole indéfini',
    syntax: 'Erreur de syntaxe',
    nan: 'Opération invalide (NaN)',
    infinity: 'Résultat infini'
  },
  es: {
    welcome: '¡Bienvenido a Numtap! Escribe ".help" para comandos',
    goodbye: '¡Adiós! Total de cálculos:',
    help: `
    Comandos:
    .help, .h      - Mostrar esta ayuda
    .exit, .q      - Salir
    .version, .v   - Mostrar versión
    .last, .l      - Mostrar último resultado
    .history, .his - Mostrar historial de cálculos
    .clear, .cls   - Limpiar pantalla
    `,
    last: 'Último resultado:',
    noResult: 'Aún no hay resultados.',
    history: 'Historial de cálculos:',
    noHistory: 'El historial está vacío.',
    unknown: 'Comando desconocido:',
    result: 'Resultado',
    error: 'Error',
    undefined: 'Símbolo no definido',
    syntax: 'Error de sintaxis',
    nan: 'Operación inválida (NaN)',
    infinity: 'Resultado infinito'
  },
  de: {
    welcome: 'Willkommen bei Numtap! Gib ".help" für Befehle ein',
    goodbye: 'Auf Wiedersehen! Gesamtzahl der Berechnungen:',
    help: `
    Befehle:
    .help, .h      - Diese Hilfe anzeigen
    .exit, .q      - Beenden
    .version, .v   - Version anzeigen
    .last, .l      - Letztes Ergebnis anzeigen
    .history, .his - Berechnungsverlauf anzeigen
    .clear, .cls   - Bildschirm löschen
    `,
    last: 'Letztes Ergebnis:',
    noResult: 'Noch keine Ergebnisse.',
    history: 'Berechnungsverlauf:',
    noHistory: 'Verlauf ist leer.',
    unknown: 'Unbekannter Befehl:',
    result: 'Ergebnis',
    error: 'Fehler',
    undefined: 'Undefiniertes Symbol',
    syntax: 'Syntaxfehler',
    nan: 'Ungültige Operation (NaN)',
    infinity: 'Ergebnis ist unendlich'
  },
  pt: {
    welcome: 'Bem-vindo ao Numtap! Digite ".help" para comandos',
    goodbye: 'Adeus! Total de cálculos:',
    help: `
    Comandos:
    .help, .h      - Mostrar esta ajuda
    .exit, .q      - Sair
    .version, .v   - Mostrar versão
    .last, .l      - Mostrar último resultado
    .history, .his - Mostrar histórico de cálculos
    .clear, .cls   - Limpar tela
    `,
    last: 'Último resultado:',
    noResult: 'Ainda não há resultados.',
    history: 'Histórico de cálculos:',
    noHistory: 'O histórico está vazio.',
    unknown: 'Comando desconhecido:',
    result: 'Resultado',
    error: 'Erro',
    undefined: 'Símbolo indefinido',
    syntax: 'Erro de sintaxe',
    nan: 'Operação inválida (NaN)',
    infinity: 'Resultado infinito'
  }
};

/**
 * Evaluates a mathematical expression or performs unit conversion.
 * @param {string} expr - The expression or conversion to evaluate
 * @returns {number|string|Unit} - The result of the evaluation or conversion
 * @throws {Error} - Throws an error for invalid input, NaN, or infinite results
 */
function evalExpression(expr) {
  const lang = process.env.LANG || 'en'; // Default to English
  const langMessages = messages[lang] || messages.en; // Fallback to English messages

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
        throw new Error(langMessages.nan); // Handle NaN (e.g., 0 / 0)
      }
      if (!isFinite(result)) {
        throw new Error(langMessages.infinity); // Handle Infinity (e.g., 5 / 0)
      }
    }

    return result;
  } catch (e) {
    // Pass through specific NaN or Infinity errors from above checks
    if (e.message === langMessages.nan || e.message === langMessages.infinity) {
      throw e;
    }
    // Customize other mathjs error messages for better UX
    let errorMessage = e.message.replace('mathjs:', '').trim();
    if (errorMessage.includes('Undefined symbol')) {
      errorMessage = langMessages.undefined;
    } else if (errorMessage.includes('Unexpected operator')) {
      errorMessage = langMessages.syntax;
    } else {
      errorMessage = langMessages.syntax;
    }
    throw new Error(errorMessage);
  }
}

module.exports = { evalExpression, scope, messages }; // Export messages for use in other modules

// For manual testing during development
if (require.main === module) {
  console.log(evalExpression('25 degC to degF')); // Example: Temperature conversion
  console.log(evalExpression('2 liter to gallon')); // Example: Volume conversion
  console.log(evalExpression('2 km to meter')); // Example: Distance conversion
  console.log(evalExpression('5 / 0')); // Example: Division by zero
  console.log(evalExpression('0 / 0')); // Example: NaN case
}
