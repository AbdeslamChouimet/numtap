// src/interactiveMode.cjs
// Enhanced REPL with attractive UI and no command/variable conflicts

const readline = require('readline');
const chalk = require('chalk');
const { evalExpression, scope } = require('./utils.cjs');

function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.green('➤ '),
  });

  let lastResult = null;
  const history = [];

  console.log(chalk.cyan(`
  ███╗   ██╗██╗   ██╗███╗   ███╗████████╗ █████╗ ██████╗
  ████╗  ██║██║   ██║████╗ ████║╚══██╔══╝██╔══██╗██╔══██╗
  ██╔██╗ ██║██║   ██║██╔████╔██║   ██║   ███████║██████╔╝
  ██║╚██╗██║██║   ██║██║╚██╔╝██║   ██║   ██╔══██║██╔═══╝
  ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║   ██║   ██║  ██║██║
  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝
  `));
  console.log(chalk.yellow('Welcome to Numtap! Type ".help" for commands\n'));

  rl.on('line', (input) => {
    const trimmedInput = input.trim();
    if (trimmedInput.startsWith('.')) {
      const [command] = trimmedInput.split(' ');
      switch (command.toLowerCase()) {
        case '.exit':
        case '.q':
          exitHandler();
          break;

        case '.help':
        case '.h':
          showHelp();
          break;

        case '.version':
        case '.v':
          console.log(chalk.blue('Numtap v1.1.0'));
          break;

        case '.last':
        case '.l':
          showLastResult();
          break;

        case '.history':
        case '.his':
          showHistory();
          break;

        case '.clear':
        case '.cls':
          console.clear();
          console.log(chalk.cyan(`
  ███╗   ██╗██╗   ██╗███╗   ███╗████████╗ █████╗ ██████╗
  ████╗  ██║██║   ██║████╗ ████║╚══██╔══╝██╔══██╗██╔══██╗
  ██╔██╗ ██║██║   ██║██╔████╔██║   ██║   ███████║██████╔╝
  ██║╚██╗██║██║   ██║██║╚██╔╝██║   ██║   ██╔══██║██╔═══╝
  ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║   ██║   ██║  ██║██║
  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝
          `));
          break;

        default:
          console.log(chalk.red(`Unknown command: ${trimmedInput}`));
      }
    } else {
      processCalculation(trimmedInput);
    }
    rl.prompt();
  }).on('close', exitHandler);

  function showHelp() {
    console.log(chalk.yellow(`
    Commands:
    .help, .h      - Show this help
    .exit, .q      - Quit
    .version, .v   - Show version
    .last, .l      - Show last result
    .history, .his - Show calculation history
    .clear, .cls   - Clear screen

    Examples:
    x = 5; x + 3   - Assign and calculate (Result: 8)
    sin(45 deg)    - Trigonometric functions (Result: ~0.7071)
    2^3 + sqrt(16) - Exponentiation and roots (Result: 12)
    `));
  }

  function processCalculation(input) {
    if (!input) return;

    try {
      const expressions = input.split(';').map(e => e.trim()).filter(e => e);
      let result;
      for (const expr of expressions) {
        result = evalExpression(expr);
        if (result !== undefined) {
          lastResult = result;
          history.push({ expr, result, timestamp: new Date().toISOString() });
          console.log(chalk.blue(`= ${result}`));
        }
      }
    } catch (e) {
      console.error(chalk.red(`! ${e.message}`));
    }
  }

  function showLastResult() {
    if (lastResult !== null) {
      console.log(chalk.blue(`Last result: ${lastResult}`));
    } else {
      console.log(chalk.yellow('No results yet.'));
    }
  }

  function showHistory() {
    if (history.length === 0) {
      console.log(chalk.yellow('History is empty.'));
      return;
    }
    console.log(chalk.cyan('Calculation History:'));
    history.forEach((entry, index) => {
      console.log(`${index + 1}. [${entry.timestamp.slice(11, 19)}] ${entry.expr} = ${entry.result}`);
    });
  }

  function exitHandler() {
    console.log(chalk.green('\nGoodbye! Total calculations: ' + history.length));
    process.exit(0);
  }

  rl.prompt();
}

module.exports = interactiveMode;
