#!/usr/bin/env node
// src/numtap.cjs - Main entry point for Numtap CLI tool

const { program } = require('commander');
const chalk = require('chalk');

// Lazy load modules to optimize startup performance
const quickMode = () => require('./quickMode.cjs');
const interactiveMode = () => require('./interactiveMode.cjs');

// Configure CLI with version, description, and options
program
  .version('1.2.0', '-v, --version') // Display version number
  .description(chalk.hex('#00FF00').bold('Numtap v1.2.0 - Scientific CLI Calculator')) // Green bold description for visibility
  .argument('[expression]', 'Mathematical expression to evaluate', '') // Optional expression argument
  .option('-l, --lang <language>', 'Set language (en/ar/ru/fr/es/de/pt)', 'en') // Language selection with default 'en'
  .addHelpText('after', `
${chalk.cyan('Examples:')}
  numtap "5 + 3 * 2"           # Evaluates to 11 (follows order of operations)
  numtap --lang ar "5 + 3"     # Runs in Arabic, outputs 'النتيجة: 8'
  numtap                       # Launches interactive mode
`) // Help text with colorful examples
  .action((expression, options) => {
    process.env.LANG = options.lang; // Set language globally via environment variable
    if (expression.trim()) {
      quickMode()(expression); // Execute quick mode for non-empty expression
    } else {
      interactiveMode()(); // Launch interactive mode if no expression provided
    }
  });

// Parse command-line arguments
program.parse(process.argv);

// Optimize exit for version/help flags to avoid loading unnecessary modules
if (process.argv.includes('-v') || process.argv.includes('--version') ||
    process.argv.includes('-h') || process.argv.includes('--help')) {
  process.exit(0); // Immediate exit for performance
}
