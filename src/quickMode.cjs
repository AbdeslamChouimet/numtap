// src/quickMode.cjs
// Fixed Quick Mode Implementation

const { evalExpression } = require('./utils.cjs');
const chalk = require('chalk');

function quickMode(expression) {
  try {
    if (!expression || typeof expression !== 'string') {
      throw new Error('Invalid input: Expression must be a string');
    }
    
    const result = evalExpression(expression);
    
    // End the process after the display
    if (result !== null) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red.bold(`Fatal Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = quickMode;
