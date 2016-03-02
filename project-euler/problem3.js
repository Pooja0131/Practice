//PROBLEM 3

/* The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ? */


//SOLUTION 1
var problemThree = function(number) {
  var current = number;
  var div = 2;
  var prime = 0;
  while (current > 1) {
    while (current % div === 0) {
      prime = div;
      current /= div;
      div = 2;
    }
    div++;
  }
  console.log("The largest prime factor of the number 600851475143 is : " + prime);
  return prime;
};
problemThree(600851475143);




//SOLUTION 2 time consuming and not so clean
var factors = [];
var arr = [];
var maxPrime;

function findFactors(num) {
  for (i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  collectPrimeNumbers(factors);
  findMaxNumber();
}


function collectPrimeNumbers(factors) {
  for (var j = 0; j < factors.length; j++) {
    isPrime(factors[j]);
  }
}

function isPrime(value) {
  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  arr.push(value);
  return value > 1;
}


function findMaxNumber() {
  console.log("The largest prime factor of the number 600851475143 is : " + Math.max.apply(null, arr));
}
//findFactors(13195);
