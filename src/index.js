function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    if (!checkBrackets(expr)) {
        throw 'ExpressionError: Brackets must be paired';
    }

    operPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    const numbers = [];
    const operators = [];

    for (let i = 0; i < expr.length; i++) {

        if (expr[i] == ' ') {
            continue;
        } else if (expr[i] >= '0' && expr[i] <= '9') {
            let buff = expr[i];
            while (expr[i + 1] >= '0' && expr[i + 1] <= '9') {
                i++;
                buff += expr[i];
            }
            numbers.push(parseInt(buff));
        } else if (expr[i] == '(') {
            operators.push(expr[i]);
        } else if (expr[i] == ')') {
            while (operators[operators.length - 1] != '(') {
                numbers.push(solve(numbers.pop(), numbers.pop(), operators.pop()));
            }
            operators.pop();
        } else if (expr[i] == '+' || expr[i] == '-' || expr[i] == '*' || expr[i] == '/') {
            while (operators.length && operPrecedence[expr[i]] <= operPrecedence[operators[operators.length - 1]]) {
                numbers.push(solve(numbers.pop(), numbers.pop(), operators.pop()));
            }
            operators.push(expr[i]);
        }

    }

    while (operators.length) {
        numbers.push(solve(numbers.pop(), numbers.pop(), operators.pop()));
    }

    return numbers.pop();
}

function solve(b, a, operator) {

    if (operator === '+') {
        return a + b;
    }

    if (operator === '-') {
        return a - b;
    }

    if (operator === '*') {
        return a * b;
    }

    if (operator === '/') {
        if (b == 0) {
            throw 'TypeError: Division by zero.';
        }
        return a / b;
    }
}

function checkBrackets(expr) {

    if (!(expr.includes('(') || expr.includes(')'))) {
        return true;
    }

    const OPEN_BRACKET = '(';
    const BRACKET_PAIR = { ')': '(' };

    const stack = [];

    for (const ch of expr) {

        if (ch == '(' || ch == ')') {
            if (ch == OPEN_BRACKET) {
                stack.push(ch);
            } else {
                if (!stack.length) {
                    return false;
                }

                if (BRACKET_PAIR[ch] == stack[stack.length - 1]) {
                    stack.pop();
                } else {
                    return false;
                }
            }
        }
    }

    return !stack.length;
}

module.exports = {
    expressionCalculator
}