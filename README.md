# Numtap - Command-Line Scientific Calculator
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js: >=14](https://img.shields.io/badge/Node.js->=14-green.svg)](https://nodejs.org)
[![npm](https://img.shields.io/npm/v/numtap.svg)](https://www.npmjs.com/package/numtap)
[![Downloads](https://img.shields.io/npm/dt/numtap.svg)](https://www.npmjs.com/package/numtap)
[![Size](https://img.shields.io/bundlephobia/min/numtap)](https://bundlephobia.com/package/numtap)

**Numtap** is a powerful, lightweight command-line calculator designed for precision and speed in scientific computations. Tailored for developers, engineers, and math enthusiasts, it offers both quick evaluations and an enriched interactive REPL experience, all within the terminal. With version 1.2.0, Numtap brings enhanced unit conversions, multilingual support, and robust error handling—making it your go-to tool for terminal-based calculations.

---

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Commands (Interactive Mode)](#commands-interactive-mode)
- [Supported Operations and Features](#supported-operations-and-features)
- [Command-Line Interface Options](#command-line-interface-options)
- [Technical Design](#technical-design)
- [Examples of Use](#examples-of-use)
- [Error Handling](#error-handling)
- [Compatibility](#compatibility)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Contributions](#contributions)
- [License](#license)
- [Author](#author)

---

## Overview

Numtap combines a streamlined architecture with a rich feature set, powered by a customized `mathjs` core. Whether you need a quick result or a persistent calculation session, Numtap delivers with minimal overhead and maximum utility. Version 1.2.0 introduces expanded unit conversions (e.g., temperature and volume), multilingual error messages, and optimized performance—perfect for professionals and hobbyists alike.

---

## Prerequisites

- **Node.js**: Version 14.0.0 or higher (download from [nodejs.org](https://nodejs.org)).
- **npm**: Included with Node.js installation.

---

## Installation

Install Numtap globally via npm:

```bash
npm install -g numtap
```

**Dependencies**: `chalk`, `commander`, `figlet`, `mathjs`.

For source installation:
```bash
git clone https://github.com/AbdeslamChouimet/numtap.git
cd numtap
npm install
npm link
```

---

## Quick Start

1. Install Numtap:
   ```bash
   npm install -g numtap
   ```
2. Try a quick calculation:
   ```bash
   numtap "5 + 3"
   ```
3. Explore interactive mode:
   ```bash
   numtap
   ```
   Then type `.help` for commands.

---

## Usage

Numtap supports two modes to fit your workflow:

### 1. Quick Mode
Evaluate a single expression instantly:
```bash
numtap "2 + 3 * (4 - 1)"
```
Output:
```
Result: 11
Time taken: 9.12 ms
```

### 2. Interactive Mode
Launch a REPL session for continuous calculations:
```bash
numtap
```
Example session:
```
  _   _                 _
 | \ | |_   _ _ __ ___ | |_ __ _ _ __
 |  \| | | | | '_ ` _ \| __/ _` | '_ \
 | |\  | |_| | | | | | | || (_| | |_) |
 |_| \_|\__,_|_| |_| |_|\__\__,_| .__/
                                |_|

Welcome to Numtap! Type ".help" for commands
➤ x = 5
➤ y = x + 2
➤ y * sin(30 deg)
= 3.5
Time taken: 8.45 ms
➤ .exit
Goodbye! Total calculations: 1
```

---

## Commands (Interactive Mode)

In interactive mode, use these commands:
- `.help`, `.h`: Display available commands.
- `.clear`, `.cls`: Clear the terminal screen.
- `.last`, `.l`: Show the last result.
- `.history`, `.his`: View calculation history with timestamps.
- `.version`, `.v`: Display version (1.2.0).
- `.exit`, `.q`: Exit the session.

---

## Supported Operations and Features

Numtap offers a comprehensive suite of operations and features:

### 1. Arithmetic Operations
| Operation      | Symbol/Function | Example         | Result |
|----------------|-----------------|-----------------|--------|
| Addition       | `+`             | `5 + 3`         | 8      |
| Subtraction    | `-`             | `7.2 - 2`       | 5.2    |
| Multiplication | `*`             | `4 * 2.5`       | 10     |
| Division       | `/`             | `10 / 4`        | 2.5    |
| Exponentiation | `^`             | `2^3`           | 8      |
| Square Root    | `sqrt()`        | `sqrt(25)`      | 5      |
| Modulo         | `%`             | `467 % 68`      | 59     |

### 2. Scientific Functions
| Category         | Functions                              | Example            | Approx. Result |
|------------------|----------------------------------------|-------------------|----------------|
| Trigonometric    | `sin()`, `cos()`, `tan()`             | `sin(90 deg)`     | 1              |
| Logarithmic      | `log(base, value)`, `log10()`, `exp()` | `log10(100)`      | 2              |
| Miscellaneous    | `abs()`, `factorial()` (`!`)           | `factorial(5)`    | 120            |

### 3. Variable Management
- Define and reuse variables:
  ```bash
  numtap "x = 5; x^2 + 3"
  ```
  Output: `Result: 28`

### 4. Unit Conversions
| Conversion          | Example               | Result         |
|---------------------|-----------------------|----------------|
| Distance            | `2 km to meter`       | 2000 meter     |
| Temperature         | `25 degC to degF`     | 77 degF        |
| Volume              | `2 liter to gallon`   | 0.528344 gallon|
| Angles              | `90 deg to rad`       | 1.5708 rad     |

### 5. Special Values
| Value          | Symbol         | Example         | Result         |
|----------------|----------------|-----------------|----------------|
| Pi             | `pi`           | `pi * 2`        | 6.2832         |
| Euler’s Number | `e`            | `e^1`           | 2.7183         |
| Infinity       | `Infinity`     | `5 / 0`         | Infinity       |
| NaN            | `NaN`          | `0 / 0`         | NaN            |

---

## Command-Line Interface Options

- `-v`, `--version`: Show version (1.2.0).
- `-h`, `--help`: Display usage and examples.
- `-l`, `--lang <language>`: Set language for output.

Supported languages:
| Language | Code | Example Output       |
|----------|------|----------------------|
| English  | `en` | `Result: 8`         |
| Arabic   | `ar` | `النتيجة: 8`       |
| Russian  | `ru` | `Результат: 8`      |
| French   | `fr` | `Résultat: 8`       |
| Spanish  | `es` | `Resultado: 8`      |
| German   | `de` | `Ergebnis: 8`       |
| Portuguese | `pt` | `Resultado: 8`    |

Example:
```bash
numtap --lang ar "5 + 3"
```
Output: `النتيجة: 8`

---

## Technical Design

- **Core**: Optimized `mathjs` with `matrix: false` and `number: 'number'` for speed.
- **Output**: Color-coded with `chalk` and styled with `figlet` in interactive mode.
- **State**: Persistent `scope` object for variable storage.
- **Performance**: Lazy loading and pre-initialization reduce startup time to <50ms for most operations.

---

## Examples of Use

- **Quick Calculation**:
  ```bash
  numtap "5^2 - 3 * 4"
  ```
  Output: `Result: 13`

- **Scientific Application**:
  ```bash
  numtap "sin(45 deg)^2 + cos(45 deg)^2"
  ```
  Output: `Result: 1`

- **Unit Conversion**:
  ```bash
  numtap "25 degC to degF"
  ```
  Output: `Result: 77 degF`

- **Interactive Workflow**:
  ```bash
  numtap
  ➤ r = 3
  ➤ pi * r^2
  = 28.274333882308138
  ```

---

## Error Handling

Numtap provides clear, multilingual error messages:
- **Syntax Error**:
  ```bash
  numtap "5 + * 3"
  ```
  Output: `Error: Syntax error`
- **Undefined Symbol**:
  ```bash
  numtap "x + 2"
  ```
  Output: `Error: Undefined symbol`
- **Special Cases**:
  ```bash
  numtap "5 / 0"
  ```
  Output: `Error: Result is infinite`

Errors in interactive mode are non-disruptive, keeping the session alive.

---

## Compatibility

- **Linux**: Fully supported.
- **macOS**: Terminal-compatible.
- **Windows**: Works via CMD, PowerShell, or WSL.
- Requires Node.js >= 14.0.0.

---

## Limitations

- No complex number support.
- Matrix operations excluded for efficiency.
- Focuses on numerical rather than symbolic computation.

---

## Roadmap

Future enhancements include:
- Multilingual command support in interactive mode.
- More unit conversions (e.g., time, mass).
- Optional complex number arithmetic.
- Custom user-defined functions.

---

## Contributions

Contributions are welcome:
1. Fork: [github.com/AbdeslamChouimet/numtap](https://github.com/AbdeslamChouimet/numtap).
2. Submit pull requests.
3. Report issues: [GitHub Issues](https://github.com/AbdeslamChouimet/numtap/issues).

---

## License

Licensed under the [GNU General Public License v3.0](LICENSE).

---

## Author

Developed by Abdeslam Chouimet.

---

Numtap 1.2.0: Precision, power, and simplicity—crafted for the terminal.
