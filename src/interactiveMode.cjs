// src/interactiveMode.cjs - Interactive REPL mode for Numtap

const readline = require('readline');
const chalk = require('chalk');
const figlet = require('figlet');
const { evalExpression, scope } = require('./utils.cjs');

// Preload mathjs to avoid delay on first calculation
require('./utils.cjs').evalExpression('1'); // Dummy call to initialize mathjs

// Language-specific messages
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
    unknown: 'Unknown command:'
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
    unknown: 'أمر غير معروف:'
  }
  // Can add more languages here
};

/**
 * Launches an interactive REPL session for Numtap.
 */
function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.greenBright('➤ ') // Bright green prompt for visibility
  });

  const lang = process.env.LANG || 'en'; // Default to English
  const langMessages = messages[lang] || messages.en; // Fallback to English
  let lastResult = null; // Tracks the last calculation result
  const history = []; // Stores calculation history

  // Random color for logo to enhance visual appeal
  const colors = [chalk.redBright, chalk.greenBright, chalk.blueBright, chalk.yellowBright, chalk.magentaBright, chalk.cyanBright];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Display logo and welcome message
  console.log(randomColor(figlet.textSync('Numtap', { font: 'Standard' })));
console.log(chalk.yellowBright(langMessages.welcome + '\n')); // Bright yellow welcome message

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
          console.log(chalk.blueBright('Numtap v1.2.0')); // Bright blue for version
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
          console.log(randomColor(figlet.textSync('Numtap', { font: 'Standard' })));
          break;
        default:
          console.log(chalk.redBright(`${langMessages.unknown} ${trimmedInput}`)); // Bright red for unknown command
      }
    } else {
      processCalculation(trimmedInput);
    }
    rl.prompt();
  }).on('close', exitHandler);

  function showHelp() {
    console.log(chalk.yellowBright(langMessages.help)); // Bright yellow for help text
  }

  function processCalculation(input) {
    if (!input) return;

    try {
      const expressions = input.split(';').map(e => e.trim()).filter(e => e);
      let result;
      for (const expr of expressions) {
        const startTime = performance.now();
        result = evalExpression(expr);
        const endTime = performance.now();

        if (result !== undefined) {
          lastResult = result;
          history.push({ expr, result, timestamp: new Date().toISOString() });
          console.log(chalk.blueBright(`= ${result}`)); // Bright blue for result
          console.log(chalk.gray(`Time taken: ${(endTime - startTime).toFixed(2)} ms`)); // Gray for timing
        }
      }
    } catch (e) {
      console.error(chalk.redBright(`! ${e.message}`)); // Bright red for errors
    }
  }

  function showLastResult() {
    if (lastResult !== null) {
      console.log(chalk.blueBright(`${langMessages.last} ${lastResult}`)); // Bright blue for last result
    } else {
      console.log(chalk.yellowBright(langMessages.noResult)); // Bright yellow for no result
    }
  }

  function showHistory() {
    if (history.length === 0) {
      console.log(chalk.yellowBright(langMessages.noHistory)); // Bright yellow for empty history
      return;
    }
    console.log(chalk.cyanBright(langMessages.history)); // Bright cyan for history title
    history.forEach((entry, index) => {
      console.log(`${index + 1}. [${entry.timestamp.slice(11, 19)}] ${entry.expr} = ${chalk.blueBright(entry.result)}`);
    });
  }

  function exitHandler() {
    console.log(chalk.greenBright(`\n${langMessages.goodbye} ${history.length}`)); // Bright green for goodbye
    process.exit(0);
  }

  rl.prompt();
}

module.exports = interactiveMode;
