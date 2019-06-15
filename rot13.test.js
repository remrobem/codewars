// rot13("EBG13 rknzcyr.") == "ROT13 example.";
// rot13("This is my first ROT13 excercise!" == "Guvf vf zl svefg EBG13 rkprepvfr!"

const rot13 = require('./rot13');

test('translate rot13 string', () => {
    expect(rot13('EBG13 rknzcyr.')).toBe('ROT13 example.');
});

test('translate string to rot13', () => {
    expect(rot13('This is my first ROT13 excercise!')).toBe('Guvf vf zl svefg EBG13 rkprepvfr!');
});