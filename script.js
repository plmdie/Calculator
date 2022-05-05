const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
const result = document.getElementById('result');
const operator = document.querySelectorAll('.operator');

let num1, num2, displayValue, operatorBtn, resultValue, lastOperatorBtn, digitPressed, calculation;


buttons.forEach(item => item.addEventListener('click', parseBtnKey));

document.addEventListener('keyup', parseBtnKey);


const sum = (n1, n2) => n1 + n2;

const substract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => n1 / n2;

const remainder = (n1, n2) => n1 % n2;


const operate = (n1, o, n2) => {
    let res;
    console.log(n1, n2);
    if (!o) return;
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    if (n2) { 
        if (o === '+') res = sum(n1, n2); 
        if (o === '-') res = substract(n1, n2);
        if (o === 'x' || o === '*') res = multiply(n1, n2);
        if (o === '/') res = divide(n1, n2);
        if (o === '%') res = remainder(n1, n2);
        num1 = res.toFixed(6);
        return parseFloat(res.toFixed(6));
    } else if (o === 'x' || o === '/') return 'broken';
}

function equals() {
    getDisplayValues();
    
        if (calculation) return;
        if (num1) num2 = displayValue;
        writeToResult(resultValue + displayValue)
        writeToDisplay(operate(num1, operatorBtn, num2));
        calculation = true;
    
}


function parseBtnKey(e) {
    e.key ? setBtnValue(e.key) : setBtnValue(e.target.textContent);
}

function setBtnValue(buttonValue) {
    if (buttonValue >= 0 && buttonValue <= 9 || buttonValue === '.') fillDisplay(buttonValue); 
    if (buttonValue === '+'
    || buttonValue === '-'
    || buttonValue === '/'
    || buttonValue === 'x' 
    || buttonValue === '*' ) calculate(buttonValue); 
    if (buttonValue === '=' || buttonValue === 'Enter') equals();
    if (buttonValue === '<-' || buttonValue === 'Backspace') backSpace();
    if (buttonValue === 'Clear' || buttonValue === 'Delete') clear();
    if (buttonValue === '%') percentage();
    if (buttonValue === '+/-') minus();
}

function calculate(e) {
    getDisplayValues();
    operatorBtn = e;
    if (displayValue != '0') {
        if (getLastDigit() || displayValue) {
            if (calculation) {
                writeToResult(displayValue + operatorBtn);
                num1 = displayValue;
                writeToDisplay('');
                calculation = false;
            }
            else if (!num1) {
                writeToResult(resultValue + displayValue + operatorBtn);
                num1 = displayValue;
                writeToDisplay('');
            }
            else if (num1) {
                writeToResult(resultValue + displayValue + operatorBtn);
                num2 = displayValue;
                display.textContent = '';
                lastOperatorBtn ? operate(num1, lastOperatorBtn, num2) : operate(num1, operatorBtn, num2); 
            }
        }
    }
    lastOperatorBtn = operatorBtn;
}


function fillDisplay(digitPressedValue) {   
    getDisplayValues();
    if (!getLastDigit && digitPressedValue === '0') return; 
    if (digitPressedValue === '.') {
        if (!displayValue) display.textContent = '0' + digitPressedValue; 
        else if (!displayValue.includes('.')) display.textContent += digitPressedValue;
    }
    else {
        if (calculation) {
            display.textContent = digitPressedValue;
            writeToResult('');
            num1 = null;
            calculation = false;
        } else display.textContent += digitPressedValue;
    }
}

const writeToDisplay = value => display.textContent = value;

const writeToResult = value => result.textContent = value;


function minus() {
    getDisplayValues();
    if (displayValue != '') writeToDisplay(-displayValue);
}

function percentage() {
    getDisplayValues();
    writeToDisplay(parseFloat(displayValue) / 100);
}

function clear() {
    display.textContent = '';
    result.textContent = '';
    num1 = num2 = operatorBtn = '';
}

function backSpace() {
    let remove = getLastDigit();
    display.textContent = removeLastDigit(display.textContent); 
}

function getDisplayValues() {
    resultValue = result.textContent;
    displayValue = display.textContent;
}

function getLastDigit() {
    return /[0-9]$/.test(result.textContent) ? result.textContent.charAt(result.textContent.length-1) : false;
}

function removeLastDigit(n) {
    let num = n.toString();
    return num.slice(0, -1);
}
