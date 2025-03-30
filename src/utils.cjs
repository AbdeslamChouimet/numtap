// src/utils.cjs
// Optimized with lazy-loaded math.js and clear multi-expression handling

const chalk = require('chalk');

let mathInstance = null;
const scope = {};

function getMathInstance() {
  if (!mathInstance) {
    const { create, all } = require('mathjs');
    const config = {
      matrix: false,
      number: 'number',
      units: ['deg', 'rad']
    };
    mathInstance = create(all, config);
  }
  return mathInstance;
}

function evalExpression(expr) {
  try {
    const math = getMathInstance();
    const expressions = expr.split(';').map(e => e.trim()).filter(e => e);
    const results = expressions.map(e => math.evaluate(e, scope));
    return results[results.length - 1]; // Return last result
  } catch (e) {
    throw new Error(e.message.replace('mathjs:', ''));
  }
}

module.exports = { evalExpression, scope };
