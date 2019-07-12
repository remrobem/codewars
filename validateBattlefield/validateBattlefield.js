// Write a method that takes a field for well-known board game "Battleship" as an argument 
// and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. 
// Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

// Battleship (also Battleships or Sea Battle) is a guessing game for two players. 
// Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. 
// The ship occupies one or more cells in the grid. 
// Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.

// Before the game begins, players set up the board and place the ships accordingly to the following rules:
// There must be  
//     1 battleship (size of 4 cells), 
//     2 cruisers (size 3), 
//     3 destroyers (size 2)
//     4 submarines (size 1)

// Any additional ships are not allowed, as well as missing ships.

// Each ship must be a straight line, except for submarines, which are just single cell.

// The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

"use strict";

function validateBattlefield(field) {

    let allowedShips = [4, 3, 3, 2, 2, 2]

    let actualCells = 0;
    let expectedCells = 20;

    checkrow(field);

    if (actualCells != expectedCells) {
        return false;
    };

    checkrow(transpose(field));

    if (allowedShips.length == 0) {
        return validateCorners(field);
    } else {
        return false
    };

    function checkrow(field) {
        let count = 0
        return field.map((row) => {
            return row.reduce((isValid, cell, index) => {
                if (isValid) {
                    if (cell) {
                        count += 1;
                        actualCells += 1;
                        if (count > 1 && index == row.length - 1) {
                            let shipToRemove = count;
                            count = 0;
                            return removeShip(shipToRemove);
                        }
                        return true;
                    } else {
                        if (count > 1) {
                            let shipToRemove = count;
                            count = 0;
                            return removeShip(shipToRemove);
                        };
                        count = 0;
                    };
                };
                return true;
            }, true)
        })
    }
    function removeShip(count) {
        let shipFound = allowedShips.indexOf(count);
        if (shipFound >= 0) {
            allowedShips.splice(shipFound, 1);
            return true;
        } else {
            return false;
        };
    }
    function transpose(battlefield) {
        return battlefield[0].map((_, i) => battlefield.map(row => row[i]));
    };

    function validateCorners(field) {
        let cornerValidation =  field.map((row, rowIndex) => {
            return row.reduce((isValid, column, colIndex) => {
                if (isValid) {
                    if (field[rowIndex][colIndex]) {
                        if (rowIndex > 0 && rowIndex < field.length - 1 && colIndex > 0 && colIndex < row.length - 1) {
                            if (field[rowIndex - 1][colIndex - 1]
                                || field[rowIndex - 1][colIndex + 1]
                                || field[rowIndex + 1][colIndex - 1]
                                || field[rowIndex + 1][colIndex + 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                        if (rowIndex == 0 && colIndex == 0) {
                            if (field[rowIndex + 1][colIndex + 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                        if (rowIndex == field.length - 1 && colIndex == row.length - 1) {
                            if (field[rowIndex - 1][colIndex - 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                        if (rowIndex == 0 && colIndex > 0 && colIndex < row.length - 1) {
                            if (field[rowIndex + 1][colIndex + 1]
                                || field[rowIndex + 1][colIndex - 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        }
                        if (rowIndex > 0 && rowIndex < field.length - 1 && colIndex == 0) {
                            if (field[rowIndex - 1][colIndex + 1] || field[rowIndex + 1][colIndex + 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        }
                        // add logic for row and column 10
                        if (rowIndex == field.length - 1 && colIndex > 0 && colIndex < row.length - 1) {
                            if (field[rowIndex - 1][colIndex - 1] || field[rowIndex - 1][colIndex + 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                        if (rowIndex == 0 && colIndex == row.length - 1) {
                            if (field[rowIndex + 1][colIndex - 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                        if (rowIndex == field.length - 1 && colIndex == 0) {
                            if (field[rowIndex - 1][colIndex + 1]) {
                                return false;
                            } else {
                                return true;
                            };
                        };
                        return false;
                    } else {
                        return true;
                    };
                } else {
                    return false;
                };
            }, true)

        }, true)

        return cornerValidation.indexOf(false) >= 0 ? false: true;
    };
};

module.exports = validateBattlefield;

console.log(validateBattlefield(
    [
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0]]
)
);