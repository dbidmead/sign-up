const form = document.querySelector('#sign-up');

const firstNameInput = document.querySelector('#first-name');
const firstNameError = document.querySelector('#first-error');

const lastNameInput = document.querySelector('#last-name');
const lastNameError = document.querySelector('#last-error');

const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');

const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const passRegEx = [
    /[A-Z]/,
    /[a-z]/,
    /[0-9]/,
    /[!@#$%^&*]/
];


const isNameValid = (inputValue) => {
    if(inputValue.length == 0) return false;
    else return true;
};

const isEmailValid = (inputValue) => {
    if(inputValue.length != 0 && emailRegEx.test(inputValue)) return true;
    else return false;
};

const isPasswordValid = (inputValue) => {
    let rulesPassed = 0;
    if(inputValue.length <= 8) {
        console.log('too short');
        return false;
    } else {
        passRegEx.forEach((regEx, index) => {
            if(regEx.test(inputValue)) {
                rulesPassed++;
            } else {
                switch (index) {
                    case 0:
                        console.log("needs uppercase");
                        break;
                    case 1:
                        console.log("needs lowercase");
                        break;
                    case 2:
                        console.log("needs number");
                        break;
                    case 3:
                        console.log("needs special character");
                        break;
                }
            }
        })
    };

    if(rulesPassed == 4) return true;
    else return false;
}



firstNameInput.addEventListener('input', () => {
    if(isNameValid(firstNameInput.value)) {
        console.log('valid');
    } else console.log('invalid');
})

lastNameInput.addEventListener('input', () => {
    if(isNameValid(lastNameInput.value)) {
        console.log('valid');
    } else console.log('invalid');
})

emailInput.addEventListener('input', () => {
    if(isEmailValid(emailInput.value)) {
        console.log('valid');
    } else console.log('invalid');
})

passwordInput.addEventListener('input', () => {
    if(isPasswordValid(passwordInput.value)) {
        console.log('Valid')
    } else (console.log('invalid'))
})

form.addEventListener('submit', (e) => {
    if(!isNameValid(firstNameInput.value) ||
        !isNameValid(lastNameInput.value) ||
        !isEmailValid(emailInput.value) ||
        !isPasswordValid(passwordInput.value)) {
            e.preventDefault();
        }
    else return
})