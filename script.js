const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

let input = "";

buttons.forEach(button => button.addEventListener("click", sharedListener));

document.addEventListener("keydown", keyboardListener);

function keyboardListener(e) {
  const pressedKey = e.key;
  const numbers = "0123456789";
  const operators = "-+*/";

  if (pressedKey === "c") {
    clearInput();
  } else if (pressedKey === "Backspace") {
    backspace();
  } else if (numbers.includes(pressedKey)) {
    numberInputHandler(pressedKey);
  } else if (pressedKey === ".") {
    periodInputHandler();
  } else if (operators.includes(pressedKey)) {
    operatorInputHandler(pressedKey);
  } else if (pressedKey === "=") {
    equalInputHandler();
  }
}

function sharedListener(e) {
  const pressedButtonClass = e.target.className;
  const pressedButtonText = e.target.textContent;

  switch (pressedButtonClass) {
    case "clear-btn":
      clearInput();
      break;
    case "backspace-btn":
      backspace();
      break;
    case "number-btn":
      if (pressedButtonText !== ".") {
        numberInputHandler(pressedButtonText);
      } else {
        periodInputHandler();
      }

      break;
    case "operator-btn":
      if (pressedButtonText !== "=") {
        operatorInputHandler(pressedButtonText);
      } else {
        equalInputHandler();
      }

      break;
  }
}

function clearInput() {
  input = "";
  display.textContent = "";
}

function backspace() {
  if (input[input.length - 1] === " ") {
    input = input.slice(0, -3);
  } else {
    input = input.slice(0, -1);
  }

  display.textContent = input;
}

function numberInputHandler(digit) {
  input += digit;
  display.textContent = input;
}

function periodInputHandler() {
  // Spaces will surround operators, so if none are present, then the user is inputting a period for the first number
  const inputHasOneNumber = !input.includes(" ");

  if (inputHasOneNumber) {
    if (!input.includes(".")) {
      input += ".";
    }
  } else {
    const secondNumberStart = input.lastIndexOf(" ") + 1;

    if (!input.slice(secondNumberStart).includes(".")) {
      input += ".";
    }
  }

  display.textContent = input;
}

function operatorInputHandler(operator) {
  const inputIsEmpty = input.length === 0;
  const operatorIsAbsent = !input.includes(" ");
  const secondNumberIsAbsent = input[input.length - 1] === " ";

  if (inputIsEmpty && operator === "-") {
    input += operator;
  }

  if (!inputIsEmpty && operatorIsAbsent) {
    input += " " + operator + " ";
  }

  if (!inputIsEmpty && secondNumberIsAbsent) {
    const presentOperator = input[input.length - 2];

    if (presentOperator !== operator) {
      const inputArray = input.split("");

      inputArray[inputArray.length - 2] = operator;

      input = inputArray.join("");
    }
  }

  if (!inputIsEmpty && !operatorIsAbsent && !secondNumberIsAbsent) {
    equalInputHandler();

    operatorInputHandler(operator);
  }

  display.textContent = input;
}

function equalInputHandler() {
  const operatorIsPresent = input.includes(" ");
  const secondNumberIsPresent = input[input.length - 1] !== " ";

  if (operatorIsPresent && secondNumberIsPresent) {
    const operatorIndex = input.indexOf(" ") + 1;
    const operator = input[operatorIndex];
    const firstNumber = parseFloat(input.slice(0, operatorIndex - 1));
    const secondNumber = parseFloat(input.slice(operatorIndex + 2));

    if (secondNumber === 0 && operator === "/") {
      alert("You cannot divide by zero");
      clearInput();
      return;
    }

    const result = Math.round(operate(firstNumber, operator, secondNumber) * 1000) / 1000;

    input = result.toString();
  }

  display.textContent = input;
}

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

function operate(num1, operator, num2) {
  let result;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }

  return result;
}