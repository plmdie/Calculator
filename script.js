const add = (n1, n2) => n1 + n2;

const substract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => n1 / n2;


const operate = (n1, o, n2) => {
    if (o === '+') add(n1, n2);
    if (o === '-') substract(n1, n2);
    if (o === '*') multiply(n1, n2);
    if (o === '/') divide(n1, n2);
}