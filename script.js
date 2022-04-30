const buttons = document.querySelectorAll('.digit');
const display = document.getElementById('display');
const result = document.getElementById('result');
const operator = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const back = document.getElementById('back');


let teste;
let num1, num2;
let displayValue;
let operatorBtn;
let resultValue;
let lastOperatorBtn;

let digitPressed;

const sum = (n1, n2) => n1 + n2;

const substract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => n1 / n2;

const remainder = (n1, n2) => n1 % n2;


const operate = (n1, o, n2) => {
    let res;
    console.log(n1, n2);
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    if (!n2) {
        display.innerText = 'computer broken';
        return;
    }    
    if (o === '+') res = sum(n1, n2); 
    if (o === '-') res = substract(n1, n2);
    if (o === 'x') res = multiply(n1, n2);
    if (o === '/') res = divide(n1, n2);
    if (o === '%') res = remainder(n1, n2);
    display.innerText = res;
    displayValue = display.innerText;
    num2 = null; 
    num1 = res;
    return res;
}

buttons.forEach(item => item.addEventListener('click', fillDisplay));

operator.forEach(item => item.addEventListener('click', calculate));

equal.addEventListener('click', equals);

back.addEventListener('click', backSpace);

clearBtn.addEventListener('click', clear);

function equals() {
    lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
    result.innerText = 0;
    operatorBtn = null;
    num1 = null;   
}

function calculate(e) {
    resultValue = result.innerText;
    console.log(typeof resultValue, typeof displayValue);
    digitPressed = getLastDigit();
    if (num1) operatorBtn = e.originalTarget.innerText;
    if (num2) lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
    if (resultValue != 0 && digitPressed) result.innerText += e.originalTarget.innerText;
    if (resultValue === '0' && displayValue != '0') {
        operatorBtn = e.originalTarget.innerText;
        result.innerText = displayValue + operatorBtn;
        num1 = displayValue;
    }
    lastOperatorBtn = operatorBtn; 
}

function fillDisplay(e) {   
    const digitPressedValue = e.originalTarget.innerText;
    resultValue = result.innerText;
    digitPressed = getLastDigit();
    if (display.innerText === 'computer broken') display.innerText = 0; 
    if (operatorBtn) {
        if (num1) {
            if (!getLastDigit()) {
                console.log('case 4');
                num2 ? num2 += digitPressedValue: num2 = digitPressedValue;
                result.innerText += digitPressedValue;
            } else {
                console.log('case 3');
            num2 += digitPressedValue; 
            resultValue != 0 ? result.innerText += digitPressedValue : result.innerText = digitPressedValue;
            }
        }  
    } else { 
        if (num1)  {
            console.log('case 2');
            num1 += digitPressedValue;
            resultValue != 0 ? result.innerText += digitPressedValue : result.innerText = digitPressedValue; 
        } 
        else {
            console.log('case 4');
            num1 = digitPressedValue;
            result.innerText = num1;
        }
    }
}

function clear() {
    display.innerText = 0;
    result.innerText = 0;
    num1 = num2 = operatorBtn = null;
}

function backSpace() {
    let remove = getLastDigit();
    if (remove) {
        if (num2) num2 = removeLastDigit(num2); 
        else if (num1) num1 = removeLastDigit(num1); 
    } else operatorBtn = null;

    let resultDis = resultValue.slice(0,-1);    
    result.innerText = resultDis;    
}


function getLastDigit() {
    resultValue = result.innerText;
    return /[0-9]$/.test(resultValue) ? result.innerText.charAt(result.innerText.length-1) : false;
}

function removeLastDigit(n) {
    let num = n.toString();
    return num.slice(0, -1);
}