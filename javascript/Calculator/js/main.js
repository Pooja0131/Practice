var num1 = [];
var num2 = [];
var operand = null;
var click_num = "";
var input;
var operands = /[\+\-\/x=]/;
var operators = /[\+\-\/x]/;
var n1, n2, result;

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
    num1 = [];
    num2 = [];
    operand = null;
    $(".input_number").val("");
}

function numberize(array) {
    return parseFloat(array.join(""));
}

$(document).ready(function() {
    function calculate(n1, n2, operand) {
        switch (operand) {
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
        num1 = [];
        num1.push(parseFloat(result));
        num2 = [];
        return result;
    }

    function pushNumber(numArray, input) {
        if (numArray.length < 17) {
            if (input === ".") {
                if (numArray.indexOf(".") === -1) {
                    numArray.push(input);
                }
            } else {
                numArray.push(input);
            }
        } else {
            alert("Number too big!");
        }
        return numArray;
    }

    function calculator(input) {
        click_num += input;

        if (/[0-9\.]/.test(input)) { //if numbers
            if (!operand) {
                pushNumber(num1, input);
            } else if (operand != "=") {
                pushNumber(num2, input);
            } else if (operand === "=") {
                clear();
                pushNumber(num1, input);
            }
        }


        if (operands.test(input) && (num1.length > 0)) { //if operands
            if (num2.length > 0) {
                var n1 = numberize(num1);
                var n2 = numberize(num2);
                result = null;
                result = calculate(n1, n2, operand);
            }
            operand = input;
        }


        if (input === "=") { //if equal is pressed
            click_num = "";
            click_num = result;
            $(".input_number").val(click_num);
        }

        if (input === "%") { //if percentage is pressed
            click_num = click_num.replace("%", "");
            var tempOperand = click_num.slice(-1);
            if (!(operators.test(tempOperand))) { //if the last character in inputbox is not an operator
                if (num2.length === 0) { //for num1
                    click_num = click_num.replace(num1, "");

                    var temp = num1 / 100;
                    num1.shift();
                    num1.push(temp);
                    click_num += num1;
                } else if ((num1.length !== 0) && (operand !== null)) { //for num2
                    click_num = click_num.replace(num2, "");
                    var temp = num2 / 100;
                    num2.shift();
                    num2.push(temp);
                    click_num += num2;
                }
            } else {
                console.log("last character is operator");
            }
            $(".input_number").val(click_num);
        }

        if (input === "Clr") {
            clear();
            click_num = "";
        }

        if (input === "Del") {
            click_num = click_num.replace("Del", "");
            var operatorPresent = operators.test(click_num);
            var tempOperand = click_num.slice(-1);
            click_num = click_num.slice(0, -1);
            if ((num2.length === 0) && !(operatorPresent)) { //if num1 is the number to be deleted
                num1.toString(); //convert num1 from array to string
                var temp = (num1.toString()).slice(0, -1); //then delete last character(digit)
                temp = [temp]; //copy and convert string back to array num1
                num1 = temp;
            }

            if (num2.length !== 0) { //if num2 is the number to be deleted
                num2.pop();
                console.log(num2);
            }
            if (operators.test(tempOperand)) {
                operand = "";
            }
        }
        $(".input_number").val(click_num);
    } //calculator

    $(".col-md-3").click(function() {
        var input = $(this).html();
        calculator(input);
    });


    //if neg pressed (this feature is removed)
    //     if (input === "neg") {
    //         $(".negative").html("pos");
    //         // click_num = "-" + click_num;
    //         // console.log(click_num);
    //         click_num = click_num.replace("neg", "");
    //         console.log(click_num);
    //         console.log(operand);
    //         console.log(operators);
    //         console.log(operators.test(operand));
    //         // $(".input_number").val(click_num);
    //
    //         if (num2.length === 0 && operand === null) { //for num1
    //             // if ((num2.length === 0 && operators.test(operand)) || (num2.length === 0 && operand === null)) { //for num1
    //             click_num = "-" + click_num;
    //             console.log(click_num);
    //             $(".input_number").val(click_num);
    //
    //             if (num1.length != 0) { //if num1 is not empty
    //                 num1.unshift("-");
    //                 console.log(num1);
    //                 n1 = numberize(num1);
    //                 console.log(n1);
    //             } else { //if num1 is empty
    //                 num1.push("-");
    //                 console.log(num1);
    //                 n1 = numberize(num1);
    //                 console.log(n1);
    //             }
    //         } else { //for num2
    //             // $(".input_number").val(click_num);
    //             if (num2.length != 0) { //if num1 is not empty
    //                 num2.unshift("-");
    //                 console.log(num2);
    //                 n2 = numberize(num2);
    //                 console.log(n2);
    //                 console.log(click_num);
    //                 click_num = click_num.replace(Math.abs(n2), "");
    //                 console.log(click_num);
    //                 click_num += n2;
    //                 console.log(click_num);
    //             } else { //if num1 is empty
    //                 num2.push("-");
    //                 console.log(num2);
    //                 click_num += num2;
    //                 console.log(click_num);
    //             }
    //             $(".input_number").val(click_num);
    //         }
    //     } else if (input === "pos") { //if positive pressed
    //         click_num = "-" + click_num;
    //         console.log(click_num);
    //         $(".negative").html("neg");
    //         console.log(click_num);
    //         click_num = click_num.replace("pos", "");
    //         click_num = click_num.replace("-", "");
    //         console.log(click_num);
    //
    //         // $(".input_number").val(click_num);
    //         if (num2.length === 0) { //for num1
    //             console.log(num1);
    //
    //             // var a = num1.indexOf("-");
    //             // console.log("a" + a);
    //
    //             var a = (num1.toString()).search("-");
    //             console.log("a" + a);
    //             console.log(num1);
    //
    //             if (a === -1) { //"-" not found
    //                 console.log("do nothing");
    //             } else {
    //                 // num1.splice(0, 1);
    //                 // console.log(num1);
    //                 // num1 = num1.replace("-", "");
    //                 console.log(num1);
    //                 num1.shift();
    //
    //                 n1 = numberize(num1);
    //                 n1 = Math.abs(n1);
    //                 console.log(n1);
    //                 click_num = n1;
    //                 $(".input_number").val(click_num);
    //             }
    //
    //
    //             // if (num1.length != 0) { //if num1 is not empty
    //             //     num1.unshift("-");
    //             //     console.log(num1);
    //             //     n1 = numberize(num1);
    //             //     console.log(n1);
    //             // } else { //if num1 is empty
    //             //     num1.push("-");
    //             //     console.log(num1);
    //             //     n1 = numberize(num1);
    //             //     console.log(n1);
    //             // }
    //
    //             // num1.shift();
    //             // console.log(n1);
    //         } else { //for num2
    //             num2 = "-" + num2;
    //             console.log(num2);
    //             n2 = numberize(num2);
    //             console.log(n2);
    //         }
    //         $(".input_number").val(click_num);
    //
    //     }
    //
    //     $(".input_number").val(click_num);
    // }





    //if numbers entered from keyboard
    // $(document).keydown(function(key) {
    //     var input = String.fromCodePoint(key.which);
    //     console.log(input);
    //     switch (key.which) {
    //         case 96:
    //             input = "0";
    //             break;
    //         case 97:
    //             input = "1";
    //             break;
    //         case 98:
    //             input = "2";
    //             break;
    //         case 99:
    //             input = "3";
    //             break;
    //         case 100:
    //             input = "4";
    //             break;
    //         case 101:
    //             input = "5";
    //             break;
    //         case 102:
    //             input = "6";
    //             break;
    //         case 103:
    //             input = "7";
    //             break;
    //         case 104:
    //             input = "8";
    //             break;
    //         case 105:
    //             input = "9";
    //             break;
    //         case 13:
    //             input = "=";
    //             break;
    //         case 106:
    //             input = "x";
    //             break;
    //         case 107:
    //             input = "+";
    //             break;
    //         case 109:
    //             input = "-";
    //             break;
    //         case 111:
    //             input = "/";
    //             break;
    //         default:
    //             // input = "";
    //             break;
    //     }
    //     calculator(input);
    // });
});
