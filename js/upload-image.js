import {isEscapeKey} from './utils.js';
import {onFillter, offFillter, removeFilterEffects} from './filters.js';
import {showApprove, showError} from './message.js';
import {isValid, isEditMode} from './validation.js';
import {onZoomEffects, offZoomEffects, resetFotoSizeToDefault } from './zoom-foto-effects.js';

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
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(isEditMode()){
      return;
    }
    closeUploadImagePopup();
  }
};
const openUploadImagePopup = (resetState = true) => {

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

  onFillter();
  onZoomEffects();
  downloadImagePopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  downloadImageCloseButtonElement.addEventListener('click', closeUploadImagePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
};

function closeUploadImagePopup (resetState = true) {
  downloadImagePopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  downloadImageCloseButtonElement.removeEventListener('click', closeUploadImagePopup);

  if(resetState){
    noEffectElement.checked = true;
    imageUploadInputElement.value = '';
    hashtagsElement.value = '';
    descriptionElement.value = '';
    removeFilterEffects();
  }

  offFillter();
  offZoomEffects();
}

const uploadPicture = (body) => {
  fetch('https://26.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      body,
    },
  ).then(() => {
    closeUploadImagePopup();
    showApprove();
  }).catch(() => {
    closeUploadImagePopup(false);
    showError(()=>openUploadImagePopup(false));
  });
};

const submitUploadForm = (evt) => {
  evt.preventDefault();

  if (isValid()) {
    uploadPicture(new FormData(evt.target));
  }
};


const onUploadImage = () =>{
  imageUploadInputElement.addEventListener('change', openUploadImagePopup);
  imgUpLoadFormElement.addEventListener('submit', submitUploadForm);
};
export {onUploadImage};
