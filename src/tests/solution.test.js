import { josephus } from './josephus';

test('Test Case 1', () => {
  expect(josephus(5, 2)).toBe(3);
});

test('Test Case 2', () => {
  expect(josephus(7, 3)).toBe(4);
});

test('Test Case 3', () => {
  expect(josephus(10, 2)).toBe(5);
});

test('Test Case 4', () => {
  expect(josephus(5, 1)).toBe(5);
});

test('Test Case 5', () => {
  expect(josephus(1, 1)).toBe(1);
});

test('Test Case 6', () => {
  expect(josephus(100, 13)).toBe(70);
});

test('Test Case 7', () => {
  expect(josephus(789, 899)).toBe(636);
});

test('Test Case 8', () => {
  expect(josephus(238, 199)).toBe(62);
});

test('Test Case 9', () => {
  expect(josephus(1000, 1000)).toBe(609);
});

test('Test Case 10', () => {
  expect(josephus(1000, 1)).toBe(1000);
});

test('Test Case 11', () => {
  expect(josephus(100, 100)).toBe(22);
});
