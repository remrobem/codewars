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
test('lift full (up)', () => {
    expect(theLift([ [ 3, 3, 3, 3, 3, 3 ], [], [], [], [], [], [] ], 5)).toStrictEqual([0, 3, 0, 3, 0]);
});


test('up and down', () => {
    expect(theLift([ [ 3 ], [ 2 ], [ 0 ], [ 2 ], [], [], [ 5 ] ], 5)).toStrictEqual([0, 1, 2, 3, 6, 5, 3, 2, 0]);
});

test('11 floors, 23 people, lift holds 2', () => {
    expect(theLift([ [ 5 ],
        [ 4, 8, 6, 9 ],
        [ 3, 10, 1 ],
        [ 7, 1, 2 ],
        [ 8, 6, 9 ],
        [ 6, 8, 7, 0 ],
        [ 9, 0 ],
        [],
        [ 7 ],
        [ 7 ],
        [ 4 ] ], 2)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 8, 7, 5, 3, 2, 1, 0, 1, 2, 3, 4, 5, 7, 9, 2, 4, 5, 6, 10, 4, 5, 8, 9, 5, 7, 0]);
});


