// src/interactiveMode.cjs
// Interactive REPL Interface
// Handles user input and command processing

const readline = require('readline');
const chalk = require('chalk');
const { evalExpression } = require('./utils.cjs');

function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.green('~> Input: '),
  });

  // ---------------------------------------------------------------
  // Session State Management
  // ---------------------------------------------------------------
  let lastResult = null;
  const history = [];
  
  console.log(chalk.green('•| Welcome to ') + chalk.green.bold('Numtap'));
  console.log(chalk.yellow('•| Tip') + chalk.yellow.bold(' => Type "help" for commands, "exit" to quit'));

  rl.prompt();

  // ---------------------------------------------------------------
  // Command Processing
  // ---------------------------------------------------------------
  rl.on('line', (input) => {
    const trimmedInput = input.trim();
    const command = trimmedInput.toLowerCase();

    switch(command) {
      case 'help':
      case 'h':
        showHelp();
        break;

      case 'clear':
      case 'cls':
        console.clear();
        console.log(chalk.green('Screen cleared!'));
        break;

      case 'last':
      case 'l':
        showLastResult();
        break;

      case 'history':
      case 'his':
        showHistory();
        break;

      case 'version':
      case 'v':
        console.log(chalk.green.bold('Numtap v1.1.0'));
        break;

      case 'exit':
      case 'q':
        exitHandler();
        break;

      default:
        processCalculation(trimmedInput);
    }
    rl.prompt();
  }).on('close', exitHandler);

  // ---------------------------------------------------------------
  // Helper Functions
  // ---------------------------------------------------------------
  function showHelp() {
    console.log(chalk.yellow.bold('Core Commands:'));
    console.log('  help, h      - Show this help');
    console.log('  clear, cls   - Clear screen');
    console.log('  last, l      - Show last result');
    console.log('  history, his - Show calculation log');
    console.log('  version, v   - Display version');
    console.log('  exit, q      - Quit session');
    
    console.log(chalk.cyan.bold('\nSupported Operations:'));
    console.log('  • Arithmetic: 2^(3+1) → 16');
    console.log('  • Trigonometry: cos(60 deg) → 0.5');
    console.log('  • Variables: x=5; x*2 + 3 → 13');
  }

  function processCalculation(input) {
    const result = evalExpression(input);
    if (result !== null) {
      lastResult = result;
      history.push({
        expression: input,
        result,
        timestamp: new Date().toISOString()
      });
    }
  }

  function showLastResult() {
    lastResult !== null 
      ? console.log(chalk.green.bold(`~> Last Result: ${lastResult}`))
      : console.log(chalk.yellow('No calculations yet!'));
  }

  function showHistory() {
    if (history.length === 0) {
      console.log(chalk.yellow('History is empty.'));
      return;
    }
    
    console.log(chalk.yellow.bold('Calculation History:'));
    history.forEach((entry, index) => {
      console.log(`  ${index + 1}. [${entry.timestamp.slice(11,19)}] ${entry.expression} = ${entry.result}`);
    });
  }

  function exitHandler() {
    console.log(chalk.green('•| Session ended • Total calculations: ') + chalk.bold(history.length));
    process.exit(0);
  }
}

module.exports = interactiveMode;
