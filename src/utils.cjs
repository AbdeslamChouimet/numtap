// src/utils.cjs
// Numtap Core Utilities - Optimized math.js configuration
// Handles expression evaluation and variable management

const { create, all } = require('mathjs');
const chalk = require('chalk');

// ---------------------------------------------------------------
// Math.js Configuration
// Load only essential modules for scientific calculator
// ---------------------------------------------------------------
const config = {
  matrix: false,       // Disable matrix operations
  index: false,        // Disable matrix indexing
  transform: false,    // Disable non-essential transforms
  units: ['deg', 'rad'], // Enable angle conversions
  constants: true,     // Enable math constants (pi, e)
  number: 'number'     // Use standard JS numbers
};

const math = create(all, config);
const scope = {};

// ---------------------------------------------------------------
// Expression Evaluator
// Handles both variable assignments and calculations
// ---------------------------------------------------------------
function evalExpression(expression) {
  try {
    // Process variable assignments first
    const assignments = expression.split(';').filter(s => s.includes('='));
    assignments.forEach(assignment => {
      math.evaluate(assignment.trim(), scope);
    });

    // Process calculations
    const calcExpression = expression.split(';').filter(s => !s.includes('=')).join(';');
    const result = math.evaluate(calcExpression, scope);

    if (result !== undefined) {
      console.log(chalk.green.bold(`~> Result: ${result}`));
      return result;
    }
  } catch (error) {
    console.error(chalk.red.bold(`Error: ${error.message.replace('mathjs:', '')}`));
  }
  return null;
}

module.exports = { evalExpression, scope };
