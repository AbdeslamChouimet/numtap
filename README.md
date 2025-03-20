# Numtap
[![NPM Version](https://img.shields.io/npm/v/numtap.svg)](https://www.npmjs.com/package/numtap)
[![License](https://img.shields.io/github/license/AbdeslamChouimet/numtap.svg)](https://github.com/AbdeslamChouimet/numtap/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/numtap.svg)](https://www.npmjs.com/package/numtap)
[![GitHub release](https://img.shields.io/github/release/AbdeslamChouimet/numtap.svg)](https://github.com/AbdeslamChouimet/numtap/releases)

A vibrant CLI calculator for instant math in your terminal—simple yet powerful.

## Description
**Numtap** is a command-line calculator that brings quick, colorful math to your terminal. Whether you need a fast calculation or an interactive session, it’s built on `mathjs` for precision and enhanced with `chalk` for a lively interface. Perfect for developers and terminal enthusiasts.

## Motivation
Born from the need for seamless math in Node.js sessions, **Numtap** eliminates the hassle of external calculators with a fast, terminal-native solution.

## Features
- **Quick Mode**: Evaluate expressions instantly from the command line.
- **Interactive Mode**: Launch a calculator with commands like `help`, `clear`, `last`, `history`, and more.
- **Mathematical Power**: Supports basic operations (`+`, `-`, `*`, `/`), complex expressions (`(2 + 3) * 4`), and advanced functions (`sqrt`, `sin`, `^`).
- **Colorful Interface**: Brightened with `chalk`.
- **Smart Error Handling**: Friendly feedback for invalid inputs.

## Installation
### Via npm
```bash
npm install -g numtap
numtap
```
### Via GitHub
```bash
git clone https://github.com/AbdeslamChouimet/numtap.git
cd numtap
npm install
chmod +x numtap.cjs
npm link  # Optional: link globally
numtap
```

## Usage
### Quick Mode
Evaluate an expression directly:
```bash
numtap "2 + 3"        # Outputs: ~> Result: 5
numtap "sqrt(16)"     # Outputs: ~> Result: 4
```

### Interactive Mode
Launch an interactive calculator:
```bash
numtap
```
- Type expressions like `2 + 3` or `sin(45 deg)`.
- Use commands: `help`, `clear`, `last`, `history`, `version`, `exit`.

### Examples
```
# Quick Mode
$ numtap "(5 * 4) / 2"
~> Result: 10

# Interactive Mode
$ numtap
•| Welcome to Numtap
•| Tip
=> Type "exit" to quit, or "help" for commands.

~> Input: 2 + 3
~> Result: 5
~> Input: last
~> Last Result: 5
~> Input: history
Calculation History:
  1. 2 + 3 = 5
~> Input: exit
•| BYE ✓ See you soon!
```

## Commands (Interactive Mode)
- `help`    - Show available commands
- `clear`   - Clear the terminal screen
- `last`    - Show the last result
- `history` - Show calculation history
- `version` - Show Numtap version
- `exit`    - Quit the tool

## Dependencies
- **[mathjs](https://mathjs.org/)**: Precision math (v14.3.1)
- **[chalk](https://github.com/chalk/chalk)**: Terminal colors (v4.1.2)
- **[commander](https://github.com/tj/commander.js)**: CLI parsing (v13.1.0)
- **Node.js `readline`**: Interactive I/O (built-in)

## Issues
Report bugs at [github.com/AbdeslamChouimet/numtap/issues](https://github.com/AbdeslamChouimet/numtap/issues).

## License
MIT © 2025 Abdeslam Chouimet
