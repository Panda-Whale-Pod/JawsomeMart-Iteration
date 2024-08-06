const sum = require('./sum');

test('adds 3 + 4 to equal 7', () => {
    expect(sum(4, 3)).toBe(7);
});