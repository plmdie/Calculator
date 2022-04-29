const buttons = document.querySelectorAll('.digit');
const display = document.getElementById('display');
const result = document.getElementById('result');
const operator = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');

let teste;
let num1, num2;
let displayValue = result.innerText;
let operatorBtn;
let resultValue;
let lastOperatorBtn;

let digitPressed;

const sum = (n1, n2) => n1 + n2;

const substract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => n1 / n2;


const operate = (n1, o, n2) => {
    let res;
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    if (o === '+') res = sum(n1, n2); 
    if (o === '-') res = substract(n1, n2);
    if (o === 'x') res = multiply(n1, n2);
    if (o === '/') res = divide(n1, n2);
    display.innerText = res;
    num2 = null; 
   
    num1 = res;
    return res;
}

buttons.forEach(item => item.addEventListener('click', fillDisplay));

operator.forEach(item => item.addEventListener('click', calculate));

equal.addEventListener('click', equals);

function equals() {
    lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
}

function calculate(e) {
    digitPressed = /[0-9]$/.test(result.innerText);
    operatorBtn = e.originalTarget.innerText;
    console.log(num1 + ' ' + num2);
    if (num2) lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
    if (displayValue && digitPressed) result.innerText += e.originalTarget.innerText;
    lastOperatorBtn = operatorBtn; 
}

function fillDisplay(e) {   
    displayValue = result.innerText;
    const digitPressedValue = e.originalTarget.innerText;
    digitPressed = /[0-9]$/.test(displayValue);
    if (operatorBtn) {
        if (num1) {
            if (!digitPressed) {
                num2 ? num2 += digitPressedValue: num2 = digitPressedValue;
                result.innerText += digitPressedValue;
            } else {
            num2 += digitPressedValue; 
            result.innerText += digitPressedValue;
            }
        }  
    } else { 
    
        if (num1)  {
            num1 += digitPressedValue;
            result.innerText += digitPressedValue;
        } 
        else {
            num1 = digitPressedValue;
            result.innerText = num1;
        }
    }
}