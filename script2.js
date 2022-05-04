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




buttons.forEach(item => item.addEventListener('click', fillDisplay));

operator.forEach(item => item.addEventListener('click', calculate));

equal.addEventListener('click', equals);

back.addEventListener('click', backSpace);

clearBtn.addEventListener('click', clear);


const operate = (n1, o, n2) => {
    let res;
    console.log(n1, n2);
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    if (n2) { 
        if (o === '+') res = sum(n1, n2); 
        if (o === '-') res = substract(n1, n2);
        if (o === 'x') res = multiply(n1, n2);
        if (o === '/') res = divide(n1, n2);
        if (o === '%') res = remainder(n1, n2);
        display.textContent = res;
        displayValue = display.textContent;
        num2 = null; 
        num1 = res;
        return res;
    } else if (o === 'x') display.textContent = 'computer broken';
}

function calculate(n1, n2) {
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    if (n2) {
        lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2);
    } else display.textContent = 'computer broken';
}

function equals() {
    lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
    result.textContent = 0;
    operatorBtn = null;
    num1 = null;   
}

function calculate(e) {
    resultValue = result.textContent;
    digitPressed = getLastDigit();
    if (num1) operatorBtn = e.originalTarget.textContent;
    if (num2) lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
    if (resultValue != 0 && digitPressed) result.textContent += e.originalTarget.textContent;
    if (resultValue === '0' && displayValue != '0') {
        operatorBtn = e.originalTarget.textContent;
        result.textContent = displayValue + operatorBtn;
        num1 = displayValue;
    }
    lastOperatorBtn = operatorBtn; 
}

function fillDisplay(e) {   
    const digitPressedValue = e.originalTarget.textContent;
    resultValue = result.textContent;
    digitPressed = getLastDigit();
    if (display.textContent === 'computer broken') display.textContent = 0; 
    if (operatorBtn) {
        if (num1) {
            if (!getLastDigit()) {
                num2 ? num2 += digitPressedValue: num2 = digitPressedValue;
                result.textContent += digitPressedValue;
            } else {
                num2 += digitPressedValue; 
                resultValue != 0 ? result.textContent += digitPressedValue : result.textContent = digitPressedValue;
            }
        }  
    } else { 
        if (num1)  {
            num1 += digitPressedValue;
            resultValue != 0 ? result.textContent += digitPressedValue : result.textContent = digitPressedValue; 
        } 
        else {
            if (digitPressedValue === '.') {
                num1 = '0' + digitPressedValue;
                result.textContent = num1;
            } else { 
                num1 = digitPressedValue;
                result.textContent = num1;
            }
        }
    }
}

function clear() {
    display.textContent = 0;
    result.textContent = 0;
    num1 = num2 = operatorBtn = null;
}

function backSpace() {
    let remove = getLastDigit();
    if (remove) {
        if (num2) num2 = removeLastDigit(num2); 
        else if (num1) num1 = removeLastDigit(num1); 
    } else operatorBtn = null;   
    result.textContent = removeLastDigit(result.textContent);    
}


function getLastDigit() {
    return /[0-9]$/.test(result.textContent) ? result.textContent.charAt(result.textContent.length-1) : false;
}

function removeLastDigit(n) {
    let num = n.toString();
    return num.slice(0, -1);
}