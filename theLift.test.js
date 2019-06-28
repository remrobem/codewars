const theLift = require('./theLift');

test('no parameter returns error', () => {
    expect(theLift()).toBe('error');
});