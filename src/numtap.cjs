#!/usr/bin/env node
// src/numtap.cjs
// Concise CLI entry point with enhanced help

const { program } = require('commander');
const chalk = require('chalk');
const quickMode = require('./quickMode.cjs');
const interactiveMode = require('./interactiveMode.cjs');

program
  .version('1.1.0', '-v, --version')
  .description(chalk.blue.bold('Numtap - Scientific CLI Calculator'))
  .argument('[expression]', 'Mathematical expression', '')
  .addHelpText('after', `
${chalk.cyan('Examples:')}
  ${chalk.green('numtap "5 + 3 * 2"')}     # Basic arithmetic (Result: 11)
  ${chalk.green('numtap "sin(45 deg)"')}   # Scientific calculation (Result: ~0.7071)
  ${chalk.green('numtap "x=5; x^2"')}     # Variables (Result: 25)

${chalk.yellow('Interactive Mode:')} Run without arguments`)
  .action((expression) => {
    expression.trim() ? quickMode(expression) : interactiveMode();
  })
  .parse(process.argv);
