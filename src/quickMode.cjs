// src/quickMode.cjs
// Fast and reliable quick mode with clear output

const { evalExpression } = require('./utils.cjs');
const chalk = require('chalk');

function quickMode(expr) {
  try {
    if (!expr || typeof expr !== 'string') {
      throw new Error('Invalid input: Expression must be a string');
    }
    const result = evalExpression(expr);
    if (result !== undefined) {
      console.log(chalk.green(`Result: ${result}`));
    }
    process.exit(0);
  } catch (e) {
    console.error(chalk.red(`Error: ${e.message}`));
    process.exit(1);
  }
}

module.exports = quickMode;
