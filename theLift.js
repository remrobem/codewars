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


var theLift = function (queues, capacity) {

  console.log(queues, capacity);
  let trips = [];
  let riderCount = 0;
  let stopsUp = [];
  let stopsDown = [];
  let stopsGetOff = [];
  let lift = [];

  buildTrips(queues);
  return buildStops(trips);

  // console.log(trips);
  // console.log(stops);

  function buildTrips(queues) {
    return queues.map((queue, floor) => {
      if (queue.length == 0) {
        trips.push({ fromFloor: floor });
      }
      return queue.map((toFloor) => {
        let direction = floor < toFloor ? '+' : '-';
        trips.push({ fromFloor: floor, toFloor, direction });
      })
    })
  };


  function buildStops(trips) {
    let stops = [];


    stops.push(0);
    // -----------------------------------------------------
    tripsLeft = getTripsLeft(trips);
    while (tripsLeft.length) {
      stopsUp = [];
      liftUp(trips);
      stopsUp = [...stopsUp, ...stopsGetOff]
      stopsUp.sort();
      stopsUp = [...new Set(stopsUp)];

      trips.reverse();

      stopsDown = [];
      liftDown(trips);
      stopsDown = [...stopsDown, ...stopsGetOff];
      stopsDown.sort(function (a, b) {
        return b - a;
      });
      stopsDown = [...new Set(stopsDown)];

      if (stops[stops.length - 1] == stopsUp[0]) {
        stops.splice(stops.length - 1);
      }
      if (stopsUp[stopsUp.length - 1] == stopsDown[0]) {
        stopsUp.splice(stopsUp.length - 1);
      }
      stops = [...stops, ...stopsUp, ...stopsDown];

      trips.reverse();
      tripsLeft = getTripsLeft(trips);
    };
    if (stops[stops.length - 1] != 0) {
      stops.push(0);
    }

    return stops;
  };

  function getTripsLeft(trips) {
    return trips.filter((trip) => {
      return trip.toFloor == null ? false : true;
    });
  }

  function liftUp(trips) {

    for (let i = 0; i < queues.length; i++) {
      riderGetOff(i);
      if (trips[i].toFloor && trips[i].direction === '+') {
        lift.push({ toFloor: trips[i].toFloor })
        stopsUp.push(trips[i].fromFloor);
        trips[i].toFloor = null;
      };
    };
  };
  //   return trips.map((trip) => {
  //     riderGetOff(trip.fromFloor);
  //     if (trip.fromFloor != null && trip.direction === '+') {

  //       if (lift.length < capacity) {
  //         lift.push({ toFloor: trip.toFloor })
  //         stopsUp.push(trip.fromFloor);
  //         stopsUp.push(trip.toFloor);
  //         trip.fromFloor = null;
  //       }
  //     }
  //   })
  // };

  function liftDown(trips) {

    for (let i = 0; i < queues.length; i++) {
      riderGetOff(i);
      if (trips[i].toFloor && trips[i].direction === '-') {
        lift.push({ toFloor: trips[i].toFloor })
        stopsDown.push(trips[i].fromFloor);
        trips[i].toFloor = null;
      };
    };
  }
  // return trips.map((trip) => {
  //   riderGetOff(trip.fromFloor);
  //   if (trip.fromFloor != null && trip.direction === '-') {

  //     if (lift.length < capacity) {
  //       lift.push({ toFloor: trip.toFloor })
  //       stopsDown.push(trip.fromFloor);
  //       stopsDown.push(trip.toFloor);
  //       trip.fromFloor = null;
  //     }
  //   }
  // })
  // }

  function riderGetOff(onFloor) {
    lift = lift.filter((rider) => {
      if (rider.toFloor == onFloor) {
        stopsGetOff.push(onFloor);
        return false
      }
      return true;
    });
  }

};

module.exports = theLift;

console.log(theLift([[3, 3,3,3,3,3], [], [], [], [], [], []], 5));
