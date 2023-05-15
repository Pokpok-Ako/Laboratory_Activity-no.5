const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.display');
const buttons = calculator.querySelectorAll('.button');

let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;
let decimalCount = 0;

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        case '%':
            return firstOperand * (secondOperand / 100);
        case '√':
            return Math.sqrt(firstOperand);
        default:
            return null;
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('numbers')) {
            if (display.textContent === '0' || shouldResetDisplay) {
                display.textContent = button.textContent;
                shouldResetDisplay = false;
            } else {
                display.textContent += button.textContent;
            }
        }

        if (button.classList.contains('decimal')) {
            if (shouldResetDisplay) {
                display.textContent = '0' + button.textContent;
                shouldResetDisplay = false;
            } else if (!display.textContent.includes('.')) {
                display.textContent += button.textContent;
            }
        }

        if (button.classList.contains('operator')) {
            firstOperand = parseFloat(display.textContent);
            currentOperation = button.textContent;
            shouldResetDisplay = true;
            decimalCount = 0;
            display.textContent = firstOperand + ' ' + currentOperation; 
        }

        if (button.classList.contains('equal')) {
            secondOperand = parseFloat(display.textContent);
            const result = calculate(firstOperand, secondOperand, currentOperation);
            if (result.toString().length > 18) {
                display.textContent = result.toFixed(5);
            } else {
                display.textContent = result;
            }
            display.textContent += ' ='; 
            firstOperand = result;
            shouldResetDisplay = true;
        }

        if (button.classList.contains('bkspace')) {
            if (display.textContent === 'Infinity') {
                display.textContent = '0';
            } else {
                display.textContent = display.textContent.slice(0, -1);
                if (display.textContent.length === 0) {
                    display.textContent = '0';
                    firstOperand = null;
                    secondOperand = null;
                    currentOperation = null;
                    shouldResetDisplay = true;
                    decimalCount = 0;
                } else {
                    shouldResetDisplay = false;
                }
            }
        }

        if (button.classList.contains('clear')) {
            display.textContent = '0';
            firstOperand = null;
            secondOperand = null;
            currentOperation = null;
            shouldResetDisplay = false;
            decimalCount = 0;
        }
    });
});

           