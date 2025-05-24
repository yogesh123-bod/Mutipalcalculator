const display = document.getElementById("display");

function appendValue(val) {
  display.value += val;
}

function appendOperator(op) {
  let lastChar = display.value.slice(-1);
  if ("+-*/%".includes(lastChar)) {
    display.value = display.value.slice(0, -1) + op; // Replace last operator
  } else if (display.value !== "") {
    display.value += op;
  }
}

function clearDisplay() {
  display.value = "";
}

function oneDisplay() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value;
    const tokens = expression.split(/([+\-*/%])/);

    if (tokens.length !== 3) {
      display.value = "Error";
      return;
    }

    const a = parseInt(tokens[0], 2);
    const operator = tokens[1];
    const b = parseInt(tokens[2], 2);

    if (isNaN(a) || isNaN(b)) {
      display.value = "Error";
      return;
    }

    let result;

    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/':
        if (b === 0) {
          display.value = "Div/0 Err";
          return;
        }
        result = Math.floor(a / b);
        break;
      case '%': result = a % b; break;
      default: display.value = "Error"; return;
    }

    display.value = result.toString(2);
  } catch {
    display.value = "Error";
  }
}
