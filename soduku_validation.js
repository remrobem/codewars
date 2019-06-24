// Given a Sudoku data structure with size NxN, N > 0 and √N == integer, write a method to validate if it has been filled out correctly.

// The data structure is a multi-dimensional Array(in Rust: Vec<Vec<u32>>) , ie:

// [
//   [7,8,4,  1,5,9,  3,2,6],
//   [5,3,9,  6,7,2,  8,4,1],
//   [6,1,2,  4,3,8,  7,5,9],

//   [9,2,8,  7,1,5,  4,6,3],
//   [3,5,7,  8,4,6,  1,9,2],
//   [4,6,1,  9,2,3,  5,8,7],

//   [8,7,6,  3,9,4,  2,1,5],
//   [2,4,3,  5,6,1,  9,7,8],
//   [1,9,5,  2,8,7,  6,3,4]
// ]
// Rules for validation

// Data structure dimension: NxN where N > 0 and √N == integer
// Rows may only contain integers: 1..N (N included)
// Columns may only contain integers: 1..N (N included)
// 'Little squares' (3x3 in example above) may also only contain integers: 1..N (N included)
// Note: the matrix may include non-integer elements.

var Sudoku = function (data) {
    //   Private methods
    // -------------------------
    function isInteger() {
        return (!isNaN(data.join('').replace(/,/g, '')));
    }

    function isRowsValid(data) {

        let rowSummary = data.map((row) => {
            let rowSum = row.reduce((accum, value) => {
                return accum + value;
            }, 0);
            return {
                rowLength: row.length,
                rowSum: rowSum
            }
        }, true);

        for (let i = 1; i < rowSummary.length; i++) {
            let equalRows = rowSummary[0].rowLength === rowSummary[i].rowLength && rowSummary[0].rowSum === rowSummary[i].rowSum ? true : false;
            if (!equalRows) { return false }
        };
        const maxValue = rowSummary[0].rowLength;

        for (let i = 0; i < rowSummary.length; i++) {
            let equalRows = rowSummary[0].rowLength === rowSummary[i].rowLength && rowSummary[0].rowSum === rowSummary[i].rowSum ? true : false;
            if (rowSummary[i].rowLength >= rowSummary[i].rowLength) { return false }
        };

        return true;
    };

    function transposeData(data) {
        return data.reduce((r, a) => a.map((v, i) => [...(r[i] || []), v]), []);
    }

    //   Public methods
    // -------------------------
    return {

        isValid: function () {
            // YOUR SOLUTION
            console.log(`length: ${data[0].length}`)
            if (!data) { return false };
            if (!isInteger()) { return false };
            isRowsValid(data);
            const transposedData = transposeData(data)
            isRowsValid(transposedData);
            return true;
        }
    };
};

var goodSudoku1 = new Sudoku([
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],

    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],

    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 4]
]);

console.log(goodSudoku1.isValid());