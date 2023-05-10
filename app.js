const form = document.querySelector('#sign-up');

const firstNameInput = document.querySelector('#first-name');
const firstNameError = document.querySelector('#first-error');
const firstValidIcon = document.querySelector('#first-valid');
const firstInvalidIcon = document.querySelector('#first-invalid');

const lastNameInput = document.querySelector('#last-name');
const lastNameError = document.querySelector('#last-error');
const lastValidIcon = document.querySelector('#last-valid');
const lastInvalidIcon = document.querySelector('#last-invalid');

const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');
const emailValidIcon = document.querySelector('#email-valid');
const emailInvalidIcon = document.querySelector('#email-invalid');

const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');
const passwordValidIcon = document.querySelector('#password-valid');
const passwordInvalidIcon = document.querySelector('#password-invalid');

const nameRegEx = /^[A-Za-z]+$/;
const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passRegEx = [
    /[A-Z]/, //uppercase rule
    /[a-z]/, //lowercase rule
    /[0-9]/, //number rule
    /[!@#$%^&*]/ //special character rule
];

let firstNameErrorType = { type: '' };
let lastNameErrorType = { type: '' };
let passwordErrorType = { type: [] };

const isNameValid = (inputValue, err) => {
    if(inputValue.length == 0) {
        err.type = 'empty';
        return false;
    } 
    else if(!nameRegEx.test(inputValue)) {
        err.type = 'character';
        return false;
    }
    else return true;
};

const isEmailValid = (inputValue) => {
    if(inputValue.length != 0 && emailRegEx.test(inputValue)) return true;
    else return false;
};

const isPasswordValid = (inputValue, err) => {
    let rulesPassed = 0;
    err.type.length = 0;
    if(inputValue.length <= 8) {
        err.type.push('length');
        console.log('too short');
        return false;
    } else {
        passRegEx.forEach((regEx, index) => {
            if(regEx.test(inputValue)) {
                rulesPassed++;
            } else {
                switch (index) {
                    case 0:
                        err.type.push('needs uppercase');
                        break;
                    case 1:
                        err.type.push('needs lowercase');
                        break;
                    case 2:
                        err.type.push('needs number');
                        break;
                    case 3:
                        err.type.push('needs special character');
                        console.log(err.type);
                        break;
                }
            }
        })
    };

    if(rulesPassed == 4) return true;
    else return false;
}



firstNameInput.addEventListener('input', () => {
    if(isNameValid(firstNameInput.value, firstNameErrorType)) {
        // first name is valid
        firstNameError.setAttribute('style', 'opacity: 0');
        firstNameError.innerHTML = '';
        firstValidIcon.setAttribute('style', 'opacity: 1');
        firstInvalidIcon.setAttribute('style', 'opacity: 0');
        firstNameInput.classList.add('valid-input');
        firstNameInput.classList.remove('invalid-input');
        console.log('valid');
    } else {
        // first name is invalid
        firstNameError.setAttribute('style', 'opacity: 1');
        if(firstNameErrorType.type == 'empty') {
            firstNameError.innerHTML = 'First Name cannot be empty';
        } else if (firstNameErrorType.type == 'character') {
            firstNameError.innerHTML = 'First Name must only contain letters';
        };
        firstValidIcon.setAttribute('style', 'opacity: 0');
        firstInvalidIcon.setAttribute('style', 'opacity: 1');
        firstNameInput.classList.add('invalid-input');
        firstNameInput.classList.remove('valid-input');
        console.log(firstNameErrorType.type);
    } 
})

lastNameInput.addEventListener('input', () => {
    if(isNameValid(lastNameInput.value, lastNameErrorType)) {
        // last name is valid
        lastNameError.setAttribute('style', 'opacity: 0');
        lastNameError.innerHTML = '';
        lastValidIcon.setAttribute('style', 'opacity: 1');
        lastInvalidIcon.setAttribute('style', 'opacity: 0');
        lastNameInput.classList.add('valid-input');
        lastNameInput.classList.remove('invalid-input');
        console.log('valid');
    } else {
        // last name is invalid
        lastNameError.setAttribute('style', 'opacity: 1');
        if(lastNameErrorType.type == 'empty') {
            lastNameError.innerHTML = 'Last Name cannot be empty';
        } else if (lastNameErrorType.type == 'character') {
            lastNameError.innerHTML = 'Last Name must only contain letters';
        };
        lastValidIcon.setAttribute('style', 'opacity: 0');
        lastInvalidIcon.setAttribute('style', 'opacity: 1');
        lastNameInput.classList.add('invalid-input');
        lastNameInput.classList.remove('valid-input');
        console.log(lastNameErrorType.type);
    }
})

emailInput.addEventListener('input', () => {
    if(isEmailValid(emailInput.value)) {
        // email is valid
        emailError.setAttribute('style', 'opacity: 0');
        emailValidIcon.setAttribute('style', 'opacity: 1');
        emailInvalidIcon.setAttribute('style', 'opacity: 0');
        emailInput.classList.add('valid-input');
        emailInput.classList.remove('invalid-input');
        console.log('valid');
    } else {
        // email is invalid
        emailError.setAttribute('style', 'opacity: 1');
        emailValidIcon.setAttribute('style', 'opacity: 0');
        emailInvalidIcon.setAttribute('style', 'opacity: 1');
        emailInput.classList.add('invalid-input');
        emailInput.classList.remove('valid-input');
        console.log('invalid');
    } 
})

passwordInput.addEventListener('input', () => {
    if(isPasswordValid(passwordInput.value, passwordErrorType)) {
        // password is valid
        passwordError.setAttribute('style', 'opacity: 0');
        passwordError.innerHTML = '';
        passwordValidIcon.setAttribute('style', 'opacity: 1');
        passwordInvalidIcon.setAttribute('style', 'opacity: 0');
        passwordInput.classList.add('valid-input');
        passwordInput.classList.remove('invalid-input');
        console.log('Valid');
    } else {
        // password is invalid
        passwordError.setAttribute('style', 'opacity: 1');
        if(passwordErrorType.type.includes('length')) {
            passwordError.innerHTML = 'Password must contain at least 8 characters';
        } else {
            let errString = '';
            if(passwordErrorType.type.includes('needs uppercase')) {
                errString = errString + ' an uppercase';
            }
            if(passwordErrorType.type.includes('needs lowercase')) {
                if(errString != '') {
                    errString = errString + ','
                }
                errString = errString + ' a lowercase';
            }
            if(passwordErrorType.type.includes('needs number')) {
                if(errString != '') {
                    errString = errString + ','
                }
                errString = errString + ' a number';
            }
            if(passwordErrorType.type.includes('needs special character')) {
                if(errString != '') {
                    errString = errString + ','
                }
                errString = errString + ' a special character';
            }
            passwordError.innerHTML = `Password must contain: ${errString}`;
        }
        passwordValidIcon.setAttribute('style', 'opacity: 0');
        passwordInvalidIcon.setAttribute('style', 'opacity: 1');
        passwordInput.classList.add('invalid-input');
        passwordInput.classList.remove('valid-input');
        console.log('invalid')
    } 
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