#!/usr/bin/env node
const math = require('mathjs');
const chalk = require('chalk');
const readline = require('readline');
const { program } = require('commander');
const packageJson = require('./package.json');

let lastResult = null;
let history = [];

program
  .version(packageJson.version)
  .argument('[expression]', 'Math expression to evaluate')
  .description('Numtap: A vibrant CLI calculator for instant math in your terminal.')
  .addHelpText('after', `
Quick Mode: Evaluate an expression directly
  $ numtap "2 + 3"         # Outputs: ~> Result: 5
  $ numtap "sqrt(16)"      # Outputs: ~> Result: 4

Interactive Mode: Launch a powerful calculator
  $ numtap                 # Start interactive mode
  # Use commands like: help, clear, last, history, version, exit

Numtap combines simplicity with power—try it now!
  `)
  .action((expression) => {
    if (expression) {
      try {
        const result = math.evaluate(expression);
        console.log(chalk.green.bold(`~> Result: ${result}`));
      } catch (err) {
        console.log(chalk.red.bold('Invalid expression!'));
      }
    } else {
      interactiveMode();
    }
  });

program.parse();

function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`•|${chalk.green(' Welcome to')} ${chalk.green.bold('Numtap')}`);
  console.log(`•|${chalk.yellow.bold(' Tip\n=>')} Type "${chalk.red.bold('exit')}" to quit, or "${chalk.red.bold('help')}" for commands.`);

  function calculateIt() {
    rl.question(chalk.green('\n~> Input: '), input => {
      const trimmedInput = input.trim().toLowerCase();

      if (trimmedInput === 'exit') {
        console.log(`•| ${chalk.green.bold('BYE ✓')} ${chalk.green('See you soon!')}`);
        rl.close();
      } else if (trimmedInput === 'help') {
        console.log(chalk.yellow.bold('Available Commands:'));
        console.log(`  ${chalk.green('help')}    - Show this help message`);
        console.log(`  ${chalk.green('clear')}   - Clear the terminal screen`);
        console.log(`  ${chalk.green('last')}    - Show the last result`);
        console.log(`  ${chalk.green('history')} - Show calculation history`);
        console.log(`  ${chalk.green('version')} - Show Numtap version`);
        console.log(`  ${chalk.green('exit')}    - Quit the tool`);
        console.log(chalk.yellow('Examples:'));
        console.log(`  2 + 3         => 5`);
        console.log(`  sqrt(16)      => 4`);
        console.log(`  sin(45 deg)   => ~0.707`);
        calculateIt();
      } else if (trimmedInput === 'clear') {
        console.clear();
        console.log(chalk.green('Screen cleared!'));
        calculateIt();
      } else if (trimmedInput === 'last') {
        if (lastResult !== null) {
          console.log(chalk.green.bold(`~> Last Result: ${lastResult}`));
        } else {
          console.log(chalk.yellow('No previous result available.'));
        }
        calculateIt();
      } else if (trimmedInput === 'history') {
        if (history.length > 0) {
          console.log(chalk.yellow.bold('Calculation History:'));
          history.forEach((entry, index) => {
            console.log(`  ${index + 1}. ${entry.expression} = ${chalk.green(entry.result)}`);
          });
        } else {
          console.log(chalk.yellow('No history available yet.'));
        }
        calculateIt();
      } else if (trimmedInput === 'version') {
        console.log(chalk.green.bold(`Numtap v${packageJson.version}`));
        calculateIt();
      } else {
        try {
          const result = math.evaluate(input);
          lastResult = result;
          history.push({ expression: input, result });
          console.log(chalk.green.bold(`~> Result: ${result}`));
          calculateIt();
        } catch (err) {
          console.log(`\n•|${chalk.red.bold(' Invalid input.')}\n•|${chalk.yellow.bold(' Try a valid expression ✓')}\n`);
          calculateIt();
        }
      }
    });
  }
  calculateIt();
}
