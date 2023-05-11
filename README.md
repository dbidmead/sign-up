# Frontend Mentor - Intro component with sign up form solution

This is a solution to the [Intro component with sign up form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-component-with-signup-form-5cf91bd49edda32581d28fd1). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [The challenge](#the-challenge)
- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Author](#author)

## The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say *"[Field Name] cannot be empty"*
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say *"Looks like this is not an email"*
  - note: I decided to challenge myself and add additional complexity to the validation logic and corresponding HTML outputs

## Links

- Solution URL: [https://dbidmead.github.io/sign-up](https://dbidmead.github.io/sign-up)

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS animations
- Custom JS validation logic

## What I learned

### In order to manipulate a global variable value via a function by passing into that function in JS, use an object

For example, this will not work:
```js
const myString = 'string';

function changeString(x) {
  x = 'new string';
}

changeString(myString);
console.log(myString)
```
myString will simply come back as 'string'.

Instead:
```js
const myString = { value: 'string' };

function changeString(x) {
  x.value = 'new string';
};

changeString(myString);
console.log(myString.value);
```
This was useful for keeping track of error types in form validation where, for example, an invalid name field can either be empty OR contain non-alphabetical characters.

### In order to interpolate variables into strings, backticks must be used instead of single or double quotation marks

```js
let someVar = 1;

function defineString(x) {
  return `the current value of the variable is ${x}`;
}

console.log(defineString(someVar));
```

### The following regular expressions were helpful for sign-up form validation, for future reference:

```js
const nameRegEx = /^[A-Za-z]+$/; //alphabetical characters only

const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; //general email

const passRegEx = [
    /[A-Z]/, //require 1+ uppercase rule
    /[a-z]/, //require 1+ lowercase rule
    /[0-9]/, //require 1+ number rule
    /[!@#$%^&*]/ //require 1+ special character rule
];
```
The accompanying validation logic is below.
```js
// these objects will be passed in as the (err) parameters
let nameErrorType = { type: '' };
let passwordErrorType = { type: [] };

// return a boolean based on the name validation rules, and set the type property of the nameErrorType object accordingly.
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

// simply check if the email matches the format asserted in the email RegEx and return a boolean.
const isEmailValid = (inputValue) => {
    if(inputValue.length != 0 && emailRegEx.test(inputValue)) return true;
    else return false;
};

// return a boolean based on password validation rules while adjusting the array containing error types accordingly. Later iterate over passwordErrorType.type array to determine innerHTML of passwordError element.
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
```

## Author

- GitHub - [@dbidmead](https://github.com/dbidmead)
- Frontend Mentor - [@dbidmead](https://www.frontendmentor.io/profile/dbidmead)