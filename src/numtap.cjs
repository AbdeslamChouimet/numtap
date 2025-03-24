#!/usr/bin/env node
// src/numtap.cjs
// Numtap CLI Entry Point - Fixed version

const { program } = require('commander');
const chalk = require('chalk');
const quickMode = require('./quickMode.cjs');
const interactiveMode = require('./interactiveMode.cjs');

// ================================================
// CLI Configuration with Proper Argument Handling
// ================================================
program
  .version('1.1.0', '-v, --version')
  .description(chalk.blue.bold('Numtap - Scientific Terminal Calculator'))
  .argument('[expression]', 'Mathematical expression to evaluate')
  .addHelpText('after', `

${chalk.cyan('Examples:')}
  $ numtap "2 + 3 * (4 - 1)"   # Basic arithmetic
  $ numtap "sin(45 deg)"       # Trigonometric function
  $ numtap "x=5; x^2 + 3x"    # Variables support

${chalk.yellow('Interactive Mode:')} Run without arguments`)
  .action((expression) => {
    if (expression && expression.trim() !== '') {
      quickMode(expression.trim());
    } else {
      interactiveMode();
    }
  });

program.parse(process.argv);
