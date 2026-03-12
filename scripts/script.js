const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const email = document.getElementById("email");
//const emailError = document.querySelector("#email + span.error");
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;
const country = document.getElementById("country");
const code = document.getElementById("p-code");
const password = document.getElementById("pwd");
const pwdRegExp = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/i;
const confirm = document.getElementById("pwd-confirm");

const isValid = (input) => {
    const empty = input.value.length === 0;
    let check;    
    switch (input) {
        case email:
            check = emailRegExp.test(input.value);
            break;
        case country:
            check = true;
            break;
        case code:
            check = input.value > 0;
            break;
        case password:
            check = pwdRegExp.test(input.value);
            break;
        case confirm:
            check = confirm.value === password.value;
            break;
    }
    const validity = !empty && check;
    
    return validity;
}

const setClass = (input) => {
    input.className = isValid(input) ? "valid" : "invalid";
}

const updateError = (input) => {
    const error = document.querySelector(`#${input.id} + span#error`);
    if(isValid(input)) {
        error.textContent = "";
        error.removeAttribute("class");
    } else {
        switch (input) {
            case email:
                error.textContent = "Enter a valid email address.";
                break;
            case country:
                error.textContent = "Country cannot be blank.";
                break;
            case code:
                error.textContent = "Enter a valid postal code."
                break;
            case password:
                if (input.value.length === 0) {
                    error.textContent = "Enter a password.";
                } else if (input.value.length < 8) {
                    error.textContent = "The password must be at least 8 characters long.";
                } else {
                    error.textContent = "The password must contain at least 1 letter, one number and one special character."
                }
                break;
            case confirm:
                if (input.value.length === 0) {
                    error.textContent = "Confirm your password.";
                } else {
                    error.textContent = "The password does not match.";
                }
        }
        error.setAttribute("class", "active");
    }
}

const handleExit = (input) => {
    setClass(input);
    updateError(input);
}

const handleSubmit = (event) => {
    inputs.forEach(input => {
        setClass(input);
        updateError(input);
    })
    const activeErrors = document.querySelectorAll("#error.active");
    if (activeErrors.length === 0) {
        alert("All good! High five!");
    } else {
        event.preventDefault();
    }
}

inputs.forEach((input) => {
    input.addEventListener("blur", () => {
        handleExit(input);
    })

})

form.addEventListener("submit", handleSubmit);