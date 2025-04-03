// tests/numtap.test.js - Test suite for Numtap functionality

const { execSync } = require('child_process');
const { evalExpression } = require('../src/utils.cjs');

// Test suite for evalExpression function
describe('evalExpression', () => {
  test('Basic arithmetic: 5 + 3', () => {
    expect(evalExpression('5 + 3')).toBe(8); // Simple addition
  });
  test('Square root: sqrt(16)', () => {
    expect(evalExpression('sqrt(16)')).toBe(4); // Mathematical function
  });
  test('Sine: sin(90 deg)', () => {
    expect(evalExpression('sin(90 deg)')).toBeCloseTo(1, 5); // Trigonometric function with degrees
  });
  test('Unit conversion: 2 km to meter', () => {
    const result = evalExpression('2 km to meter');
    expect(result.toNumber()).toBe(2000); // Conversion value
    expect(result.toString()).toBe('2000 meter'); // Conversion string representation
  });
  test('Temperature: 25 degC to degF', () => {
    const result = evalExpression('25 degC to degF');
    expect(result.toNumber()).toBeCloseTo(77, 1); // Celsius to Fahrenheit
    expect(result.toString()).toBe('77 degF'); // String output
  });
  test('Volume: 2 liter to gallon', () => {
    const result = evalExpression('2 liter to gallon');
    expect(result.toNumber()).toBeCloseTo(0.528344, 2); // Liter to gallon
    expect(result.toString()).toMatch(/0\.528344.*gallon/); // Flexible string match
  });
  test('Division by zero: 5 / 0', () => {
    expect(() => evalExpression('5 / 0')).toThrow('Result is infinite'); // Infinite result error
  });
  test('NaN case: 0 / 0', () => {
    expect(() => evalExpression('0 / 0')).toThrow('Invalid operation (NaN)'); // NaN error
  });
  test('Invalid symbol: one + 1', () => {
    expect(() => evalExpression('one + 1')).toThrow('Undefined symbol'); // Undefined variable error
  });
});

// Test suite for CLI behavior
describe('CLI', () => {
  test('numtap "5 + 3"', () => {
    const output = execSync('numtap "5 + 3"').toString();
    expect(output).toContain('Result: 8'); // Quick mode basic arithmetic
  });
  test('numtap "2 km to meter"', () => {
    const output = execSync('numtap "2 km to meter"').toString();
    expect(output).toContain('Result: 2000 meter'); // Quick mode unit conversion
  });
  test('numtap "25 degC to degF"', () => {
    const output = execSync('numtap "25 degC to degF"').toString();
    expect(output).toContain('Result: 77'); // Quick mode temperature conversion
  });
  test('numtap "2 liter to gallon"', () => {
    const output = execSync('numtap "2 liter to gallon"').toString();
    expect(output).toContain('Result: 0.528344'); // Quick mode volume conversion
  });
  test('numtap "5 / 0"', () => {
    let output;
    try {
      execSync('numtap "5 / 0"', { stdio: 'pipe' });
    } catch (e) {
      output = e.stderr.toString();
    }
    expect(output).toMatch(/Result is infinite/); // CLI error for infinity
  });
  test('numtap -v', () => {
    const output = execSync('numtap -v').toString();
    expect(output).toContain('1.2.0'); // Version flag
  });
  test('numtap -h', () => {
    const output = execSync('numtap -h').toString();
    expect(output).toMatch(/usage/i); // Help flag
  });
});
