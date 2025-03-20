#!/usr/bin/env node
const math = require ('mathjs');
const chalk = require('chalk');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
console.log(`•|${chalk.green(' Welcome again to')} ${chalk.green.bold('Numtap')}`);
console.log(`•|${chalk.yellow.bold(' Note\n=>')} input "${chalk.red.bold('exit')}" to quit anytime.`);
function calculateIt() {
	rl.question(chalk.green('\n~> Input: '), input => {
		if (input.toLowerCase() === 'exit') {
			console.log(`•| ${chalk.green.bold('BYE ✓')} ${chalk.green('see you soon')}`);
			rl.close();
		} else {
			try {
				const result = math.evaluate(input);
				console.log(`${chalk.green.bold(`~> Result: ${result}`)}`);
				calculateIt();
			} catch (err) {
				console.log(`\n•|${chalk.red.bold(' Invalid value.')}\n•|${chalk.yellow.bold(' Try input valid value again ✓')}\n`);
				calculateIt();
			}
		}
	});
};
calculateIt();
