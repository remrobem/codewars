const theLift = require('./theLift');

test('empty', () => {
    expect(theLift([ [], [], [], [], [], [], [] ],5)).toStrictEqual([0]);
});
test('fire drill', () => {
    expect(theLift([ [],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ] ], 5)).toStrictEqual([0, 6, 5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 4, 3, 2, 1, 0, 3, 2, 1, 0, 1, 0]);
});

test('highlander', () => {
    expect(theLift([ [], [ 2 ], [ 3, 3, 3 ], [ 1 ], [], [], [] ], 1)).toStrictEqual([0, 1, 2, 3, 1, 2, 3, 2, 3, 0]);
});