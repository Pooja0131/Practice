// Build a function which takes an array and returns the maximum number.

function getMaxOfArray(numArray) {
  // return Math.max.apply(null, numArray);  this also works
	return Math.max(...numArray);
}

var array1 = [1,2,3,4,5,6,77,8,9,10];

var maximumNumber = getMaxOfArray(array1);
console.log(maximumNumber);
