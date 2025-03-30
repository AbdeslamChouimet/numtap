### **Numtap - Command-Line Scientific Calculator**

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js: >=14](https://img.shields.io/badge/Node.js->=14-green.svg)](https://nodejs.org)
[![npm](https://img.shields.io/npm/v/numtap.svg)](https://www.npmjs.com/package/numtap)
[![Downloads](https://img.shields.io/npm/dt/numtap.svg)](https://www.npmjs.com/package/numtap)
[![Size](https://img.shields.io/bundlephobia/min/numtap)](https://bundlephobia.com/package/numtap)

**Numtap** is a command-line calculator engineered for precision, efficiency, and scientific computation within the terminal. Designed for developers, engineers, and mathematicians, it delivers rapid calculations and a robust REPL experience, tailored for those who value functionality over flourish.

---

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Commands (Interactive Mode)](#commands-interactive-mode)
- [Supported Operations and Data Types](#supported-operations-and-data-types)
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

Numtap integrates a lightweight architecture with a comprehensive set of mathematical operations, supporting both single-expression evaluations and interactive sessions. Leveraging a customized `mathjs` core, it balances performance with utility, making it an indispensable tool for terminal-based workflows.

---

## Installation

To install Numtap globally:

```bash
npm install -g numtap
```

**Requirements**:  
- Node.js version 14.0.0 or higher.  
- Dependencies: `chalk`, `commander`, `mathjs` (no additional runtimes required).

For source installation:  
```bash
git clone https://github.com/AbdeslamChouimet/numtap.git
cd numtap
npm install
npm link
```

---

## Usage

Numtap operates in two modes to suit varying needs:

### 1. Quick Mode
Evaluate a single expression directly:  
```bash
numtap "2 + 3 * (4 - 1)"
```
Output:  
```
~> Result: 11
```

### 2. Interactive Mode
Launch a persistent session for chained calculations (REPL: Read-Eval-Print Loop, a real-time interactive environment):  
```bash
numtap
```
Example session:  
```
•| Welcome to Numtap
•| Tip => Type "help" for commands, "exit" to quit
~> Input: x = 5
~> Input: y = x + 2
~> Input: y * sin(30 deg)
~> Result: 3.5
~> Input: exit
•| Session ended • Total calculations: 1
```

---

## Commands (Interactive Mode)

Numtap provides the following commands:  
- `help`, `h`: Lists available commands and operations.  
- `clear`, `cls`: Clears the terminal display.  
- `last`, `l`: Retrieves the most recent result.  
- `history`, `his`: Displays all calculations with timestamps.  
- `version`, `v`: Shows the current version (1.1.0).  
- `exit`, `q`: Terminates the session.

---

## Supported Operations and Data Types

Numtap excels as a scientific and practical calculator through its structured support for a variety of operations and data types, distinguishing it from traditional CLI tools.

### 1. Fundamental Arithmetic Operations
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
| Category         | Supported Functions                            | Example            | Approximate Result |
|------------------|------------------------------------------------|-------------------|---------------------|
| Trigonometric    | `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()` | `sin(45 deg)`     | 0.7071             |
| Logarithmic      | `log(base, value)`, `log10()`, `exp()`          | `log(1000, 10)`   | 3                  |
| Miscellaneous    | `abs()`, `factorial()` (`!`)                    | `5!`              | 120                |

### 3. Variable Management
- **Definition**: Assign variables for reuse.  
  ```bash
  ~> Input: x = 5; y = x^2 + 3
  ~> Result: 28
  ```
- **Subsequent Use**: Reference variables in later expressions.  
  ```bash
  ~> Input: y / 4
  ~> Result: 7
  ```

### 4. Unit Conversions
| Conversion       | Example             | Result         |
|------------------|---------------------|----------------|
| Degrees to Radians | `90 deg to rad`   | π/2 (~1.5708)  |
| Radians to Degrees | `pi rad to deg`   | 180            |

### 5. Scientific Constants and Special Values
| Constant/Value | Symbol         | Approximate Value     |
|----------------|----------------|-----------------------|
| Pi             | `pi`           | 3.141592653589793     |
| Euler’s Number | `e`            | 2.718281828459045     |
| Infinity       | `Infinity`     | ∞ (e.g., `1 / 0`)     |
| Not a Number   | `NaN`          | NaN (e.g., `0 / 0`)   |

### Comparison with Traditional Tools
| Feature                | Numtap               | `bc` (UNIX)         | Python REPL         |
|------------------------|----------------------|---------------------|---------------------|
| **Arithmetic**         | Full support         | Full support        | Full support        |
| **Scientific Funcs**   | Trig, logs, etc.     | None natively       | Via `math` module   |
| **Variables**          | Persistent           | Basic, non-REPL     | Manual scope        |
| **Special Values**     | `Infinity`, `NaN`    | Limited             | Supported           |
| **REPL Features**      | History, last result | None                | Basic, no history   |

Numtap’s native support for scientific operations and interactive features sets it apart, eliminating the need for external libraries or complex setups.

---

## Command-Line Interface Options

- `-v`, `--version`: Returns the version (1.1.0).  
- `-h`, `--help`: Displays usage details and examples.  

Example:  
```bash
numtap -v
```
Output: `1.1.1`

---

## Technical Design

- **Core**: Custom `mathjs` configuration (`matrix: false`, `units: ['deg', 'rad']`) for minimal overhead.  
- **Output**: Enhanced with `chalk` for legible, color-coded feedback.  
- **State**: Global `scope` object (a persistent memory for variables) preserves variables across evaluations.

---

## Examples of Use

- **Arithmetic Precision**:  
  ```bash
  numtap "5^2 - 3 * 4"
  ```
  Output: `~> Result: 13`

- **Scientific Calculation**:  
  ```bash
  numtap "sin(45 deg) * cos(45 deg)"
  ```
  Output: `~> Result: 0.5`

- **Practical Application**:  
  ```bash
  numtap "r = 3; pi * r^2"
  ```
  Output: `~> Result: 28.274333882308138`

---

## Error Handling

Numtap gracefully manages invalid inputs and edge cases, providing clear feedback:  
- **Undefined Symbols**:  
  ```bash
  numtap "abc + 2"
  ```
  Output: `Error: Undefined symbol: abc`  
- **Syntax Errors**:  
  ```bash
  numtap "5 + * 3"
  ```
  Output: `Error: Unexpected operator *`  
- **Empty Input**:  
  ```bash
  numtap ""
  ```
  Launches interactive mode instead of failing.

In interactive mode, errors are logged without terminating the session, ensuring a robust user experience.

---

## Compatibility

Numtap is compatible with the following operating systems, provided Node.js is installed:  
- **Linux**: Fully supported on standard distributions.  
- **macOS**: Compatible with macOS terminals.  
- **Windows**: Supported via Command Prompt, PowerShell, or Windows Subsystem for Linux (WSL).

---

## Limitations

- **Complex Numbers**: Not supported, focusing on real-number computations.  
- **Matrix Operations**: Omitted to maintain a lean footprint.  
- **Symbolic Algebra**: Excluded to prioritize numerical efficiency.

These constraints reflect Numtap’s commitment to speed and simplicity.

---

## Roadmap

Numtap is poised for future enhancements based on user needs:  
- **Complex Number Support**: Potential addition of imaginary and complex arithmetic.  
- **Extended Unit Conversions**: Support for additional units (e.g., length, time) beyond angles.  
- **Custom Function Definitions**: Allow users to define reusable functions within sessions.  
- **Performance Metrics**: Integrate benchmarking for precise evaluation times.

Contributions or feature requests are welcome to shape these developments.

---

## Contributions

Numtap welcomes contributions from those who appreciate its design:  
1. Fork: [github.com/AbdeslamChouimet/numtap](https://github.com/AbdeslamChouimet/numtap).  
2. Submit pull requests with enhancements.  
3. Report issues: [GitHub Issues](https://github.com/AbdeslamChouimet/numtap/issues).

---

## License

Released under the [GNU General Public License v3.0](LICENSE), granting freedom to use, modify, and distribute.

---

## Author

Developed by Abdeslam Chouimet under the GNU General Public License v3.0.

---

Numtap delivers computational excellence to those who seek it—uncompromising, efficient, and terminal-ready.
