const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

const hideInputError = (formSelector, inputElement) => {
  const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

const isValid = (formSelector, inputSelector) => {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }

  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else { 
    hideInputError(formSelector, inputSelector);
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
      isValid(formSelector,inputSelector);
      toggleButtonState(inputList,buttomElement,validationConfig);
      })
  })
}

export const clearValidation = (profileForm, validationConfig) => {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttomElement = profileForm.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputSelector) => {
    hideInputError(profileForm, inputSelector);
  });

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
