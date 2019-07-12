function validateBattlefield(field) {
    var hit = (row, col) => {
        if (row >= 0 && col >= 0 && row <= 9 && col <= 9) {
            // console.log(`hit:  ${row} ${col} ${field[row][col]}`);
        }
        return (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];
    };
    // console.log(hit(3,0));
    let ships = [10, 0, 0, 0, 0];

    for (var row = 0; row < 10; row++) {
        for (var col = 0; col < 10; col++) {
            //   console.log(field);
            if (hit(row, col)) {
                if (hit(row - 1, col - 1) || hit(row - 1, col + 1)) return false; // Corner is touching
                if (hit(row - 1, col) && hit(row, col - 1)) return false; // Side is touching
                if ((field[row][col] += hit(row - 1, col) + hit(row, col - 1)) > 4) return false; // Ship is too long
                ships[field[row][col]]++;
                ships[field[row][col] - 1]--;
            }
        }
    }
    return [0, 4, 3, 2, 1].every((s, i) => s == ships[i]);
}

module.exports = validateBattlefield;

console.log(validateBattlefield(
    [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
));