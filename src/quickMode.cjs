// src/quickMode.cjs - Quick mode for single expression evaluation

const { evalExpression, messages } = require('./utils.cjs');
const chalk = require('chalk');

// Preload mathjs to avoid delay on first evaluation
require('./utils.cjs').evalExpression('1'); // Dummy call to initialize mathjs early

/**
 * Evaluates a single mathematical expression and prints the result.
 * @param {string} expr - The expression to evaluate
 */
function quickMode(expr) {
  const lang = process.env.LANG || 'en'; // Default to English
  const langMessages = messages[lang] || messages.en; // Fallback to English

  try {
    if (!expr || typeof expr !== 'string') {
      throw new Error(`${langMessages.error}: Expression must be a non-empty string`);
    }
    const startTime = performance.now(); // Start performance timer
    const result = evalExpression(expr); // Evaluate the expression
    const endTime = performance.now(); // End performance timer

    if (result !== undefined) {
      console.log(chalk.greenBright(`${langMessages.result}: ${result}`)); // Bright green for result
      console.log(chalk.gray(`Time taken: ${(endTime - startTime).toFixed(2)} ms`)); // Gray for timing
    }
    process.exit(0); // Exit with success
  } catch (e) {
    console.error(chalk.redBright(`${langMessages.error}: ${e.message}`)); // Bright red for errors
    process.exit(1); // Exit with error
  }
}

module.exports = quickMode;
