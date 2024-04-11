const matrixFunc = (matrix) => {
  const counts = {};
  matrix.forEach((row) => {
    //iterate each row
    row.forEach((num) => {
      // check if is a number and increment count
      if (typeof num !== "number") {
        throw Error("Matrix must contain valid numbers only.");
      }
      if (num in counts) {
        counts[num] += 1;
      } else {
        counts[num] = 1;
      }
      //counts = { '1': 14, '2': 3, '4': 1, '7': 4 }
    });
  }); // Object.entries - returns an array of key-value pairs from the object.
  // [ [ '1', 14 ], [ '2', 3 ], [ '4', 1 ], [ '7', 4 ] ]
  const arr = Object.entries(counts).map((row) => ({
    number: row[0],
    counter: row[1],
  }));
  //cleaner version of code :
  // const arr = Object.entries(counts).map(([number, counter]) => ({
  //   number,
  //   counter,
  // }));

  return arr;
};

console.log(
  matrixFunc([
    [1, 1, 2, 4, 1, 1, 7],
    [1, 1, 1, 2, 1, 1, 7],
    [7, 7, 1, 1, 1, 1, 1],
  ])
);
// final result:
// [
//   { number: '1', counter: 14 },
//   { number: '2', counter: 2 },
//   { number: '4', counter: 1 },
//   { number: '7', counter: 4 }
// ]
