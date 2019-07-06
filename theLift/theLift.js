// Synopsis
// A multi-floor building has a Lift in it.

// People are queued on different floors waiting for the Lift.

// Some people want to go up. Some people want to go down.

// The floor they want to go to is represented by a number (i.e. when they enter the Lift this is the button they will press)

// BEFORE (people waiting in queues)               AFTER (people at their destinations)
//                    +--+                                          +--+ 
//   /----------------|  |----------------\        /----------------|  |----------------\
// 10|                |  | 1,4,3,2        |      10|             10 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  9|                |  | 1,10,2         |       9|                |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  8|                |  |                |       8|                |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  7|                |  | 3,6,4,5,6      |       7|                |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  6|                |  |                |       6|          6,6,6 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  5|                |  |                |       5|            5,5 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  4|                |  | 0,0,0          |       4|          4,4,4 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  3|                |  |                |       3|            3,3 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  2|                |  | 4              |       2|          2,2,2 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  1|                |  | 6,5,2          |       1|            1,1 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  G|                |  |                |       G|          0,0,0 |  |                |
//   |====================================|        |====================================|
// Rules
// Lift Rules
// The Lift only goes up or down!
// Each floor has both UP and DOWN Lift-call buttons (except top and ground floors which have only DOWN and UP respectively)
// The Lift never changes direction until there are no more people wanting to get on/off in the direction it is already travelling
// When empty the Lift tries to be smart. For example,
// If it was going up then it may continue up to collect the highest floor person wanting to go down
// If it was going down then it may continue down to collect the lowest floor person wanting to go up
// The Lift has a maximum capacity of people
// When called, the Lift will stop at a floor even if it is full, although unless somebody gets off nobody else can get on!
// If the lift is empty, and no people are waiting, then it will return to the ground floor
// People Rules
// People are in "queues" that represent their order of arrival to wait for the Lift
// All people can press the UP/DOWN Lift-call buttons
// Only people going the same direction as the Lift may enter it
// Entry is according to the "queue" order, but those unable to enter do not block those behind them that can
// If a person is unable to enter a full Lift, they will press the UP/DOWN Lift-call button again after it has departed without them
// Kata Task
// Get all the people to the floors they want to go to while obeying the Lift rules and the People rules
// Return a list of all floors that the Lift stopped at (in the order visited!)
// NOTE: The Lift always starts on the ground floor (and people waiting on the ground floor may enter immediately)

// I/O
// Input
// queues a list of queues of people for all floors of the building.
// The height of the building varies
// 0 = the ground floor
// Not all floors have queues
// Queue index [0] is the "head" of the queue
// Numbers indicate which floor the person wants go to
// capacity maximum number of people allowed in the lift
// Parameter validation - All input parameters can be assumed OK. No need to check for things like:

// People wanting to go to floors that do not exist
// People wanting to take the Lift to the floor they are already on
// Buildings with < 2 floors
// Basements
// Output
// A list of all floors that the Lift stopped at (in the order visited!)
// Example
// Refer to the example test cases.

// Test.describe("Example Tests", function() {

//     Test.it("up", function() {
//       var queues = [
//         [], // G
//         [], // 1
//         [5,5,5], // 2
//         [], // 3
//         [], // 4
//         [], // 5
//         [], // 6
//       ];
//       var result = theLift(queues,5);
//       Test.assertSimilar(result, [0,2,5,0]);
//     });

//     Test.it("down", function() {
//       var queues = [
//         [], // G
//         [], // 1
//         [1,1], // 2
//         [], // 3
//         [], // 4
//         [], // 5
//         [], // 6
//       ];
//       var result = theLift(queues,5);
//       Test.assertSimilar(result, [0,2,1,0]);
//     });  


//       Test.it("up and up", function() {
//       var queues = [
//         [], // G
//         [3], // 1
//         [4], // 2
//         [], // 3
//         [5], // 4
//         [], // 5
//         [], // 6
//       ];
//       var result = theLift(queues,5);
//       Test.assertSimilar(result, [0,1,2,3,4,5,0]);
//     }); 

//    Test.it("down and down", function() {
//       var queues = [
//         [], // G
//         [0], // 1
//         [], // 2
//         [], // 3
//         [2], // 4
//         [3], // 5
//         [], // 6
//       ];
//       var result = theLift(queues,5);
//       Test.assertSimilar(result, [0,5,4,3,2,1,0]);
//     }); 
//   });

