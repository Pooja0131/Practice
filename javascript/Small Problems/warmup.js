//1. Build a function which takes an array and returns the maximum number.

function getMaxOfArray(numArray) {
  // return Math.max.apply(null, numArray);  this also works
  return Math.max(...numArray);
}

var array1 = [1, 2, 3, 4, 5, 6, 77, 8, 9, 10];

var maximumNumber = getMaxOfArray(array1);
console.log(maximumNumber);





//2. Build a function vowel_count() which takes a string and returns the number of vowels
var count = 0;

function vowel_count(str) {
  var matches = str.match(/[aeiou]/gi);
	var count = matches ? matches.length : 0;
	return count;
}
var str = "hello friend!";
console.log("'" + str + "' has " + vowel_count(str) + " vowels");
