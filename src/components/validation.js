const showInputError = (formSelector, inputSelector, errorMessage,validationConfig) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

const hideInputError = (formSelector, inputElement,validationConfig) => {
  const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

const isValid = (formSelector, inputSelector,validationConfig) => {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }

  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage,validationConfig);
  } else { 
    hideInputError(formSelector, inputSelector,validationConfig);
  }
}

const hadInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
  })
}

const toggleButtonState = (inputList,buttomElement,validationConfig) => {
  if(hadInvalidInput(inputList)) {
    buttomElement.disabled = true;
    buttomElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttomElement.disabled = false;
    buttomElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

const setEventListener = (formSelector,validationConfig) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));

  const buttomElement = formSelector.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList,buttomElement,validationConfig);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector,inputSelector,validationConfig);
      toggleButtonState(inputList,buttomElement,validationConfig);
      })
  })
}

export const clearForm = (profileForm, validationConfig) => {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttomElement = profileForm.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputSelector) => {
    hideInputError(profileForm, inputSelector,validationConfig);
  });
  // profileForm.reset();
  toggleButtonState(inputList, buttomElement,validationConfig);
}

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function(evt){
          evt.preventDefault();
      })
      setEventListener(formSelector,validationConfig)
  });
}
