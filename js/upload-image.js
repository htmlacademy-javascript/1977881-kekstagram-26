import {isEscapeKey} from './utils.js';
import {addFillterEvents, removeFillterEvents, removeFilterEffects} from './filters.js';
import {isValid, isEditMode, validate} from './validation.js';
import {addZoomEffectEvents, removeZoomEffectEvents, resetFotoSizeToDefault } from './zoom-foto-effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadInputElement = document.querySelector('.img-upload__input');
const downloadImagePopupElement = document.querySelector('.img-upload__overlay');
const downloadImageCloseButtonElement =  document.querySelector('.img-upload__cancel');
const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const imageElement = downloadImagePopupElement.querySelector('.img-upload__img');
const effectsPreviewElements = downloadImagePopupElement.querySelectorAll('.effects__preview');
const noEffectElement = document.querySelector('#effect-none');
const imgloadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = imgloadFormElement.querySelector('.text__hashtags');
const descriptionElement = imgloadFormElement.querySelector('.text__description');

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const newSuccessMessage = successTemplateElement.cloneNode(true);
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const newErrorMessage = errorTemplateElement.cloneNode(true);


const onOpenUploadImagePopup = (resetState = true) => {

  if(resetState){
    const file = imageUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();

    if (FILE_TYPES.some((name) =>  fileName.endsWith(name))) {
      imageElement.src = URL.createObjectURL(file);
      effectsPreviewElements.forEach((element)=> {
        element.style.backgroundImage = `url(${URL.createObjectURL(file)})` ;
      });
    }

    removeFilterEffects();
    resetFotoSizeToDefault();
  }

  validate();

  addFillterEvents();
  addZoomEffectEvents();
  downloadImagePopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  downloadImageCloseButtonElement.addEventListener('click', onCloseUploadImagePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(isEditMode()){
      return;
    }
    onCloseUploadImagePopup();
  }
};


const onCloseUploadImagePopup= (resetState = true) => {
  downloadImagePopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  downloadImageCloseButtonElement.removeEventListener('click', onCloseUploadImagePopup);

  if(resetState){
    noEffectElement.checked = true;
    imageUploadInputElement.value = '';
    hashtagsElement.value = '';
    descriptionElement.value = '';
    removeFilterEffects();
  }

  validate();

  removeFillterEvents();
  removeZoomEffectEvents();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const showError = () => {
  newErrorMessage.classList.add('error-message__upper-layer');
  document.body.appendChild(newErrorMessage);
  const errorButtonElement = document.querySelector('.error__button');
  document.addEventListener('keydown', onErrorEscapeKyedown);
  errorButtonElement.addEventListener('click', onCloseErrorPopup);

  document.addEventListener('click', onCloseErrorPopup);
};


const showApprove = () =>  {
  document.body.appendChild(newSuccessMessage);
  const successButtonElement = document.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessEscapeKyedown);
  successButtonElement.addEventListener('click', onCloseSuccessPopup);
  document.addEventListener('click', onCloseSuccessPopup);
};

const uploadPicture = (body) => {
  fetch('https://26.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok){
      onCloseUploadImagePopup();
      showApprove();
    }else{
      onCloseUploadImagePopup(false);
      showError(()=>onOpenUploadImagePopup(false));
    }
  }).catch(() => {
    onCloseUploadImagePopup(false);
    showError(()=>onOpenUploadImagePopup(false));
  });
};

const onSubmitUploadForm = (evt) => {
  evt.preventDefault();

  if (isValid()) {
    uploadPicture(new FormData(evt.target));
  }
};

const onCloseSuccessPopup = () => {
  document.removeEventListener('keydown', onSuccessEscapeKyedown);
  document.body.removeChild(newSuccessMessage);
  document.removeEventListener('click', onCloseSuccessPopup);
};
const onSuccessEscapeKyedown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseSuccessPopup();
  }
};


const onCloseErrorPopup = () => {
  document.removeEventListener('keydown', onErrorEscapeKyedown);
  document.body.removeChild(newErrorMessage);
  document.removeEventListener('click', onCloseErrorPopup);
  onOpenUploadImagePopup(false);
};

const onErrorEscapeKyedown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseErrorPopup();
    onOpenUploadImagePopup(false);
  }
};


const addUploadImageEvents = () =>{
  imageUploadInputElement.addEventListener('change', onOpenUploadImagePopup);
  imgUpLoadFormElement.addEventListener('submit', onSubmitUploadForm);
};

export {addUploadImageEvents};
