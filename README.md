# Numtap - Command-Line Scientific Calculator

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js: >=14](https://img.shields.io/badge/Node.js->=14-green.svg)](https://nodejs.org)
[![npm](https://img.shields.io/npm/v/numtap.svg)](https://www.npmjs.com/package/numtap)
[![Downloads](https://img.shields.io/npm/dt/numtap.svg)](https://www.npmjs.com/package/numtap)
[![Size](https://img.shields.io/bundlephobia/min/numtap)](https://bundlephobia.com/package/numtap)

**Numtap** is a powerful, lightweight command-line calculator designed for precision and speed in scientific computations. Tailored for developers, engineers, and math enthusiasts, it offers both quick evaluations and an enriched interactive REPL experience, all within the terminal. With enhanced unit conversions, full multilingual support, and robust error handling, Numtap is your go-to tool for terminal-based calculations.

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

Numtap combines a streamlined architecture with a rich feature set, powered by a customized `mathjs` core. Whether you need a quick result or a persistent calculation session, Numtap delivers with minimal overhead and maximum utility. It supports advanced scientific functions, unit conversions, and a fully multilingual interface—perfect for professionals and hobbyists alike.

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
   Then type `.help` for commands (available in your chosen language).

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
- `.version`, `.v`: Display version.
- `.exit`, `.q`: Exit the session.

---

## Supported Operations and Features

### 1. Arithmetic Operations
| Operation      | Symbol/Function | Example         | Result |
|----------------|-----------------|-----------------|--------|
| Addition       | `+`             | `5 + 3`         | 8      |
| Subtraction    | `-`             | `7.2 - 2`       | 5.2    |
| Multiplication | `*`             | `4 * 2.5`       | 10     |
| Division       | `/`             | `10 / 4`        | 2.5    |

### 2. Scientific Functions
| Category       | Functions                              | Example         | Approx. Result |
|----------------|----------------------------------------|-----------------|----------------|
| Trigonometric  | `sin()`, `cos()`, `tan()`             | `sin(90 deg)`   | 1              |
| Logarithmic    | `log(base, value)`, `log10()`, `exp()` | `log10(100)`    | 2              |

### 3. Unit Conversions
| Conversion     | Example               | Result         |
|----------------|-----------------------|----------------|
| Distance       | `2 km to meter`       | 2000 meter     |
| Temperature    | `25 degC to degF`     | 77 degF        |
| Volume         | `2 liter to gallon`   | 0.528344 gallon|

---

## Command-Line Interface Options

- `-v`, `--version`: Show version number.
- `-h`, `--help`: Display usage and examples.
- `-l`, `--lang <language>`: Set language for output and interactive mode.

Supported languages:
| Language   | Code | Example Output       |
|------------|------|----------------------|
| English    | `en` | `Result: 8`         |
| Arabic     | `ar` | `النتيجة: 8`       |
| Russian    | `ru` | `Результат: 8`      |
| French     | `fr` | `Résultat: 8`       |
| Spanish    | `es` | `Resultado: 8`      |
| German     | `de` | `Ergebnis: 8`       |
| Portuguese | `pt` | `Resultado: 8`      |

Example:
```bash
numtap --lang ar
```
Output: `مرحبًا بك في Numtap! اكتب ".help" للحصول على الأوامر`

---

## Technical Design

- **Core**: Optimized `mathjs` with `matrix: false` and `number: 'number'` for speed.
- **Output**: Color-coded with `chalk` and styled with `figlet` in interactive mode.
- **State**: Persistent `scope` object for variable storage.
- **Performance**: Lazy loading and pre-initialization reduce startup time to <50ms for most operations.

---

## Examples of Use

- Quick calculation: `numtap "5^2 - 3 * 4"` → `Result: 13`
- Unit conversion: `numtap "25 degC to degF"` → `Result: 77 degF`
- Interactive: `numtap` → `➤ pi * 3^2` → `= 28.274333882308138`

---

## Error Handling

Numtap provides clear, multilingual error messages:
- Syntax error: `numtap "5 + * 3"` → `Error: Syntax error`
- Undefined symbol: `numtap "x + 2"` → `Error: Undefined symbol`

---

## Compatibility

- **Linux**: Fully supported.
- **macOS**: Terminal-compatible.
- **Windows**: Works via CMD, PowerShell, or WSL.

---

## Limitations

- No complex number support.
- Matrix operations excluded for efficiency.

---

## Roadmap

Future enhancements include:
- Multilingual command aliases (e.g., `.aide` for French).
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

Numtap: Precision, power, and simplicity—crafted for the terminal.
