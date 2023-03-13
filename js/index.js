// Global object to store form data
const userData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

// DOM Elements
const formEl = document.querySelector('#form');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});

// Action to execute when the form is submitted
function submitForm() {
  if (checkInputsValidity()) {
    formEl.submit();
  }
  return;
}

// Checks if the value entered by the user is valid
function checkInputsValidity() {
  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (!firstNameValue) {
    displayError(firstNameInput, 'First Name cannot be empty');
  } else {
    removeError(firstNameInput);
    userData.firstName = firstNameValue;
  }

  if (!lastNameValue) {
    displayError(lastNameInput, 'Last Name cannot be empty');
  } else {
    removeError(lastNameInput);
    userData.lastName = lastNameValue;
  }

  if (!emailValue) {
    displayError(emailInput, 'Email cannot be empty');
  } else if (!isCorrectEmail(emailValue)) {
    displayError(emailInput, 'Looks like this is not an email');
    changeInputColor(emailInput);
  } else {
    removeError(emailInput);
    userData.email = emailValue;
  }

  if (!passwordValue) {
    displayError(passwordInput, 'Password cannot be empty');
  } else {
    removeError(passwordInput);
    userData.password = passwordValue;
  }

  return !Object.values(userData).includes('');
}

// Flags errors in case the user doesn´t enter the correct values
function displayError(element, message) {
  removeError(element);
  const errorParagraph = document.createElement('p');
  const errorIcon = document.createElement('i');

  errorParagraph.textContent = message;
  errorParagraph.classList.add('error');
  errorIcon.classList.add('fa-solid', 'fa-circle-exclamation');

  element.classList.add('error');
  element.placeholder = '';

  element.parentElement.appendChild(errorParagraph);
  element.parentElement.appendChild(errorIcon);
}

// Remove the errors when the user enter the correct values
function removeError(element) {
  const errorEl = element.parentElement.querySelector('p.error');
  const errorInput = element.parentElement.querySelector('input.error');
  const errorIcon = element.parentElement.querySelector(
    '.fa-solid.fa-circle-exclamation'
  );
  if (errorEl && errorInput && errorIcon) {
    errorEl.remove();
    errorInput.classList.remove('error');
    errorIcon.remove();
  }
}

// Checks is the format of the entered email is correct
function isCorrectEmail(email) {
  const regExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return regExp.test(email);
}

// Changes the color of an input. In this case the function is called when the entered email is not correct.
function changeInputColor(element) {
  const rootEl = document.querySelector(':root');
  element.style.color =
    getComputedStyle(rootEl).getPropertyValue('--clr-primary-red');

  element.addEventListener('input', () => {
    element.style.color = element.style.color =
      getComputedStyle(rootEl).getPropertyValue('--clr-neutral-dark');
  });
}