"use strict";
let theLift = function (queues, capacity) {

  console.log(queues, capacity);
  let trips = [];
  let stopsUp = [];
  let stopsDown = [];
  let lift = [];

  let upTrips = [];
  let downTrips = [];

  trips = buildTrips(queues);
  return buildStops(trips);

  // create new array containing each rider elevator request
  // the entries in this array indication if the destination is up or down
  function buildTrips(queues) {

    getUpTrips(queues);

    getDownTrips(queues);

    return [...upTrips, ...downTrips];
  };

  // get all the rider up requests
  function getUpTrips(queues) {
    return queues.map((queue, floor) => {
      return queue.filter((toFloor) => {
        let direction = floor < toFloor ? '+' : '-';
        if (direction == '+') {
          upTrips.push({ fromFloor: floor, toFloor, direction });
        }
      });
    });
  };

  // get all the elevator down requests.
  // the queue for each floor needs to be reversed to support going thru the array
  function getDownTrips(queues) {
    return queues.map((queue, floor) => {
      queue.reverse();
      return queue.map((toFloor) => {
        let direction = floor < toFloor ? '+' : '-';
        if (direction == '-') {
          downTrips.push({ fromFloor: floor, toFloor, direction });
        }
      });
    });
  }

  function buildStops(trips) {
    let stops = [];

    // initialize the stops
    stops.push(0);

    // lift go up, down,up, down,... untill all riders are off
    while (trips.length) {

      // get the stops for an up trip
      // sort the results and get only unique values
      stopsUp = [];
      trips = moveLift(trips, '+');

      stopsUp.sort(function (a, b) {
        return a - b;
      });
      stopsUp = [...new Set(stopsUp)];


      // get the stops for a down trip
      // sort the results and get only unique values
      trips.reverse();

      stopsDown = [];
      trips = moveLift(trips, '-');
      stopsDown.sort(function (a, b) {
        return b - a;
      });
      stopsDown = [...new Set(stopsDown)];


      // concatenate prior trips with the current up and down trip
      stops = [...stops, ...stopsUp, ...stopsDown];

      // remove any adjacent duplicates that may have copme from trip down starting on same floor as trip up ended
      stops = removeAdjacentDuplicates(stops);

      trips.reverse();

    }; // end while

    // add a grounf floor stop at the end of the stops in case it does not already exist
    if (stops[stops.length - 1] != 0) {
      stops.push(0);
    }
    return stops;
  };

  function removeAdjacentDuplicates(stops) {
    return stops.filter((floor, i, floors) => {
      return floor !== floors[i - 1];
    });
  };

  function moveLift(trips, direction) {

    // for each floor, see if any riders need to get off and go thru trips to see if any riders
    // need to get on
    if (direction == '+') {
      for (let onFloor = 0; onFloor < queues.length; onFloor++) {
        lift = riderGetOff(onFloor);
        trips = trips.filter((trip) => {
          if (trip.fromFloor == onFloor && trip.direction == direction) {
            stopsUp.push(onFloor);
            if (lift.length < capacity) {
              lift.push({ toFloor: trip.toFloor });
              stopsUp.push(trip.toFloor);
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          };
        });
      };
    }
    else {
      for (let onFloor = queues.length - 1; onFloor >= 0; onFloor--) {
        lift = riderGetOff(onFloor);
        trips = trips.filter((trip) => {
          if (trip.fromFloor == onFloor && trip.direction == direction) {
            stopsDown.push(onFloor);
            if (lift.length < capacity) {
              lift.push({ toFloor: trip.toFloor });
              stopsDown.push(trip.toFloor);
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          };
        });
      };
    };

    return trips;
  };

  function riderGetOff(onFloor) {
    return lift.filter((rider) => {
      if (rider.toFloor == onFloor) {
        return false
      }
      return true;
    });
  };
};
// };

module.exports = theLift;


// console.log(theLift([[],
// [0, 0, 0, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 0],
// [0, 0, 0, 0]], 5));
// '[0, 6, 5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 4, 3, 2, 1, 0, 3, 2, 1, 0, 1, 0]',
// console.log(theLift([ [], [], [], [], [], [], [] ], 5));
// console.log(theLift([[3, 3, 3, 3, 3, 3, 3], [], [], [], [], [], []], 5));
// console.log(theLift([[1], [6], [], [5], [2], [], []], 5));

// console.log(theLift([[5],
// [4, 8, 6, 9],
// [3, 10, 1],
// [7, 1, 2],
// [8, 6, 9],
// [6, 8, 7, 0],
// [9, 0],
// [],
// [7],
// [7],
// [4]], 2));
// [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 8, 7, 5, 3, 2, 1, 0, 1, 2, 3, 4, 5, 7, 9, 2, 4, 5, 6, 10, 4, 5, 8, 9, 5, 7, 0]


// console.log(theLift([
//   [4, 12, 11],
//   [6],
//   [4],
//   [10, 7],
//   [12],
//   [11, 11, 11, 8],
//   [],
//   [],
//   [7, 3, 4],
//   [3, 10],
//   [],
//   [],
//   [5]], 2));
//[0, 1, 2, 3, 4, 5, 9, 12, 9, 8, 5, 3, 0, 1, 2, 3, 5, 6, 9, 10, 11, 8, 7, 3, 2, 3, 4, 5, 10, 11, 8, 4, 3, 5, 7, 11, 5, 8, 11, 0]

console.log(theLift(
  [[6],
  [2, 0, 3],
  [5, 12, 0, 14],
  [5, 15],
  [5, 12],
  [4, 8],
  [8, 15],
  [],
  [],
  [],
  [],
  [5, 12, 7, 10],
  [14, 5],
  [15, 7, 6, 1],
  [0],
  [0, 7, 4]], 1));
  // [0, 1, 2, 3, 4, 5, 6, 8, 11, 12, 13, 14, 15, 14, 13, 12, 11, 5, 2, 1, 0, 1, 2, 3, 4, 5, 6, 8, 13, 15, 14, 13, 12, 11, 7, 5, 4, 2, 1, 0, 1, 2, 3, 4, 5, 6, 15, 14, 13, 12, 11, 4, 1, 0, 2, 3, 4, 12, 14, 13, 12, 11, 0, 2, 3, 4, 14, 13, 12, 11, 7, 3, 4, 15, 13, 12, 11, 6, 4, 5, 13, 12, 11, 1, 4, 12, 11, 5, 11, 5, 11, 7, 11, 10, 0]