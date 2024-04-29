//global variables
let currValue = "";
let storedValue = "";
let operation;

//specific bool variables
let afterEquals = false;
let decimalPointAdded = false;

const display = document.querySelector(".display");

const buttons = document.querySelector(".buttons");
buttons.addEventListener('click', (event) => {
    let target = event.target;
    let cl = target.classList;

    if (cl.contains("digit")) {
        currValue += target.textContent;

        console.log("currValue after adding " + target.textContent + " is " + currValue);
    }
    else if (cl.contains("op")) {
        //special case: =
        if (target.textContent === '=') {
            afterEquals = true;
            if (operation) {
                storedValue = evaluate();
                operation = null;
            }
        }
        else {
            if (operation) {
                storedValue = evaluate();
            }
            else {
                if (afterEquals) {
                    
                }
                else {
                    storedValue = currValue;
                }
            }
            operation = target.textContent;
        }
        currValue = "";
        decimalPointAdded = false;

        console.log("storedValue is " + storedValue);
    }
    else if (cl.contains("misc")) {
        if (target.textContent === 'ac') {
            resetAll();
        }
        else if (target.textContent === '+/-') {
            setSign();
            console.log(" set sign");
        }
        else if (target.textContent === '.') {
            if (!decimalPointAdded) {
                currValue += target.textContent;
                console.log("currValue after adding " + target.textContent + " is " + currValue);
                decimalPointAdded = true;
            }
        }
        else if (target.textContent === '%') {
            if (currValue === "") {
                storedValue = +storedValue * 100;
            }
        }
    }

    display.textContent = currValue ? currValue : storedValue;
    
});

function evaluate() {
    switch(operation) {
        case ('+'):
            return (+storedValue + (+currValue)).toFixed(4);
        case ('-'):
            return (+storedValue - (+currValue)).toFixed(4);
        case ('*'):
            return (+storedValue * (+currValue)).toFixed(4);
        case ('/'):
            return (+storedValue / (+currValue)).toFixed(4);
    }
}

function resetAll() {
    currValue = ""; storedValue = ""; operation = null; afterEquals = false;
    decimalPointAdded = false;
    display.textContent = null;
}
function setSign() {
    if (currValue != "") {
        currValue = String(-1 * +currValue);
        console.log("currValue now equals " + currValue);
    }
}
