import {isEscapeKey} from './util.js';
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const newSuccessMessage = successTemplateElement.cloneNode(true);
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const newErrorMessage = errorTemplateElement.cloneNode(true);

const onSuccessEscapeKyedown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

function closeSuccessPopup () {
  document.removeEventListener('keydown', onSuccessEscapeKyedown);
  document.body.removeChild(newSuccessMessage);
  document.removeEventListener('click', closeSuccessPopup);
}

const showApprove = () =>  {
  document.body.appendChild(newSuccessMessage);

  const successButtonElement = document.querySelector('.success__button');

  document.addEventListener('keydown', onSuccessEscapeKyedown);

  successButtonElement.addEventListener('click', closeSuccessPopup);

  document.addEventListener('click', closeSuccessPopup);
};

const onErrorEscapeKyedown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

function closeErrorPopup () {
  document.removeEventListener('keydown', onErrorEscapeKyedown);
  document.body.removeChild(newErrorMessage);
  document.removeEventListener('click', closeErrorPopup);
}

const showError = () => {
  newErrorMessage.classList.add('error-message__upper-layer');
  document.body.appendChild(newErrorMessage);

  const successButtonElement = document.querySelector('.error__button');

  document.addEventListener('keydown', onErrorEscapeKyedown);

  successButtonElement.addEventListener('click', closeErrorPopup);

  document.addEventListener('click', closeErrorPopup);
};

export {showApprove, showError};
