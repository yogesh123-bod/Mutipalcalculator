const display = document.getElementById('display');

// Append values (numbers and hex letters)
function appendValue(val) {
  display.value += val.toUpperCase();
}

// Append operator safely
function appendOperator(op) {
  const lastChar = display.value.slice(-1);
  if ('+-*/%'.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + op;
  } else if (display.value !== '') {
    display.value += op;
  }
}

// Clear entire display
function clearDisplay() {
  display.value = '';
}

// Delete one character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the hex expression
function calculate() {
  try {
    const input = display.value.toUpperCase();

    // Split into tokens: numbers and operators
    const tokens = input.match(/([0-9A-F]+|[\+\-\*/%])/g);

    if (!tokens || tokens.length === 0) {
      display.value = 'Error';
      return;
    }

    // Convert hex tokens to decimal
    const decimalTokens = tokens.map(token => {
      if (/^[0-9A-F]+$/.test(token)) {
        return parseInt(token, 16);
      } else if (/^[\+\-\*/%]$/.test(token)) {
        return token;
      } else {
        throw new Error("Invalid token");
      }
    });

    // Join the decimal expression and evaluate
    const decimalExpression = decimalTokens.join(' ');
    const result = eval(decimalExpression);

    // Convert result back to HEX
    if (typeof result === 'number' && !isNaN(result)) {
      display.value = Math.trunc(result).toString(16).toUpperCase();
    } else {
      display.value = 'Error';
    }
  } catch (err) {
    display.value = 'Error';
  }
}
