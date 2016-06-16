var click_num = "";
var regular_expression = [];
var num1 = [];
var num2 = [];
var operands = [];
var n1, n2, result;
var poppedOperator;
// var num2Done = false;
// var n = 1;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function clear() {
  // $(".input_number").val("");
  var click_num = "";
  var num1 = [];
  console.log("clear number1 : " + num1);
  var num2 = [];
  var operand = "";
  var n1, n2, result;
}

function calculate() {
  clear();

  // var click_num = "";
  // var num1 = [];
  // console.log("clear number1 : " + num1);
  // var num2 = [];
  // var operand = "";
  // var n1, n2, result;

  console.log("number11 : " + num1);
  console.log("number22 : " + num2);
  // console.log("operand : " + operand);
  n1 = parseFloat(num1.join(""));
  n2 = parseFloat(num2.join(""));
  console.log("n1 : " + n1);
  console.log("n2 : " + n2);
  // for (var i=0; i<=operands.length; i++) {
  console.log(operands[operands.length - 2]);
  switch (operands[operands.length - 2]) {
    case '+':
      result = add(n1, n2);
      break;
    case '-':
      result = subtract(n1, n2);
      break;
    case 'x':
      result = multiply(n1, n2);
      break;
    case '/':
      result = divide(n1, n2);
      break;
    case '=':
      break;
  }
  // }
  console.log("Result : " + parseFloat(result));
  // $(".input_number").val(result);
  n1 = result;
  num1 = [];
  console.log("Num1 : " + num1);
  num1.push(parseFloat(result));
  console.log("New n1 : " + n1);
  num2 = [];
  n2 = "";
  console.log("New n2 : " + n2);
  console.log(operands.length);
  poppedOperator = operands.shift();    //removes first item of array
  console.log(operands.length);
  console.log(poppedOperator);
  operands.push(poppedOperator);
  console.log(operands.length);

}

$(".dot").click(function() {
  // console.log(click_num);
  click_num += $(this).text();
  $(".input_number").val(click_num);
  // console.log(click_num);

  if (($(this).text() === ".")) {
    if (num2.length === 0) { //second number is empty
      if ((num1[num1.length - 2] === ".") && (num1[num1.length - 1] != ".")) { //if second last digit in number 1 is dot and last digit is a number that means number1 is present and the current thing pressed should move to number2
        num2.push($(this).text());
        console.log("number2 : " + num2);
      } else {
        num1.push($(this).text());
        console.log("number1 : " + num1);
      }
    } else {
      num1.push($(this).text());
      console.log("number1 : " + num1);

    }
  }
});


$(".col-md-3").click(function() {
  console.log("clicked element: " + $(this).text());
  if (($.isNumeric($(this).text()) && operands.length === 0)) { //if number and before operand, then it is num1
    num1.push($(this).text());
    console.log("number1 : " + num1);
  } else if (($.isNumeric($(this).text()) && operands.length != 0)) { //if number and after operand, then it is num2
    num2.push($(this).text());
    console.log("number2 : " + num2);
    // calculate();
  } else { //if not a number then its operand
    if ($(this).text() != "=") { //if its an operator like +, -, *, /
      console.log(operands.length);
      operands.push($(this).text());
      // n++;
      console.log(operands.length);
      if(num2.length != 0){
        num2Done = true;
      }
    } else { //if its = , then calculate (BTW = has its own .equal.click())
      calculate();

    }
  }
  click_num += $(this).text();
  $(".input_number").val(click_num);
  // if(operands.length >= 2 && num2Done){
  //   calculate();
  // }
  // if(operands.length >= 2 && n>operands.length){
  //   calculate();
  // }
});

$(".equal").click(function() {
  $(".input_number").val(result);
  click_num = result;
  operands = [];
});


$(".clear").click(function() {
  clear();
  click_num = "";
  num1 = [];
  num2 = [];
  operands = [];
  n1 = "";
  n2 = "";
  result = "";
  $(".input_number").val("");
});
