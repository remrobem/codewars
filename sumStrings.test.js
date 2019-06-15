
const sumStrings = require('./sumStrings');

test('sums numeric values in 2 strings', () => {
    expect(sumStrings('123', '456')).toBe('579');
});
test('sums numeric values in 2 strings when first string empty', () => {
    expect(sumStrings('', '456')).toBe('456');
});

test('sums numeric values in 2 strings when 2nd string empty', () => {
    expect(sumStrings('527', '')).toBe('527');
});


test('sums numeric values in 2 long strings', () => {
    expect(sumStrings('712569312664357328695151392', '8100824045303269669937')).toBe('712577413488402631964821329');
});

test('sums numeric values in 2 long strings', () => {
    expect(sumStrings('50095301248058391139327916261', '81055900096023504197206408605')).toBe('131151201344081895336534324866');
});


