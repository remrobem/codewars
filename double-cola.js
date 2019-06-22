

// Sheldon, Leonard, Penny, Rajesh and Howard are in the queue for a "Double Cola" drink vending machine; 
// there are no other people in the queue. The first one in the queue (Sheldon) buys a can, drinks it and doubles! 
// The resulting two Sheldons go to the end of the queue. 
// Then the next in the queue (Leonard) buys a can, drinks it and gets to the end of the queue as two Leonards, and so on.

// For example, Penny drinks the third can of cola and the queue will look like this:

// Rajesh, Howard, Sheldon, Sheldon, Leonard, Leonard, Penny, Penny
// Write a program that will return the name of the person who will drink the n-th cola.

// Input
// The input data consist of an array which contains at least 1 name, and single integer n.

// 1  ≤  n  ≤  10000000000
// Output / Examples
// Return the single line — the name of the person who drinks the n-th can of cola. The cans are numbered starting from 1.

// whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 1) == "Sheldon"
// whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 52) == "Penny"
// whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 7230702951) == "Leonard"

function whoIsNext(names, r) {

    let count = 0;

    // outer loop done r times
    for (let i = 0; i <= r; i++) {
        // inner loop thru names 
        for (let j = 0; j < names.length; j++) {
           // increment count by 2 to the outer loop power - adds 1, thrn 2, then 4, then 8,.....
            count += Math.pow(2,i);
            if (count >= r) {
                return names[j];
            }
        };
    };
};
const names = ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"];

console.log(whoIsNext(names, 1));       // Sheldon
console.log(whoIsNext(names, 52));      // Penney
console.log(whoIsNext(names, 10010));   // howard
console.log(whoIsNext(names, 63));    // rajesh
